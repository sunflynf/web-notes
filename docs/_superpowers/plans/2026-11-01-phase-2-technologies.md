# Phase 2: Technologies and LLM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move LLM to its own top-level folder, add a web dev roadmap and a layered graph per programming language, turn "several ways to do it" sections into tabs, and give every page that links to no other note a "Related notes" section, without losing content or breaking a link.

**Architecture:**
- The LLM move is a folder rename with 13 redirects in the existing `redirects.ts`.
- The roadmap and the language graphs reuse `LayerFlow`. Task 2 first makes it hold 5–8 layers on mid-width screens.
- Tabs use `@theme/Tabs` inside existing pages; no page is merged or moved.
- A new build-output check (`scripts/checks/orphans.mjs`) defines "links to no other note" and proves the Related-notes work is complete.

**Tech Stack:**
- Docusaurus 3.10.2 (Rspack), React 19, TypeScript 7 (`yarn typecheck`)
- `@theme/Tabs`, `@docusaurus/plugin-client-redirects`
- Node 24 for the check scripts (no new dependencies)

**Spec:** `docs/_superpowers/specs/2026-10-31-cloud-and-technologies-reorg-design.md` (Phase 2 = sections 2.1–2.6, "Visuals", "Release and validation"). Phase 1 shipped as v1.2.0.

## Global Constraints

- No new npm dependencies. `yarn.lock` is unchanged. `yarn install --frozen-lockfile` must still pass.
- Follow `CLAUDE.md` (MDX gotchas, `onBrokenLinks: "throw"`, `trailingSlash: true`, `--wn-*` tokens, `html[data-theme="dark"]`, TypeScript components with CSS Modules). Its Gotchas cover `redirects.ts` and `yarn clear`.
- **Nothing breaks:**
  - every moved URL gets a `redirects.ts` entry whose `to` is a real page;
  - `node --no-warnings scripts/checks/redirects.mjs` passes;
  - the build log has zero `[WARNING]` lines.
- **Nothing is lost:**
  - tabbing only regroups content, so every sentence and code block on a page before a task is still on it after;
  - no page is merged, moved (except LLM) or deleted.
- **Tabs rule:**
  - Tabs only for parallel alternatives, never for sequential steps or required reading.
  - Use `groupId` where the same choice repeats on a page.
  - Never put a heading that is the target of an inbound `#anchor` link inside a tab. Use a bold label inside the tab instead, or keep the heading outside.
- **Facts:** version numbers and claims in new text come from official docs; write `verify` where unconfirmed.
- **Related notes:** only add links, at the end of the host page, never inside an `_`-prefixed partial. Skip the Ubuntu and ELK pages.
- **Pushing:** push, open the PR and tag as `sunflynf` with `GH_TOKEN=$(gh auth token -u sunflynf)` per command; never switch the active `gh` account.
- **Commits:** every commit message ends with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01Kj5b2Q4N2c3HSKxFeiLhuR
  ```
- **Branch:** `claude/phase-2-technologies`, from `main` at the v1.2.0 merge (`f616df70`).

## Review Focus

1. **Mid-width screens** (a laptop with the sidebar open, about 800–1000px wide): 5-column language graphs and the 8-stage roadmap show no horizontal page scroll and no label broken mid-word. Test: Task 2, Step 4.
2. **Sidebar after the LLM move:** LLM shows up as its own top-level section, and Software Technologies no longer lists it. Test: Task 1, Step 6.
3. **Old `#anchor` links into tabbed sections:** a link to a heading that is now in a tab still lands on visible content. Test: Task 6, Step 2 (anchor inventory) and Step 5 (zero anchor warnings).
4. **Synced tabs:** on a page with several tab sets sharing a `groupId`, choosing "Go" (or "Prisma") in one switches the others, and the choice works from the keyboard. Test: Task 6, Step 6.
5. **Related notes duplicated through partials:** a page made of imported `_` partials gets one Related notes section, at the end of the host page. Test: Task 8, Step 4.

---

## File Structure

