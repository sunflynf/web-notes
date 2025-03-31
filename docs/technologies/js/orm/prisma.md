---
description: ORM Tech
tags:
  - JavaScript
  - TypeScript
---

# Prisma

**Think of Prisma as a helpful translator between your code and your database.** It allows you to write JavaScript/TypeScript code to interact with your database instead of writing raw SQL, making development faster, safer, and more enjoyable.

## 1. Prerequisites

- **Node.js and npm (or yarn/pnpm)**
- **Database:**
  - **PostgreSQL:** A powerful and popular open-source database.
  - **MySQL:** Another widely used open-source database.
  - **SQLite:** A lightweight file-based database (great for local development and learning).
  - **SQL Server:** Microsoft's relational database.
  - **MongoDB (preview):** Support for MongoDB is currently in preview.

## 2. Setting up your Project

```bash
mkdir prisma-beginner-project
cd prisma-beginner-project
npm init -y  # Creates a default package.json file
```

## 3. Installing Prisma CLI and Client

```bash
npm install prisma prisma-client @prisma/client --save-dev
```

- **`prisma`:** The Prisma CLI is used for tasks like initializing Prisma, generating the Prisma Client, running migrations, and more.
- **`prisma-client` & `@prisma/client`:** These packages are necessary for generating and using the actual Prisma Client within your JavaScript/TypeScript code.

## 4. Initializing Prisma

- Create a `prisma` directory in your project.
- Create a `schema.prisma` file within the `prisma` directory.
- Create a `.env` file (if you don't have one already).

```bash
npx prisma init
```

## 5. Understanding `schema.prisma`

Open the `prisma/schema.prisma` file. This is the heart of Prisma, where you define your database schema using the Prisma Schema Language (PSL). It's divided into three main parts:

- **`generator client`:** Configures how the Prisma Client is generated. By default, it's set to `prisma-client-js` for JavaScript/TypeScript projects.
- **`datasource db`:** Defines how Prisma connects to your database. You'll need to configure the `provider` and `url` here.
- **`model`:** This is where you define your data models (tables in relational databases, collections in MongoDB).

**Let's modify `schema.prisma` to use SQLite and define a simple `User` model:**

```js title='schema.prisma'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db" // Path to your SQLite database file
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[] // Relation to the Post model (explained later)
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

**Explanation:**

- **`datasource db`**
  - `provider = "sqlite"`: We're using SQLite.
  - `url = "file:./dev.db"`: Prisma will create an SQLite database file named `dev.db` in your project root (if it doesn't exist).
- **`model User`**
  - `id    Int     @id @default(autoincrement())`: `id` is an integer, marked as the `@id` (primary key), and `@default(autoincrement())` means it will automatically increase with each new user.
  - `email String  @unique`: `email` is a string, marked as `@unique` (ensuring no two users have the same email).
  - `name  String?`: `name` is a string, `?` indicates it's optional (nullable).
  - `posts Post[]`: This defines a relation to the `Post` model (one-to-many relationship - one user can have multiple posts). We'll discuss relations in more detail later.
- **`model Post`**
  - Similar structure, defining fields for posts.
  - `author    User     @relation(fields: [authorId], references: [id])`: This is the other side of the relation, connecting `Post` back to `User`. It specifies that the `author` field is a `User` and is related through the `authorId` field in the `Post` model, referencing the `id` field in the `User` model.

## 6. Generating Prisma Client

Now that you've defined your schema, you need to generate the Prisma Client. This will create a type-safe client library based on your `schema.prisma` that you can use in your code.

```bash
npx prisma generate
```

This command reads your `schema.prisma` and creates the Prisma Client in the `@prisma/client` package.

## 7. Creating and Applying Migrations

Prisma Migrate helps you evolve your database schema over time. The first step is to create a migration based on your `schema.prisma` and then apply it to your database.

```bash
npx prisma migrate dev --name init
```

- **`prisma migrate dev`:** This command is used during development. It will:
  - Compare your current `schema.prisma` with the current database schema.
  - Generate a new migration (if there are changes).
  - Apply the migration to your development database (SQLite `dev.db` in our case).
  - The `--name init` flag gives your migration a descriptive name ("init" in this case, indicating the initial migration).

You'll see a new `migrations` directory created in your `prisma` folder containing the SQL files for your migration.

## 8. Using Prisma Client in your Code

Now you can start writing code to interact with your database using the Prisma Client\!

```javascript title="script.js"
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      posts: {
        create: [
          { title: "Hello Prisma", content: "My first post with Prisma!" },
          { title: "Another Post", content: "Just testing things out." },
        ],
      },
    },
  });
  console.log("Created new user:", newUser);

  // Find all users
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true, // Include related posts in the result
    },
  });
  console.log("All users:", allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect Prisma Client when done
  });
