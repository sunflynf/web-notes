---
description: The world's most popular open source database
tags:
  - SQL
  - DBMS
---

# MySQL

## Setting Up MySQL with Node.js

1. **Install MySQL Node.js Driver**

   ```bash
   npm install mysql2
   ```

   - The [mysql2](https://sidorares.github.io/node-mysql2/docs) package is preferred for MySQL as it provides modern, faster operations.

2. **Create MySQL Database Connection in Node.js**

   ```javascript
   const mysql = require("mysql2");

   const connection = mysql.createConnection({
     host: "localhost", // replace with your MySQL server host
     user: "username", // replace with your MySQL username
     password: "password", // replace with your MySQL password
     database: "mydb", // replace with your MySQL database name
   });

   connection.connect((err) => {
     if (err) throw err;
     console.log("Connected to MySQL database!");
   });
   ```

3. **Using Connection with Queries**

   ```javascript
   connection.query("SELECT * FROM users", (err, results, fields) => {
     if (err) throw err;
     console.log(results); // Results contain rows returned by the query
   });
   ```

4. **Close Connection**
   - After your operations, ensure you close the connection.
   ```javascript
   connection.end();
   ```

#### Pooling (Recommended for Production)

Use a connection pool for efficient database management.

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

## Setting Up MySQL with Spring Boot

1. **Add MySQL Dependency**

   ```xml title="pom.xml"
   <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>8.0.29</version> <!-- Replace with the latest version -->
   </dependency>
   ```

2. **Configure `application.properties`**

   ```properties title="application.properties"
   spring.datasource.url=jdbc:mysql://localhost:3306/mydb
   spring.datasource.username=username
   spring.datasource.password=password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
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

4. **Service Layer (optional)**:

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

## Running MySQL in Docker

1. **Run MySQL Docker Container**

   ```bash
   docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root_password -e MYSQL_DATABASE=mydb -e MYSQL_USER=username -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest
   ```

   - This command sets up MySQL with a root password, a database, and user credentials.

2. **Configure Node.js or Spring Boot to Use Docker MySQL Instance**

   - Point the connection URL to `localhost:3306` (if using Docker on local machine) or to the internal Docker network IP if needed.

3. **Docker Compose for MySQL + Application**

   - Create a `docker-compose.yml` file to manage both the application and MySQL container in a single command.

   ```yaml title="docker-compose.yml"
   version: "3.8"
   services:
     mysql:
       image: mysql:latest
       environment:
         MYSQL_ROOT_PASSWORD: root_password
         MYSQL_DATABASE: mydb
         MYSQL_USER: username
         MYSQL_PASSWORD: password
       ports:
         - "3306:3306"

     app:
       build: .
       ports:
         - "8080:8080"
       depends_on:
         - mysql
   ```

4. **Start Containers**:
   ```bash
   docker-compose up -d
   ```

## Deploying MySQL with Kubernetes

1. **Create MySQL Deployment in Kubernetes**

   ```yaml title="mysql-deployment.yaml"
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mysql
   spec:
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
             image: mysql:5.7
             env:
               - name: MYSQL_ROOT_PASSWORD
                 value: "root_password"
               - name: MYSQL_DATABASE
                 value: "mydb"
               - name: MYSQL_USER
                 value: "username"
               - name: MYSQL_PASSWORD
                 value: "password"
             ports:
               - containerPort: 3306
   ```

2. **Create MySQL Service**

   - To expose MySQL within the Kubernetes cluster.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: mysql
   spec:
     ports:
       - port: 3306
     selector:
       app: mysql
     clusterIP: None
   ```

3. **Deploy the MySQL Pod and Service**

   ```bash
   kubectl apply -f mysql-deployment.yaml
   ```

4. **Update Application Configuration to Connect to MySQL in Kubernetes**

   - Use the service name (`mysql` in this case) as the host for MySQL in your Node.js or Spring Boot application configuration.

5. **Deploy Application to Kubernetes**
   - Deploy your application to Kubernetes, ensuring it connects to MySQL using the Kubernetes service name.
