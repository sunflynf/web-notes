import { useState } from "react";
import styles from "./styles.module.css";

type Client = { id: string; name: string; room: string; sender?: boolean };

const CLIENTS: Client[] = [
  { id: "a", name: "Client A", room: "room1", sender: true },
  { id: "b", name: "Client B", room: "room1" },
  { id: "c", name: "Client C", room: "room2" },
  { id: "d", name: "Client D", room: "room1" },
];

const SCOPES: { code: string; summary: string; receives: (c: Client) => boolean }[] = [
  {
    code: "socket.emit()",
    summary: "Sends only back to the connected client (the sender).",
    receives: (c) => !!c.sender,
  },
  {
    code: "io.emit()",
    summary: "Sends to every client.",
    receives: () => true,
  },
  {
    code: "socket.broadcast.emit()",
    summary: "Sends to every client except the sender.",
    receives: (c) => !c.sender,
  },
  {
    code: 'io.to("room1").emit()',
    summary: "Sends to every client in room1, including the sender.",
    receives: (c) => c.room === "room1",
  },
  {
    code: 'socket.to("room1").emit()',
    summary: "Sends to every client in room1 except the sender.",
    receives: (c) => c.room === "room1" && !c.sender,
  },
];

export default function EmitScopeDemo() {
  const [selected, setSelected] = useState(1);
  const scope = SCOPES[selected];

  return (
    <figure className={styles.demo}>
      <div className={styles.scopes} role="group" aria-label="Emit scope">
        {SCOPES.map((s, i) => (
          <button
            key={s.code}
            type="button"
            className={styles.scope}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            <code>{s.code}</code>
          </button>
        ))}
      </div>

      <div className={styles.server}>
        Server: <code>{scope.code}</code>
      </div>

      <ul className={styles.clients}>
        {CLIENTS.map((client) => {
          const receives = scope.receives(client);
          return (
            <li key={client.id} className={styles.client} data-receives={receives}>
              <strong>{client.name}</strong>
              <span className={styles.meta}>
                {client.room}
                {client.sender && " · sender"}
              </span>
              <span className={styles.status}>{receives ? "✓ receives" : "— does not receive"}</span>
            </li>
          );
        })}
      </ul>

      <figcaption className={styles.summary}>{scope.summary}</figcaption>
    </figure>
  );
}
