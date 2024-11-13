---
description: Database Management System.
tags:
  - NoSQL
  - JSON
  - DBMS
---

# MongoDB

MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. It's well-suited for applications that need fast, schema-flexible, and scalable data storage.

## Key Concepts

- **Database**: Collection of collections.
- **Collection**: Group of documents, similar to tables in relational databases.
- **Document**: Individual record, stored in BSON format (Binary JSON), containing fields and values.

### Setup MongoDB Locally

1. **Install MongoDB**:
   - Download MongoDB from [MongoDB Downloads](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your operating system.
2. **Run MongoDB**:
   - Start the MongoDB service (typically `mongod`).
   - MongoDB will start on the default port `27017`.

### Basic MongoDB Commands

- Show databases: `show dbs`
- Switch database: `use <db_name>`
- Create a collection: `db.createCollection("<collection_name>")`
- Insert a document: `db.collection.insertOne({ key: "value" })`
- Find documents: `db.collection.find({})`

## Integrate MongoDB with Backend Frameworks

### Using MongoDB with Express (Node.js)

#### Step 1: Set up the Project

1. Initialize a new Node.js project
   ```bash
   mkdir mongo-express-app
   cd mongo-express-app
   npm init -y
   ```
2. Install required dependencies
   ```bash
   npm install express mongoose dotenv
   ```

#### Step 2: Connect to MongoDB

1. Create a `.env` file to store MongoDB URI and other configuration
   ```properties title='.env'
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   PORT=3000
   ```
2. Set up a MongoDB connection with Mongoose

   ```javascript title="server.js"
   const express = require("express");
   const mongoose = require("mongoose");
   require("dotenv").config();

   const app = express();
   app.use(express.json());

   mongoose
     .connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     })
     .then(() => console.log("MongoDB connected"))
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

### Using MongoDB with Spring Boot (Java)

#### Step 1: Set up the Project

1. Create a new Spring Boot project via [Spring Initializr](https://start.spring.io/) or using your IDE.
   - Choose dependencies: `Spring Web`, `Spring Data MongoDB`

#### Step 2: Configure MongoDB

```properties title="application.properties"
spring.data.mongodb.uri=mongodb://localhost:27017/mydatabase
server.port=8080
```

#### Step 3: Create a Simple Model and Repository

1. Define a model class

   ```java
   import org.springframework.data.annotation.Id;
   import org.springframework.data.mongodb.core.mapping.Document;

   @Document(collection = "items")
   public class Item {
       @Id
       private String id;
       private String name;

       // Constructors, getters, and setters
   }
   ```

2. Define a repository interface

   ```java
   import org.springframework.data.mongodb.repository.MongoRepository;

   public interface ItemRepository extends MongoRepository<Item, String> {
   }
   ```

3. Implement a controller to test

   ```java
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.web.bind.annotation.*;

   import java.util.List;

   @RestController
   @RequestMapping("/items")
   public class ItemController {

       @Autowired
       private ItemRepository itemRepository;

       @GetMapping
       public List<Item> getItems() {
           return itemRepository.findAll();
       }

       @PostMapping
       public Item createItem(@RequestBody Item item) {
           return itemRepository.save(item);
       }
   }
   ```

## Using MongoDB in Docker

#### Step 1: Create a Dockerfile for MongoDB

1. **Basic Dockerfile**
   ```dockerfile
   FROM mongo:latest
   EXPOSE 27017
   ```
2. **Build and Run MongoDB Container**
   ```bash
   docker build -t mongodb .
   docker run -d -p 27017:27017 --name mongodb-container mongodb
   ```

#### Step 2: Docker Compose for Multi-Container Applications

Create a `docker-compose.yml` file for both MongoDB and your backend (Express or Spring Boot).

```yaml title="docker-compose.yml"
version: "3.8"

services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: mydatabase

  express_app: # For Node.js (Express)
    build: .
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/mydatabase
    depends_on:
      - mongodb

  spring_boot_app: # For Spring Boot (if using Java)
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATA_MONGODB_URI: mongodb://mongodb:27017/mydatabase
    depends_on:
      - mongodb
```

**Running with Docker Compose**

```bash
docker-compose up -d
```

## Configuring MongoDB with Kubernetes (K8s)

#### Step 1: Create MongoDB Deployment and Service

**MongoDB Deployment YAML**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo
          ports:
            - containerPort: 27017
          env:
            - name: MONGO_INITDB_DATABASE
              value: mydatabase
```

**MongoDB Service YAML**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```

#### Step 2: Configure Backend Deployment and Service

The backend deployment can include environment variables pointing to the MongoDB service.

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
            - name: MONGODB_URI
              value: mongodb://mongodb-service:27017/mydatabase
```

After creating your YAML files, apply them with:

```bash
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
kubectl apply -f express-app-deployment.yaml
```

### Summary

With this setup:

- MongoDB runs either as a standalone container, a service in Docker Compose, or a pod in Kubernetes.
- Your backend frameworks (Express or Spring Boot) can connect to MongoDB through environment-specific configurations.
- Using Docker Compose and Kubernetes provides you flexibility for development and production deployments.