| Path | Responsibility |
|---|---|
| `docs/llm/**` (moved from `docs/technologies/llm/**`) | LLM notes, a top-level docs category |
| `redirects.ts` (modify) | Adds 13 LLM redirects + 2 category redirects (16 → 31) |
| `src/components/HomepageIndex/topics.ts` (modify) | LLM topic `doc: "llm/index"` |
| `src/components/LayerFlow/index.tsx`, `styles.module.css` (modify) | Holds 5–8 layers at mid widths; list semantics; link affordance |
| `docs/technologies/index.mdx` (create) | Web dev roadmap; `_category_.json` link → this doc |
| `docs/technologies/dotnet/index.mdx` (create) | .NET / C# overview with its graph; category link → this doc |
| `docs/technologies/{js,java,go,python,php,rust}/index.mdx` (modify) | Language graph at the top |
| `docs/technologies/{js,go,java}/concepts/_flow.mdx` (modify) | Control-flow alternatives as tabs |
| `docs/technologies/js/api/orm/index.md`, `js/libraries/react/state/index.md`, `js/be-frameworks/index.md`, `go/frameworks/index.md` (modify) | Tabbed side-by-side of the tools, linking each tool page |
| `docs/technologies/js/be-frameworks/{express,nest}/*` (modify) | Middleware styles as tabs inside each page |
| `scripts/checks/orphans.mjs` (create) | Lists published pages in scope whose content links to no other note |
| `CLAUDE.md` (modify, in Tasks 1 and 8) | `docs/llm/`, the orphans check |

## Language graph contract (Tasks 3–4)

- Every graph is one `<LayerFlow>`, placed directly under the page's H1 and its existing "Quick reference" line, with `ariaLabel="<Language> ecosystem"`.
- **Layers** (in this order, with these exact titles): `Core`, `Runtime`, `Frameworks`, `Data & API`, `Quality`.
- **Core layer:** the first node is `Cheatsheet`, linking to the language's cheatsheet. The others are the language's core concept notes.
- **Gap boxes:** a box with no note yet has no `to` and appears as a gap box. Use at most 3 gaps per graph, and only for things a developer in that ecosystem commonly reaches for.
- **Links:** every `to` is a site URL with a trailing slash (`/docs/technologies/go/frameworks/gin/`), and the build checks it.
- **JavaScript:** TypeScript goes in its Core layer (`ts.md`, `ts-cheatsheet.mdx`). Runtime holds Node.js; Bun and Deno are gaps.
- **Cheatsheets (spec 2.5):** every language already has one (`js/cheatsheet.mdx`, `js/ts-cheatsheet.mdx`, `java/`, `dotnet/`, `go/`, `python/`, `php/` and `rust/cheatsheet.mdx`; checked 2026-11-01), so Phase 2 writes no new cheatsheet. If a graph needs one that doesn't exist, stop and report.

---

### Task 1: Move LLM to `docs/llm/`

**Files:**
- Move: `docs/technologies/llm/**` → `docs/llm/**` (with `git mv`, file by file if the folder move is locked)
- Modify: `redirects.ts`, `src/components/HomepageIndex/topics.ts`, `CLAUDE.md`

**Interfaces:**
- Produces: URLs `/docs/llm/<page>/` for the 13 pages (`index` → `/docs/llm/`), and the redirect count `29 redirects OK`.

- [ ] **Step 1: Append 13 redirects to `redirects.ts`.**
  - One per file: `/docs/technologies/llm/<slug>` → `/docs/llm/<slug>/`.
  - `index.mdx` maps `/docs/technologies/llm` → `/docs/llm/`.
  - The slugs: `agents-mcp`, `cheatsheet`, `cost-latency`, `evals`, `fine-tuning-vs-rag-vs-prompting`, `local-models`, `model-landscape`, `prompt-engineering`, `rag`, `security`, `structured-output-tool-calling`, `tokens-context-sampling`.
- [ ] **Step 2: See the redirect check fail.**
  - Run: `node --no-warnings scripts/checks/redirects.mjs` against the existing `build/`, without rebuilding.
  - Expected: FAIL on the 13 new entries (the sources are still real pages).
- [ ] **Step 3: Move the folder and repoint the homepage entry.**
  - Move the folder.
  - In `topics.ts`, change the LLM topic to `doc: "llm/index"`.
  - Keep `docs/llm/_category_.json` (`"label": "LLM"`, `"position": 99`).
