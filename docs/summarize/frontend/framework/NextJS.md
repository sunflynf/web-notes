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

- Client-side rendering
- Server-side rendering
- Static site generation
- Improve performance and SEO

## Install & Setup

```bash
# Create a new Next.js app
npx create-next-app@latest my-next-app
cd my-next-app

# Start the development server
npm run dev
```

### Project Structures

```txt
my-next-app/
├── node_modules/
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public/
├── styles/
│   └── globals.css
├── .gitignore
├── package.json
└── README.md
```

## Using

### Page & Routing

```tsx
// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}
```

```tsx
// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <p>Post: {id}</p>;
}
```

### API Routes

```tsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```
