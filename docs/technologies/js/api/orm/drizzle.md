---
description: Lightweight, fast & Type-safe SQL queries
tags:
    - JavaScript
    - TypeScript
---

# Drizzle

- **Type-safe SQL queries** (auto-completion)  
- **Lightweight & fast** (no runtime overhead)  
- **Supports raw SQL** when needed  
- **Schema migrations** (via `drizzle-kit`)  
- Works with PostgreSQL, SQLite, MySQL, and more

## Installation & Setup

```bash
npm install drizzle-orm
npm install drizzle-kit --save-dev  # For migrations & CLI
```  

## Database Connection

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: "postgres://user:pass@localhost:5432/db" });
const db = drizzle(pool);
```  

```ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);
```  

## Schema Definition

```ts
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

// Define a table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  role: text('role', { enum: ['admin', 'user'] }).default('user'),
});
```  

```ts
// Relations (1-to-many)
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title'),
  authorId: integer('author_id').references(() => users.id),
});
```  

## CRUD Operations

```ts
await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com',
}).returning(); // Returns inserted record
```  

```ts
// Get all users
const allUsers = await db.select().from(users);

// Get with WHERE condition
const user = await db.select().from(users).where(eq(users.email, 'alice@example.com'));

// Join tables
const postsWithAuthors = await db
  .select({
    postTitle: posts.title,
    authorName: users.name,
  })
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id));
```  

```ts
await db.update(users)
  .set({ name: 'Bob' })
  .where(eq(users.id, 1))
  .returning(); // Returns updated records
```  

```ts
await db.delete(users)
  .where(eq(users.id, 1))
  .returning(); // Returns deleted records
```

## Migrations

```ts title="drizzle.config.ts"
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: { connectionString: "postgres://..." },
} satisfies Config;
```  

```bash
npx drizzle-kit generate:pg  # Generates SQL migration files
npx drizzle-kit push:pg     # Applies migrations directly (dev)
```  

## Advanced Queries

### Transactions

```ts
await db.transaction(async (tx) => {
  await tx.insert(users).values({ name: 'Alice' });
  await tx.insert(posts).values({ title: 'Hello', authorId: 1 });
});
```  

### Aggregations

```ts
const stats = await db
  .select({
    total: count(),
    avgViews: avg(posts.views),
  })
  .from(posts);
```  

### Prepared Statements (SQL Injection-safe)

```ts
const getUser = db.query.users
  .findFirst({ where: eq(users.id, sql.placeholder('id') })
  .prepare();

const user = await getUser.execute({ id: 1 });
```  

## References

- [Drizzle ORM Docs](https://orm.drizzle.team/)  
- [Drizzle Kit (Migrations)](https://orm.drizzle.team/kit-docs/overview)