- [ ] **Step 4: Update `CLAUDE.md`.**
  - Add `llm/` (LLM notes) under `docs/` in the structure tree.
  - Add "llm" to the topics listed in Content Organization.
  - Change nothing else.
- [ ] **Step 5: Run the checks.**
  - Run: `yarn clear && yarn build 2>&1 | tee build.log; node --no-warnings scripts/checks/redirects.mjs; grep -c "\[WARNING\]" build.log`
  - Expected: `29 redirects OK` and `0` warnings. Delete `build.log`.
- [ ] **Step 6: Check the sidebar and homepage (Review Focus 2).**
  - Using `yarn serve` and browser automation, assert that the docs sidebar's top level has an "LLM" item and that "Software Technologies" no longer lists "LLM".
  - On `/web-notes/`, assert the homepage index has an "LLM" link with href `/web-notes/docs/llm/`.
- [ ] **Step 7: Commit.** Message: `Refactor LLM notes into their own top-level section with redirects`.

### Task 2: `LayerFlow` for 5–8 layers

**Files:** Modify: `src/components/LayerFlow/index.tsx`, `src/components/LayerFlow/styles.module.css`

**Interfaces:**
- Consumes and keeps unchanged: the props and types from v1.2.0 (`FlowNode {label, to?, detail?, plain?}`, `FlowLayer {title, nodes}`, `LayerFlowProps {ariaLabel, layers, around?, caption?}`).
- Produces: the same API. The Cloud entry map must render as before at ≥997px.

- [ ] **Step 1: Write a temporary test page.**
  - Create `docs/technologies/zz-layerflow-wide-test.mdx`.
  - It renders an 8-layer `LayerFlow` with long labels (for example "Spring Boot · Spring Data JPA") and a 5-layer one.
- [ ] **Step 2: See the overflow.**
  - Run `yarn build && yarn serve`.
  - At 1000×800 and 800×800, assert with browser automation that some label element has `scrollWidth > clientWidth` (a word broken or clipped), or that the page has horizontal scroll.
  - Expected: FAIL for the 8-layer graph at the current fixed columns. Record the measurements.
- [ ] **Step 3: Change `styles.module.css` so the layers wrap.**
  - When the layers can't fit at a readable minimum width (about 9rem per layer), they wrap onto further rows instead of shrinking. The arrow between layers follows the reading order, and the last layer of a row needs no dangling arrow.
  - At ≤640px it stacks as today.
  - Use `overflow-wrap: break-word` (whole words), not `anywhere`.
  - Also fix the deferred v1.2.0 minors:
    - `role="list"` on the `<ol>`;
    - the decorative arrow content as `content: "→" / ""`, keeping the plain-string fallback;
    - React keys `${label}-${i}`;
    - link nodes visibly different from plain nodes at rest, for example a small trailing "↗" or the `--wn-marker-c` left border, using `--wn-*` tokens only.
- [ ] **Step 4: Re-run the checks (Review Focus 1).**
  - At 1000, 800 and 390 wide, in light and dark, assert:
    - `document.documentElement.scrollWidth <= window.innerWidth`;
    - every node label satisfies `scrollWidth <= clientWidth`.
  - At 1280, assert the 5-layer graph sits in one row.
  - Then open `/web-notes/docs/cloud-computing/` at 1280 and assert its map is still one row of 4 layers plus the band.
- [ ] **Step 5: Delete the test page, then run `yarn typecheck && yarn build`.** Expected: 0 warnings.
- [ ] **Step 6: Commit.** Message: `Update LayerFlow to wrap wide graphs and mark link boxes`.

### Task 3: Language graphs: JavaScript, Java, .NET

**Files:**
- Modify: `docs/technologies/js/index.mdx`, `docs/technologies/java/index.mdx`, `redirects.ts`
- Create: `docs/technologies/dotnet/index.mdx`
- Modify: `docs/technologies/dotnet/_category_.json` (`link` → `{ "type": "doc", "id": "technologies/dotnet/index" }`; keep `label`)

**Interfaces:**
- Consumes: the `LayerFlow` API (Task 2) and the **Language graph contract** above.
- Produces: `/docs/technologies/dotnet/` and the redirect `/docs/category/net--c` → `/docs/technologies/dotnet/` (30 total).

