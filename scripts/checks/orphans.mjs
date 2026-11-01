// Finds doc pages that link to no other note (run after `yarn build`).
// Scope: build/docs/technologies, cloud-computing and llm, minus category pages, ubuntu-server-*
// and elk-stack/*. A page is an orphan when its markdown content (the `theme-doc-markdown`
// container) has no <a href> to a different page under /web-notes/docs/ or /web-notes/projects/.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
const BASE_URL = "/web-notes";
const SECTIONS = ["technologies", "cloud-computing", "llm"];
const TARGETS = [`${BASE_URL}/docs/`, `${BASE_URL}/projects/`];

function pagesUnder(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...pagesUnder(path));
    else if (entry.name === "index.html") found.push(path);
  }
  return found;
}

function normalise(href) {
  return href.split("#")[0].split("?")[0].replace(/\/+$/, "");
}

function hasSourceFile(dir, id) {
  for (const ext of [".md", ".mdx"]) {
    for (const name of [id, `${id}/index`, `${id}/README`, `${id}/${id.split("/").pop()}`]) {
      if (existsSync(join(dir, name + ext))) return join(dir, name + ext);
    }
  }
  return null;
}

function sourceGuess(urlPath) {
  const id = urlPath.replace(`${BASE_URL}/docs/`, "");
  const dir = join(root, "docs");
  const exact = hasSourceFile(dir, id);
  if (exact) return relative(root, exact).split(sep).join("/");
  // folders may use number prefixes (01-foo): match segment by segment
  let current = dir;
  for (const seg of id.split("/")) {
    const next = readdirSync(current).find((n) => n.replace(/^\d+-/, "").replace(/\.mdx?$/, "") === seg);
    if (!next) return `docs/${id} (source not found)`;
    current = join(current, next);
  }
  if (existsSync(current) && !current.endsWith(".md") && !current.endsWith(".mdx")) {
    const idx = readdirSync(current).find((n) => /^(index|README)\.mdx?$/.test(n));
    if (idx) current = join(current, idx);
  }
  return relative(root, current).split(sep).join("/");
}

const buildDocs = join(root, "build", "docs");
if (!existsSync(buildDocs)) {
  console.error("build/docs not found, run `yarn build` first");
  process.exit(1);
}

const orphans = [];
let total = 0;

for (const section of SECTIONS) {
  const sectionDir = join(buildDocs, section);
  if (!existsSync(sectionDir)) continue;
  for (const file of pagesUnder(sectionDir)) {
    const rel = relative(buildDocs, file).split(sep).join("/");
    const urlPath = `${BASE_URL}/docs/${rel.replace(/index\.html$/, "").replace(/\/$/, "")}`;
    if (/(^|\/)(ubuntu-server-[^/]*|elk-stack)(\/|$)/.test(rel)) continue;
    const html = readFileSync(file, "utf8");
    if (/http-equiv="refresh"/i.test(html)) continue; // redirect stub
    const start = html.indexOf("theme-doc-markdown");
    if (start === -1) continue; // not a doc page
    total++;
    const endArticle = html.indexOf("</article>", start);
    const content = html.slice(start, endArticle === -1 ? undefined : endArticle);
    const self = normalise(urlPath);
    const linked = [...content.matchAll(/<a\s[^>]*?href="([^"]*)"/g)].some(([, href]) => {
      if (!TARGETS.some((t) => href.startsWith(t))) return false;
      return normalise(href) !== self;
    });
    if (!linked) orphans.push(`${urlPath}/  ->  ${sourceGuess(urlPath)}`);
  }
}

if (orphans.length) {
  console.error(orphans.sort().join("\n"));
  console.error(`${total} pages, ${orphans.length} orphans`);
  process.exitCode = 1;
} else {
  console.log(`${total} pages, 0 orphans`);
}
