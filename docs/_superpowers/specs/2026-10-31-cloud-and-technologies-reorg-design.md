# Cloud Computing and Technologies reorganisation: design

Date: 2026-10-31 · Status: draft for approval · Site: <https://sunflynf.github.io/web-notes/> (Docusaurus 3.10, repo `sunflynf/web-notes`)

> This file lives under a `_`-prefixed folder, so Docusaurus does not publish it.

## Why

The Cloud Computing section started as a platform comparison and grew while the owner learned AWS. It is now a pile of facts with no backbone:

- There is no page per core building block (compute, storage, networking and so on).
- What the owner knows about AWS lives only as rows in comparison tables.
- Pages barely link to each other. Across Technologies and Cloud, 54 of 153 pages link to no other note.

When working on a real project, the owner opens the notes with one question first, **"which service should I use for this?"**, then a second, **"how do I set it up (on AWS)?"** The notes should answer both in that order, and show how the pieces connect.

Technologies does not need restructuring. It needs better navigation (a roadmap and per-language graphs) and tabs where a section shows several ways to do the same thing.

## Goals

1. Rebuild Cloud Computing around core building blocks, each answering "which service" and then "how to set it up on AWS", and linked to each other.
2. Give Cloud an entry page with a project architecture map that links into the blocks.
3. Move Projects to its own section at `/projects/` with a header tab.
4. Move LLM out of Technologies into its own top-level folder.
5. Add a web dev roadmap to the Technologies index and a layered graph to each programming-language index.
6. Turn "several ways to do it" sections in Technologies into tabs.
7. Give every page that links to no other note a short "Related notes" line, so links go out of those pages as well as into them.

## Non-goals

- Restructuring the Technologies folder tree. It stays as it is, apart from the LLM move.
- Docker, Nginx, the Ubuntu server pages and ELK. They move to a later **DevOps** phase. Until then they stay where they are, and the new pages may link to them.
- Motion graphics and animated "dev concepts". These come in a later phase. This work uses static diagrams only.
- Writing a cheatsheet for every cloud block. Each block page is itself the quick reference.
- Azure or GCP setup sections in the block pages. In the blocks, those providers appear only in decision charts and comparison tables. Their existing reference notes are kept in one place: the Foundations page (see 1.3).

## Anti-goals (a failure even if it builds)

- **A broken link anywhere.** That includes old URLs that people or search engines have, links inside diagrams, and `#anchor` links to headings.
- **Lost content.** Every fact on a page that is merged, moved or put into tabs must land somewhere in the new pages, or be listed in the PR as deliberately dropped, with the reason. Nothing disappears silently.

## Constraints

- Follow `CLAUDE.md`:
  - `.md` is compiled as MDX, so no bare `<`, `{` or `}` in prose.
  - `_`-prefixed files and folders are excluded from the build.
  - `onBrokenLinks: "throw"` and `trailingSlash: true` are set.
  - Use the `--wn-*` design tokens.
  - Write components in TypeScript, in self-contained folders with CSS Modules.
  - Dark-mode overrides use `html[data-theme="dark"]`.
  - `yarn typecheck` and `yarn build` must both pass.
- Do not add new npm dependencies. React, Mermaid (`@docusaurus/theme-mermaid`), `@theme/Tabs`, and `@docusaurus/plugin-client-redirects` (already configured in `docusaurus.config.ts`) cover everything.
- Every page that moves or merges gets a redirect from its old URL, using the existing `plugin-client-redirects` config.
- Pushes go to `sunflynf/web-notes` through the GitHub CLI on the owner's machine (the `sunflynf` account). The Claude GitHub App has no write access to this repo.

---

## Phase 1: Cloud Computing and Projects

### 1.1 Cloud entry page: architecture map (owner chose map, option A)

Replace the generated index of `docs/cloud-computing/` with `docs/cloud-computing/index.mdx`, and point `_category_.json` → `link` at that doc. The page has three parts, in this order:

1. **Architecture map.** A typical web project on AWS:
   - The request path: User → **CloudFront** → **S3** (static files) and **EC2 / Lambda** (app) → **RDS**.
   - Drawn around everything: **IAM**, **VPC** and **CloudWatch**.

   Every box links to its building-block page. Each box shows the AWS service and the block's name (for example "CloudFront · Networking").
2. **Service-mapping table** (AWS / Azure / GCP), moved from `cloud-platforms-cheatsheet.mdx`.
3. **Platform comparison** (pricing, free tier, strengths), moved from `cloud-platforms.md`.

