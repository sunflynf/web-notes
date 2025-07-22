---
description: Type-safe database client & Schema-first approach
tags:
  - JavaScript
  - TypeScript
---

# Prisma

- Type-safe database client
- Schema-first approach
- Auto-completion for all queries
- Handles connections, pooling, and transactions
- Works with all major databases

For complex queries, Prisma Client provides an intuitive API that covers 95% of use cases while allowing raw SQL when needed.

## Core Setup

```bash
npm install prisma tsx --save-dev
npm install @prisma/client

# Initialize Prisma in project
npx prisma init --db --output ../app/generated/prisma
```

## Basic Schema (SQLite example)

```prisma title="prisma/schema.prisma"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

Key schema elements:

- `@id` = Primary key
- `@unique` = Unique constraint
- `?` = Optional field
- `@relation` = Defines relationships

## Common Commands

```bash
npx prisma generate    # Generate client after schema changes
npx prisma migrate dev --name "init"  # Create & apply migrations
npx prisma studio      # GUI to view/edit data
npx prisma db push     # Sync schema without migrations (dev only)
```

## CRUD Operations

```ts
// Create single record
await prisma.user.create({
  data: { email: "user@example.com", name: "Alice" }
})

// Create with relation
await prisma.user.create({
  data: {
    email: "user@example.com",
    posts: {
      create: [{ title: "First Post" }]
    }
  }
})
```

```ts
// Find all
const users = await prisma.user.findMany()

// Find with conditions
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" }
})

// Include relations
const usersWithPosts = await prisma.user.findMany({
  include: { posts: true }
})

// Pagination
const posts = await prisma.post.findMany({
  skip: 10,
  take: 5
})
```

```ts
// Single update
await prisma.user.update({
  where: { id: 1 },
  data: { name: "Updated Name" }
})

// Update or create (upsert)
await prisma.user.upsert({
  where: { email: "user@example.com" },
  update: { name: "Updated" },
  create: { email: "user@example.com", name: "New User" }
})
```

```ts
// Delete single
await prisma.user.delete({
  where: { id: 1 }
})

// Delete many
await prisma.post.deleteMany({
  where: { createdAt: { lt: new Date('2023-01-01') } }
})
```

## Advanced Patterns

### Transactions

```ts
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: "user@example.com" } }),
  prisma.post.create({ data: { title: "Hello" } })
])
```

### Aggregations

```ts
const stats = await prisma.post.aggregate({
  _count: true,
  _avg: { views: true },
  where: { published: true }
})
```

### Raw SQL (when needed)

```ts
const users = await prisma.$queryRaw`
  SELECT * FROM User WHERE active = true LIMIT 10
`
```

## Production Tips

### 1. Connection Handling

```ts
// Best practice for Next.js/Edge
const prisma = new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
```

### 2. Indexes for Performance

```prisma
model User {
  id    Int    @id
  email String @unique
  @@index([name]) // Composite index
}
```

### 3. Environment Variables

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Common Use Cases

### 1. Next.js API Routes

```ts title="pages/api/users.ts"
export default async function handler(req, res) {
  const users = await prisma.user.findMany()
  res.json(users)
}
```

### 2. Serverless Functions

```ts
// Lambda/Cloud Function
export const handler = async () => {
  const data = await prisma.data.findMany()
  return { statusCode: 200, body: JSON.stringify(data) }
}
```

### 3. CLI Scripts

```ts title="scripts/seed.ts"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  await prisma.user.createMany({ data: [...] })
}
```

## References

1. [Prisma Documentation](https://www.prisma.io/docs/) - The complete guide to all Prisma features, from basic CRUD to advanced patterns.
2. [Prisma Client API Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference) - Detailed reference for all query methods (`findMany`, `create`, etc.).
3. [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - Syntax for defining models, enums, relations, and database configurations.
4. [Prisma Studio](https://www.prisma.io/studio) - GUI to view/edit your database directly

---

1. [Prisma with Express.js](https://www.prisma.io/express) - Official guide for using Prisma in Express.js applications.
