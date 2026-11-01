import CodeBlock from "@theme/CodeBlock";
import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./styles.module.css";

type Method = "round-robin" | "least-conn" | "ip-hash";

type LogEntry = { id: number; client: string; server: number };

type Simulation = {
  active: number[];
  total: number[];
  next: number;
  seq: number;
  log: LogEntry[];
};

const METHODS: { id: Method; label: string; directive: string; summary: string }[] = [
  {
    id: "round-robin",
    label: "Round Robin",
    directive: "",
    summary:
      "The default. Sends to each server in turn, ignoring how busy a server is, so a slow server piles up connections.",
  },
  {
    id: "least-conn",
    label: "Least Connections",
    directive: "    least_conn;\n",
    summary:
      "Sends to the server with the fewest active connections. Fits when requests take very different amounts of time.",
  },
  {
    id: "ip-hash",
    label: "IP Hash",
    directive: "    ip_hash;\n",
    summary:
      "The same client always reaches the same server (session persistence). Nginx hashes the first 3 octets of an IPv4 address, so a whole /24 shares one server.",
  },
];

const SERVERS = [
  { name: "Server 1", note: "fast", durationMs: 2000 },
  { name: "Server 2", note: "fast", durationMs: 2000 },
  { name: "Server 3", note: "slow", durationMs: 6000 },
];

const CLIENTS = ["203.0.113.7", "198.51.100.23", "192.0.2.41", "100.64.12.5"];

const AUTO_INTERVAL_MS = 900;
const LOG_SIZE = 6;
const BAR_SCALE = 6;

const initialSimulation = (): Simulation => ({
  active: SERVERS.map(() => 0),
  total: SERVERS.map(() => 0),
  next: 0,
  seq: 0,
  log: [],
});

// Like nginx ip_hash: only the first three octets of an IPv4 address count.
const hashClient = (ip: string) =>
  ip
    .split(".")
    .slice(0, 3)
    .join(".")
    .split("")
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 9973, 7) % SERVERS.length;

const pickServer = (method: Method, sim: Simulation, client: string) => {
  if (method === "least-conn") return sim.active.indexOf(Math.min(...sim.active));
  if (method === "ip-hash") return hashClient(client);
  return sim.next;
};

export default function LoadBalancerSimulator() {
  const [method, setMethod] = useState<Method>("round-robin");
  const [auto, setAuto] = useState(false);
  const [, render] = useReducer((n: number) => n + 1, 0);
  const sim = useRef(initialSimulation());
  const timers = useRef(new Set<number>());

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current.clear();
  };

  const reset = () => {
    clearTimers();
    sim.current = initialSimulation();
    render();
  };

  const sendRequest = () => {
    const state = sim.current;
    const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
    const server = pickServer(method, state, client);

    state.active[server]++;
    state.total[server]++;
    state.next = (state.next + 1) % SERVERS.length;
    state.seq++;
    state.log = [{ id: state.seq, client, server }, ...state.log].slice(0, LOG_SIZE);

    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      state.active[server]--;
      render();
    }, SERVERS[server].durationMs);
    timers.current.add(timer);
    render();
  };

  useEffect(() => {
    if (!auto) return;
    const interval = window.setInterval(sendRequest, AUTO_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [auto, method]);

  useEffect(() => clearTimers, []);

  const current = METHODS.find((m) => m.id === method) ?? METHODS[0];
  const { active, total, log } = sim.current;

  return (
    <figure className={styles.simulator}>
      <div className={styles.methods} role="group" aria-label="Load balancing algorithm">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={styles.method}
            aria-pressed={m.id === method}
            onClick={() => {
              setMethod(m.id);
              reset();
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className={styles.summary}>{current.summary}</p>

      <div className={styles.servers}>
        {SERVERS.map((server, i) => (
          <div key={server.name} className={styles.server}>
            <div className={styles.serverHead}>
              <strong>{server.name}</strong>
              <span className={styles.muted}>{server.note}</span>
            </div>
            <div className={styles.track} aria-hidden="true">
              <div
                className={styles.bar}
                style={{ width: `${Math.min(active[i] / BAR_SCALE, 1) * 100}%` }}
              />
            </div>
            <div className={styles.muted}>
              {active[i]} active · {total[i]} total
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.action} onClick={sendRequest}>
          Send 1 request
        </button>
        <button
          type="button"
          className={styles.action}
          aria-pressed={auto}
          onClick={() => setAuto((on) => !on)}
        >
          {auto ? "Stop auto" : "Run auto"}
        </button>
        <button type="button" className={styles.action} onClick={reset}>
          Reset
        </button>
      </div>

      <ol className={styles.log}>
        {log.length === 0 && <li className={styles.muted}>No requests yet.</li>}
        {log.map((entry) => (
          <li key={entry.id}>
            #{entry.id} <code>{entry.client}</code> → {SERVERS[entry.server].name}
          </li>
        ))}
      </ol>

      <CodeBlock language="nginx" title="nginx.conf">
        {`upstream backend {\n${current.directive}    server 10.0.1.1:8080;\n    server 10.0.1.2:8080;\n    server 10.0.1.3:8080;\n}`}
      </CodeBlock>
    </figure>
  );
}
