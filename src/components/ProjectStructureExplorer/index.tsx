import React, { useMemo, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
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
  const { colorMode } = useColorMode();
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
          style={{ paddingLeft: depth * 16 }}
        >
          <div className={styles.treeNodeRow}>
            {hasChildren ? (
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => toggleNode(node.id)}
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
              type="button"
            >
              <span className={styles.nodeIcon}>
                {hasChildren || isFolderOnly ? "📁" : "📄"}
              </span>
              <div className={styles.nodeText}>
                <span>{node.label}</span>
              </div>
            </button>
          </div>
          {hasChildren && expanded
            ? renderTree(node.children, depth + 1)
            : null}
        </div>
      );
    });
  };

  const themeClass =
    colorMode === "dark" ? styles.darkTheme : styles.lightTheme;

  const resolvedMaxHeight =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div className={`${styles.container} ${themeClass}`}>
      <section className={styles.treePanel}>
        <div className={styles.panelHeader}>Project structure</div>
        <div
          className={styles.treeList}
          style={{ maxHeight: resolvedMaxHeight }}
        >
          {renderTree(sortedNodes)}
        </div>
      </section>

      <section className={styles.detailPanel}>
        <div className={styles.panelHeader}>Details</div>
        <div
          className={styles.detailContent}
          style={{ maxHeight: resolvedMaxHeight }}
        >
          <h2 className={styles.detailTitle}>{selectedNode?.label}</h2>
          <p className={styles.detailDescription}>
            {selectedNode?.description || "No description available."}
          </p>
          {selectedNode?.children && selectedNode.children.length > 0 && (
            <div>
              <h3>Contains</h3>
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
