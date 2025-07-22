---
description: Backend Frameworks in JavaScript ecosystem.
tags:
  - Backend
  - JavaScript
  - TypeScript
  - MVC
  - REST APIs
---

# Koa.js

Koa is a minimalist and expressive web framework for Node.js, designed to build web applications and APIs with a strong emphasis on async/await for handling requests and responses.

## Core Concepts

1. **Lightweight and Modular**:  
   Koa provides a minimal core without built-in middleware, encouraging developers to add only what they need.
2. **Async/Await Middleware**:  
   Middleware is written using async functions, making asynchronous code clean and readable.

3. **Context Object (`ctx`)**:  
   The `ctx` object represents the request and response, providing methods and properties for interacting with them.

## Basic Setup

1. **Installation**:

   ```bash
   npm install koa
   ```

2. **Simple Koa Server**:

   ```javascript
   const Koa = require("koa");
   const app = new Koa();

   app.use(async (ctx) => {
     ctx.body = "Hello, Koa!";
   });

   app.listen(3000, () => {
     console.log("Server running at http://localhost:3000");
   });
   ```

## Routing Example (Using `koa-router`)

1. **Install `koa-router`**:

   ```bash
   npm install koa-router
   ```

2. **Basic Routing**:

   ```javascript
   const Koa = require("koa");
   const Router = require("koa-router");

   const app = new Koa();
   const router = new Router();

   router.get("/", (ctx) => {
     ctx.body = "Welcome to Koa!";
   });

   router.get("/user/:id", (ctx) => {
     ctx.body = `User ID: ${ctx.params.id}`;
   });

   app.use(router.routes()).use(router.allowedMethods());

   app.listen(3000);
   ```

## Middleware Examples

1. **Logging Middleware**:

   ```javascript
   app.use(async (ctx, next) => {
     const start = Date.now();
     await next();
     const ms = Date.now() - start;
     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
   });
   ```

2. **Error Handling Middleware**:

   ```javascript
   app.use(async (ctx, next) => {
     try {
       await next();
     } catch (err) {
       ctx.status = err.status || 500;
       ctx.body = { error: err.message };
       ctx.app.emit("error", err, ctx);
     }
   });
   ```

3. **Body Parsing Middleware (Using `koa-bodyparser`)**:

   ```bash
   npm install koa-bodyparser
   ```

   ```javascript
   const bodyParser = require("koa-bodyparser");
   app.use(bodyParser());

   app.use(async (ctx) => {
     if (ctx.method === "POST") {
       ctx.body = `Received: ${JSON.stringify(ctx.request.body)}`;
     }
   });
   ```

## Common `ctx` Methods

| Method         | Description                          |
| -------------- | ------------------------------------ |
| `ctx.body`     | Sets the response body               |
| `ctx.status`   | Sets the HTTP status code            |
| `ctx.method`   | Access the request method            |
| `ctx.url`      | Access the request URL               |
| `ctx.request`  | Access request object                |
| `ctx.response` | Access response object               |
| `ctx.params`   | Access route parameters (via router) |
| `ctx.query`    | Access query string parameters       |

:::tip

1. **Use Koa Middleware**:  
   Add essential middleware like `koa-router`, `koa-bodyparser`, and `koa-static` to handle routing, parsing, and serving static files.

2. **Embrace Async/Await**:  
   Koa’s async/await pattern makes it easy to handle asynchronous operations cleanly.

3. **Error Handling**:  
   Implement global error-handling middleware early to catch and manage errors gracefully.

4. **Check Koa Documentation**:  
   Visit the [Koa Docs](https://koajs.com/) for deeper insights into the framework and advanced usage.

:::
