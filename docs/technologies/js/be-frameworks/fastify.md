---
description: Backend Frameworks in JavaScript ecosystem.
tags:
  - Backend
  - JavaScript
  - TypeScript
  - MVC
  - REST APIs
---

# Fastify

Fastify is a highly performant, low-overhead web framework for Node.js, designed for speed and efficiency. It's great for building APIs due to its fast routing, built-in validation, and extensibility.

## Core Features

1. **High Performance**:  
   Fastify is optimized for speed and can handle thousands of requests per second.
2. **Schema-Based Validation**:  
   JSON Schema validation ensures that request data is accurate and well-formed.

3. **Built-in Asynchronous Support**:  
   Fastify uses async/await, providing smooth handling of asynchronous operations.

4. **Plugin Architecture**:  
   Fastify encourages modular development with its powerful plugin system.

## Basic Setup

1. **Installation**:

   ```bash
   npm install fastify
   ```

2. **Hello World Example**:

   ```javascript
   const fastify = require("fastify")({ logger: true });

   fastify.get("/", async (request, reply) => {
     return { message: "Hello, Fastify!" };
   });

   fastify.listen({ port: 3000 }, (err, address) => {
     if (err) {
       fastify.log.error(err);
       process.exit(1);
     }
     fastify.log.info(`Server listening at ${address}`);
   });
   ```

## Routing

Fastify routes define the method, URL, and handler for processing requests.

1. **Basic Route**:

   ```javascript
   fastify.get("/hello", async (request, reply) => {
     return { greeting: "Hello, Fastify!" };
   });
   ```

2. **Dynamic Routes**:

   ```javascript
   fastify.get("/user/:id", async (request, reply) => {
     const { id } = request.params;
     return { userId: id };
   });
   ```

3. **Query Parameters**:

   ```javascript
   fastify.get("/search", async (request, reply) => {
     const { q } = request.query;
     return { query: q };
   });
   ```

4. **Post Request with Body**:
   ```javascript
   fastify.post("/data", async (request, reply) => {
     const { name, age } = request.body;
     return { received: { name, age } };
   });
   ```

## Schema Validation

Fastify uses JSON Schema for validating requests.

1. **Request Body Validation**:

   ```javascript
   fastify.post(
     "/register",
     {
       schema: {
         body: {
           type: "object",
           required: ["username", "password"],
           properties: {
             username: { type: "string" },
             password: { type: "string", minLength: 6 },
           },
         },
       },
     },
     async (request, reply) => {
       return { message: "User registered successfully" };
     }
   );
   ```

2. **Query and Params Validation**:
   ```javascript
   fastify.get(
     "/products/:id",
     {
       schema: {
         params: {
           type: "object",
           properties: {
             id: { type: "string" },
           },
         },
         querystring: {
           type: "object",
           properties: {
             sort: { type: "string" },
           },
         },
       },
     },
     async (request, reply) => {
       return { productId: request.params.id, sort: request.query.sort };
     }
   );
   ```

## Middleware and Plugins

Fastify uses hooks and plugins instead of middleware.

1. **Hooks for Pre-Processing Requests**:

   ```javascript
   fastify.addHook("onRequest", async (request, reply) => {
     console.log(`Request received: ${request.method} ${request.url}`);
   });
   ```

2. **Creating and Registering Plugins**:

   ```javascript
   async function examplePlugin(fastify, options) {
     fastify.decorate("utility", () => "Utility Function");

     fastify.get("/use-utility", async (request, reply) => {
       return { message: fastify.utility() };
     });
   }

   fastify.register(examplePlugin);
   ```

## Error Handling

1. **Global Error Handler**:

   ```javascript
   fastify.setErrorHandler((error, request, reply) => {
     fastify.log.error(error);
     reply.status(500).send({ error: "Internal Server Error" });
   });
   ```

2. **Custom 404 Handler**:
   ```javascript
   fastify.setNotFoundHandler((request, reply) => {
     reply.status(404).send({ error: "Route Not Found" });
   });
   ```

## Serving Static Files

1. **Install `fastify-static` Plugin**:

   ```bash
   npm install fastify-static
   ```

2. **Serve Static Files**:
   ```javascript
   const path = require("path");
   fastify.register(require("fastify-static"), {
     root: path.join(__dirname, "public"),
     prefix: "/public/",
   });
   ```

## Key Fastify Methods Cheat Sheet

| Method                      | Description                      |
| --------------------------- | -------------------------------- |
| `fastify.get()`             | Define a GET route               |
| `fastify.post()`            | Define a POST route              |
| `fastify.addHook()`         | Add lifecycle hooks              |
| `fastify.register()`        | Register a plugin                |
| `fastify.decorate()`        | Add custom properties to Fastify |
| `fastify.setErrorHandler()` | Set a global error handler       |
| `fastify.listen()`          | Start the Fastify server         |

:::tip

1. **Start with Simple Routes**:  
   Build basic GET and POST routes to understand Fastify’s structure.
2. **Use Schema Validation Early**:  
   Fastify’s validation is fast and prevents common API errors.
3. **Leverage Plugins**:  
   Use official plugins like `fastify-static`, `fastify-cors`, and `fastify-formbody` for common needs.

4. **Check the Official Documentation**:  
   Visit the [Fastify Docs](https://www.fastify.io/docs/latest/) for in-depth explanations and examples.

:::
