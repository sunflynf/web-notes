// All redirects live here. `from` has no baseUrl or trailing slash;
// `to` has a trailing slash and no baseUrl. Checked by scripts/checks/redirects.mjs.
export type Redirect = { from: string; to: string };

export const redirects: Redirect[] = [
  // Project plans moved from the blog to docs/projects
  { from: "/blog/plan-app-banking", to: "/docs/projects/banking/" },
  { from: "/blog/plan-app-flashcard", to: "/docs/projects/flashcard/" },
  { from: "/blog/plan-app-minicrm", to: "/docs/projects/minicrm/" },
  { from: "/blog/plan-app-landing-page", to: "/docs/projects/landing-page/" },
  { from: "/blog/2025/06/18/landing-page", to: "/docs/projects/landing-page/workflows/" },
];
