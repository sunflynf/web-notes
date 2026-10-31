# Phase 1 merge ledger

Where every section of the merged pages went. "Section" is the source heading text exactly as written. Rows are added task by task: Task 4 covers the Serverless pages, and a later task adds the Cloud Platforms pages.

| Source page | Section | New location | Note |
|---|---|---|---|
| serverless.md | Serverless | compute.mdx (page title `# Compute`) | The page now is the Compute block, with Functions as one option |
| serverless.md | What is Serverless? | compute.mdx#functions-across-providers | Definition, FaaS and the platform list kept; IBM Cloud Functions retirement note kept |
| serverless.md | Key Concepts of Serverless: | compute.mdx#functions-across-providers | The four concepts are merged into the "Core ideas" bullets with the cheatsheet concepts |
| serverless.md | How to Use Serverless: | compute.mdx#lambda | The five generic steps are replaced by the concrete Lambda Console, CLI and Terraform tabs |
| serverless.md | 1. **Choose a Cloud Provider** | compute.mdx#compare-the-options | Provider choice is the Azure and GCP columns of the comparison table |
| serverless.md | 2. **Write Your Code** | compute.mdx#lambda | Console tab step 3 (handler, with Node.js and Python examples) |
| serverless.md | 3. **Define Event Triggers** | compute.mdx#lambda | Console tab step 6 (Add trigger) and "Patterns and gotchas" |
| serverless.md | 4. **Deploy the Function** | compute.mdx#lambda | CLI and Terraform tabs; SAM and the Serverless Framework commands in #functions-across-providers |
| serverless.md | 5. **Monitor and Manage** | compute.mdx#lambda | Console tab step 7 (CloudWatch logs); Connects to links Monitoring |
| serverless.md | Example Using AWS Lambda: | compute.mdx#lambda | Dropped as a separate example: the API Gateway or Function URL trigger and the Test step are in the Console tab |
| serverless.md | Use Cases of Serverless: | compute.mdx#functions-across-providers | "Good fits" sentence |
| serverless.md | Advantages of Serverless: | compute.mdx#functions-across-providers | "Pros" sentence |
| serverless.md | Disadvantages of Serverless: | compute.mdx#functions-across-providers | "Cons" sentence; 15-minute limit and statelessness also in #lambda-limits |
| serverless.md | Conclusion: | compute.mdx | Dropped: a generic closing paragraph; the Decision chart and comparison table now answer the question |
| serverless-cheatsheet.mdx | Serverless Cheatsheet | compute.mdx | Page title merged into the Compute page |
| serverless-cheatsheet.mdx | At a glance | compute.mdx#lambda-limits | Latest runtimes in "Runtimes"; Serverless Framework version in #functions-across-providers; official doc links dropped (the AWS ones are cited in the task report) |
| serverless-cheatsheet.mdx | Core concepts | compute.mdx#functions-across-providers | Concepts merged with serverless.md; invocation types and layers are covered by the Lambda limits and patterns |
| serverless-cheatsheet.mdx | Platform comparison | compute.mdx#functions-across-providers | Kept as a bullet list (timeout, memory, concurrency, HTTP entry, hosting plans) because Compare the options allows one table only |
| serverless-cheatsheet.mdx | Syntax & commands | compute.mdx#lambda | Handlers in the Console tab, `aws lambda` and SAM in the CLI tab; Serverless Framework, `func` and `gcloud` in #functions-across-providers |
| serverless-cheatsheet.mdx | Common patterns | compute.mdx#lambda-gotchas | Kept as bullets under "Common patterns" |
| serverless-cheatsheet.mdx | Gotchas | compute.mdx#lambda-gotchas | All kept; payload and /tmp values moved to #lambda-limits |
| serverless-cheatsheet.mdx | What's new in recent releases | compute.mdx#lambda-limits | Lambda Node.js 24 and Python 3.14 and the preview runtimes are in "Runtimes"; Serverless Framework, Cloud Run functions and Flex Consumption notes in #functions-across-providers |
| serverless-cheatsheet.mdx | In these notes | compute.mdx#connects-to | Dropped as a list of links to the retired pages; Connects to replaces it |
