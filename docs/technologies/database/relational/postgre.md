---
description: The World's Most Advanced Open Source Relational Database
tags:
  - SQL
  - DBMS
---

# PostgreSQL

## Setting Up PostgreSQL with Node.js

1. **Install PostgreSQL Node.js Driver**

   ```bash
   npm install pg
   ```

   - The [pg](https://www.npmjs.com/package/pg) package is widely used to interact with PostgreSQL databases in Node.js applications.

2. **Create PostgreSQL Database Connection in Node.js**

   ```javascript
   const { Pool } = require("pg");

   const pool = new Pool({
     host: "localhost", // replace with your PostgreSQL server host
     user: "username", // replace with your PostgreSQL username
     password: "password", // replace with your PostgreSQL password
     database: "mydb", // replace with your PostgreSQL database name
     port: 5432, // default PostgreSQL port
   });

   pool.connect((err) => {
     if (err) {
       console.error("Connection error", err.stack);
     } else {
       console.log("Connected to PostgreSQL database!");
     }
   });
   ```

3. **Using Pool for Queries**

   ```javascript
   pool.query("SELECT * FROM users", (err, res) => {
     if (err) {
       console.error(err);
     } else {
       console.log(res.rows); // Results contain rows returned by the query
     }
   });
   ```

4. **Close Pool**
   - After completing operations, close the connection pool to avoid hanging connections.
   ```javascript
   pool.end();
   ```

#### Pooling (Recommended for Production)

The `pg` package's `Pool` class handles connection pooling automatically, making it efficient for high-load environments.

## Setting Up PostgreSQL with Spring Boot

1. **Add PostgreSQL Dependency**

   ```xml title="pom.xml"
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <version>42.3.1</version> <!-- Replace with the latest version -->
   </dependency>
   ```

2. **Configure `application.properties`**

   ```properties title="application.properties"
   spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
   spring.datasource.username=username
   spring.datasource.password=password
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Define Repositories & Entities**

   - Use **Spring Data JPA** to define repositories for managing entities.

   ```java
   @Entity
   public class User {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private String name;
       // getters and setters
   }

   public interface UserRepository extends JpaRepository<User, Long> {}
   ```

4. **Service Layer (optional)**

   ```java
   @Service
   public class UserService {
       @Autowired
       private UserRepository userRepository;

       public List<User> getAllUsers() {
           return userRepository.findAll();
       }
   }
   ```

## Running PostgreSQL in Docker

1. **Run PostgreSQL Docker Container**

   ```bash
   docker run --name postgres-db -e POSTGRES_PASSWORD=root_password -e POSTGRES_DB=mydb -e POSTGRES_USER=username -p 5432:5432 -d postgres:latest
   ```

   - This command sets up PostgreSQL with a root password, a database, and user credentials.

2. **Configure Node.js or Spring Boot to Use Docker PostgreSQL Instance**

   - Point the connection URL to `localhost:5432` (if using Docker on the local machine) or to the internal Docker network IP if needed.

3. **Docker Compose for PostgreSQL + Application**

   - Create a `docker-compose.yml` file to manage both the application and PostgreSQL container in a single command.

   ```yaml title="docker-compose.yml"
   version: "3.8"
   services:
     postgres:
       image: postgres:latest
       environment:
         POSTGRES_USER: username
         POSTGRES_PASSWORD: root_password
         POSTGRES_DB: mydb
       ports:
         - "5432:5432"

     app:
       build: .
       ports:
         - "8080:8080"
       depends_on:
         - postgres
   ```

4. **Start Containers**
   ```bash
   docker-compose up -d
   ```

## Deploying PostgreSQL with Kubernetes

1. **Create PostgreSQL Deployment in Kubernetes**

   ```yaml title="postgres-deployment.yaml"
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: postgres
   spec:
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
             image: postgres:13
             env:
               - name: POSTGRES_USER
                 value: "username"
               - name: POSTGRES_PASSWORD
                 value: "root_password"
               - name: POSTGRES_DB
                 value: "mydb"
             ports:
               - containerPort: 5432
   ```

2. **Create PostgreSQL Service**

   - To expose PostgreSQL within the Kubernetes cluster.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: postgres
   spec:
     ports:
       - port: 5432
     selector:
       app: postgres
     clusterIP: None
   ```

3. **Deploy the PostgreSQL Pod and Service**

   ```bash
   kubectl apply -f postgres-deployment.yaml
   ```

4. **Update Application Configuration to Connect to PostgreSQL in Kubernetes**

   - Use the service name (`postgres` in this case) as the host for PostgreSQL in your Node.js or Spring Boot application configuration.

5. **Deploy Application to Kubernetes**
   - Deploy your application to Kubernetes, ensuring it connects to PostgreSQL using the Kubernetes service name.

## References

- [Documents](https://www.postgresql.org/docs/current/)
- [Tools](../../../technologies/js/api/node-postgres.md)
