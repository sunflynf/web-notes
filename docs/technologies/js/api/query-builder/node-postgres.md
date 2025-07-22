---
description: A promise-based ORM
tags:
  - JavaScript
  - TypeScript
---

# Node-postgres

## 1. Installation

```bash
npm install pg
```

## 2. Setting Up a Database Connection

The core of `pg` involves creating a client and establishing a connection. There are two primary ways to manage connections in `pg`:

- **Using a Single Client**
- **Using a Connection Pool** (recommended for most applications)

```javascript
// Connecting with a Single Client
import { Client } from "pg";

const client = new Client({
  user: "your_database_user",
  host: "localhost",
  database: "your_database_name",
  password: "your_database_password",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Connection error", err.stack));
```

```javascript
// Using a Connection Pool (Recommended)
import { Pool } from "pg";

const pool = new Pool({
  user: "your_database_user",
  host: "localhost",
  database: "your_database_name",
  password: "your_database_password",
  port: 5432,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to database");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => console.error("Connection error", err.stack));
```

## 3. CRUD Queries

With `pg`, queries can be executed with either `client.query` or `pool.query`.

```javascript
pool
  .query("INSERT INTO users(name, age) VALUES($1, $2) RETURNING *", [
    "John Doe",
    30,
  ])
  .then((result) => console.log("User added:", result.rows[0]))
  .catch((error) => console.error("Insert error", error.stack));
```

```javascript
pool
  .query("SELECT * FROM users WHERE id = $1", [1])
  .then((result) => console.log(result.rows))
  .catch((error) => console.error("Query error", error.stack));
```

```javascript
pool
  .query("UPDATE users SET age = $1 WHERE id = $2 RETURNING *", [31, 1])
  .then((result) => console.log("User updated:", result.rows[0]))
  .catch((error) => console.error("Update error", error.stack));
```

```javascript
pool
  .query("DELETE FROM users WHERE id = $1 RETURNING *", [1])
  .then((result) => console.log("User deleted:", result.rows[0]))
  .catch((error) => console.error("Delete error", error.stack));
```

## 4. Advanced Queries

### Table Joins

```javascript
pool
  .query(
    `
  SELECT users.name, orders.amount 
  FROM users 
  JOIN orders ON users.id = orders.user_id 
  WHERE users.id = $1`,
    [1]
  )
  .then((result) => console.log(result.rows))
  .catch((error) => console.error("Join query error", error.stack));
```

### Aggregations

```javascript
pool
  .query("SELECT SUM(amount) as total_amount FROM orders")
  .then((result) => console.log("Total amount:", result.rows[0].total_amount))
  .catch((error) => console.error("Aggregation error", error.stack));
```

### Complex Conditions

```javascript
pool
  .query("SELECT * FROM users WHERE age > $1 OR status = $2", [25, "active"])
  .then((result) => console.log(result.rows))
  .catch((error) => console.error("Conditional query error", error.stack));
```

## 5. Prepared Statements

Prepared statements are useful to prevent SQL injection and improve performance on repeated queries.

```javascript
const queryText = "INSERT INTO users(name, age) VALUES($1, $2) RETURNING *";
const values = ["Alice", 24];

pool
  .query(queryText, values)
  .then((result) => console.log("User added:", result.rows[0]))
  .catch((error) => console.error("Prepared statement error", error.stack));
```

## 6. Transactions

Transactions ensure multiple queries are executed as a single atomic operation. If one query fails, the whole transaction is rolled back.

```javascript
async function transferFunds(fromUserId, toUserId, amount) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const deduct =
      "UPDATE accounts SET balance = balance - $1 WHERE user_id = $2";
    const add = "UPDATE accounts SET balance = balance + $1 WHERE user_id = $2";

    await client.query(deduct, [amount, fromUserId]);
    await client.query(add, [amount, toUserId]);

    await client.query("COMMIT");
    console.log("Transaction successful");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Transaction failed:", error.stack);
  } finally {
    client.release();
  }
}
```

## 7. Connection Pooling

Using a pool is typically more efficient, as it manages a set of reusable database connections.

```javascript
const pool = new Pool({
  user: "your_database_user",
  host: "localhost",
  database: "your_database_name",
  password: "your_database_password",
  port: 5432,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for acquiring new clients
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
```

## 8. Error Handling

Error handling is essential for managing database connection issues, query errors, and transaction rollbacks.

```javascript
pool
  .query("SELECT * FROM non_existing_table")
  .then((result) => console.log(result.rows))
  .catch((error) => {
    if (error.code === "42P01") {
      // Undefined table error code
      console.error("Table does not exist.");
    } else {
      console.error("Query error:", error.stack);
    }
  });
```

## References

- [PostgreSQL](/docs/technologies/database/relational/postgre.md)
- [Node Postgres - Official Documents](https://node-postgres.com/)
