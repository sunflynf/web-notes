---
description: Package applications & dependencies in a container
---

# Docker Knowledge

> **Quick reference:** [Docker Cheatsheet](./docker-cheatsheet.mdx)

Docker is a platform that allows you to package applications and all their dependencies into **containers**—lightweight, portable units that ensure consistency across different environments.

:::info Key Benefits

- Consistent across environments ("build once, run anywhere")
- Lightweight compared to virtual machines
- Easy to use with CI/CD pipelines
- Simplified scaling and microservices deployment

:::

## Core Concepts

| Concept        | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Image**      | Blueprint for creating containers                       |
| **Container**  | A running instance of an image                          |
| **Dockerfile** | File with instructions to build an image                |
| **Volume**     | Persistent storage outside the container                |
| **Network**    | Communication layer between containers                  |
| **Registry**   | Repository for storing Docker images (e.g., Docker Hub) |

## Docker CLI Commands

### Container Management

```bash
docker run hello-world                     # Run a test container
docker ps                                  # List running containers
docker ps -a                               # List all containers
docker stop <container_id>                 # Stop a container
docker restart <container_id>              # Restart a container
docker logs <container_id>                 # View container logs
docker rm <container_id>                   # Remove a stopped container
docker exec -it <container_id> /bin/bash   # Run with bash
docker exec -it <container_id> /bin/sh     # Run without bash
```

### Image Management

```bash
docker images                            # List local images
docker pull <image_name>:<tag>           # Pull image from Docker Hub
docker build -t <image_name>:<tag> .     # Build image from Dockerfile
docker rmi <image_id>                    # Remove image
```

### Cleanup Unused Resources

```bash
docker container prune            # Remove all stopped containers
docker image prune                # Remove unused images
docker system prune -a            # Remove stopped containers, unused networks, all unused images, build cache
docker system prune -a --volumes  # ...and also unused anonymous volumes
```

> 📝 **Note:** Use with caution – it can remove images (and, with `--volumes`, volumes) you may want to keep.

## Dockerfile

Used to define the steps for building a Docker image.

### Sample Dockerfile

```dockerfile
# Use the official Node.js image (Node 20 reached EOL in April 2026)
FROM node:24

# Set working directory
WORKDIR /app

# Copy dependency manifests first so this layer is cached
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source
COPY . .

# Run app
CMD ["node", "index.js"]
```

> Key instructions: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`, `ENV`, `ENTRYPOINT`

## Docker Volumes – Persistent Data

Used for sharing or persisting data beyond the container lifecycle.

| Type             | Description                                |
| ---------------- | ------------------------------------------ |
| **Bind Mount**   | Mounts a host directory into the container |
| **Named Volume** | Managed by Docker internally               |

```bash
docker volume create my-data                  # Create volume
docker volume ls                              # List all volumes
docker run -v my-data:/app/data my-image      # Mount volume to container
```

> 💡 Useful for storing uploads, logs, or database files.

## Docker Networking

Docker provides three built-in network types:

| Type     | Description                                            |
| -------- | ------------------------------------------------------ |
| `bridge` | Default; enables communication within the same network |
| `host`   | Uses the host machine’s network stack                  |
| `none`   | Disables all networking                                |

```bash
docker network create my-net                       # Create custom network

docker run -d --name app1 --network my-net my-img  # Connect container to the network
docker run -d --name app2 --network my-net my-img
```

## Docker Compose

Docker Compose allows you to define and run multi-container applications using a `compose.yaml` file (`docker-compose.yml` still works). The top-level `version:` key is obsolete and ignored by Compose v2+.

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:
```

```bash
docker compose up -d     # Compose v2+ is a CLI plugin: "docker compose", not "docker-compose"
docker compose down
docker compose logs
```

## Docker Registry

Docker images can be pulled from or pushed to registries like:

- **Docker Hub** (default)
- **GitHub Container Registry (GHCR)**
- **AWS ECR**, **GitLab Registry**

```bash
docker tag my-app username/my-app:latest         # Tag image
docker push username/my-app:latest               # Push to Docker Hub
```

## Real-World Use Cases

| Scenario                | Docker Helps With                       |
| ----------------------- | --------------------------------------- |
| Local development       | Hot-reloading using bind mounts         |
| CI/CD                   | Build and deploy consistent images      |
| Microservices           | Isolated, independently scaled services |
| Shared file storage     | Using named volumes                     |
| Database backup/restore | Mount volume and tar/untar              |

## Tips & Notes

### Command Tags

- Use `-d`: Run containers in detached mode (background).
- Use `-v`: Mount volumes for persistent data storage.
- Use `-p`: Map container ports to host ports.
- Use `--name`: Assign a name to containers for easier management.

### Best Practices

- Always use a `.dockerignore` file to exclude unnecessary files.
- Split `COPY` and `RUN npm install` to take advantage of caching.
- Use **multi-stage builds** to reduce image size.
- Use clear image tags: `my-app:dev`, `my-app:prod`.
- Avoid running containers as root – use the `USER` instruction.
- Use `HEALTHCHECK` to monitor container health.
- Use volumes for storing persistent data (not inside container filesystem).
- Don't store secrets in environment variables – use Docker secrets or external tools.

### Notes

- Containers are **ephemeral** by design – don’t store important data inside them.
- Prefer **named volumes** over bind mounts for portability.
- Use Compose for local orchestration and **Kubernetes** for production scale orchestration.

## Work with databases

<!-- - [Redis](/docs/technologies/database/in-memory/redis.md) -->

- [MongoDB](/docs/technologies/database/no-sql/mongodb.md)
- [MySQL](/docs/technologies/database/relational/mysql.md)
- [PostgreSQL](/docs/technologies/database/relational/postgre.md)
