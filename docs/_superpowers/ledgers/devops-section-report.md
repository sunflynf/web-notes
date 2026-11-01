# DevOps section report

Checked 2026-11-01. Branch `grok/devops-section`, not pushed. Commits, newest last:

- `3f7fe5ff` Refactor DevOps section by moving Docker, Nginx, Ubuntu, and ELK notes
- `b07d5e3a` Add DevOps entry, deployment platforms, VPS playbook, and CI/CD
- `d0323346` Update orphan check and DevOps structure notes
- `74ad5c42` Fix DevOps charts and the platform comparison table on narrow screens

This report is the commit after those four.

`docusaurus.config.ts` was not changed. `yarn.lock` was not changed. Nothing was pushed, merged, or tagged. `C:\Vault\Project\vps-migration` was read only.

## Pages created

| Path | Role |
|---|---|
| `docs/devops/index.mdx` | Entry: deploy-path map, "Where should this run?", moving between options |
| `docs/devops/platforms/index.mdx` | Decision chart and a comparison grouped by service: frontend hosting, application hosting, backend services, tunnels |
| `docs/devops/platforms/vercel.mdx` | Platform page |
| `docs/devops/platforms/netlify.mdx` | Platform page |
| `docs/devops/platforms/cloudflare.mdx` | Pages, Workers, R2, DNS, Tunnel |
| `docs/devops/platforms/render.mdx` | Platform page |
| `docs/devops/platforms/railway.mdx` | Platform page |
| `docs/devops/platforms/fly-io.mdx` | Platform page |
| `docs/devops/platforms/supabase.mdx` | Backend services, not an API host |
| `docs/devops/platforms/ngrok.mdx` | Local tunnel, compared with Cloudflare Tunnel |
| `docs/devops/containers/compose-in-production.mdx` | Compose in production |
| `docs/devops/web-servers/caddy.mdx` | Caddyfile, automatic HTTPS, reverse proxy |
| `docs/devops/vps/self-host-a-docker-stack.mdx` | VPS playbook, 12 sections |
| `docs/devops/ci-cd.mdx` | GitHub Actions image build, GHCR, SSH deploy, rollback |
| `src/components/MermaidFrame/` | Keeps a Mermaid chart at its laid-out size inside a sideways scroller |

Category files: `docs/devops/_category_.json`, `platforms/`, `containers/`, `web-servers/`, `vps/`, `observability/`. Sidebar order inside DevOps is index, platforms, vps, containers, web-servers, ci-cd, observability. The top-level `devops` folder has no position, so the docs sidebar stays alphabetical.

The eight platform pages use the same heading order: At a glance, Core concepts, Deploy (Dashboard / CLI / Config file), Common patterns, Gotchas, What's new in recent releases, Connects to. On `ngrok.mdx` the comparison with Cloudflare Tunnel is a heading level 3 under Common patterns.

## Pages moved

Content was moved with `git mv`. Vietnamese pages stayed Vietnamese.

| From | To |
|---|---|
| `docs/technologies/docker-knowledge.md` | `docs/devops/containers/docker-knowledge.md` |
| `docs/technologies/docker-cheatsheet.mdx` | `docs/devops/containers/docker-cheatsheet.mdx` |
| `docs/technologies/nginx.mdx` | `docs/devops/web-servers/nginx.mdx` |
| `docs/technologies/nginx-cheatsheet.mdx` | `docs/devops/web-servers/nginx-cheatsheet.mdx` |
| `docs/cloud-computing/ubuntu-server-setup.mdx` | `docs/devops/vps/ubuntu-server-setup.mdx` |
| `docs/cloud-computing/ubuntu-server-cheatsheet.mdx` | `docs/devops/vps/ubuntu-server-cheatsheet.mdx` |
| `docs/cloud-computing/elk-stack/` (all files) | `docs/devops/observability/elk-stack/` |

Relative links inside the moved files were retargeted. `ubuntu-server-cheatsheet.mdx` now points at `../../cloud-computing/index.mdx` (it used to sit next to that page). ELK `elasticsearch.md`, `kibana.md`, and `logstash.md` gained a Related notes section so the orphan check can see them.

`docs/technologies/index.mdx` stage 8 is a real link to `/docs/devops/`. The faded "coming later" box is gone.

