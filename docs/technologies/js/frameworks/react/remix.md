---
description: Frontend / Fullstack Frameworks for SEO & SSR
tags:
  - Frontend
  - JavaScript
  - TypeScript
  - React
---

# Remix

## Features

- Built for the Modern Web
  - **Progressive enhancement** >> limited JavaScript
  - **Native APIs** >> relies heavily on native browser features
- Data Loading Optimization
- Full-Stack Capabilities
- Nested Routes
- Excellent Developer Experience
  - TypeScript-first
  - Fast Refresh
  - Error boundaries
- Server-Side rendering & Streaming
- Simple form handling
- **Zero Client-side javascript required**
- Built-in Asset Optimization
- SEO & Accessibility
- Deployment Flexibility

### Use cases

- Content-heavy applications: Blogs, news sites, documentation.
- E-commerce platforms: Where fast page loads and dynamic data fetching are critical.
- Progressive Web Apps (PWAs): Remix’s offline-first and performance-focused design make it ideal.
- Dashboards: Nested routes and SSR make it great for admin tools.

## Install & Setup

```bash
npx create-remix@latest my-remix-app
cd my-remix-app

npm install
npm run dev
```

### Project structures

```txt
my-project/
├── node_modules/
├── public/
├── app/
│   ├── components/
│   │   ├── SiteHeader.tsx
│   │   ├── ...
│   ├── routes/
│   │   ├── _index.tsx
│   │   ├── home.tsx
│   │   ├── about.tsx
│   │   ├── ...
│   └── root.tsx
├── package.json
├── tsconfig.json
└── ...
```

## Fundamental

### Routing

```txt title="Simple"
app/
├── components/         -> Not included in routing
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concert._index.tsx      -> /concert
│   ├── concert.trending.tsx    -> /concert/trending
│   ├── concert.$city.tsx       -> /concert/ho-chi-minh-city
│   └── concert.tsx             -> layout
└── root.tsx
```

```txt title="Conventional Route Folders"
app/
├── routes/
│   ├── _index/
│   │   ├── signup-form.tsx
│   │   └── route.tsx
│   ├── about/
│   │   ├── header.tsx
│   │   └── route.tsx
│   ├── concerts/
│   │   ├── favorites-cookie.ts
│   │   └── route.tsx
│   ├── concerts.$city/
│   │   └── route.tsx
│   ├── concerts._index/
│   │   ├── featured.tsx
│   │   └── route.tsx
│   └── concerts.trending/
│       ├── card.tsx
│       ├── route.tsx
│       └── sponsored.tsx
└── root.tsx
```

### Examples

```tsx title="concerts._index.tsx"
export default function Concerts() {
  return <>Waiting here!</>;
}
```

```tsx title="concerts.$concertId.tsx"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ concertId: params.concertId });
};

export default function Concert() {
  const { concertId } = useLoaderData<typeof loader>();
  return <>Your id: {concertId}</>;
}
```

## References

- [Remix & Next](https://www.learnremix.io/why-remix/comparing-remix-to-other-frameworks/remix-vs-next.js)
- [Documents](https://remix.run/docs/en/main)
