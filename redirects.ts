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
  { from: "/docs/category/software-technologies", to: "/docs/technologies/" },

  // DevOps section: Docker, Nginx, Ubuntu and ELK moved out of Technologies and Cloud Computing.
  // The elk-stack category slug is unchanged (the folder name did not change), so no category redirect.
  { from: "/docs/technologies/docker-knowledge", to: "/docs/devops/containers/docker-knowledge/" },
  { from: "/docs/technologies/docker-cheatsheet", to: "/docs/devops/containers/docker-cheatsheet/" },
  { from: "/docs/technologies/nginx", to: "/docs/devops/web-servers/nginx/" },
  { from: "/docs/technologies/nginx-cheatsheet", to: "/docs/devops/web-servers/nginx-cheatsheet/" },
  { from: "/docs/cloud-computing/ubuntu-server-setup", to: "/docs/devops/vps/ubuntu-server-setup/" },
  { from: "/docs/cloud-computing/ubuntu-server-cheatsheet", to: "/docs/devops/vps/ubuntu-server-cheatsheet/" },
  { from: "/docs/cloud-computing/elk-stack", to: "/docs/devops/observability/elk-stack/" },
  { from: "/docs/cloud-computing/elk-stack/cheatsheet", to: "/docs/devops/observability/elk-stack/cheatsheet/" },
  { from: "/docs/cloud-computing/elk-stack/elasticsearch", to: "/docs/devops/observability/elk-stack/elasticsearch/" },
  { from: "/docs/cloud-computing/elk-stack/kibana", to: "/docs/devops/observability/elk-stack/kibana/" },
  { from: "/docs/cloud-computing/elk-stack/logstash", to: "/docs/devops/observability/elk-stack/logstash/" },

  // Deployment platforms grouped in the sidebar by service.
  { from: "/docs/devops/platforms/vercel", to: "/docs/devops/platforms/frontend-hosting/vercel/" },
  { from: "/docs/devops/platforms/netlify", to: "/docs/devops/platforms/frontend-hosting/netlify/" },
  { from: "/docs/devops/platforms/cloudflare", to: "/docs/devops/platforms/frontend-hosting/cloudflare/" },
  { from: "/docs/devops/platforms/render", to: "/docs/devops/platforms/application-hosting/render/" },
  { from: "/docs/devops/platforms/railway", to: "/docs/devops/platforms/application-hosting/railway/" },
  { from: "/docs/devops/platforms/fly-io", to: "/docs/devops/platforms/application-hosting/fly-io/" },
  { from: "/docs/devops/platforms/supabase", to: "/docs/devops/platforms/backend-services/supabase/" },
  { from: "/docs/devops/platforms/ngrok", to: "/docs/devops/platforms/tunnels/ngrok/" },
];