`src/components/HomepageIndex/topics.ts`: the Infrastructure area is renamed DevOps. Deployment platforms point at `devops/platforms/index`. VPS points at `devops/vps/self-host-a-docker-stack`. Docker, Nginx, ELK, and Ubuntu server ids point at the new paths.

## Redirects

Eleven page redirects were added. The check prints `42 redirects OK` (31 already in the file, plus these 11).

No category redirect was added. The old ELK `_category_.json` had only a position and no `generated-index`, and Docusaurus emits `/docs/category/...` only for generated-index categories. After the build, `build/docs/category/` has no elk-stack page. Served `/web-notes/docs/category/elk-stack/` returns HTTP 404.

`from` has no base URL and no trailing slash. `to` has a trailing slash.

| From | To |
|---|---|
| `/docs/technologies/docker-knowledge` | `/docs/devops/containers/docker-knowledge/` |
| `/docs/technologies/docker-cheatsheet` | `/docs/devops/containers/docker-cheatsheet/` |
| `/docs/technologies/nginx` | `/docs/devops/web-servers/nginx/` |
| `/docs/technologies/nginx-cheatsheet` | `/docs/devops/web-servers/nginx-cheatsheet/` |
| `/docs/cloud-computing/ubuntu-server-setup` | `/docs/devops/vps/ubuntu-server-setup/` |
| `/docs/cloud-computing/ubuntu-server-cheatsheet` | `/docs/devops/vps/ubuntu-server-cheatsheet/` |
| `/docs/cloud-computing/elk-stack` | `/docs/devops/observability/elk-stack/` |
| `/docs/cloud-computing/elk-stack/cheatsheet` | `/docs/devops/observability/elk-stack/cheatsheet/` |
| `/docs/cloud-computing/elk-stack/elasticsearch` | `/docs/devops/observability/elk-stack/elasticsearch/` |
| `/docs/cloud-computing/elk-stack/kibana` | `/docs/devops/observability/elk-stack/kibana/` |
| `/docs/cloud-computing/elk-stack/logstash` | `/docs/devops/observability/elk-stack/logstash/` |

These are client-side HTML redirects (the response is HTTP 200 and the HTML points at the new path), which is how this site's redirect plugin works.

Against `yarn serve` on the clean build, each old URL returned 200 and the HTML contained the new path:

```
200 OK /docs/technologies/docker-knowledge/
200 OK /docs/technologies/docker-cheatsheet/
200 OK /docs/technologies/nginx/
200 OK /docs/technologies/nginx-cheatsheet/
200 OK /docs/cloud-computing/ubuntu-server-setup/
200 OK /docs/cloud-computing/ubuntu-server-cheatsheet/
200 OK /docs/cloud-computing/elk-stack/
200 OK /docs/cloud-computing/elk-stack/cheatsheet/
200 OK /docs/cloud-computing/elk-stack/elasticsearch/
200 OK /docs/cloud-computing/elk-stack/kibana/
200 OK /docs/cloud-computing/elk-stack/logstash/
404 category/elk-stack
```

## Inbound links updated

Internal links were edited to the new paths. They do not depend on the redirect.

- `docs/cloud-computing/compute.mdx` (Docker, Ubuntu)
- `docs/cloud-computing/foundations.mdx` (Ubuntu, ELK)
- `docs/cloud-computing/monitoring.mdx` (ELK)
- `docs/cloud-computing/networking.mdx` (Nginx)
- `docs/key-notes/microservices.mdx`
- `docs/key-notes/microservices-cheatsheet.mdx`
- `docs/technologies/js/api/socket-io.mdx`
- `docs/technologies/js/be-frameworks/nest/in-depth.mdx`
- `projects/banking.mdx` and `projects/minicrm.mdx` (URL links)
- `src/components/HomepageIndex/topics.ts`
- `docs/technologies/index.mdx` (roadmap stage 8)

`scripts/checks/orphans.mjs` now scans `devops` and no longer skips the Ubuntu and ELK pages. `CLAUDE.md` structure tree and Content Organization mention DevOps. Cloud computing is described as the entry page plus 8 blocks.

Historical notes under `docs/_superpowers/` still mention the old paths. Those folders are unpublished and were left as they were.

## `verify` items

A line below is something that was not confirmed on 2026-11-01. Open the linked official page before relying on it.

