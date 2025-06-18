---
description: Database Management System.
tags:
  - NoSQL
  - JSON
  - DBMS
---

# MongoDB

## Key Features of MongoDB

| Feature                   | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| **Document-Oriented**     | Stores data in flexible, JSON-like documents (BSON format).         |
| **Schema-less**           | Collections do not enforce a fixed schema.                          |
| **Horizontal Scaling**    | Native sharding support for massive scalability.                    |
| **Rich Query Language**   | Supports nested queries, aggregation pipeline, and text search.     |
| **Indexing**              | Compound, geospatial, text, hashed, and wildcard indexing.          |
| **Replication & HA**      | Replica sets provide automatic failover and redundancy.             |
| **Aggregation Framework** | Advanced data processing pipeline for transformation and analytics. |
| **Change Streams**        | Real-time data change tracking.                                     |
| **Atlas Integration**     | Managed MongoDB on the cloud with backups, monitoring, and scaling. |

## Connecting with Frameworks & ORMs

### NestJS (with [Mongoose](https://mongoosejs.com/))

```bash
npm install @nestjs/mongoose mongoose
```

```ts title="app.module.ts"
MongooseModule.forRoot("mongodb://localhost:27017/your_db");
```

```ts title="user.schema.ts"
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;
}
```

```ts title="user.module.ts"
MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
```

### Spring Boot (with [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb))

```xml title="pom.xml"
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

```yaml title="application.yml"
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/your_db
```

```java
@Document("users")
public class User {
  @Id
  private String id;
  private String name;
  private String email;
}
```

```java
public interface UserRepository extends MongoRepository<User, String> {}
```

### Laravel (with [Jenssegers/MongoDB](https://github.com/jenssegers/laravel-mongodb))

```bash
composer require jenssegers/mongodb
```

```php title="config/database.php"
'mongodb' => [
    'driver'   => 'mongodb',
    'host'     => env('DB_HOST', '127.0.0.1'),
    'port'     => env('DB_PORT', 27017),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
],
```

```php
use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model {
    protected $connection = 'mongodb';
    protected $collection = 'users';
}
```

## Managing MongoDB with Docker

```yaml title="docker-compose.yml"
version: "3.8"
services:
  mongodb:
    image: mongodb/mongodb-community-server:latest
    container_name: mongo-db
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: your_db
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password

volumes:
  mongo_data:
```

```bash
# Connect mongodb with mongosh commands
mongosh "mongodb://root:example@localhost:27017"
```

> 💡 Use `mongo-express`, `Compass`, or `NoSQLBooster` for GUI access.

## Deploying MongoDB with Kubernetes

**Basic StatefulSet + PVC**:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  selector:
    matchLabels:
      app: mongo
  serviceName: "mongo"
  replicas: 1
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:6
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongo-persistent-storage
              mountPath: /data/db
  volumeClaimTemplates:
    - metadata:
        name: mongo-persistent-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 5Gi
```

> ⚠️ For production, add auth, secret mounting, readiness probes, and replicas with [MongoDB Helm Chart](https://github.com/bitnami/charts/tree/main/bitnami/mongodb).

## Best Practices

### Schema Design

- Favor embedding for fast reads (1:1 or 1\:N), use referencing for N\:M relationships.
- Keep documents < 16MB. Avoid overly nested structures.

### Indexing & Performance

- Always index fields used in `find`, `sort`, and `join` (`$lookup`).
- Monitor with `explain()` and optimize aggregation stages.

### Security

- Enable access control & authentication (SCRAM).
- Use TLS and firewall rules for network-level security.

### Monitoring & Backup

- Use MongoDB Atlas, Prometheus exporters, or Ops Manager.
- Schedule backups using `mongodump`, `mongorestore`, or volume snapshots.

### Development

- Use Mongoose validation or JSON Schema.
- Leverage change streams for real-time use cases.
- Use MongoDB transactions (4.0+) for atomicity across collections.

## References

- [Learn Mongo](https://learn.mongodb.com/)
- [Add MongoDB Image to Docker](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/?msockid=0291cb7f1eee63680eafdd7a1f8862e9)
- [Install Mongosh on Ubuntu](https://www.bytebase.com/reference/mongodb/how-to/how-to-install-mongodb-shell-on-mac-ubuntu-centos-windows/#apt)
- [MongoDB Shell Commands](https://www.tutorialsteacher.com/mongodb/mongodb-shell-commands)