- [ ] **Step 1: See the redirect check fail.** Append the `net--c` redirect, then run the redirect check without rebuilding. Expected: FAIL on that entry.
- [ ] **Step 2: Build each graph to the contract, from the notes that exist.**
  - List each language folder and use every note there. For example, JS Frameworks holds React, Next.js, Vue, Angular, Express, NestJS and Fastify, and JS Data & API holds Axios, Prisma, TypeORM, Sequelize, Drizzle, Knex and node-postgres.
  - `dotnet/index.mdx`:
    - H1 ".NET / C#";
    - one line reusing the old category description "ASP.NET Core, C#, Entity Framework, and the broader .NET ecosystem.";
    - the graph;
    - a short list linking every page in the folder.
- [ ] **Step 3: Run the checks.**
  - Run: `yarn build 2>&1 | tee build.log; node --no-warnings scripts/checks/redirects.mjs; grep -c "\[WARNING\]" build.log`
  - Expected: `30 redirects OK` and 0 warnings.
  - Screenshot each graph at 1280 and 800 in light and dark.
- [ ] **Step 4: Commit.** Message: `Add ecosystem graphs for JavaScript, Java and .NET`.

### Task 4: Language graphs: Go, Python, PHP, Rust

**Files:** Modify: `docs/technologies/{go,python,php,rust}/index.mdx`

**Interfaces:** Consumes: the `LayerFlow` API and the **Language graph contract**.

- [ ] **Step 1: Build the four graphs to the contract**, from the notes in each folder. For example, Go Frameworks has Gin, Python has FastAPI, Django and Flask, and PHP has Laravel.
- [ ] **Step 2: Run the checks.** Run `yarn build`. Expected: 0 warnings and `30 redirects OK`. Screenshot at 1280 and 800 in light and dark.
- [ ] **Step 3: Commit.** Message: `Add ecosystem graphs for Go, Python, PHP and Rust`.

### Task 5: Web dev roadmap on the Technologies index

**Files:**
- Create: `docs/technologies/index.mdx`
- Modify: `docs/technologies/_category_.json`, `redirects.ts`

**Interfaces:**
- Consumes: `LayerFlow`.
- Produces: `/docs/technologies/` and the redirect `/docs/category/software-technologies` → `/docs/technologies/` (31 total).