Two hits are ordinary English in moved pages, not an unconfirmed claim: `docs/devops/vps/ubuntu-server-cheatsheet.mdx:129` ("verify with `sshd -T`") and `docs/devops/observability/elk-stack/logstash.md:78` ("verify field types in Kibana").

### Comparison (`docs/devops/platforms/index.mdx`)

Grouped by service. Line numbers are the grouped tables.

- 68: Vercel first-party Postgres; full region name list
- 69: Netlify database engine and extra caps; region list
- 70: D1 free limits; Cloudflare city list
- 82: Render free Postgres storage and expiry; region list
- 83: Railway domains doc; region list; which unit-rate table the invoice uses
- 84: Fly.io live region list (`fly platform regions`)
- 96: Supabase API custom domain; region list in the dashboard
- 108: ngrok edge region list
- 109: Cloudflare Tunnel price; city list; `cloudflared` version

### Vercel (`vercel.mdx`)

- 55: `vercel domains add` flags
- 56: `vercel rollback` flags
- 71: region id before copying it
- 80: free-tier cron count
- 88: current storage catalog
- 89: full region name list

### Netlify (`netlify.mdx`)

- 33: background function duration cap
- 52: `netlify env:set` scopes
- 54: a CLI rollback command
- 84: scheduled-function config key
- 92: database engine and caps beyond credits
- 93: pin-to-region control

### Cloudflare (`cloudflare.mdx`)

- 22: Pages build minutes; D1 free limits
- 23: cap on named hostnames on the Free plan
- 24 and 87: `cloudflared` version
- 31: duration vs CPU wording
- 54: `wrangler domains` subcommand
- 55: `wrangler rollback` version argument
- 92: Pages build minutes
- 93: D1 free limits
- 96: named tunnel price
- 97: Durable Objects and D1 location hints

### Render (`render.mdx`)

- 22 and 99: free Postgres storage and expiry
- 32: which service types a preview environment copies
- 53: `render deploys create` flags
- 54: `render` env subcommand
- 80: `sync: false` against the current spec
- 87: `rootDir` field name
- 90: free-plan backup story
- 100: region list

### Railway (`railway.mdx`)

- 23 and 90: which of the two official rate tables an invoice uses
- 45: domains click-path
- 54: `railway variable set` syntax
- 61: config-as-code doc path
- 82: pull-request environment toggle name
- 93: region list
- 94: whether new signups are open after the October 2026 pause
- 95: custom domains on the Free plan

### Fly.io (`fly-io.mdx`)

- 33: live region list
- 56: `fly deploy --image` flag
- 82: `auto_stop_machines` allowed values; `[mounts]` block
- 90: a first-party preview product
- 91: a cron product name
- 102: whether a registrar requires a dedicated IPv4
- 109: a longer product changelog than the 2026-10-01 pricing update

### Supabase (`supabase.mdx`)

- 56: `supabase db push` / `db pull` flags
- 58 and 98: custom-domain price and whether Free includes it
- 81: database branching on the plan
- 82: Edge Function schedule syntax
- 99: region list in the dashboard

### ngrok (`ngrok.mdx`)

- 54: `ngrok http --url` flag
- 92: interstitial page on Cloudflare Tunnel
- 93: a separate Tunnel price
- 105: inspector config key
- 115: endpoint-product changelog beyond the agent changelog

### CI/CD (`ci-cd.mdx`)

- 12: the marker convention
- 57: Action major versions (`checkout`, `setup-buildx-action`, `login-action`, `build-push-action`)
- 61: automatic token authentication doc path
- 63: `read:packages` scope name
- 89: current `ssh-keyscan` advice

### Compose, Caddy, VPS

- `compose-in-production.mdx:12` marker convention; `:51` current Postgres 18 patch tag; `:64` `mem_limit` / `memswap_limit` names; `:92` Postgres 18 volume layout
- `caddy.mdx:24` admin endpoint not published; `:43` Cloudflare DNS module directive; `:59` `flush_interval -1` and keepalive subdirectives; `:61` `trusted_proxies` option name
- `self-host-a-docker-stack.mdx:94` `live-restore` if the daemon rejects it; `:135` Postgres 18 volume layout for the pinned tag

## Prices and limits

Every figure below was taken from that vendor's own page on 2026-11-01. The page's own "updated" date is included when the page showed one.

### Vercel

