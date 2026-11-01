// All redirects live here. `from` has no baseUrl or trailing slash;
// `to` has a trailing slash and no baseUrl. Checked by scripts/checks/redirects.mjs.
export type Redirect = { from: string; to: string };

export const redirects: Redirect[] = [
  // Project plans moved from the blog to the Projects section
  { from: "/blog/plan-app-banking", to: "/projects/banking/" },
  { from: "/blog/plan-app-flashcard", to: "/projects/flashcard/" },
  { from: "/blog/plan-app-minicrm", to: "/projects/minicrm/" },
  { from: "/blog/plan-app-landing-page", to: "/projects/landing-page/" },
  { from: "/blog/2025/06/18/landing-page", to: "/projects/landing-page/workflows/" },

  // Projects moved from docs/projects to their own docs instance at /projects
  { from: "/docs/projects/banking", to: "/projects/banking/" },
  { from: "/docs/projects/flashcard", to: "/projects/flashcard/" },
  { from: "/docs/projects/minicrm", to: "/projects/minicrm/" },
  { from: "/docs/projects/landing-page", to: "/projects/landing-page/" },
  { from: "/docs/projects/landing-page/workflows", to: "/projects/landing-page/workflows/" },
  { from: "/docs/category/projects", to: "/projects/" },

  // Cloud Computing reorganised into building blocks; merged pages retired
  { from: "/docs/category/cloud-computing", to: "/docs/cloud-computing/" },
  { from: "/docs/cloud-computing/cloud-platforms", to: "/docs/cloud-computing/" },
  { from: "/docs/cloud-computing/cloud-platforms-cheatsheet", to: "/docs/cloud-computing/" },
  { from: "/docs/cloud-computing/serverless", to: "/docs/cloud-computing/compute/" },
  { from: "/docs/cloud-computing/serverless-cheatsheet", to: "/docs/cloud-computing/compute/" },

  // LLM notes moved out of Software Technologies into their own section
  { from: "/docs/technologies/llm", to: "/docs/llm/" },
  { from: "/docs/technologies/llm/agents-mcp", to: "/docs/llm/agents-mcp/" },
  { from: "/docs/technologies/llm/cheatsheet", to: "/docs/llm/cheatsheet/" },
  { from: "/docs/technologies/llm/cost-latency", to: "/docs/llm/cost-latency/" },
  { from: "/docs/technologies/llm/evals", to: "/docs/llm/evals/" },
  { from: "/docs/technologies/llm/fine-tuning-vs-rag-vs-prompting", to: "/docs/llm/fine-tuning-vs-rag-vs-prompting/" },
  { from: "/docs/technologies/llm/local-models", to: "/docs/llm/local-models/" },
  { from: "/docs/technologies/llm/model-landscape", to: "/docs/llm/model-landscape/" },
  { from: "/docs/technologies/llm/prompt-engineering", to: "/docs/llm/prompt-engineering/" },
  { from: "/docs/technologies/llm/rag", to: "/docs/llm/rag/" },
  { from: "/docs/technologies/llm/security", to: "/docs/llm/security/" },
  { from: "/docs/technologies/llm/structured-output-tool-calling", to: "/docs/llm/structured-output-tool-calling/" },
  { from: "/docs/technologies/llm/tokens-context-sampling", to: "/docs/llm/tokens-context-sampling/" },
  { from: "/docs/category/net--c", to: "/docs/technologies/dotnet/" },
];
