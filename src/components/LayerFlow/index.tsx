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

export default function LayerFlow({
  ariaLabel,
  layers,
  around,
  caption,
}: LayerFlowProps) {
  return (
    <figure className={styles.flow} aria-label={ariaLabel}>
      <ol
        className={`${styles.layers} ${layers.length <= 5 ? styles.compact : ""}`}
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
