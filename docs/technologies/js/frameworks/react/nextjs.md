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

```tsx title="pages/index.tsx"
export default function Home() {
  return <h1>Home Page</h1>;
}
```

```tsx title="pages/posts/[id].tsx"
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <p>Post: {id}</p>;
}
```

### API Routes

```tsx title="pages/api/hello.ts"
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

### `use server`

```ts title="submit-form.ts"
'use server'

export async function submitForm(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  // Process the form data on the server
  // ...
}
```

```tsx title='FormLogin.tsx'
import { submitForm } from './submit-form'

export default function Form() {
  return (
    <form action={submitForm}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Server Component

```tsx title='app/ServerComponent.tsx'
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data')
  const result = await data.json()

  return <div>{result.map(item => <p key={item.id}>{item.name}</p>)}</div>
}

// Using like normal components
<ServerComponent />
```

### Metadata

- Good for **SEO**
- Use with file `[layout|page].[js|jsx|ts|tsx]`

```tsx title='app/layout.tsx'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '...',
  description: '...',
}
 
export default function Page() {}
```

## Tips

- [Lightning-Fast Development with Turbo](https://turbo.build/) - 10x faster
<!-- - [] -->