```

**Explanation:**

- **`const { PrismaClient } = require('@prisma/client');`:** Imports the `PrismaClient` constructor from the generated `@prisma/client` package.
- **`const prisma = new PrismaClient();`:** Creates an instance of the Prisma Client. This is your entry point to interact with your database.
- **`async function main() { ... }`:** We use an `async` function because Prisma Client operations are asynchronous (they return Promises).
- **`await prisma.user.create({ ... })`:**
  - `prisma.user` accesses the `User` model (defined in your `schema.prisma`).
  - `.create({ data: { ... } })` creates a new record in the `User` table.
  - `data: { email: 'alice@example.com', name: 'Alice', posts: { create: [...] } }`: Provides the data for the new user. Notice how we can also create related `posts` in the same operation (nested writes).
- **`await prisma.user.findMany({ ... })`:**
  - `prisma.user.findMany()` retrieves multiple `User` records.
  - `include: { posts: true }`: This is called **eager loading**. It tells Prisma to also fetch the related `posts` for each user in a single query, improving efficiency.
- **`console.log(...)`:** Prints the results to the console.
- **`.catch(...)` and `.finally(...)`:** Basic error handling and ensuring Prisma Client is disconnected after the script runs.
- **`prisma.$disconnect()`:** Important to disconnect the Prisma Client gracefully when you're done with it.

## 9. Running your Script

```bash
node script.js
```

You should see output in your console showing the created user and a list of all users (including Alice with her posts). If you open the `dev.db` file (you can use a SQLite browser application), you'll see the `User` and `Post` tables populated with data.

## Next Steps and Further Learning

This is just the beginning\! Prisma offers many more powerful features. Here are some things you can explore next:

- **More Prisma Client Operations:** Learn about `findUnique`, `findFirst`, `update`, `delete`, `upsert`, aggregations, transactions, and more in the Prisma Client documentation.
- **Relations:** Dive deeper into defining and querying relations between models (one-to-one, one-to-many, many-to-many).
- **Prisma Studio:** A visual database editor that allows you to view and manage your data directly from your browser. Run `npx prisma studio` to launch it.
- **Prisma Migrate in Production:** Learn how to use `prisma migrate deploy` for applying migrations in production environments.
- **Different Databases:** Experiment with connecting Prisma to PostgreSQL, MySQL, or other supported databases.
- **Advanced Schema Features:** Explore more advanced features of the Prisma Schema Language, like enums, custom types, indexes, and more.
- **TypeScript Support:** If you're using TypeScript, Prisma is even more powerful as it provides excellent type safety throughout your database interactions.

## Key Takeaways for Beginners

- **Schema-First Approach:** Prisma emphasizes defining your database schema in `schema.prisma` first, then generating code from it. This promotes a structured and predictable development process.
- **Type Safety:** Prisma Client is type-safe, which means you get autocompletion and error checking in your code editor, reducing errors and improving developer experience.
- **Developer Experience:** Prisma is designed to make database interactions enjoyable. Its intuitive API and helpful tools like Prisma Studio contribute to a smooth development workflow.
- **Database Migrations Made Easy:** Prisma Migrate simplifies database schema management, making it easier to track changes and keep your database in sync with your application.
- [**Documentation**](https://www.prisma.io/docs/)
