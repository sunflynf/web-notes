# Cassandra

## Cassandra Basics

Apache Cassandra is a distributed NoSQL database known for its high availability, scalability, and fault tolerance. It is well-suited for applications with heavy read and write requirements.

### Key Concepts

- **Cluster**: A set of nodes where Cassandra stores data in a distributed manner.
- **Keyspace**: The highest-level container that defines data replication across nodes.
- **Table**: Analogous to a relational database table, it contains rows of data.
- **Row**: A single data record with columns and values.
- **Partition Key**: The key that determines data distribution across the cluster.

### Setup Cassandra Locally

1. **Install Cassandra**
   - Download and install Cassandra from [Apache Cassandra Downloads](https://cassandra.apache.org/_/download.html).
   - Follow the installation instructions for your OS.
2. **Start Cassandra**
   - Run Cassandra (typically by running `cassandra` in the terminal).
   - The default port is `9042`.

### Basic Cassandra Commands

- **Create Keyspace**
  ```sql
  CREATE KEYSPACE mykeyspace
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};
  ```
- **Use Keyspace** - `USE mykeyspace;`
- **Create Table**
  ```sql
  CREATE TABLE users (id UUID PRIMARY KEY, name text, age int);
  ```
- **Insert Data**
  ```sql
  INSERT INTO users (id, name, age) VALUES (uuid(), 'Alice', 30);
  ```
- **Query Data** - `SELECT * FROM users;`

## Integrate Cassandra with Backend Frameworks

### Using Cassandra with Express (Node.js)

#### Step 1: Set up the Project

1. Initialize a new Node.js project:
   ```bash
   mkdir cassandra-express-app
   cd cassandra-express-app
   npm init -y
   ```
2. Install required dependencies:
   ```bash
   npm install express cassandra-driver dotenv
   ```

#### Step 2: Connect to Cassandra

1. Create a `.env` file to store Cassandra connection details
   ```properties
   CASSANDRA_CONTACT_POINTS=127.0.0.1
   CASSANDRA_KEYSPACE=mykeyspace
   PORT=3000
   ```
2. Set up a Cassandra client and express server in `server.js`

   ```javascript
   const express = require("express");
   const cassandra = require("cassandra-driver");
   require("dotenv").config();

   const app = express();
   app.use(express.json());

   const client = new cassandra.Client({
     contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
     localDataCenter: "datacenter1",
     keyspace: process.env.CASSANDRA_KEYSPACE,
   });

   client
     .connect()
     .then(() => console.log("Connected to Cassandra"))
     .catch((err) => console.error("Connection error:", err));

   app.get("/", (req, res) => res.send("Hello World"));

   app.listen(process.env.PORT, () => {
     console.log(`Server running on port ${process.env.PORT}`);
   });
   ```

3. Run the application:
   ```bash
   node server.js
   ```

### Using Cassandra with Spring Boot (Java)

#### Step 1: Set up the Project

1. Create a new Spring Boot project via [Spring Initializr](https://start.spring.io/) or using your IDE.
   - Choose dependencies: `Spring Web`, `Spring Data` for **Apache Cassandra**.

#### Step 2: Configure Cassandra in `application.properties`

```properties
spring.data.cassandra.contact-points=127.0.0.1
spring.data.cassandra.local-datacenter=datacenter1
spring.data.cassandra.keyspace-name=mykeyspace
server.port=8080
```

#### Step 3: Create a Simple Model and Repository

1. Define a model class:

   ```java
   import org.springframework.data.annotation.Id;
   import org.springframework.data.cassandra.core.mapping.PrimaryKey;
   import org.springframework.data.cassandra.core.mapping.Table;

   import java.util.UUID;

   @Table("users")
   public class User {
       @PrimaryKey
       private UUID id;
       private String name;
       private int age;

       // Constructors, getters, and setters
   }
   ```

2. Define a repository interface:

   ```java
   import org.springframework.data.cassandra.repository.CassandraRepository;
   import java.util.UUID;

   public interface UserRepository extends CassandraRepository<User, UUID> {
   }
   ```

3. Implement a controller to test:

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.*;

   import java.util.List;

   @RestController
   @RequestMapping("/users")
   public class UserController {

       @Autowired
       private UserRepository userRepository;

       @GetMapping
       public List<User> getUsers() {
           return userRepository.findAll();
       }

       @PostMapping
       public User createUser(@RequestBody User user) {
           return userRepository.save(user);
       }
   }
   ```

## Using Cassandra in Docker

#### Step 1: Create a Dockerfile for Cassandra

1. **Basic Dockerfile**
   ```dockerfile
   FROM cassandra:latest
   EXPOSE 9042
   ```
2. **Build and Run Cassandra Container**
   ```bash
   docker build -t cassandra-db .
   docker run -d -p 9042:9042 --name cassandra-container cassandra-db
   ```

#### Step 2: Docker Compose for Multi-Container Applications

Create a `docker-compose.yml` file for both Cassandra and your backend (Express or Spring Boot).

```yaml title="docker-compose.yml"
version: "3.8"

services:
  cassandra:
    image: cassandra
    ports:
      - "9042:9042"

  express_app: # For Node.js (Express)
    build: .
    ports:
      - "3000:3000"
    environment:
      CASSANDRA_CONTACT_POINTS: cassandra
      CASSANDRA_KEYSPACE: mykeyspace
    depends_on:
      - cassandra

  spring_boot_app: # For Spring Boot (if using Java)
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATA_CASSANDRA_CONTACT_POINTS: cassandra
      SPRING_DATA_CASSANDRA_KEYSPACE_NAME: mykeyspace
    depends_on:
      - cassandra
```

#### Running with Docker Compose

```bash
docker-compose up -d
```

## Configuring Cassandra with Kubernetes (K8s)

#### Step 1: Create Cassandra Deployment and Service

**Cassandra Deployment YAML**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cassandra
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cassandra
  template:
    metadata:
      labels:
        app: cassandra
    spec:
      containers:
        - name: cassandra
          image: cassandra
          ports:
            - containerPort: 9042
```

**Cassandra Service YAML**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: cassandra-service
spec:
  selector:
    app: cassandra
  ports:
    - protocol: TCP
      port: 9042
      targetPort: 9042
```

#### Step 2: Configure Backend Deployment and Service

The backend deployment can include environment variables pointing to the Cassandra service.

Example YAML for an **Express App** deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: express-app
  template:
    metadata:
      labels:
        app: express-app
    spec:
      containers:
        - name: express-app
          image: myexpressapp:latest
          ports:
            - containerPort: 3000
          env:
            - name: CASSANDRA_CONTACT_POINTS
              value: cassandra-service
            - name: CASSANDRA_KEYSPACE
              value: mykeyspace
```

After creating your YAML files, apply them with:

```bash
kubectl apply -f cassandra-deployment.yaml
kubectl apply -f cassandra-service.yaml
kubectl apply -f express-app-deployment.yaml
```
