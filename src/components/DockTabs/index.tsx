import React, { Fragment, FC, ReactElement, useState } from "react";
import styles from "../../css/dock-tabs.module.css";

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

  return (
    <nav className={styles["dock-tabs-container"]}>
      <div className={styles["dock-tabs-bar"]}>
        {tabs.map((tab) => (
          <span
            className={`${styles["dock-tabs-bar-item"]} ${
              tab.key === activeTab && styles["active"]
            }`}
            key={tab.key}
            title={tab.title || tab.label}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className={styles["dock-tabs-content"]}>
        {tabs.map(
          (tab) => tab.key === activeTab && <Fragment>{tab.content}</Fragment>
        )}
      </div>
    </nav>
  );
};

export default DockTabs;
