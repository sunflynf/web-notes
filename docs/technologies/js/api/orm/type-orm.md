---
description: ORM Tech
tags:
    - JavaScript
    - TypeScript
---

# TypeORM

A quick reference for TypeORM, an ORM for TypeScript and JavaScript, supporting databases like PostgreSQL, MySQL, SQLite, MongoDB, Oracle, etc.

## Installation

```bash
npm install typeorm reflect-metadata
# Install database driver, e.g., for PostgreSQL:
npm install pg
```

Enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`.

## Configuration

Create a `data-source.ts` or `ormconfig.json` to configure the database connection.

### PostgreSQL

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "pass",
  database: "mydb",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false, // Set to false in production
});
```

### MySQL / MariaDB

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql", // or "mariadb"
  host: "localhost",
  port: 3306,
  username: "user",
  password: "pass",
  database: "mydb",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
});
```

### MongoDB

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb://localhost:27017/mydb",
  useNewUrlParser: true,
  entities: ["src/entity/**/*.ts"],
  synchronize: true, // MongoDB supports synchronize
});
```

> **Note**: MongoDB requires `typeorm` version with MongoDB support (`npm install typeorm@latest`) and uses a different entity structure (no migrations).

### Oracle

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: "user",
  password: "pass",
  serviceName: "orcl", // or SID
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
});
```

> **Note**: Install `oracledb` driver (`npm install oracledb`) and ensure Oracle Instant Client is configured.

### SQLite

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./mydb.sqlite",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
});
```

> **Note**: Install `sqlite3` driver (`npm install sqlite3`).

### Initialize in your app

```ts
AppDataSource.initialize()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Error:", err));
```

## Entity

Define a model with decorators to map to a database table.

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

## Repository

Use repositories to perform CRUD operations.

```ts
const userRepository = AppDataSource.getRepository(User);

// Create
const user = new User();
user.name = "John Doe";
user.email = "john@example.com";
await userRepository.save(user);

// Read
const users = await userRepository.find();
const user = await userRepository.findOneBy({ id: 1 });

// Update
user.name = "Jane Doe";
await userRepository.save(user);

// Delete
await userRepository.delete({ id: 1 });
```

## Relations

Define relationships between entities.

### One-to-Many / Many-to-One

```ts
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
```

### Many-to-Many

Define a many-to-many relationship, e.g., between User and Role with a junction table.

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() // Required on one side to create the junction table
  roles: Role[];
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
```

### Eager vs. Lazy Loading

- **Eager**: Load relations automatically (`@ManyToOne(..., { eager: true })`).
- **Lazy**: Load relations on demand using `Promise` (requires `enableEs6: true` in `tsconfig.json`).

## Query Builder

For complex queries, use the query builder.

```ts
const users = await AppDataSource.getRepository(User)
  .createQueryBuilder("user")
  .where("user.name = :name", { name: "John" })
  .andWhere("user.age > :age", { age: 18 })
  .getMany();
```

## Migrations

Generate and run migrations to manage schema changes.

```bash
# Generate migration
npx typeorm migration:generate src/migration/Init -d src/data-source.ts
# Run migrations
npx typeorm migration:run -d src/data-source.ts
```

### Example Migration

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697051234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user ...`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
```

## Transactions

Use transactions for atomic operations.

```ts
await AppDataSource.transaction(async (transactionalEntityManager) => {
  await transactionalEntityManager.save(User, { name: "John", email: "john@example.com" });
  await transactionalEntityManager.save(Post, { title: "First Post", user: user });
});
```

## Tips

- Use `synchronize: false` in production to avoid auto-schema changes.
- Enable logging for debugging: `logging: true` in DataSource config.
- Use `findOneOrFail` to throw an error if no entity is found.
- For performance, select specific columns with `select: ["id", "name"]` in `find` options.

## Common Issues

- **Connection Error**: Verify database credentials and ensure the DB server is running.
- **Entity Not Found**: Check `entities` path in DataSource config.
- **Migration Fails**: Ensure `migrations` path is correct and run migrations in order.

## Useful Links

- [TypeORM Official Documentation](https://typeorm.io/)
- [TypeORM GitHub Repository](https://github.com/typeorm/typeorm)
