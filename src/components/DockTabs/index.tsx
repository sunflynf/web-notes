import React, {
  FC,
  KeyboardEvent,
  ReactElement,
  useId,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

type DockTab = {
  key: string;
  label: string;
  title?: string; // Explain when hover
  content: string | ReactElement;
};

type DockTabsProps = {
  tabs: DockTab[];
};

const DockTabs: FC<DockTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const active = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActiveTab(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(moves[event.key]);
    }
  };

  if (!active) return null;

  return (
    <div className={styles.dock}>
      <div className={styles.bar} role="tablist" aria-orientation="vertical">
        {tabs.map((tab, index) => {
          const selected = tab.key === active.key;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              title={tab.title || tab.label}
              className={styles.tab}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.key}`}
        tabIndex={0}
      >
        {active.content}
      </div>
    </div>
  );
};

export default DockTabs;
