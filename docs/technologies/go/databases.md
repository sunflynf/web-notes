# Database Connection

In Go, you generally have **three layers of abstraction** to connect with databases:

| Level        | Description                                | Common Packages                                      |
| ------------ | ------------------------------------------ | ---------------------------------------------------- |
| 🧱 Low-level  | Use `database/sql` directly (standard lib) | `database/sql`, driver like `lib/pq`, `mysql`, `pgx` |
| ⚙️ Mid-level  | Lightweight ORM or query builder           | `sqlx`, `squirrel`, `pgxpool`                        |
| 🚀 High-level | Full ORM (models, relations, migrations)   | `GORM`, `Ent`, `Bun`, `Prisma Go` (coming up)        |

---

## 1. Standard Library: `database/sql`

### Import Driver & Connect

```go
import (
    "database/sql"
    _ "github.com/lib/pq" // PostgreSQL driver
)

dsn := "postgres://user:pass@localhost:5432/mydb?sslmode=disable"
db, err := sql.Open("postgres", dsn)
if err != nil { log.Fatal(err) }
defer db.Close()
```

### Ping & Check Connection

```go
if err := db.Ping(); err != nil {
    log.Fatal("DB unreachable:", err)
}
```

### Query Data

```go
rows, err := db.Query("SELECT id, name FROM users WHERE active=$1", true)
defer rows.Close()

for rows.Next() {
    var id int
    var name string
    rows.Scan(&id, &name)
    fmt.Println(id, name)
}
```

### Query Single Row

```go
var email string
err := db.QueryRow("SELECT email FROM users WHERE id=$1", 1).Scan(&email)
```

### Exec (INSERT/UPDATE/DELETE)

```go
res, err := db.Exec("UPDATE users SET name=$1 WHERE id=$2", "Fee Fight", 1)
affected, _ := res.RowsAffected()
```

### Transactions

```go
tx, _ := db.Begin()
_, err := tx.Exec("INSERT INTO logs(message) VALUES($1)", "hello")
if err != nil {
    tx.Rollback()
    return
}
tx.Commit()
```

---

## 2. Popular Drivers (plug into `database/sql`)

| Database        | Driver                         | Import Path                                                     |
| --------------- | ------------------------------ | --------------------------------------------------------------- |
| PostgreSQL      | `lib/pq` or `jackc/pgx/stdlib` | `_ "github.com/lib/pq"` or `_ "github.com/jackc/pgx/v5/stdlib"` |
| MySQL / MariaDB | `go-sql-driver/mysql`          | `_ "github.com/go-sql-driver/mysql"`                            |
| SQLite          | `modernc.org/sqlite` (pure Go) | `_ "modernc.org/sqlite"`                                        |
| SQL Server      | `denisenkom/go-mssqldb`        | `_ "github.com/denisenkom/go-mssqldb"`                          |

> ⚡ `pgx` is increasingly preferred over `lib/pq` for Postgres — it’s faster, supports more features, and can be used standalone or with `database/sql`.

---

## 3. `sqlx` — Upgraded `database/sql`