### 1.2 Building-block pages (owner chose decision chart first, option B)

Create these files in `docs/cloud-computing/`, ordered with `sidebar_position` in this learning order: `foundations`, `identity`, `compute`, `storage`, `databases`, `networking`, `messaging`, `monitoring`.

Every block page uses the same section order:

1. **One line** on what the block is. Example: "Compute: where your code runs."
2. **Decision chart.** A small flowchart of the 2–4 questions that actually separate the options (for example "Need OS access?", "Runs longer than 15 minutes or always on?"). Each end box names an AWS service and links to that service's section further down the same page.
3. **Comparison table.** One table with every option: what you manage, how it scales, the rough shape of the cost, and the AWS / Azure / GCP names on one row.
4. **Set it up on AWS.** One section per AWS service named in the chart:
   - Each section has **Console / CLI / Terraform** tabs with short numbered steps.
   - Each gotcha sits under the step it belongs to, not in a separate list at the end.
5. **Connects to.** Links to related blocks and to existing notes. Examples:
   - Compute links to Identity (IAM roles), Networking (VPC, security groups), Monitoring, and the Docker note.
   - Databases links to the database notes in Technologies.

How deep each block goes depends on the services the owner has actually used (EC2, S3, RDS, Lambda, IAM, CloudFront):

| Block | Depth | AWS services with full setup sections |
|---|---|---|
| Foundations | short | none. Covers regions and AZs, the account and organization model, shared responsibility, the pricing model, and setting up the CLI |
| Identity | full | IAM (users, roles, policies, instance profiles and execution roles) |
| Compute | full | EC2, Lambda. ECS on Fargate appears in the chart and table with short setup notes |
| Storage | full | S3. EBS and EFS appear in the chart and table with short notes |
| Databases | full | RDS. DynamoDB and Aurora appear in the chart and table with short notes |
| Networking | full | CloudFront, plus the VPC basics that EC2 and RDS need (subnets, security groups). Route 53 gets short notes |
| Messaging | light | SQS, SNS and EventBridge get chart, table and short notes only |
| Monitoring | light | CloudWatch (logs, metrics, alarms) and X-Ray get chart, table and short notes only |

### 1.3 What happens to the existing Cloud pages

| Current page | Fate | Redirect from old URL to |
|---|---|---|
| `cloud-platforms.md` | Comparison table moves to the entry page. Its notes go to Foundations (pricing). | `/docs/cloud-computing/` |
| `cloud-platforms-cheatsheet.mdx` | Service mapping moves to the entry page. Core concepts go to Foundations and Identity. AWS CLI commands go to Foundations (CLI setup) and the matching blocks. AWS gotchas, patterns and "What's new" go to the matching blocks. **All Azure and GCP material that isn't a mapping or comparison row** goes to a closing **"Azure and GCP quick reference"** section on the Foundations page: the `az` and `gcloud` command blocks, CLI version and "What's new" notes, Azure and GCP gotchas (for example global storage-account names, resource-group deletion) and free-tier terms. It is kept as written, apart from fact checks. | `/docs/cloud-computing/` |
| `serverless.md` | Becomes the **Functions** option inside Compute (concepts, pros and cons). | `/docs/cloud-computing/compute/` |
| `serverless-cheatsheet.mdx` | Lambda limits, runtimes, commands and gotchas go into Compute → Lambda. The Serverless Framework, Azure Functions and Cloud Run functions notes stay as part of the Functions option. | `/docs/cloud-computing/compute/` |
| `ubuntu-server-setup.mdx`, `ubuntu-server-cheatsheet.mdx`, `elk-stack/*` | Left in place, unchanged (later DevOps phase). | n/a |

The `client-redirects` plugin cannot redirect to an `#anchor`, so these redirects go to the page.

