---
description: Frontend / Fullstack Frameworks for SEO & SSR
tags:
  - Frontend
  - JavaScript
  - TypeScript
  - React
---

# Next.js

## Features

- Hybrid rendering = Server-side rendering + Static site generation
- Automatic Code Splitting
- Built-in CSS and SASS support + TypeScript support
- Image Optimization
- Edge & Middleware support
- Hot reloading
- SEO Friendly
- Incremental Static Regeneration
- Easy deployment with **Vercel**
- API Routes with folder's structure
  - `[dynamic id]`
  - `[...multiple match]`
  - `(collocation)`
  - `_private`

### Use cases

- E-commerce websites
- Blogs and content-driven sites
- Dashboard and admin panels
- Marketing and landing pages
- Applications requiring dynamic and static content mix

## Install & Setup

```bash
# Create a new Next.js app
npx create-next-app@latest my-next-app
cd my-next-app

# Start the development server
npm run dev
```

### Project Structures

```txt title="Next 13+"
my-next-app/
├── node_modules/
├── public/
├── app/
│   └── layout.tsx
│   └── page.tsx
├── styles/
│   └── globals.css
├── .gitignore
├── package.json
└── README.md
```

## Fundamental

### Routing

```txt title="App folder structure"
├── app/
│   ├── components/           -> Not routing
│   │   └── Button.tsx
│   │   └── Dialog.tsx
│   ├── (auth)/
│   │   └── login/
│   │   │   └── page.tsx      -> /login
│   │   │   └── template.tsx  -> like layout but re-render when component update
│   │   └── register/
│   │       └── page.tsx      -> /register
│   ├── dashboard/
│   │   └── page.tsx          -> /dashboard
│   │   └── @notification
│   │   │   └── page.tsx      -> parallel but not routing
│   │   └── @users
│   │       └── page.tsx      -> parallel but not routing
│   │       └── archive
│   │           └── page.tsx  -> /dashboard/archive ??
│   ├── intercepting/
│   │   └── thing
│   │   │   └── page.tsx      -> /intercepting/thing
│   │   └── (.)thing
│   │       └── page.tsx      -> when re-render, this page will show -> refresh
│   ├── hello/
│   │   └── page.tsx          -> /hello
│   │   └── bros
│   │   │   └── page.tsx      -> /hello/bros
│   │   └── [username]
│   │       └── page.tsx      -> /hello/someone-name
│   ├── [...slugs]/
│   │   └── page.tsx          -> /topics1/sub-topic2/something
│   ├── _secret/
│   │   └── page.tsx          -> Not routing
│   └── layout.tsx            -> config components
│   └── page.tsx              -> index
│   └── not-found.tsx         -> custom not found display
```

```tsx title="app/hello/[username]/page.tsx"
import { useRouter } from "next/router";

export default function HelloUser() {
  const router = useRouter();
  const { username } = router.query;
  return <p>Hello {username}!</p>;
}
```

```tsx title="app/dashboard/page.tsx"
export function Dashboard({
  children: React.Node,
  notifications: React.Node,
  users: React.Node
}) {
  return (
    <div>
      {children}
      {notifications}
      {users}
    </div>
  );
}
```

### Server Component

```tsx title='app/components/ServerComponent.tsx'
async function ServerComponent() {
  const data = await fetch("https://api.example.com/data");
  const result = await data.json();

  return (
    <div>
      {result.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

// Using like normal components
<ServerComponent />;
```

### Metadata

- Good for **SEO**
- Use with file `[layout|page].[js|jsx|ts|tsx]`

```tsx title='app/layout.tsx'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default function Page() {}
```

## Notes

- **Fetch options**
  - Data on server-components has catching, put `{ cache: 'no-store' }`
  - To revidate on n seconds, put `{ next: { revalidate: time } }`
- **Component**

  - All components of Next is **server-components**
  - To make **client-components**, put `'use-client'` on top of file

    ```tsx
    "use-client";

    export function ClientComponent() {}
    ```

  - Hooks can only use in **client-components**
  - Package catching type of component: `client-only` & `server-only`
  - When to use
    - **Client**: actions | themes | user's behaviors
    - **Server**: fetching, work with file + data

## References

- [React](../../libraries/react/index.mdx)
- [Next.js Documentation](https://nextjs.org/docs)
- [Lightning-Fast Development with Turbo](https://turbo.build/) - 10x faster
