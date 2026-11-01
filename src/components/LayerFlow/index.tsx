import type { CSSProperties } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export type FlowNode = {
  label: string;
  to?: string;
  detail?: string;
  plain?: boolean;
};

export type FlowLayer = { title: string; nodes: FlowNode[] };

export type LayerFlowProps = {
  /** Accessible name of the whole figure. */
  ariaLabel: string;
  /** Rendered left to right, with an arrow between layers. */
  layers: FlowLayer[];
  /** Band under the layers, for cross-cutting services. */
  around?: FlowLayer;
  caption?: string;
};

function NodeContent({ node }: { node: FlowNode }) {
  return (
    <>
      <span className={styles.label}>{node.label}</span>
      {node.detail && <span className={styles.detail}>{node.detail}</span>}
    </>
  );
}

function Node({ node }: { node: FlowNode }) {
  if (node.to) {
    return (
      <Link to={node.to} className={`${styles.node} ${styles.link}`}>
        <NodeContent node={node} />
      </Link>
    );
  }
  if (node.plain) {
    return (
      <div className={`${styles.node} ${styles.plain}`}>
        <NodeContent node={node} />
      </div>
    );
  }
  return (
    <div
      className={`${styles.node} ${styles.gap}`}
      role="group"
      aria-label={`${node.label} (no note yet)`}
    >
      <NodeContent node={node} />
    </div>
  );
}

function Nodes({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className={styles.nodes}>
      {nodes.map((node, i) => (
        <Node key={`${node.label}-${i}`} node={node} />
      ))}
    </div>
  );
}

/** Longest whole word, in characters, per kind of text. */
function longestWord(texts: (string | undefined)[]): number {
  return Math.max(
    0,
    ...texts.flatMap((text) => (text ?? "").split(/[\s\-/·]+/).map((w) => w.length)),
  );
}

/**
 * Compact columns (6.75rem) only when every word fits whole. Measured at the
 * compact column: label text has ~84px, so 9 characters (widest 10-character
 * words such as "Components" take 88px); titles are uppercase with no padding
 * (~108px, 11 characters); detail lines are 0.8rem regular (~13 characters).
 */
function fitsCompact(layers: FlowLayer[]): boolean {
  const nodes = layers.flatMap((l) => l.nodes);
  return (
    layers.length <= 5 &&
    longestWord(nodes.map((n) => n.label)) <= 9 &&
    longestWord(nodes.map((n) => n.detail)) <= 13 &&
    longestWord(layers.map((l) => l.title)) <= 11
  );
}

export default function LayerFlow({
  ariaLabel,
  layers,
  around,
  caption,
}: LayerFlowProps) {
  const compact = fitsCompact(layers);
  return (
    <figure className={styles.flow} aria-label={ariaLabel}>
      <ol
        className={[
          styles.layers,
          compact ? styles.compact : "",
          layers.length === 5 ? styles.pentad : "",
        ].join(" ")}
        role="list"
        style={{ "--n": layers.length } as CSSProperties}
      >
        {layers.map((layer, i) => (
          <li key={`${layer.title}-${i}`} className={styles.layer}>
            <div className={styles.title}>{layer.title}</div>
            <Nodes nodes={layer.nodes} />
          </li>
        ))}
      </ol>
      {around && (
        <div className={styles.around}>
          <div className={styles.title}>{around.title}</div>
          <Nodes nodes={around.nodes} />
        </div>
      )}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
