# Phase 1 merge ledger

Where every section of the merged pages went. "Section" is the source heading text exactly as written. Rows are added task by task: Task 4 covers the Serverless pages, and a later task adds the Cloud Platforms pages.

| Source page | Section | New location | Note |
|---|---|---|---|
| serverless.md | Serverless | compute.mdx (page title `# Compute`) | The page now is the Compute block, with Functions as one option |
| serverless.md | What is Serverless? | compute.mdx#functions-across-providers | Definition, FaaS and the platform list kept; IBM Cloud Functions retirement note kept |
| serverless.md | Key Concepts of Serverless: | compute.mdx#functions-across-providers | Event-driven, pay-per-use, automatic scaling and no server management are each a "Core ideas" bullet, merged with the cheatsheet concepts |
| serverless.md | How to Use Serverless: | compute.mdx#lambda | The five generic steps are replaced by the concrete Lambda Console, CLI and Terraform tabs |
| serverless.md | 1. **Choose a Cloud Provider** | compute.mdx#compare-the-options | Provider choice is the Azure and GCP columns of the comparison table |
| serverless.md | 2. **Write Your Code** | compute.mdx#lambda | Console tab step 3 (handler examples in Node.js and Python, one small job per function) and the runtime language list in #lambda-limits (Python, Node.js, Java, .NET, Ruby managed; Go and Rust on the OS-only runtime) |
| serverless.md | 3. **Define Event Triggers** | compute.mdx#lambda | Console tab step 6 (HTTP via API Gateway, S3 uploads, DynamoDB data changes, streams, schedules) and #lambda-invocation |
| serverless.md | 4. **Deploy the Function** | compute.mdx#lambda | CLI and Terraform tabs; SAM and the Serverless Framework commands in #functions-across-providers |
| serverless.md | 5. **Monitor and Manage** | compute.mdx#lambda | Console tab step 7 (CloudWatch logs); Connects to links Monitoring |
| serverless.md | Example Using AWS Lambda: | compute.mdx#lambda | Dropped as a separate example: the API Gateway or Function URL trigger and the Test step are in the Console tab |
| serverless.md | Use Cases of Serverless: | compute.mdx#functions-across-providers | "Good fits" sentence: backends, data processing, automation and scheduling, and event-driven apps reacting to file uploads, database updates or IoT signals |
| serverless.md | Advantages of Serverless: | compute.mdx#functions-across-providers | "Pros" sentence |
| serverless.md | Disadvantages of Serverless: | compute.mdx#functions-across-providers | "Cons" sentence; 15-minute limit and statelessness also in #lambda-limits |
| serverless.md | Conclusion: | compute.mdx | Dropped: a generic closing paragraph; the Decision chart and comparison table now answer the question |
| serverless-cheatsheet.mdx | Serverless Cheatsheet | compute.mdx | Page title merged into the Compute page |
| serverless-cheatsheet.mdx | At a glance | compute.mdx#lambda-limits | Latest runtimes (with release month and OS) in "Runtimes"; Serverless Framework version and release dates in #functions-across-providers; the four official doc links (AWS Lambda, Azure Functions, Cloud Run functions, Serverless Framework) are in #functions-across-providers |
| serverless-cheatsheet.mdx | Core concepts | compute.mdx#functions-across-providers and compute.mdx#lambda-invocation | Function, trigger, cold start, execution identity and hosting plans in #functions-across-providers; invocation types (synchronous, asynchronous with retry then DLQ or on-failure destination, poll-based), stream triggers (Kinesis, DynamoDB Streams), concurrency and layers/extensions in #lambda-invocation and #lambda-limits |
| serverless-cheatsheet.mdx | Platform comparison | compute.mdx#functions-across-providers | Kept as a bullet list (timeout, memory, concurrency, HTTP entry, hosting plans) because Compare the options allows one table only |
| serverless-cheatsheet.mdx | Syntax & commands | compute.mdx#lambda | Handlers in the Console tab, `aws lambda` and SAM in the CLI tab; Serverless Framework, `func` and `gcloud` in #functions-across-providers |
| serverless-cheatsheet.mdx | Common patterns | compute.mdx#lambda-gotchas and compute.mdx#functions-across-providers | AWS rows are bullets under "Common patterns" in #lambda-gotchas; the Azure and GCP equivalents (HTTP trigger, Blob trigger, Eventarc, timer trigger NCRONTAB, Cloud Scheduler, Durable Functions, Workflows, always-ready instances) are in #functions-across-providers |
| serverless-cheatsheet.mdx | Gotchas | compute.mdx#lambda-gotchas | All kept; payload (including "raised from 256 KB in 2025") and /tmp values are in #lambda-limits |
| serverless-cheatsheet.mdx | What's new in recent releases | compute.mdx#lambda-limits and compute.mdx#functions-across-providers | Node.js 24 and Python 3.14 (Nov 2025, Amazon Linux 2023) and the Aug 2026 preview runtimes are in "Runtimes"; Serverless Framework 4.44 (2026-10-14), 4.45 (2026-10-20), 4.46 (2026-10-28), Cloud Run functions and Flex Consumption notes are in #functions-across-providers |
| serverless-cheatsheet.mdx | In these notes | compute.mdx#connects-to | Dropped as a list of links to the retired pages; Connects to replaces it |
