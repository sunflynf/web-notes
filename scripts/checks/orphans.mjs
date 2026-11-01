// Finds doc pages that link to no other note (run after `yarn build`).
// Scope: build/docs/technologies, cloud-computing, llm and devops, minus category pages.
// A page is an orphan when its markdown content (the `theme-doc-markdown`
// container) has no <a href> to a different page under /web-notes/docs/ or /web-notes/projects/.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
const BASE_URL = "/web-notes";
const SECTIONS = ["technologies", "cloud-computing", "llm", "devops"];
const NOT_NOTES = [`${BASE_URL}/docs/tags/`, `${BASE_URL}/docs/category/`];
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

function isRedirectStub(html) {
  return /http-equiv="refresh"/i.test(html);
}

// a link to a redirect stub (moved page) is not a link to a note
function targetIsStub(href) {
  const rel = normalise(href).slice(`${BASE_URL}/docs/`.length);
  const file = join(buildDocs, ...rel.split("/"), "index.html");
  if (!normalise(href).startsWith(`${BASE_URL}/docs/`)) return false; // projects/ pages are not checked
  return existsSync(file) && isRedirectStub(readFileSync(file, "utf8"));
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
const missing = [];
const absent = [];
let total = 0;

for (const section of SECTIONS) {
  const sectionDir = join(buildDocs, section);
  if (!existsSync(sectionDir)) {
    absent.push(section);
    continue;
  }
  for (const file of pagesUnder(sectionDir)) {
    const rel = relative(buildDocs, file).split(sep).join("/");
    const urlPath = `${BASE_URL}/docs/${rel.replace(/index\.html$/, "").replace(/\/$/, "")}`;
    const html = readFileSync(file, "utf8");
    if (isRedirectStub(html)) continue;
    const container = html.match(/class="[^"]*\btheme-doc-markdown\b/);
    if (!container) {
      missing.push(`${urlPath}/  ->  ${sourceGuess(urlPath)}  (no theme-doc-markdown container)`);
      continue;
    }
    total++;
    const start = container.index;
    let end = html.indexOf("theme-doc-footer", start);
    if (end === -1) end = html.indexOf("</article>", start);
    const content = html.slice(start, end === -1 ? undefined : end);
    const self = normalise(urlPath);
    const linked = [...content.matchAll(/<a\s[^>]*?href="([^"]*)"/g)].some(([, href]) => {
      if (!TARGETS.some((t) => href.startsWith(t))) return false;
      if (NOT_NOTES.some((t) => href.startsWith(t))) return false;
      if (targetIsStub(href)) return false;
      return normalise(href) !== self;
    });
    if (!linked) orphans.push(`${urlPath}/  ->  ${sourceGuess(urlPath)}`);
  }
}

if (absent.length || total === 0) {
  console.error(
    absent.length
      ? `section folder missing from build/docs: ${absent.join(", ")}`
      : "no pages found, nothing was checked",
  );
  process.exitCode = 1;
} else if (orphans.length || missing.length) {
  console.error([...orphans.sort(), ...missing].join("\n"));
  console.error(`${total} pages, ${orphans.length} orphans, ${missing.length} without content container`);
  process.exitCode = 1;
} else {
  console.log(`${total} pages, 0 orphans`);
}
