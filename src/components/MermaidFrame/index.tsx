import { useEffect, useRef, type ReactNode } from "react";
import styles from "./styles.module.css";

// Mermaid sets the svg to width 100% and stores the laid-out size as max-width.
// That scales the whole drawing down to the column, which makes the labels
// unreadably small. Copy that laid-out size onto width so the frame scrolls
// sideways instead of shrinking the chart.
function fit(svg: SVGSVGElement) {
  const natural = svg.style.maxWidth;
  if (!natural.endsWith("px")) return;
  if (svg.dataset.fitted === natural) return;
  svg.dataset.fitted = natural;
  svg.style.width = natural;
  svg.style.maxWidth = "none";
  svg.style.height = "auto";
}

export default function MermaidFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const apply = () => {
      root.querySelectorAll("svg").forEach((node) => fit(node));
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.frame}>
      {children}
    </div>
  );
}