[https://github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)

Adds struct mapping, named queries, and convenience methods.

```go
import "github.com/jmoiron/sqlx"

db, _ := sqlx.Connect("postgres", dsn)

// Named parameters
rows, _ := db.NamedQuery("SELECT * FROM users WHERE age >= :age", map[string]interface{}{"age": 18})

// Struct mapping
type User struct { ID int `db:"id"`; Name string `db:"name"` }
var users []User
db.Select(&users, "SELECT id, name FROM users")
```

✅ Keeps control like `database/sql`
✅ Zero magic
⚙️ Great for microservices or APIs

---

## 4. `pgx` — Native Postgres Driver

[https://github.com/jackc/pgx](https://github.com/jackc/pgx)

Faster + more feature-rich (copy, notifications, pools, etc.)

```go
import "github.com/jackc/pgx/v5/pgxpool"

pool, _ := pgxpool.New(context.Background(), dsn)
defer pool.Close()

rows, _ := pool.Query(ctx, "SELECT id, name FROM users")
for rows.Next() {
    var id int
    var name string
    rows.Scan(&id, &name)
}
```

✅ Best for PostgreSQL-heavy backends
✅ Built-in connection pool
✅ Fine-grained control (batching, COPY, notifications)

---

## 5. `GORM` — The Most Popular ORM

[https://gorm.io](https://gorm.io)

### Setup

```go
import (
    "gorm.io/gorm"
    "gorm.io/driver/postgres"
)

dsn := "host=localhost user=me password=pass dbname=mydb sslmode=disable"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
```

### Model & Migrate

```go
type User struct {
    ID    uint   `gorm:"primaryKey"`
    Name  string
    Email string `gorm:"uniqueIndex"`
}
db.AutoMigrate(&User{})
```

### CRUD

```go
db.Create(&User{Name: "Fee", Email: "fee@fight.dev"})
var u User
db.First(&u, "email = ?", "fee@fight.dev")
db.Model(&u).Update("Name", "Fee Fight")
db.Delete(&u)
```

✅ ORM (relations, hooks, migrations)
✅ Very active community
⚙️ Slightly heavier, but solid for APIs and SaaS apps

---

## 6. `Ent` — Type-Safe ORM (by Facebook)

[https://entgo.io](https://entgo.io)

Ent generates Go code (schema → Go structs → SQL migrations).

```bash
go get entgo.io/ent/cmd/ent
go run entgo.io/ent/cmd/ent init User
```

Schema example:

```go
// ent/schema/user.go
func (User) Fields() []ent.Field {
    return []ent.Field{
        field.String("name"),
        field.String("email").Unique(),
    }
}
```

Generate code:

```bash
go generate ./ent
```

Usage:

```go
client, _ := ent.Open("postgres", dsn)
defer client.Close()

u, _ := client.User.Create().SetName("Fee").SetEmail("fee@fight.dev").Save(ctx)
fmt.Println(u.ID)
```

✅ Type-safe queries (compile-time check)
✅ Generates migrations
⚙️ Slight learning curve, best for larger apps

---

## 7. `Bun` — Modern ORM (Fast + Familiar)

[https://bun.uptrace.dev](https://bun.uptrace.dev)

Built on `pgx`, supports PostgreSQL, MySQL, SQLite.

```go
import (
    "github.com/uptrace/bun"
    "github.com/uptrace/bun/driver/pgdriver"
)

sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
db := bun.NewDB(sqldb, pgdialect.New())

type User struct {
    ID int64 `bun:",pk,autoincrement"`
    Name string
}

db.NewInsert().Model(&User{Name: "Fee"}).Exec(ctx)
```

✅ Fast, active, SQL-first ORM
✅ Integrates with metrics/logs easily
✅ Feels like GORM but lighter

---

## 8. NoSQL Options

| Database          | Package                                  | Notes                      |
| ----------------- | ---------------------------------------- | -------------------------- |
| **MongoDB**       | `go.mongodb.org/mongo-driver`            | Official driver            |
| **Redis**         | `github.com/redis/go-redis/v9`           | Great for caching, pub/sub |
| **Cassandra**     | `github.com/gocql/gocql`                 | Mature driver              |
| **Elasticsearch** | `github.com/elastic/go-elasticsearch/v8` | Official client            |

Example Mongo snippet:

```go
client, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
col := client.Database("test").Collection("users")
col.InsertOne(ctx, bson.M{"name": "Fee"})
```

---

## 9. Connection Pooling

* `database/sql` already pools connections internally.
* `pgxpool` (for Postgres) gives explicit control.
* Tune with:

  ```go
  db.SetMaxOpenConns(10)
  db.SetMaxIdleConns(5)
  db.SetConnMaxLifetime(time.Hour)
  ```

---

## 10. Migration Tools

| Tool               | Command                                                   | Description  |
| ------------------ | --------------------------------------------------------- | ------------ |
| **golang-migrate** | `migrate -path db/migrations -database postgres://... up` | CLI + Go API |
| **goose**          | Simple, SQL-based migrations                              |              |
| **gormigrate**     | For GORM ORM projects                                     |              |
| **atlas**          | Modern schema management for Ent / SQL                    |              |

## 💡 Recommended Stack (2025)

| Scale                         | Stack                     | Why                                 |
| ----------------------------- | ------------------------- | ----------------------------------- |
| 🧩 Small API                   | `database/sql` + `sqlx`   | Lightweight & fast                  |
| 🚀 Mid-size service            | `pgx` or `Bun`            | Strong performance + dev ergonomics |
| 🧠 Full app / SaaS             | `GORM` or `Ent`           | Rich ORM + migration system         |
| ⚡ Data-intensive / custom SQL | `pgxpool` + query builder | Max control                         |
