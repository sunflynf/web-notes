---
description: The world's most popular open source database
tags:
  - SQL
  - DBMS
---

# MySQL

## Key Features

| Feature                    | Description                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **ACID Compliance**        | Ensures data consistency and reliability through atomic transactions (especially with InnoDB).   |
| **Storage Engine Support** | Supports multiple engines like InnoDB (default), MyISAM, MEMORY, ARCHIVE.                        |
| **Replication**            | Master-Slave, Master-Master, and Group Replication for high availability and horizontal scaling. |
| **Partitioning**           | Table partitioning to enhance performance on large datasets.                                     |
| **Full-Text Search**       | Native full-text indexes and MATCH...AGAINST queries for fast text search.                       |
| **GIS Support**            | Supports spatial data types and indexing for geolocation applications.                           |
| **JSON Support**           | Native JSON column type and functions for modern structured/unstructured data.                   |
| **Performance Schema**     | Real-time diagnostics and profiling for SQL execution and memory usage.                          |
| **Security Features**      | SSL/TLS, password expiration policies, role-based access control.                                |
| **Event Scheduler**        | Cron-like functionality to schedule and automate tasks at the DB level.                          |

## Connecting with Frameworks & ORMs

### NestJS (with [TypeORM](https://typeorm.io/))

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

```ts title="app.module.ts"
TypeOrmModule.forRoot({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "your_db",
  autoLoadEntities: true,
  synchronize: true, // ⚠️ Avoid in production
});
```

> ✅ Tip: Use `.env` with [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) for better secrets management.

### [Prisma](https://www.prisma.io) (Node.js)

```bash
npm install prisma --save-dev
npm install @prisma/client mysql2
npx prisma init
```

```env title=".env"
DATABASE_URL="mysql://root:password@localhost:3306/your_db"
```

```prisma title="prisma/schema.prisma"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

> ✅ Tip: Use [Prisma Studio](https://www.prisma.io/studio) (`npx prisma studio`) for a visual DB browser.

### [Sequelize](https://sequelize.org) (Node.js)

```bash
npm install sequelize mysql2
```

```js title="db.js"
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("your_db", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
```

> ✅ Tip: Use [sequelize-cli](https://github.com/sequelize/cli) for migrations and DB seeders.

### Spring Boot (with [Spring Data JPA](https://spring.io/projects/spring-data-jpa))

```xml title="pom.xml"
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

```yaml title="application.yml"
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_db
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

> ✅ Tip: Add [`Flyway`](https://flywaydb.org/) or [`Liquibase`](https://www.liquibase.org/) for safe schema versioning.

### Laravel (with [Eloquent ORM](https://laravel.com/docs/eloquent))

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db
DB_USERNAME=root
DB_PASSWORD=password
```

```php title="config/database.php"
'mysql' => [
    'driver' => 'mysql',
    'host' => env('DB_HOST', '127.0.0.1'),
    ...
],
```

> ✅ Tip: Use `php artisan migrate:fresh --seed` during development.

Here’s the additional section for **Prisma** and **Sequelize** integration with **MySQL**, designed in the same style as the previous sections:

## Managing MySQL with Docker

```yaml title="docker-compose.yml"
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: your_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - backend

volumes:
  db_data:

networks:
  backend:
```

```bash
# Using bash when container is running
docker exec -it mysql-db bash
# Connect to the MySQL server as the root user
mysql -u root -p
```

:::tip

- Use `.env` and secret files for production-grade credentials.
- Attach monitoring sidecars like [MySQL Exporter](https://github.com/prometheus/mysqld_exporter) for Prometheus.

:::

## Deploying MySQL with Kubernetes (K8s)

**StatefulSet + Persistent Volume Claim**:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: root-password
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: mysql-persistent-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

:::tip

- 🛡️ Use [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to store DB credentials and `mysql-config` ConfigMap for tuning.
- 🔄 Consider tools like [Bitnami MySQL Helm Chart](https://github.com/bitnami/charts/tree/main/bitnami/mysql) for production-grade deployments.

:::

## Best Practices

### Configuration & Performance

- Prefer **InnoDB** for transactions, row-level locking, and crash recovery.
- Optimize settings like `innodb_buffer_pool_size` based on server memory.
- Use indexes wisely; over-indexing can degrade writes.

### Security

- Never expose MySQL directly to the internet.
- Use non-root users with limited permissions.
- Enable SSL and use certificate-based authentication in production.

### Development Workflow

- Automate DB setup using tools like `docker-compose` or Testcontainers.
- Use versioned migrations instead of auto schema sync.
- Separate dev/test/prod DB configs.

### Scaling Strategy

- Start with read replicas.
- Shard based on business logic (user ID, region, etc.) if needed.
- Use external caching layers like Redis for performance boost.

### Maintenance & Monitoring

- Set up automatic backups (e.g., cron jobs or Kubernetes Jobs).
- Monitor metrics via Prometheus/Grafana or tools like PMM.
- Regularly review and optimize slow queries.

## Resources

- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [How to Set Up and Configure MySQL in Docker](https://www.datacamp.com/tutorial/set-up-and-configure-mysql-in-docker)
