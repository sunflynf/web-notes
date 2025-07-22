---
description: SQL Query builder
tags:
  - JavaScript
  - TypeScript
  - SQL
---

# Knex.js

## 1. Installation

```bash
npm install knex
npm install pg # or mysql2 / sqlite3 depending on your database
```

## 2. Setting Up Knex

```js title="knexfile.js"
module.exports = {
  development: {
    client: "pg", // or 'mysql', 'sqlite3', etc.
    connection: {
      host: "127.0.0.1",
      user: "your_database_user",
      password: "your_database_password",
      database: "myapp_test",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
```

## 3. Configuration

```js
import knex from "knex";
import config from "./knexfile";
const db = knex(config.development);
```

## 4. Creating a Connection

```js
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "your_database_user",
    password: "your_database_password",
    database: "myapp_test",
  },
});
```

## 5. CRUD Queries

```js
db("users")
  .insert({ name: "John Doe", age: 30 })
  .then(() => console.log("User added"))
  .catch((error) => console.error(error));
```

```js
db("users")
  .select("*")
  .where({ id: 1 })
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

```js
db("users")
  .where({ id: 1 })
  .update({ age: 31 })
  .then(() => console.log("User updated"))
  .catch((error) => console.error(error));
```

```js
db("users")
  .where({ id: 1 })
  .del()
  .then(() => console.log("User deleted"))
  .catch((error) => console.error(error));
```

## 6. Advanced Queries

### Table Joins

```js
db("users")
  .join("orders", "users.id", "=", "orders.user_id")
  .select("users.name", "orders.amount")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Aggregations

```js
db("orders")
  .sum("amount as total_amount")
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### Complex Conditions

```js
db("users")
  .where("age", ">", 25)
  .orWhere("status", "=", "active")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

## 7. Migrations

Migrations allow you to create and manage database schema changes.

### Creating a Migration

Run the following command to create a migration file:

```bash
npx knex migrate:make migration_name
```

### Example Migration

```js title="migrations/20220101010101_create_users_table.js"
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("name");
    table.integer("age");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
```

### Running Migrations

```bash
# Run migrations with
npx knex migrate:latest

# Rollback with
npx knex migrate:rollback
```

## 8. Seeding Data

### Creating a Seed

Run the following command to create a seed file:

```bash
npx knex seed:make seed_name
```

### Example Seed

```js title="seeds/initial_users.js"
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        { name: "John Doe", age: 30 },
        { name: "Jane Doe", age: 28 },
      ]);
    });
};
```

### Running Seeds

```bash
npx knex seed:run
```

## 9. Transactions

Transactions allow you to execute a sequence of queries as a single operation. If any query fails, the entire transaction is rolled back.

```js
db.transaction((trx) => {
  return trx("users")
    .insert({ name: "Alice", age: 24 })
    .then(() => {
      return trx("orders").insert({ user_id: 1, amount: 100 });
    });
})
  .then(() => console.log("Transaction successful"))
  .catch((error) => console.error("Transaction failed", error));
```

## 10. Error Handling

Handle errors gracefully by using `.catch()` for promise chains, or `try/catch` blocks with async/await.

```js
async function getUser(id) {
  try {
    const user = await db("users").where({ id }).first();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
```

:::tip Additional Tips

- Always close the Knex connection when your app terminates to prevent hanging connections.
- Use environment variables for sensitive information (e.g., database credentials).
- For complex applications, consider setting up a separate query builder module.

:::

## Reference

- [Knex - Official Documents](https://www.npmjs.com/package/knex)
