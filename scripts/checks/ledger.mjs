// Checks that every H2 and H3 heading of the four retired Cloud pages appears in the merge ledger.
// The source pages are read from the main branch, because the files are deleted on this branch.
// Usage: node --no-warnings scripts/checks/ledger.mjs   (run from the repo root)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SOURCES = [
  "cloud-platforms.md",
  "cloud-platforms-cheatsheet.mdx",
  "serverless.md",
  "serverless-cheatsheet.mdx",
];
const LEDGER = "docs/_superpowers/ledgers/phase-1-merge-ledger.md";

/** H2 and H3 heading texts outside code fences. */
function headings(text) {
  const result = [];
  let fence = null;
  for (const line of text.split(/\r?\n/)) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) {
      if (!fence) fence = { marker: f[1][0], len: f[1].length };
      else if (f[1][0] === fence.marker && f[1].length >= fence.len) fence = null;
      continue;
    }
    if (fence) continue;
    const h = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (h) result.push(h[2].trim());
  }
  return result;
}

// Ledger rows: | Source page | Section | New location | Note |
const covered = new Map();
for (const line of readFileSync(LEDGER, "utf8").split(/\r?\n/)) {
  if (!line.startsWith("|")) continue;
  const cells = line.split("|").slice(1, -1).map((c) => c.trim());
  if (cells.length < 4) continue;
  if (!covered.has(cells[0])) covered.set(cells[0], new Set());
  covered.get(cells[0]).add(cells[1]);
}

const missing = [];
let total = 0;
for (const file of SOURCES) {
  const src = execFileSync("git", ["show", `main:docs/cloud-computing/${file}`], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  for (const heading of headings(src)) {
    total++;
    if (!covered.get(file)?.has(heading)) missing.push(`${file}: ${heading}`);
  }
}

if (missing.length) {
  console.error(`Missing from the ledger Section column:\n${missing.join("\n")}`);
  console.error(`${missing.length} of ${total} headings missing`);
  process.exit(1);
}
console.log(`ledger OK (${total} headings)`);
