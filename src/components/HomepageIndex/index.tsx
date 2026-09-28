import React, { CSSProperties, JSX, useMemo } from "react";
import Link from "@docusaurus/Link";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import { areas, startHere } from "./topics";
import styles from "./styles.module.css";

type DocEntry = { id: string; path: string };

// All published notes of the default plugin, latest version. Generated
// category index pages (ids like "/category/…") are not notes, so skip them.
export function useDocs(): DocEntry[] {
  const plugin = useAllDocsData().default;
  const version =
    plugin?.versions.find((v) => v.isLast) ?? plugin?.versions[0];
  return useMemo(
    () => (version?.docs ?? []).filter((doc) => !doc.id.startsWith("/")),
    [version],
  );
}

// Folder notes (`…/index`) count every doc in the folder; single notes count 1.
const prefixFor = (doc: string, prefix?: string) =>
  prefix ?? (doc.endsWith("/index") ? doc.slice(0, -"index".length) : doc);

export default function HomepageIndex(): JSX.Element {
  const docs = useDocs();

  const rows = useMemo(() => {
    const byId = new Map(docs.map((d) => [d.id, d.path]));
    return areas.map((area) => ({
      ...area,
      topics: area.topics
        .filter((topic) => byId.has(topic.doc))
        .map((topic) => {
          const prefix = prefixFor(topic.doc, topic.prefix);
          return {
            ...topic,
            path: byId.get(topic.doc)!,
            count: docs.filter(
              (d) => d.id === prefix || d.id.startsWith(prefix),
            ).length,
          };
        }),
    }));
  }, [docs]);

  return (
    <dl className={styles.index}>
      {rows.map((area, row) => (
        <div
          key={area.name}
          className={styles.row}
          style={{ "--row": row } as CSSProperties}
        >
          <dt className={styles.area}>{area.name}</dt>
          <dd className={styles.topics}>
            <ul>
              {area.topics.map((topic) => (
                <li key={topic.doc}>
                  <Link
                    to={topic.path}
                    className={`${styles.topic} ${styles[area.marker]}`}
                  >
                    {topic.label}
                  </Link>
                  {topic.count > 1 && (
                    <span
                      className={styles.count}
                      title={`${topic.count} notes`}
                    >
                      {topic.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StartHere(): JSX.Element {
  const docs = useDocs();
  const byId = new Map(docs.map((d) => [d.id, d.path]));
  const items = startHere.filter((item) => byId.has(item.doc));

  return (
    <ul className={styles.startList}>
      {items.map((item) => (
        <li key={item.doc}>
          <Link to={byId.get(item.doc)!} className={styles.startLink}>
            {item.title}
          </Link>
          <p className={styles.startSummary}>{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}
