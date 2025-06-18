# Redis

Redis is an in-memory data structure store, often used as a database, cache, and message broker. Integrating Redis with an Express application can greatly improve performance, especially for caching frequently accessed data, as it allows rapid access to data without hitting a slower database on each request.

## Set up Redis with Express

Install Redis Client for Node.js

```bash
npm install redis
```

Establish a connection

```js title='app.js'
import express from "express";
import redis from "redis";

// Set up the Redis client
const redisClient = redis.createClient();

// Handle Redis connection events
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const app = express();
const PORT = 3000;

// Sample route without Redis caching
app.get("/data", async (req, res) => {
  setTimeout(() => {
    res.json({ data: "Sample data from database" });
  }, 2000);
});

// Route with Redis caching
app.get("/data-cache", async (req, res) => {
  const redisKey = "dataKey"; // Unique key for caching data

  // Check Redis cache
  redisClient.get(redisKey, (err, cachedData) => {
    if (err) {
      console.error("Redis GET error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // If data is found in Redis cache, return it
    if (cachedData) {
      console.log("Serving data from Redis cache");
      return res.json(JSON.parse(cachedData));
    }

    // Simulate a database call if data not found in cache
    setTimeout(() => {
      const data = { data: "Sample data from database" };
      console.log("Serving data from database and caching in Redis");

      // Save data in Redis cache with an expiration time (e.g., 10 seconds)
      redisClient.setex(redisKey, 10, JSON.stringify(data));

      res.json(data);
    }, 2000);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Redis Client Methods and Commands

| **Redis Client Method**           | **Redis Command** | **Description**                                                         | **Example Usage in Node**                                      |
| --------------------------------- | ----------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `set(key, value, callback)`       | `SET`             | Sets a value for a specified key.                                       | `redisClient.set('key', 'value');`                             |
| `get(key, callback)`              | `GET`             | Retrieves the value of a specified key.                                 | `redisClient.get('key', (err, val) => {});`                    |
| `setex(key, seconds, value)`      | `SETEX`           | Sets a value for a key with an expiration time (in seconds).            | `redisClient.setex('key', 10, 'value');`                       |
| `del(key, callback)`              | `DEL`             | Deletes a specified key.                                                | `redisClient.del('key');`                                      |
| `expire(key, seconds)`            | `EXPIRE`          | Sets an expiration time for an existing key (in seconds).               | `redisClient.expire('key', 10);`                               |
| `ttl(key, callback)`              | `TTL`             | Gets the time-to-live (TTL) in seconds for a key with an expiration.    | `redisClient.ttl('key', (err, ttl) => {});`                    |
| `incr(key, callback)`             | `INCR`            | Increments the integer value of a key by 1.                             | `redisClient.incr('counter');`                                 |
| `decr(key, callback)`             | `DECR`            | Decrements the integer value of a key by 1.                             | `redisClient.decr('counter');`                                 |
| `mget(key1, key2, ..., callback)` | `MGET`            | Retrieves values of multiple keys at once.                              | `redisClient.mget('key1', 'key2', (err, vals) => {});`         |
| `mset(key1, val1, key2, val2)`    | `MSET`            | Sets multiple keys to multiple values at once.                          | `redisClient.mset('key1', 'val1', 'key2', 'val2');`            |
| `exists(key, callback)`           | `EXISTS`          | Checks if a specified key exists. Returns 1 if it exists, 0 otherwise.  | `redisClient.exists('key', (err, exists) => {});`              |
| `hset(hash, field, value)`        | `HSET`            | Sets the value of a field in a hash.                                    | `redisClient.hset('hash', 'field', 'value');`                  |
| `hget(hash, field, callback)`     | `HGET`            | Retrieves the value of a field in a hash.                               | `redisClient.hget('hash', 'field', (err, val) => {});`         |
| `hdel(hash, field)`               | `HDEL`            | Deletes a field from a hash.                                            | `redisClient.hdel('hash', 'field');`                           |
| `hgetall(hash, callback)`         | `HGETALL`         | Retrieves all fields and values of a hash.                              | `redisClient.hgetall('hash', (err, obj) => {});`               |
| `sadd(set, value)`                | `SADD`            | Adds a member to a set.                                                 | `redisClient.sadd('set', 'value');`                            |
| `smembers(set, callback)`         | `SMEMBERS`        | Retrieves all members of a set.                                         | `redisClient.smembers('set', (err, members) => {});`           |
| `srem(set, value)`                | `SREM`            | Removes a member from a set.                                            | `redisClient.srem('set', 'value');`                            |
| `lpush(list, value)`              | `LPUSH`           | Pushes a value onto the beginning of a list.                            | `redisClient.lpush('list', 'value');`                          |
| `rpush(list, value)`              | `RPUSH`           | Pushes a value onto the end of a list.                                  | `redisClient.rpush('list', 'value');`                          |
| `lpop(list, callback)`            | `LPOP`            | Removes and retrieves the first element of a list.                      | `redisClient.lpop('list', (err, value) => {});`                |
| `rpop(list, callback)`            | `RPOP`            | Removes and retrieves the last element of a list.                       | `redisClient.rpop('list', (err, value) => {});`                |
| `llen(list, callback)`            | `LLEN`            | Gets the length of a list.                                              | `redisClient.llen('list', (err, len) => {});`                  |
| `flushdb(callback)`               | `FLUSHDB`         | Clears all keys in the current database.                                | `redisClient.flushdb((err, res) => {});`                       |
| `flushall(callback)`              | `FLUSHALL`        | Clears all keys in all databases.                                       | `redisClient.flushall((err, res) => {});`                      |
| `keys(pattern, callback)`         | `KEYS`            | Retrieves all keys that match a specified pattern.                      | `redisClient.keys('*', (err, keys) => {});`                    |
| `scan(cursor, options, callback)` | `SCAN`            | Iterates through keys in the database with a cursor for large key sets. | `redisClient.scan('0', 'MATCH', 'prefix*', (err, res) => {});` |

## Run Redis Locally with Docker.

### Docker Command to Run Redis

1. Pull the latest Redis image from Docker Hub:

   ```bash
   docker pull redis:latest
   ```

2. Run the Redis container:
   ```bash
   docker run --name my-redis -p 6379:6379 -d redis
   ```
   - `--name my-redis`: Names the container `my-redis`.
   - `-p 6379:6379`: Maps Redis’s default port (6379) from the container to your localhost.
   - `-d`: Runs the container in detached mode.

> Redis is now running locally on `localhost:6379`.

#### Using Redis Commands in the Terminal

With Redis running, you can interact with it using the `redis-cli` (Redis command-line interface).

#### Connecting to Redis via the Terminal

To connect to the Redis instance running on Docker, you can either:

- **Open a shell in the Docker container**:

  ```bash
  docker exec -it my-redis redis-cli
  ```

  This opens a CLI session within the container.

- **Or, if you have `redis-cli` installed locally** (e.g., on macOS you can install with `brew install redis`), connect directly:
  ```bash
  redis-cli -h localhost -p 6379
  ```

#### Common Redis Commands in `redis-cli`

Here are some examples of commands you can try:

1. **Set and Get Data**:

   ```bash
   set mykey "Hello Redis"
   get mykey
   ```

2. **Set Data with Expiration**:

   ```bash
   setex tempkey 10 "Temporary Value"
   ttl tempkey
   ```

3. **Increment a Value**:

   ```bash
   set counter 1
   incr counter
   ```

4. **Hash Operations**:

   ```bash
   hset user:1000 name "Alice" age "30"
   hget user:1000 name
   hgetall user:1000
   ```

5. **List Operations**:

   ```bash
   lpush mylist "item1" "item2" "item3"
   lrange mylist 0 -1
   ```

6. **Set Operations**:
   ```bash
   sadd myset "member1" "member2"
   smembers myset
   ```

## Redis Configuration with Docker for Kubernetes (K8s)

Set up Redis on a local Kubernetes cluster, such as with `minikube`.

### Redis Deployment on Kubernetes

1. **Create a Redis Deployment YAML file**:

   ```yaml title="redis-deployment.yaml"
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: redis-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: redis
     template:
       metadata:
         labels:
           app: redis
       spec:
         containers:
           - name: redis
             image: redis:latest
             ports:
               - containerPort: 6379
             resources:
               requests:
                 memory: "128Mi"
                 cpu: "500m"
   ```

2. **Create a Redis Service YAML file**:

   ```yaml title="redis-service.yaml"
   apiVersion: v1
   kind: Service
   metadata:
     name: redis-service
   spec:
     selector:
       app: redis
     ports:
       - protocol: TCP
         port: 6379
         targetPort: 6379
   ```

3. **Apply the YAML files to Kubernetes**:
   Deploy Redis to your Kubernetes cluster by running the following commands:

   ```bash
   kubectl apply -f redis-deployment.yaml
   kubectl apply -f redis-service.yaml
   ```

4. **Verify Redis Deployment**:
   Check if the Redis Pod and Service are running:

   ```bash
   kubectl get pods
   kubectl get svc
   ```

   You should see a Redis pod and a `redis-service` service running.

### Connecting to Redis on Kubernetes

1. **Port-forward the Redis Service** to make it accessible on your local machine:

   ```bash
   kubectl port-forward svc/redis-service 6379:6379
   ```

2. **Use `redis-cli` to Connect**:
   You can now connect to the Redis instance running on Kubernetes with the `redis-cli`:
   ```bash
   redis-cli -h localhost -p 6379
   ```

## Reference

- [Redis documents](https://redis.io/docs/latest/)
