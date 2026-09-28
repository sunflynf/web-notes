import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";

type ProjectNode = {
  id: string;
  label: string;
  description?: string;
  children?: ProjectNode[];
  isFolder?: boolean;
};

type ProjectStructureExplorerProps = {
  nodes?: ProjectNode[];
  initialSelectedId?: string;
  maxHeight?: string | number;
  defaultExpanded?: boolean;
};

const defaultNodes: ProjectNode[] = [
  {
    id: "src",
    label: "src/",
    description:
      "Application source code, React components, styles, and page entry points.",
    children: [
      {
        id: "src/components",
        label: "src/components/",
        description: "Reusable UI components used across the site.",
      },
      {
        id: "src/css",
        label: "src/css/",
        description:
          "CSS files and modules for global or component-level styling.",
      },
      {
        id: "src/pages",
        label: "src/pages/",
        description:
          "Route pages and static page content rendered by Docusaurus.",
      },
    ],
  },
  {
    id: "docs",
    label: "docs/",
    description: "Markdown and MDX documentation content organized by topic.",
  },
  {
    id: "blog",
    label: "blog/",
    description: "Blog posts and author/tag metadata for the site blog.",
  },
  {
    id: "static",
    label: "static/",
    description: "Static assets such as images, icons, and downloadable files.",
  },
];

const NodeIcon = ({ folder }: { folder?: boolean }) => (
  <svg
    className={styles.nodeIcon}
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    {folder ? (
      <path d="M1.5 3.5h4.2l1.4 1.6h7.4v7.4H1.5z" />
    ) : (
      <path d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3" />
    )}
  </svg>
);

const sortNodes = (nodes: ProjectNode[]): ProjectNode[] => {
  return [...nodes]
    .map((node) => ({
      ...node,
      children: node.children ? sortNodes(node.children) : undefined,
    }))
    .sort((a, b) => {
      const aIsFolder = !!a.children?.length || a.isFolder;
      const bIsFolder = !!b.children?.length || b.isFolder;

      if (aIsFolder !== bIsFolder) {
        return aIsFolder ? -1 : 1;
      }

      return a.label.localeCompare(b.label);
    });
};

const flattenNodes = (nodes: ProjectNode[], list: ProjectNode[] = []) => {
  for (const node of nodes) {
    list.push(node);
    if (node.children) {
      flattenNodes(node.children, list);
    }
  }
  return list;
};

const createDefaultExpandedState = (
  nodes: ProjectNode[],
  defaultExpanded = false,
  state: Record<string, boolean> = {},
): Record<string, boolean> => {
  for (const node of nodes) {
    if (node.children?.length) {
      state[node.id] = defaultExpanded;
      createDefaultExpandedState(node.children, defaultExpanded, state);
    }
  }
  return state;
};

const ProjectStructureExplorer: React.FC<ProjectStructureExplorerProps> = ({
  nodes = defaultNodes,
  initialSelectedId,
  maxHeight = "520px",
  defaultExpanded = false,
}) => {
  const sortedNodes = useMemo(() => sortNodes(nodes), [nodes]);
  const [selectedId, setSelectedId] = useState(
    initialSelectedId || sortedNodes[0]?.id || "",
  );
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    () => createDefaultExpandedState(sortedNodes, defaultExpanded),
  );
  const allNodes = useMemo(() => flattenNodes(sortedNodes), [sortedNodes]);
  const selectedNode =
    allNodes.find((node) => node.id === selectedId) || allNodes[0];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !(prev[nodeId] ?? defaultExpanded),
    }));
  };

  const renderTree = (treeNodes: ProjectNode[], depth = 0) => {
    return treeNodes.map((node) => {
      const hasChildren = !!node.children?.length;
      const isFolderOnly = node.isFolder && !hasChildren;
      const expanded = hasChildren
        ? (expandedNodes[node.id] ?? defaultExpanded)
        : false;

      return (
        <div
          key={node.id}
          className={`${styles.treeItem} ${depth > 0 ? styles.childItem : ""}`}
          style={{ paddingLeft: depth > 0 ? 16 : 0 }}
        >
          <div className={styles.treeNodeRow}>
            {hasChildren ? (
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => toggleNode(node.id)}
                aria-expanded={expanded}
                aria-label={
                  expanded ? `Collapse ${node.label}` : `Expand ${node.label}`
                }
              >
                {expanded ? "▾" : "▸"}
              </button>
            ) : (
              <span className={styles.togglePlaceholder} />
            )}
            <button
              className={
                node.id === selectedId
                  ? `${styles.nodeButton} ${styles.nodeButtonActive}`
                  : styles.nodeButton
              }
              onClick={() => setSelectedId(node.id)}
              aria-current={node.id === selectedId ? "true" : undefined}
              type="button"
            >
              <NodeIcon folder={hasChildren || isFolderOnly} />
              <div className={styles.nodeText}>
                <span>{node.label}</span>
              </div>
            </button>
          </div>
          {hasChildren && expanded && node.children
            ? renderTree(node.children, depth + 1)
            : null}
        </div>
      );
    });
  };

  const resolvedMaxHeight =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div className={styles.container}>
      <section className={styles.treePanel}>
        <h4 className={styles.panelHeader}>Project structure</h4>
        <div
          className={styles.treeList}
          style={{ maxHeight: resolvedMaxHeight }}
        >
          {renderTree(sortedNodes)}
        </div>
      </section>

      <section className={styles.detailPanel}>
        <h4 className={styles.panelHeader}>Details</h4>
        <div
          className={styles.detailContent}
          style={{ maxHeight: resolvedMaxHeight }}
        >
          <p className={styles.detailTitle}>{selectedNode?.label}</p>
          <p className={styles.detailDescription}>
            {selectedNode?.description || "No description available."}
          </p>
          {selectedNode?.children && selectedNode.children.length > 0 && (
            <div>
              <p className={styles.detailSubhead}>Contains</p>
              <ul className={styles.detailList}>
                {selectedNode.children.map((child) => (
                  <li key={child.id}>
                    <strong>{child.label}</strong> — {child.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectStructureExplorer;
