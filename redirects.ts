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
];