- [ ] **Step 1: See the redirect check fail.** Append the redirect and run the check without rebuilding. Expected: FAIL.
- [ ] **Step 2: Write `index.mdx` and repoint the category.**
  - Frontmatter `title: Software Technologies`.
  - Body, in order:
    - the old category description "Summarize anything. Maybe I can't remember all of this.", kept as the line under the H1;
    - `<LayerFlow ariaLabel="Web developer roadmap">` with 8 layers titled `1 Web basics`, `2 JavaScript / TypeScript`, `3 Frontend framework`, `4 Backend language`, `5 Databases`, `6 APIs and auth`, `7 Cloud`, `8 DevOps`.
  - Layer contents:
    - Layer 4 lists each language index (JS/Node, Java, C#, Go, Python, PHP, Rust).
    - Layer 6 links the Key Notes REST, API versioning and authentication pages.
    - Layer 7 links `/docs/cloud-computing/`.
    - Layer 8 has one gap box, "DevOps (coming later)".
  - Under the map, a short "How to use this" paragraph.
  - Set `_category_.json` `link` to `{ "type": "doc", "id": "technologies/index" }`. Keep its `label` and `description` keys if the doc link type allows them; otherwise drop them and record that in the commit message.
- [ ] **Step 3: Run the checks.**
  - Run: `yarn build 2>&1 | tee build.log; node --no-warnings scripts/checks/redirects.mjs; grep -c "\[WARNING\]" build.log`
  - Expected: `31 redirects OK` and 0 warnings.
  - Screenshot at 1280, 800 and 390.
- [ ] **Step 4: Commit.** Message: `Add web developer roadmap to the Software Technologies index`.

### Task 6: Tabs in the control-flow partials

**Files:** Modify: `docs/technologies/js/concepts/_flow.mdx`, `docs/technologies/go/concepts/_flow.mdx`, `docs/technologies/java/concepts/_flow.mdx`

- [ ] **Step 1: Snapshot the content.**
  - Save each file's text with markup stripped (code blocks and prose) to a scratch copy.
  - After the change, a diff of the stripped text, ignoring whitespace and the new Tabs/TabItem lines, must show nothing removed.
- [ ] **Step 2: Inventory inbound anchors (Review Focus 3).**
  - Grep `docs/`, `projects/` and `blog/` for links to `#…` anchors on the host pages (`js/index`, `go/index`, `java/index`) whose headings come from these partials.
  - List them in the report.
  - Those headings stay outside tabs, or the links are repointed to a heading that stays.
- [ ] **Step 3: Convert each partial.**
  - **JS:** Conditions get tabs `if / else`, `ternary`, `switch`, `logical (&&, ||, ??)`. Loops get `for`, `for...of`, `for...in`, `while / do...while`, `array methods`.
  - **Go:** Conditional gets `if`, `switch`. Loops get `for (classic)`, `for (while-style)`, `for range`.
  - **Java:** `if / else`, `switch` (statement vs expression where the note has both), and Loop gets `for`, `enhanced for`, `while / do-while`, `break / continue`.
  - **Only regroup existing content.** A tab label with no matching content in the file is not created. Exception handling stays as it is (sequential).
  - Use `groupId` per concept, for example `js-loops`.
- [ ] **Step 4: Check the snapshot.** Run Step 1's comparison. Expected: no removed content.
- [ ] **Step 5: Build.** Run `yarn build`. Expected: 0 warnings, so no broken anchors.
- [ ] **Step 6: Check the tabs in the browser (Review Focus 4).**
  - On `/web-notes/docs/technologies/js/`, click the `for...of` tab and assert its panel is visible.
  - Press ArrowRight on the focused tab and assert the next tab is selected.
  - Repeat in dark mode.
- [ ] **Step 7: Commit.** Message: `Update control-flow notes with tabs for each way to loop and branch`.

### Task 7: Tool side-by-sides and middleware tabs

**Files:**
- Modify: `docs/technologies/js/api/orm/index.md`, `docs/technologies/js/libraries/react/state/index.md`, `docs/technologies/js/be-frameworks/index.md`, `docs/technologies/go/frameworks/index.md`
- Modify: the Express and NestJS pages that describe middleware (`js/be-frameworks/express/index.mdx`, `js/be-frameworks/nest/index.md`, `nest/in-depth.mdx`, whichever hold the middleware sections)
- Rename to `.mdx` only if a `.md` file needs JSX. Docusaurus keeps the same URL for `.md` → `.mdx`, so no redirect is needed; confirm it with the build.

- [ ] **Step 1: Snapshot and inventory anchors**, as in Task 6, Steps 1–2, for every file listed.
- [ ] **Step 2: Add a tabbed side-by-side to each index page.**
  - Add a `## Side by side` section showing the same small task in each tool, one tab per tool, each ending with a link to that tool's page:
    - **ORM index:** one query ("find a user by email with their posts") in Prisma, Drizzle, TypeORM, Sequelize, Knex and node-postgres. Group them as `ORM` vs `Query builder / driver` in the prose above the tabs.
    - **React state index:** one counter in each state approach the folder covers (React Redux, Redux Toolkit, Immer), plus one data fetch in RTK Query.
    - **JS backend frameworks index:** one route with a JSON response in Express, Fastify and NestJS.
    - **Go frameworks index:** the same in `net/http` and Gin.
  - Code must match each tool's current official docs; write `verify` where unconfirmed.
  - Existing tables and text stay, above the new section.
- [ ] **Step 3: Middleware tabs.** On the Express and NestJS pages, wherever several middleware styles are shown (for example application-level, router-level, error-handling; or Nest class middleware, functional middleware, guards and interceptors), group them into tabs within that page.
- [ ] **Step 4: Run the checks.** Run the snapshot comparison (no removed content), then `yarn build` (0 warnings). In the browser, check one tab set per page.
- [ ] **Step 5: Commit.** Message: `Add tool side-by-sides and middleware tabs to framework and ORM notes`.

### Task 8: Orphans check and Related notes

**Files:**
- Create: `scripts/checks/orphans.mjs`
- Modify: every page it reports, and `CLAUDE.md` (Testing: add `orphans.mjs`)

**Interfaces:**
- Produces: `node --no-warnings scripts/checks/orphans.mjs` reads `build/` and prints `<N> pages, 0 orphans`, exiting 0. Otherwise it lists each orphan's source path and exits 1 via `process.exitCode`.
- **Scope:** built doc pages under `build/docs/technologies/`, `build/docs/cloud-computing/` and `build/docs/llm/`.
  - Exclude `build/docs/category/`, the `ubuntu-server-*` pages and `elk-stack/*`.
- **Orphan:** the page's markdown content (the `theme-doc-markdown` container) has no `<a href>` that points to another page under `/web-notes/docs/` or `/web-notes/projects/`. Links to the page itself, in-page `#` links and external links don't count.

- [ ] **Step 1: Write `orphans.mjs` and run it.**
  - Run: `yarn build && node --no-warnings scripts/checks/orphans.mjs`
  - Expected: FAIL, listing the orphans. The spec counted 54 before Phase 1 and 2; record the actual N.
- [ ] **Step 2: Add Related notes to every reported page.**
  - Add `## Related notes` at the end of each reported page, before any existing footer-like section, with 2–5 links to the genuinely closest notes:
    - a framework page links to its language cheatsheet, its ORM or database note, and the cloud block where it is deployed;
    - a database page links to Cloud → Databases.
  - Use relative file links within `docs/`, and URL links to `projects/`.
- [ ] **Step 3: Run the check again.** Run `yarn build && node --no-warnings scripts/checks/orphans.mjs`. Expected: `<N> pages, 0 orphans`, and 0 `[WARNING]` lines.
- [ ] **Step 4: Check for duplicates (Review Focus 5).**
  - `grep -rln "## Related notes" docs --include="_*"` must print nothing.
  - For every host page that imports partials, the built HTML has exactly one `id="related-notes"`.
- [ ] **Step 5: Update `CLAUDE.md` and commit.**
  - In Testing, add `orphans.mjs` to the post-build checks, with one line saying what it checks.
  - Commit with the message `Add Related notes to pages with no links and an orphan check`.

### Task 9: Visual check, PR, merge, tag v1.3.0

**Files:** none (verification and release).

- [ ] **Step 1: Check the pages visually.**
  - Pages: `/web-notes/docs/technologies/`, `/js/`, `/dotnet/`, `/go/`, `/web-notes/docs/llm/`, and one tabbed page (`/js/`).
  - Using `yarn serve` and browser automation, screenshot each in light and dark, and at 1280, 800 and 390.
  - Confirm graphs, roadmap and tabs are readable, with no horizontal scroll.
- [ ] **Step 2: Check the old URLs.** Open the 15 new `from` URLs and assert each lands on its `to` page with the expected `<h1>`.
- [ ] **Step 3: Run the full check set.**
  - `yarn typecheck`, then `yarn build` with 0 `[WARNING]`.
  - Then `redirects.mjs` (`31 redirects OK`), `cloud-blocks.mjs` (8 OK), `ledger.mjs` (OK) and `orphans.mjs` (0 orphans).
- [ ] **Step 4: Push and open the PR as `sunflynf`.**
  - Title: `Add v1.3.0 Technologies roadmap, language graphs, tabs and Related notes`.
  - Body:
    - summary;
    - redirect table (15 new);
    - the orphan count before and after;
    - validation output;
    - screenshot file names;
    - the `verify` items;
    - spec and plan paths;
    - the attribution footer.
- [ ] **Step 5: Wait for the checks.** Run `gh pr checks <n> --watch`. Expected: Test deployment (with its redirect check), CodeQL and Analyze all pass.
- [ ] **Step 6: Merge and tag, only after the owner says go.**
  - Merge with `gh pr merge <n> --merge --match-head-commit <sha>`.
  - Tag the merge commit `v1.3.0` ("v1.3.0: Technologies roadmap, language graphs, tabs and Related notes") and push the tag.
  - Watch the Pages deploy.
  - `curl` `/web-notes/docs/llm/` and `/web-notes/docs/technologies/` on the live site and expect 200.