Sources: [Hobby](https://vercel.com/docs/plans/hobby) (updated 2026-09-14), [Pro](https://vercel.com/docs/plans/pro-plan) (updated 2026-09-15), [usage](https://vercel.com/docs/functions/usage-and-pricing) (updated 2026-06-16). CLI `vercel` 65.9.0 on the npm registry.

- Hobby: $0. 100 GB Fast Data Transfer, 10 GB Fast Origin Transfer, 1,000,000 CDN requests, 4 CPU-hours Active CPU, 360 GB-hours provisioned memory, 1,000,000 function invocations, 100 deployments/day, 200 projects, 50 domains per project, function duration hard cap 300 seconds, 1 hour of runtime logs, 50,000 Web Analytics events/month.
- Pro: $20/month, includes one deploying seat and a $20 usage credit. Extra developer seats $20/user/month. Viewers free. Duration default 300 seconds, up to 800 seconds, extended 1800 seconds in beta. Build machines 4 to 30 vCPUs. Active CPU example $0.128/hour for iad and pdx.

### Netlify

Sources: [pricing](https://www.netlify.com/pricing/) and [pricing.md](https://www.netlify.com/pricing.md). CLI v27.16.1 (2026-10-30), [release](https://github.com/netlify/cli/releases/tag/v27.16.1).

- Free: $0, 300 credits/month, projects pause when credits run out. Custom domains with SSL, unlimited previews, global CDN.
- Personal: $9/month, 1,000 credits. Extra credits $5 for 500.
- Pro: $20/month, starts at 3,000 credits. Extra credits $10 for 1,500.
- Credit costs: production deploy 15, compute 10 per GB-hour, bandwidth 20 per GB, web requests 2 per 10,000.

### Cloudflare

Sources: [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) (updated 2026-10-02), [Pages Functions](https://developers.cloudflare.com/pages/functions/pricing/) (updated 2026-09-08), [R2](https://developers.cloudflare.com/r2/pricing/) (updated 2026-10-30). Wrangler 4.156.0 (2026-10-29). Quick Tunnel limits from the Tunnel docs (updated 2026-08-24). Account limits updated 2026-10-16.

- Workers Free: 100,000 requests/day, 10 ms CPU per invocation. Logs: 200,000/day, kept 3 days. KV: 100,000 reads/day, 1,000 writes/day, 1 GB.
- Workers Paid: $5/month minimum, then 10 million requests included and $0.30 per extra million. Logs: 20 million/month, then $0.60 per million, kept 7 days.
- Pages: function requests count as Workers requests. Static assets free and unlimited. Free quota resets at midnight UTC.
- R2 Standard free: 10 GB-month, 1 million Class A, 10 million Class B, egress free. Paid Standard: $0.015/GB-month, Class A $4.50 per million, Class B $0.36 per million. Infrequent Access has no free tier: $0.01/GB-month, retrieval $0.01/GB, 30-day minimum. Deletes free.
- Quick Tunnels: random `trycloudflare.com` name, no SLA, 200 in-flight requests (HTTP 429), testing rather than production. Named tunnels: 1,000 per account, 25 replicas. No separate Tunnel price was found.

### Render

Sources: [free web services](https://render.com/docs/free), [pricing](https://render.com/pricing). Plan change dated April 23, 2026. CLI v2.34.0 (2026-10-30), [render-oss/cli](https://github.com/render-oss/cli/releases/tag/v2.34.0).

- Hobby workspace: $0 plus compute. Free web service (`free`, 512 MB): $0, spins down after 15 minutes idle, about a minute to spin up, 750 instance hours per workspace per calendar month. Custom domains, managed TLS, previews, log streams. Rollbacks only to the two most recent previous deploys. Ephemeral filesystem.
- Paid instances from $7/month (less than 1 CPU, 512 MB) or $25/month (1 CPU, 2 GB). Disks $0.25/GB/month.
- Pro workspace: $25/month plus compute. It replaced Professional at $19 per member. Scale is $499. No seat fees. Remaining workspaces were set to move on August 1, 2026.

### Railway

Two official sources disagree on unit rates. Both are written in the note. Do not collapse them.

- [railway.com/pricing](https://railway.com/pricing) (page dated 2026-10-23): Trial $0 with a $5 one-time credit for 30 days, up to 2 vCPU / 1 GB, 2 replicas, 7-day logs. Free $0 with $1/month, 1 vCPU / 0.5 GB, 1 replica, 3-day logs. Hobby $5/month including $5 usage. Pro $20/month including $20 usage. Marketing unit rates: memory about $0.00001929 per GB per second (about $50/GB-month), CPU about $0.00001929 per vCPU per second (about $50/vCPU-month, active only), egress $0.05/GB "for sandboxes".
- [docs.railway.com/pricing](https://docs.railway.com/pricing) and the [plans page](https://docs.railway.com/reference/pricing/plans) (updated Feb 5, 2026): RAM $10/GB-month, CPU $20/vCPU/month, egress $0.05/GB, volume $0.15/GB/month. Builds free. Trial replicas 2. Volume cap 0.5 GB on Free and Trial.
- Serverless sleep is opt-in, not the default (docs updated 2026-02-03): sleeps after 10 minutes with no outbound packets.
- CLI v5.71.0 (2026-10-19), [railwayapp/cli](https://github.com/railwayapp/cli/releases/tag/v5.71.0).
- Security: [disclosure](https://blog.railway.com/p/security-disclosure-wednesday-october-21st) (2026-10-21) and [preliminary report](https://blog.railway.com/p/preliminary-report-october-security-incident) (2026-10-22). Rotate secrets that ever lived there.

### Fly.io

Sources: [pricing update](https://fly.io/pricing-update/) effective 2026-10-01, [pricing](https://fly.io/pricing), [about pricing](https://fly.io/docs/about/pricing). flyctl v0.5.1 (2026-10-29), [release](https://github.com/superfly/flyctl/releases/tag/v0.5.1).

- No free tier for new organizations, and no monthly free allowance. Organizations still on plans discontinued in October 2024 keep the old allowances.
- Cheapest always-on example: shared-cpu-1x, 256 MB, `iad` or `ewr`, $2.19 per 30 days ($0.0030/hour), plus egress.
- Egress: $0.02/GB North America and Europe, $0.04/GB Asia Pacific, Oceania, and South America, $0.12/GB Africa and India.
- Extra RAM $6/GB/month up to 128 GB. Volumes $0.15/GB/month. Snapshots $0.08/GB/month, first 10 GB free. Stopped Machine rootfs $0.15/GB/month.
- Dedicated IPv4 $2/month. Shared IPv4 and IPv6 free. First 10 single-hostname certificates free, then $0.10/month. Wildcard $1/month.
- Support Standard $29/month and Premium $199/month are support, not compute.

### Supabase

Source: [pricing](https://supabase.com/pricing). CLI v2.122.0 (2026-10-23), [release](https://github.com/supabase/cli/releases/tag/v2.122.0). Ports from [connecting to Postgres](https://supabase.com/docs/guides/database/connecting-to-postgres).

- Free: $0. 500 MB database, shared CPU / 500 MB RAM, 50,000 MAU, 5 GB egress, 5 GB cached egress, 1 GB file storage, 50 MB max upload, unlimited API requests. Pauses after 1 week inactive. 2 active projects. No automatic backups, no PITR.
- Pro from $25/month: 8 GB disk then $0.125/GB, 100,000 MAU then $0.00325/MAU, 250 GB egress then $0.09/GB, 250 GB cached egress then $0.03/GB, 100 GB file storage then $0.0213/GB, $10/month compute credits (one Micro). Paid projects are not paused. The page's example of a Pro org with two Micro projects is $25 + $10 + $10 - $10 = $35.
- Direct connections use port 5432. Shared pooler session uses port 5432 on the pooler host. Shared pooler transaction mode and the dedicated pooler use port 6543.

### ngrok

Sources: [pricing](https://ngrok.com/pricing) and [pricing.md](https://ngrok.com/pricing.md). Agent version from the [agent changelog](https://ngrok.com/docs/agent/changelog.md) (the GitHub releases page did not resolve). Agent 3.39.13 (2026-10-22). 3.39.12 (2026-10-21).

- Free: $0, plus a $5 one-time credit that lasts one year and cannot be spent on data transfer out. Usage stops when the credit is gone. No overage. Up to 3 online endpoints, 1 GB data out, 20,000 HTTP requests (extra credit at $2 per 100,000), interstitial on HTTP, 1 development domain, 1 team member. TCP needs a verified card (not charged) and a random address. Rate limits: 4,000 HTTP requests/minute, 100 TCP connections/minute. Inspector retention 24 hours.
- Hobbyist: $10/month, or $8/month billed annually ($96/year), with $10 credit. Stops at the credit. 3 endpoints, 5 GB, 100,000 HTTP requests then $1 per 100,000 if credit remains, 10 branded domains, no bring-your-own domain, inspector retention 72 hours.
- Pay-as-you-go: $20/month with $20 credit, then billed. Unlimited endpoints, 5 GB then $0.10/GB, 100,000 HTTP requests then $1 per 100,000, bring-your-own domains $0.01 per active hour, no interstitial.

## Verification output

Commands were run from the repo root on the committed tree (`74ad5c42`), through Git Bash, as `yarn clear`, `yarn typecheck`, and `yarn build` teed to `build.log`.

```
yarn clear          [SUCCESS] Removed .docusaurus, the bundler cache, and build. Done in 1.87s.
yarn typecheck      tsc. Done in 0.36s.
yarn build          [SUCCESS] Generated static files in "build". Done in 26.95s.
BUILD_EXIT:0
WARNING_COUNT:0
42 redirects OK
foundations: OK
identity: OK
compute: OK
storage: OK
databases: OK
networking: OK
messaging: OK
monitoring: OK
ledger OK (30 headings)
174 pages, 0 orphans
```

`build.log` was removed after the warning count. An earlier build, before these files were committed, had warned that Git could not infer update dates. That warning is gone once the files are committed. `docusaurus.config.ts` was not edited to hide it.

## Browser

No browser tool was connected. The substitute was headless Microsoft Edge, driven over the Chrome DevTools protocol, against `yarn serve --port 3456 --host 127.0.0.1` of the clean production build. Theme came from `?docusaurus-theme=light` and `?docusaurus-theme=dark`. Viewports were 1280x900 and 390x844. Screenshots were not saved.

Page overflow means `documentElement.scrollWidth` greater than `clientWidth`. All twelve combinations were `overflow: false`:

| Page | Light 1280 | Light 390 | Dark 1280 | Dark 390 |
|---|---|---|---|---|
| `/docs/devops/` | 1265/1265, chart and map | 390/390, chart and map | 1265/1265, chart and map | 390/390, chart and map |
| `/docs/devops/platforms/` | 1265/1265, chart | 390/390, chart | 1265/1265, chart | 390/390, chart |
| `/docs/devops/vps/self-host-a-docker-stack/` | 1265/1265, map | 390/390, map | 1265/1265, map | 390/390, map |

Mermaid labels measured 24px tall (readable). The chart's natural width sits in a sideways scroller: about 2060px on the DevOps entry and about 1777px on the platforms page. The page itself does not scroll sideways. The comparison table also scrolls inside its wrapper. The playbook map is HTML (LayerFlow), not Mermaid.

On `/docs/devops/platforms/vercel/` in dark mode, a real mouse click (not only `element.click()`) switched Dashboard, CLI, and Config file at both 1280 and 390. The visible panel text changed with the tab.

What this did not cover: a person looking at a window, and a saved screenshot.

## Secrets scan

Searched `docs/devops` for the VPS project's names, `sslip.io`, account-specific `ghcr.io` paths, and IPv4-shaped text.

- No `sslip.io`, and none of the real project or account names.
- New pages use the placeholder `ghcr.io/NAMESPACE/api` in `ci-cd.mdx` (lines 53-54) and `compose-in-production.mdx` (lines 21 and 103).
- The moved Docker cheatsheet already had `ghcr.io/user/my-app` (lines 51-52). That example was not introduced here and is not an account from the VPS project.
- New pages use `127.0.0.1` only for the localhost-bind gotcha (`compose-in-production.mdx:23`, `self-host-a-docker-stack.mdx:104`). Moved Nginx, Docker, and Ubuntu notes already contain `127.0.0.1`, RFC1918 examples, `1.1.1.1`, and `8.8.8.8`. Those lines were left as they were.
- `supabase.mdx:105` matches an IPv4-shaped search because of the version `15.19.0.003`. It is a Postgres build number, not an address.
- `trycloudflare.com` appears in `cloudflare.mdx` as the Quick Tunnel hostname from Cloudflare's own docs, written as a product name.