**Homepage index** (*Claude's call*): in `src/components/HomepageIndex/topics.ts`, the Infrastructure area points "Serverless" at `cloud-computing/serverless` and "Cloud platforms" at `cloud-computing/cloud-platforms`. Repoint them to `cloud-computing/compute` and `cloud-computing/index`, because missing ids are skipped silently and the entries would otherwise vanish from the home page.

**Merge ledger (required):** for each merged page, the PR lists where every section went, plus anything dropped and why (for example "outdated, replaced by X").

### 1.4 Projects as its own section at `/projects/` (owner's choice)

- **Move the folder.** Move `docs/projects/` to a root-level `projects/` folder and add a second `@docusaurus/plugin-content-docs` instance with `id: "projects"`, `path: "projects"`, `routeBasePath: "projects"`, and its own autogenerated sidebar.
- **Landing page.** Add a `projects/index.mdx` landing page that carries over the current generated-index description ("Blueprints for building complete applications…").
- **Header tab.** Add a navbar `docSidebar` item labelled **Projects** (with `docsPluginId: "projects"`) next to Documents and Blog. Projects disappears from the Documents sidebar.
- **Redirects:**
  - Each `/docs/projects/<page>/` redirects to `/projects/<page>/`.
  - The 5 existing blog → project redirects in `docusaurus.config.ts` must point **directly** at the new `/projects/...` URLs, not at the old `/docs/projects/...` ones.
- **Cross-section links.** Relative file links don't resolve between two docs instances:
  - `banking.mdx` and `minicrm.mdx` link to `../cloud-computing/ubuntu-server-setup.mdx`. Change those to URL links (`/docs/cloud-computing/ubuntu-server-setup/`).
  - Check every other link that crosses between Projects and Documents, in both directions.

---

## Phase 2: Technologies and LLM

### 2.1 LLM becomes its own top-level folder

- **Move.** Move `docs/technologies/llm/` to `docs/llm/` (13 pages plus `_category_.json`). It shows up as its own top-level sidebar category, not a header tab.
- **Redirect.** Each `/docs/technologies/llm/<page>/` redirects to `/docs/llm/<page>/`.
- **Update the home page.** In `src/components/HomepageIndex/topics.ts`, change the LLM topic's `doc` to `llm/index`. Otherwise the home page silently drops it (missing ids are skipped).

### 2.2 Web dev roadmap on the Technologies index

Replace the generated index of `docs/technologies/` with `docs/technologies/index.mdx`, and point `_category_.json` → `link` at that doc. Keep the current description text. The roadmap stages, in order, each linking into existing notes:

1. Web basics (HTML, CSS)
2. JavaScript / TypeScript
3. A frontend framework
4. Pick a backend language
5. Databases
6. APIs and auth (Key Notes)
7. Cloud (links to the new architecture map)
8. DevOps, marked "coming later"

It uses the same visual style as the language graphs.

### 2.3 A layered graph on each programming-language index (owner chose layered flow, option A)

Every language gets the same five columns, left to right: **Core → Runtime → Frameworks → Data & API → Quality**.

- **Boxes:**
  - A box that has a note links to it.
  - A box with no note yet is shown faded, so the graph doubles as a map of gaps.
  - The Core column links to the language's cheatsheet.
- **Languages:**
  - JavaScript (with TypeScript in its Core column)
  - Java, Go, Python, PHP, Rust
  - C# / .NET: `docs/technologies/dotnet/` has no index doc (it uses a generated index), so add `dotnet/index.mdx` and point the category at it
- **Placement.** The graph goes at the top of each index page, under the title and the existing "Quick reference" line. Existing page content stays below it, unchanged.

### 2.4 Tabs for "several ways to do it"

Use `@theme/Tabs` (already used on 10 pages).

- **When to use tabs:** only where sections are parallel alternatives to one another.
- **Starting points:**
  - control flow and loops (`js/concepts/_flow.mdx`, `go/concepts/_flow.mdx`, `java/concepts/_flow.mdx`)
  - ORM vs query builder (`js/api/orm`, `js/api/query-builder`)
  - backend framework comparisons (`js/be-frameworks`, `go/frameworks`)
  - middleware styles (Express and Nest)
  - React state libraries (`js/libraries/react/state`)
- **When not to use tabs:** never put sequential steps or required reading in tabs.
- **Use `groupId`** where the same choice repeats across a page (for example the same language or the same ORM), so one click switches every tab set together.
- **Anchors:** wrapping a heading in a tab can break inbound `#anchor` links. Before tabbing a heading, search for links to that anchor and update them, or keep the anchor working.
- **Tabs only inside existing pages; no pages are merged** (*Claude's call*). Where the alternatives already live on separate pages (the ORMs in `js/api/orm/`, the query builders, the React state libraries, the backend frameworks), the topic's existing index page gets a short tabbed side-by-side. It shows the same small task in each tool and links to each tool's own page. The individual pages are not moved or merged, so Phase 2 needs no redirects or merge ledger apart from the LLM move. Express and Nest middleware get tabs within each framework's own page.

### 2.5 Cheatsheets

The 44 cheatsheets from v1.1.0 already cover the Technologies topics. Fill gaps only:

- A language graph's Core column needs a cheatsheet to link to.
- The C# / .NET index needs one too.

No rewrite of existing cheatsheets.

### 2.6 "Related notes" on pages that link to no other note

As of 2026-10-31, 54 of the 153 published pages under `docs/technologies/` and `docs/cloud-computing/` contain no link to another note. Recount at build time, because Phase 1 and the LLM move change the set.

- **What to add:** a short **Related notes** line or list at the end of each such page, with 2–5 links to the genuinely closest notes. Examples: a framework page links to its language's cheatsheet, its ORM or database note, and the matching cloud block where it is deployed. A database page links to Cloud → Databases.
- **How to link:**
  - Use relative file links within the default docs.
  - Use URL links to reach Projects.
- **Limit:** only add links; do not edit the rest of the page.
- **Exclusions:** skip the Ubuntu and ELK pages, which wait for the DevOps phase.
- **Check:** the Phase 2 PR lists every page that got a Related notes section. After the change, a recount shows zero pages in scope that link to no other note.

---

## Visuals: what to use

- **Decision charts** (cloud blocks): Mermaid flowcharts. Their links point only to sections on the same page.
- **Architecture map, roadmap and language graphs**: a small TypeScript React component (or two), for example `src/components/LayerFlow/`, rendering boxes with `@docusaurus/Link`. This gets the links checked by the build and makes faded "gap" boxes and dark-mode theming easy. Links inside Mermaid diagrams are not checked by `onBrokenLinks`, which conflicts with the broken-links anti-goal.

## Release and validation

- **One PR and one tag per phase:**
  - Phase 1 → **v1.2.0**
  - Phase 2 → **v1.3.0**

  Each PR is merged with a merge commit (repo convention), and the tag goes on the merge commit.
- **Each PR must show:**
  - `yarn typecheck` and `yarn build` passing.
  - Zero broken-anchor warnings in the build log.
  - Every redirect source present in `build/` (an `index.html` for each old URL).
  - The merge ledger (Phase 1).
  - The affected pages checked in light and dark mode at `yarn start`.
  - CI "Test deployment" passing.

## Decided by the owner

- Cloud is the main pain. Technologies needs only tabs, cheatsheets and navigation, not restructuring.
- Block pages read "which service" first, then "how to set it up on AWS".
- Block page layout: decision chart first (B). Entry page: architecture map (A).
- Docker, Nginx, Ubuntu and ELK go to a later DevOps phase.
- Projects becomes a separate section at `/projects/`, with redirects.
- LLM becomes an independent top-level folder.
- A web dev roadmap on the Technologies index, and a layered graph per programming language (A).
- Phases: Phase 1 Cloud and Projects, then Phase 2 Technologies and LLM. Dev-concept motion graphics and DevOps come later.
- Keep the Azure and GCP reference notes, as an "Azure and GCP quick reference" section on the Foundations page.
- Add "Related notes" to every page that links to no other note (Phase 2).

## Claude's calls (check these while reading)

- The Cloud building blocks and their learning order (Foundations, Identity, Compute, Storage, Databases, Networking, Messaging, Monitoring), and the depth of each.
- Block pages are their own quick reference, with no separate cheatsheet per block.
- Serverless pages fold into Compute as the "Functions" option.
- Terraform is one of the three setup tabs.
- LLM is a sidebar category at `docs/llm/`, not a header tab.
- TypeScript sits in JavaScript's graph, not its own. C# / .NET gets a new index page.
- The map, roadmap and graphs use a small React component with checked links. Mermaid is used only for the decision charts. This changes what I said earlier ("Mermaid throughout"), because links inside Mermaid aren't checked by the build.
- Tabs go only inside existing pages, with no merges. Tool comparisons go on the existing index pages.
- The homepage "Serverless" and "Cloud platforms" entries are repointed.
- Releases are tagged v1.2.0 for Phase 1 and v1.3.0 for Phase 2.
- This design doc lives in `docs/_superpowers/specs/`, which isn't published, because the repo's `docs/` folder is the website.

## Left to the builder

- Wording and depth of block content, within the depth table above.
- The exact questions in each decision chart.
- Terraform snippets.
- Which boxes go in each language column, based on the notes that exist.
- Which further Technologies sections get tabs, following the rule in 2.4.
- The sidebar position of the `llm` category.
