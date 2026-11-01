import { useId, useState } from "react";
import styles from "./styles.module.css";

type Item = {
  text: string;
  weight: number;
  // While a required item is unchecked, any verdict above the lowest becomes `blockedVerdict`.
  required?: boolean;
};

type Verdict = {
  // Lowest score, as a percentage of the maximum, that earns this verdict.
  min: number;
  text: string;
  tone: "neutral" | "warn" | "good";
};

type WeightedChecklistProps = {
  items: Item[];
  verdicts: Verdict[];
  blockedVerdict?: string;
  emptyText?: string;
};

export default function WeightedChecklist({
  items,
  verdicts,
  blockedVerdict,
  emptyText = "Select the criteria that match your project.",
}: WeightedChecklistProps) {
  const id = useId();
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  const max = items.reduce((sum, item) => sum + item.weight, 0);
  const score = items.reduce((sum, item, i) => sum + (checked[i] ? item.weight : 0), 0);
  const percent = max ? Math.round((score / max) * 100) : 0;
  const missingRequired = items.some((item, i) => item.required && !checked[i]);

  const sorted = [...verdicts].sort((a, b) => b.min - a.min);
  const reached = sorted.find((v) => percent >= v.min) ?? sorted[sorted.length - 1];
  const lowest = sorted[sorted.length - 1];
  const blocked = score > 0 && missingRequired && blockedVerdict && reached !== lowest;

  const text = score === 0 ? emptyText : blocked ? blockedVerdict : reached.text;
  const tone = score === 0 ? "neutral" : blocked ? "warn" : reached.tone;

  return (
    <figure className={styles.checklist}>
      <ul className={styles.items}>
        {items.map((item, i) => (
          <li key={item.text}>
            <label className={styles.item} htmlFor={`${id}-${i}`}>
              <input
                id={`${id}-${i}`}
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((prev) => prev.map((value, j) => (j === i ? !value : value)))}
              />
              <span>
                {item.text}
                {item.required && <span className={styles.required}> (prerequisite)</span>}
              </span>
              <span className={styles.weight} title="Weight">
                ×{item.weight}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <output className={styles.result} data-tone={tone} aria-live="polite">
        <strong className={styles.score}>{percent}%</strong>
        <span>{text}</span>
      </output>
    </figure>
  );
}
