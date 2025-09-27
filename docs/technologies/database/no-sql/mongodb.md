---
description: Database Management System.
tags:
  - NoSQL
  - JSON
  - DBMS
---

# MongoDB

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

## Mongo Shell Cheat Sheet

### 1. Connecting and Managing Databases

- Connect to MongoDB: `mongo` or `mongo --host <host> --port <port>`
- List all databases: `show dbs`
- Switch to a database: `use <database_name>`
- Create a database (automatically created when inserting data): `use <new_database_name>`
- Drop the current database: `db.dropDatabase()`

### 2. Managing Collections

- Create a collection: `db.createCollection("<collection_name>")`
- List all collections: `show collections`
- Drop a collection: `db.<collection_name>.drop()`

### 3. Create (Insert Data)

- Insert one document: `db.<collection_name>.insertOne({key: value})`
- Insert multiple documents:

  ```javascript
  db.<collection_name>.insertMany([{key1: value1}, {key2: value2}])
  ```

- Insert a document with a specific _id:

  ```javascript
  db.<collection_name>.insertOne({_id: "custom_id", key: value})
  ```

### 4. Read (Query Data)

- Retrieve all documents: `db.<collection_name>.find()`
- Retrieve all documents with formatted output: `db.<collection_name>.find().pretty()`
- Query documents by condition: `db.<collection_name>.find({key: value})`
- Retrieve one document: `db.<collection_name>.findOne({key: value})`
- Limit the number of returned documents: `db.<collection_name>.find().limit(5)`
- Sort results (1: ascending, -1: descending):

  ```javascript
  db.<collection_name>.find().sort({key: 1})
  ```

- Select specific fields:

  ```javascript
  db.<collection_name>.find({}, {field1: 1, field2: 1, _id: 0})
  ```

### 5. Update (Modify Data)

- Update one document:

  ```javascript
  db.<collection_name>.updateOne({key: value}, {$set: {new_key: new_value}})
  ```

- Update multiple documents:

  ```javascript
  db.<collection_name>.updateMany({key: value}, {$set: {new_key: new_value}})
  ```

- Replace a document:

  ```javascript
  db.<collection_name>.replaceOne({key: value}, {new_document})
  ```

- Increment a value:

  ```javascript
  db.<collection_name>.updateOne({key: value}, {$inc: {field: 1}})
  ```

### 6. Delete (Remove Data)

- Delete one document: `db.<collection_name>.deleteOne({key: value})`
- Delete multiple documents: `db.<collection_name>.deleteMany({key: value})`
- Delete all documents: `db.<collection_name>.deleteMany({})`

### 7. Query Operators

- Comparison: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`

  ```javascript
  db.<collection_name>.find({age: {$gt: 18}})
  ```

- Logical: `$and`, `$or`, `$not`, `$nor`

  ```javascript
  db.<collection_name>.find({$and: [{age: {$gt: 18}}, {city: "Hanoi"}]})
  ```

- Element: `$exists`, `$type`

  ```javascript
  db.<collection_name>.find({field: {$exists: true}})
  ```

- Array: `$in`, `$nin`, `$all`

  ```javascript
  db.<collection_name>.find({tags: {$in: ["tag1", "tag2"]}})
  ```

### 8. Update Operators

- `$set`: Update field value
- `$unset`: Remove a field
- `$push`: Add an element to an array
- `$pull`: Remove an element from an array
- `$addToSet`: Add an element to an array if it doesn't exist

  ```javascript
  db.<collection_name>.updateOne({key: value}, {$push: {array_field: new_value}})
  ```

### 9. Aggregation

- Basic pipeline:

  ```javascript
  db.<collection_name>.aggregate([
    {$match: {key: value}},
    {$group: {_id: "$field", total: {$sum: 1}}},
    {$sort: {total: -1}}
  ])
  ```

- Common stages:
  - `$match`: Filter documents
  - `$group`: Group documents
  - `$sort`: Sort documents
  - `$project`: Select fields
  - `$limit`: Limit the number of documents
  - `$skip`: Skip a number of documents
  - `$unwind`: Deconstruct an array into separate documents

### 10. Indexes

- Create an index: `db.<collection_name>.createIndex({field: 1})`
- Create a compound index:

  ```javascript
  db.<collection_name>.createIndex({field1: 1, field2: -1})
  ```

- List indexes: `db.<collection_name>.getIndexes()`
- Drop an index: `db.<collection_name>.dropIndex("index_name")`

### 11. User Management

- Create a user:

  ```javascript
  db.createUser({
    user: "<username>",
    pwd: "<password>",
    roles: [{role: "<role>", db: "<database>"}]
  })
  ```

- List users: `db.getUsers()`
- Drop a user: `db.dropUser("<username>")`

### 12. Backup and Restore

- Export a collection: `mongoexport --db <db> --collection <coll> --out <file>.json`
- Import a collection: `mongoimport --db <db> --collection <coll> --file <file>.json`
- Backup a database: `mongodump --db <db> --out <backup_path>`
- Restore a database: `mongorestore --db <db> <backup_path>`

### 13. Advanced Commands

- Collection statistics: `db.<collection_name>.stats()`
- Analyze query performance:

  ```javascript
  db.<collection_name>.find({key: value}).explain("executionStats")
  ```

- Bulk operations:

  ```javascript
  var bulk = db.<collection_name>.initializeOrderedBulkOp();
  bulk.insert({key: value});
  bulk.find({key: value}).updateOne({$set: {new_key: new_value}});
  bulk.execute();
  ```

### 14. Tips and Notes

- Use `ObjectId("id_string")` to query with _id
- Check connection: `db.runCommand({ping: 1})`
- View server information: `db.runCommand({serverStatus: 1})`
- Avoid using `find().toArray()` with large datasets
- Always create indexes for frequently queried fields

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
