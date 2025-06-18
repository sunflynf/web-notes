---
description: The World's Most Advanced Open Source Relational Database
tags:
  - SQL
  - DBMS
---

# PostgreSQL

## Key Features

| Feature                       | Description                                                                                                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ACID Compliance**           | Strong transactional integrity with multi-version concurrency control (MVCC).                                                                                                                        |
| **Advanced Data Types**       | Built-in support for `JSON`, `JSONB`, `ARRAY`, `UUID`, `HSTORE`, etc.                                                                                                                                |
| **Full-Text Search**          | Powerful search capabilities natively supported, customizable ranking and dictionaries.                                                                                                              |
| **CTEs & Window Functions**   | Common Table Expressions and advanced windowing operations out-of-the-box.                                                                                                                           |
| **Extensions**                | Supports extensions like [`PostGIS`](https://postgis.net/), [`pg_trgm`](https://www.postgresql.org/docs/current/pgtrgm.html), [`uuid-ossp`](https://www.postgresql.org/docs/current/uuid-ossp.html). |
| **Concurrency & MVCC**        | Avoids locking via MVCC, enabling high performance in concurrent environments.                                                                                                                       |
| **Write-Ahead Logging (WAL)** | Ensures data safety and replication consistency.                                                                                                                                                     |
| **Streaming Replication**     | Native replication support for HA/DR setups.                                                                                                                                                         |
| **Security & Roles**          | Role-based authentication, row-level security (RLS), SSL/TLS support.                                                                                                                                |
| **Procedural Languages**      | Write functions in PL/pgSQL, Python, or others.                                                                                                                                                      |

## Connecting with Frameworks & ORMs

### NestJS (with [TypeORM](https://typeorm.io/))

```bash
npm install --save @nestjs/typeorm typeorm pg
```

```ts title="app.module.ts"
TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "your_db",
  autoLoadEntities: true,
  synchronize: true, // ⚠️ Disable in production
});
```

> ✅ Tip: Use `@nestjs/config` for environment-based configuration separation.

### [Prisma](https://www.prisma.io) (Node.js)

```bash
npm install prisma --save-dev
npm install @prisma/client pg
npx prisma init
```

```env title=".env"
DATABASE_URL="postgresql://postgres:password@localhost:5432/your_db"
```

```prisma title="prisma/schema.prisma"
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

> ✅ Supports PostgreSQL-specific features like `@db.Json`, `@db.Uuid`, etc.

### [Sequelize](https://sequelize.org) (Node.js)

```bash
npm install sequelize pg pg-hstore
```

```js title="db.js"
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("your_db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
```

> ✅ Sequelize supports array, JSONB, and UUID types via `DataTypes.ARRAY`, `DataTypes.JSONB`, and `DataTypes.UUID`.

### Spring Boot (with [Spring Data JPA](https://spring.io/projects/spring-data-jpa))

```xml title="pom.xml"
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <scope>runtime</scope>
</dependency>
```

```yaml title="application.yml"
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_db
    username: postgres
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

> ✅ Tip: Use Hibernate dialects like `org.hibernate.dialect.PostgreSQLDialect` for better support.

### Laravel (with [Eloquent ORM](https://laravel.com/docs/eloquent))

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_db
DB_USERNAME=postgres
DB_PASSWORD=password
```

```php title="config/database.php"
'pgsql' => [
    'driver' => 'pgsql',
    'host' => env('DB_HOST', '127.0.0.1'),
    ...
],
```

> ✅ Tip: Use Laravel’s native `migrate`, `seed`, and `factory` system for full DB lifecycle automation.

## Managing PostgreSQL with Docker

```yaml title="docker-compose.yml"
version: "3.8"
services:
  postgres:
    image: postgres:15
    container_name: postgres-db
    restart: always
    environment:
      POSTGRES_DB: your_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - backend

volumes:
  pg_data:

networks:
  backend:
```

```bash
# Use psql
docker exec -it postgres psql -U myuser -d mydatabase
```

:::tip

- Use healthchecks and secret mounts for prod readiness.
- Try GUI tools like **pgAdmin**, **DBeaver**, or **TablePlus**.

:::

## Deploying PostgreSQL with Kubernetes

**StatefulSet + PVC Example**:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: password
          volumeMounts:
            - name: postgres-pvc
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: postgres-pvc
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

:::tip

- 🔐 Use Kubernetes `Secrets` for password management and ConfigMaps for tuning (`postgresql.conf` overrides).
- 📦 Alternative: Use [Bitnami Helm Chart](https://github.com/bitnami/charts/tree/main/bitnami/postgresql) for advanced production-ready deployment.

:::

## Best Practices

### ⚙️ Configuration & Performance

- Enable `shared_buffers`, `work_mem`, `effective_cache_size` tuning.
- Use `EXPLAIN ANALYZE` and `pg_stat_statements` for query optimization.
- Add proper indexes for `JOIN`, `WHERE`, and `ORDER BY` fields.

### 🔐 Security

- Enforce SSL/TLS and role-based access (`REVOKE ALL`, `GRANT SELECT`).
- Enable **Row-Level Security (RLS)** when needed.
- Regularly rotate credentials and access tokens.

### 📈 Scaling Strategy

- Use **read replicas** for scaling reads.
- Add **connection pooling** (e.g., PgBouncer).
- Consider horizontal scaling with **Citus** for sharding if needed.

### 🧪 Dev Workflow

- Use **Testcontainers**, **Docker Compose**, or **local Kubernetes** to simulate production.
- Always track schema with **migrations** — Flyway, Liquibase, or ORM-native.
- Split environments via `.env`, `application.yml`, or secrets manager.

### 🔧 Monitoring & Maintenance

- Schedule backups (e.g., `pg_dump`, cron, or Velero).
- Use Prometheus + Grafana or [pgMonitor](https://github.com/CrunchyData/pgmonitor).
- Watch for slow queries, connection leaks, bloat, and WAL segment overflows.

## References

- [PostgreSQL Documents](https://www.postgresql.org/docs/current/)
- [PostgreSQL in Docker](https://www.datacamp.com/tutorial/postgresql-docker)
- [psql Command Line](https://tomcam.github.io/postgres/#getting-information-about-databases)
- [JS tools - node-postgres](/docs/technologies/js/api/query-builder/node-postgres.md)
