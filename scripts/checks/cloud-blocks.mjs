// Checks the Cloud building-block pages against the Block page contract.
// Usage: node scripts/checks/cloud-blocks.mjs [slug...]   (no slugs = all 8 blocks)
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DIR = "docs/cloud-computing";

const BLOCKS = [
  { slug: "foundations", position: 1, kind: "foundations", full: [], short: [] },
  { slug: "identity", position: 2, kind: "full", full: ["iam-users", "iam-roles", "iam-policies"], short: [] },
  { slug: "compute", position: 3, kind: "full", full: ["ec2", "lambda"], short: ["ecs-fargate"] },
  { slug: "storage", position: 4, kind: "full", full: ["s3"], short: ["ebs", "efs"] },
  { slug: "databases", position: 5, kind: "full", full: ["rds"], short: ["aurora", "dynamodb"] },
  { slug: "networking", position: 6, kind: "full", full: ["vpc", "cloudfront"], short: ["route53"] },
  { slug: "messaging", position: 7, kind: "light", full: [], short: ["sqs", "sns", "eventbridge"] },
  { slug: "monitoring", position: 8, kind: "light", full: [], short: ["cloudwatch", "xray"] },
];

const FOUNDATIONS_H2 = [
  "Core ideas",
  "Pricing",
  "Set up the AWS CLI",
  "Azure and GCP quick reference",
  "Connects to",
];
const BLOCK_H2 = ["Decision chart", "Compare the options", "Set it up on AWS", "Connects to"];
const FRONTMATTER_KEYS = ["title", "sidebar_label", "sidebar_position", "description"];
const TABLE_HEADER = ["Option", "You manage", "Scales", "Cost shape", "AWS", "Azure", "GCP"];
const TAB_VALUES = ["console", "cli", "terraform"];
// Placeholder for a link to a block page that does not exist yet: Name {/* TODO-LINK ./identity.mdx#iam-roles */}
const TODO_LINK = /\{\/\*\s*TODO-LINK\s+(\S+?)\s*\*\/\}/g;
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// A TODO-LINK must point at a known block page, and its #anchor must be one of that block's ids
function todoLinkProblem(target) {
  const m = target.match(/^\.\/([a-z]+)\.mdx(?:#([\w-]+))?$/);
  if (!m) return `TODO-LINK target ${target} must look like ./<block>.mdx or ./<block>.mdx#<id>`;
  const block = BLOCKS.find((b) => b.slug === m[1]);
  if (!block) return `TODO-LINK target ${target} is not a known block page (${BLOCKS.map((b) => b.slug).join(", ")})`;
  if (m[2]) {
    const allowed = block.kind === "foundations" ? FOUNDATIONS_H2.map(slugify) : [...block.full, ...block.short];
    if (!allowed.includes(m[2])) return `TODO-LINK anchor #${m[2]} is not an id of ${block.slug} (${allowed.join(", ")})`;
  }
  return null;
}
const targetFile = (href) => {
  const file = href.replace(/#.*$/, "");
  return resolve(DIR, file);
};

/** Split text into lines, tagging each with whether it sits inside a code fence. */
function scan(body) {
  const lines = body.split(/\r?\n/);
  let fence = null;
  return lines.map((text, i) => {
    const m = text.match(/^\s*(```+|~~~+)\s*([\w-]*)/);
    let inCode = fence !== null;
    let fenceLang = fence ? fence.lang : null;
    if (m) {
      if (!fence) {
        fence = { marker: m[1][0], len: m[1].length, lang: m[2] };
        inCode = true;
        fenceLang = m[2];
      } else if (m[1][0] === fence.marker && m[1].length >= fence.len && !m[2]) {
        fence = null;
        inCode = true; // closing line still belongs to the fence
      }
    }
    return { n: i + 1, text, inCode, fenceLang };
  });
}

function checkBlock(block) {
  const errors = [];
  const notes = [];
  const file = resolve(DIR, `${block.slug}.mdx`);
  if (!existsSync(file)) return { errors: [`${block.slug}: file missing`], notes };
  const src = readFileSync(file, "utf8");
  const err = (msg) => errors.push(`${block.slug}: ${msg}`);

  // Frontmatter
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fm) {
    err("frontmatter missing");
    return { errors, notes };
  }
  const fmKeys = [];
  const fmVals = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (m) {
      fmKeys.push(m[1]);
      fmVals[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  for (const key of FRONTMATTER_KEYS) {
    if (!fmKeys.includes(key)) err(`frontmatter key "${key}" missing`);
    else if (!fmVals[key]) err(`frontmatter key "${key}" is empty`);
  }
  if (fmVals.sidebar_position !== undefined && Number(fmVals.sidebar_position) !== block.position) {
    err(`sidebar_position is ${fmVals.sidebar_position}, expected ${block.position}`);
  }

  const body = src.slice(fm[0].length);
  const lines = scan(body);
  const prose = lines.filter((l) => !l.inCode);

  // Headings
  const h1 = prose.filter((l) => /^#\s+\S/.test(l.text));
  const h2 = prose.filter((l) => /^##\s+\S/.test(l.text));
  const h3 = prose.filter((l) => /^###\s+\S/.test(l.text));
  if (h1.length !== 1) err(`expected exactly one H1, found ${h1.length}`);

  const h2Names = h2.map((l) => l.text.replace(/^##\s+/, "").trim());
  const expectedH2 = block.kind === "foundations" ? FOUNDATIONS_H2 : BLOCK_H2;
  if (JSON.stringify(h2Names) !== JSON.stringify(expectedH2)) {
    err(`H2s are [${h2Names.join(" | ")}], expected [${expectedH2.join(" | ")}]`);
  }

  // One-line paragraph between the H1 and the first H2
  if (h1.length === 1) {
    const from = h1[0].n;
    const to = h2.length ? h2[0].n : lines.length + 1;
    const intro = prose.filter(
      (l) => l.n > from && l.n < to && l.text.trim() && !/^(import|export)\s/.test(l.text),
    );
    if (intro.length !== 1) err(`expected a one-line paragraph under the H1, found ${intro.length} non-blank lines`);
  }

  // Tabs imports
  const usesTabs = /<Tabs[\s>]/.test(body);
  if (usesTabs) {
    if (!/^import Tabs from "@theme\/Tabs";/m.test(body)) err('missing import Tabs from "@theme/Tabs";');
    if (!/^import TabItem from "@theme\/TabItem";/m.test(body)) err('missing import TabItem from "@theme/TabItem";');
  }

  if (block.kind === "foundations") {
    if (lines.some((l) => l.inCode && l.fenceLang === "mermaid")) err("Foundations must not have a chart");
  } else {
    // Section ranges
    const sectionOf = (name) => {
      const start = h2.find((l) => l.text.replace(/^##\s+/, "").trim() === name);
      if (!start) return null;
      const next = h2.find((l) => l.n > start.n);
      return { start: start.n, end: next ? next.n : lines.length + 1 };
    };
    const inSection = (sec) => lines.filter((l) => sec && l.n > sec.start && l.n < sec.end);

    // Collect explicit heading ids
    const ids = new Map(); // id -> heading line n
    for (const l of prose) {
      const m = l.text.match(/^#{2,4}\s+.*\{#([\w-]+)\}\s*$/);
      if (m) ids.set(m[1], l.n);
    }

    // Decision chart
    const chart = sectionOf("Decision chart");
    const chartLines = inSection(chart);
    const mermaidLines = chartLines.filter((l) => l.inCode && l.fenceLang === "mermaid");
    const fences = chartLines.filter((l) => /^\s*```+\s*mermaid/.test(l.text));
    if (fences.length !== 1) err(`Decision chart must have exactly one mermaid block, found ${fences.length}`);
    else {
      const firstDiagram = mermaidLines.find((l) => l.text.trim() && !/^\s*```/.test(l.text));
      if (!firstDiagram || !/^flowchart\s+TD\b/.test(firstDiagram.text.trim())) err("mermaid block must start with `flowchart TD`");
    }
    const clicks = [];
    for (const l of mermaidLines) {
      const m = l.text.match(/^\s*click\s+(\w+)\s+"#([\w-]+)"/);
      if (m) clicks.push({ node: m[1], id: m[2] });
    }
    if (clicks.length === 0) err("mermaid block has no `click <Node> \"#id\"` lines");
    for (const c of clicks) {
      if (!ids.has(c.id)) err(`mermaid click ${c.node} -> "#${c.id}" has no matching {#${c.id}} heading id`);
    }
    // Every required service of the block must be reachable from the chart
    for (const id of [...block.full, ...block.short]) {
      if (!clicks.some((c) => c.id === id)) err(`Decision chart has no \`click <Node> "#${id}"\` line for service ${id}`);
    }
    // End boxes that name a service: a `click` must exist for each `class ... service`-less
    // node is not detectable; the service ids that appear in the chart are validated above.

    // Compare table
    const cmp = sectionOf("Compare the options");
    const tableHeader = inSection(cmp).find((l) => !l.inCode && /^\s*\|/.test(l.text));
    if (!tableHeader) err("Compare the options has no table");
    else {
      const cols = tableHeader.text.split("|").slice(1, -1).map((c) => c.trim());
      if (JSON.stringify(cols) !== JSON.stringify(TABLE_HEADER)) {
        err(`table columns are [${cols.join(" | ")}], expected [${TABLE_HEADER.join(" | ")}]`);
      }
    }

    // Setup H3s
    const setup = sectionOf("Set it up on AWS");
    if (setup) {
      const setupH3 = h3.filter((l) => l.n > setup.start && l.n < setup.end);
      for (const l of setupH3) {
        if (!/\{#[\w-]+\}\s*$/.test(l.text)) err(`line ${l.n}: H3 "${l.text}" has no explicit {#id}`);
      }
      const required = [...block.full, ...block.short];
      for (const id of required) {
        const line = ids.get(id);
        if (!line || !setupH3.some((l) => l.n === line)) err(`missing "### ... {#${id}}" under Set it up on AWS`);
      }
      // Section body for each H3
      const nextHeading = (n) => {
        const nx = prose.find((l) => l.n > n && /^#{1,3}\s/.test(l.text));
        return nx ? nx.n : lines.length + 1;
      };
      for (const id of block.full) {
        const hl = ids.get(id);
        if (!hl) continue;
        const sec = lines.filter((l) => l.n > hl && l.n < nextHeading(hl));
        const firstReal = sec.find((l) => l.text.trim());
        if (!firstReal || !/^<Tabs\s+groupId="aws-setup"\s*>\s*$/.test(firstReal.text.trim())) {
          err(`${id}: <Tabs groupId="aws-setup"> must come directly under the H3`);
          continue;
        }
        const closeIdx = sec.findIndex((l) => l.n > firstReal.n && /^\s*<\/Tabs>/.test(l.text));
        if (closeIdx === -1) {
          err(`${id}: <Tabs> is never closed`);
          continue;
        }
        const tabBlock = sec.filter((l) => l.n > firstReal.n && l.n < sec[closeIdx].n);
        const vals = [];
        for (const l of tabBlock) {
          const m = l.text.match(/^\s*<TabItem\b[^>]*\bvalue="([\w-]+)"/);
          if (m && !l.inCode) vals.push(m[1]);
        }
        if (JSON.stringify(vals) !== JSON.stringify(TAB_VALUES)) {
          err(`${id}: TabItem values are [${vals.join(", ")}], expected exactly [${TAB_VALUES.join(", ")}]`);
        }
        for (const [v, label] of [["console", "Console"], ["cli", "CLI"], ["terraform", "Terraform"]]) {
          if (!new RegExp(`<TabItem\\b[^>]*value="${v}"[^>]*label="${label}"|<TabItem\\b[^>]*label="${label}"[^>]*value="${v}"`).test(tabBlock.map((l) => l.text).join("\n"))) {
            err(`${id}: TabItem "${v}" must be labelled "${label}"`);
          }
        }
      }
      for (const id of block.short) {
        const hl = ids.get(id);
        if (!hl) continue;
        const sec = lines.filter((l) => l.n > hl && l.n < nextHeading(hl));
        if (sec.some((l) => !l.inCode && /<Tabs[\s>]/.test(l.text))) err(`${id}: short service must not use tabs`);
        const bullets = sec.filter((l) => !l.inCode && /^[-*]\s+\S/.test(l.text)).length;
        if (bullets < 3 || bullets > 6) err(`${id}: short service needs 3-6 bullet notes, found ${bullets}`);
      }
    }
  }

  // Connects to
  const conn = h2.find((l) => l.text.replace(/^##\s+/, "").trim() === "Connects to");
  if (conn) {
    const next = h2.find((l) => l.n > conn.n);
    const secText = lines
      .filter((l) => l.n > conn.n && (!next || l.n < next.n))
      .map((l) => l.text)
      .join("\n");
    const realLinks = [...secText.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]);
    const todoLinks = [...secText.matchAll(TODO_LINK)].map((m) => m[1]);
    const links = [...realLinks, ...todoLinks];
    if (links.length < 3) err(`Connects to needs at least 3 links, found ${links.length}`);
    const outside = links.filter((h) => /^\.\.\//.test(h));
    if (outside.length < 1) err("Connects to needs at least 1 link to a note outside docs/cloud-computing/ (../...)");
    const otherBlocks = BLOCKS.filter((b) => b.slug !== block.slug);
    const blockLinks = links.filter((h) => otherBlocks.some((b) => new RegExp(String.raw`^\./${b.slug}\.mdx(#[\w-]+)?$`).test(h)));
    if (blockLinks.length < 1) err("Connects to needs at least 1 link to another block page (./<block>.mdx)");
    for (const h of realLinks) {
      const m = h.match(/^(?:\.\/|\.\.\/)([^#]+\.mdx?)(#.*)?$/);
      if (m && !existsSync(targetFile(h))) err(`Connects to link ${h} points to a missing file`);
    }
  }

  // TODO-LINK placeholders: fine while the target file is missing, a violation once it exists
  for (const l of prose) {
    for (const m of l.text.matchAll(TODO_LINK)) {
      const problem = todoLinkProblem(m[1]);
      if (problem) err(`line ${l.n}: ${problem}`);
      else if (existsSync(targetFile(m[1]))) err(`TODO-LINK to existing page ${m[1]} — convert to a real link`);
    }
  }

  return { errors, notes };
}

const requested = process.argv.slice(2);
const known = BLOCKS.map((b) => b.slug);
const unknown = requested.filter((s) => !known.includes(s));
if (unknown.length) {
  console.error(`unknown slug(s): ${unknown.join(", ")} (known: ${known.join(", ")})`);
  process.exit(2);
}
const targets = requested.length ? BLOCKS.filter((b) => requested.includes(b.slug)) : BLOCKS;

let failed = false;
for (const block of targets) {
  const { errors, notes } = checkBlock(block);
  if (errors.length) {
    failed = true;
    console.error(errors.join("\n"));
  } else {
    console.log(`${block.slug}: OK${notes.length ? ` (note: ${notes.join("; ")})` : ""}`);
  }
}
process.exit(failed ? 1 : 0);
