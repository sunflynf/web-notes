---
description: Backend Frameworks in JavaScript ecosystem.
tags:
    - Backend
    - JavaScript
    - TypeScript
    - MVC
    - REST APIs
---

# Hono

Hono is a fast, lightweight web framework for building web applications and APIs in JavaScript and TypeScript. It's optimized for Edge environments like Cloudflare Workers, Deno Deploy, and more.

## Core Concepts
1. **Minimal and Fast**:  
   Hono is designed for high performance with minimal overhead.
   
2. **Routing**:  
   Hono uses an intuitive, declarative routing system.  
 
   ```js
   import { Hono } from 'hono';
   
   const app = new Hono();
   
   app.get('/', (c) => c.text('Hello, Hono!'));
   
   export default app;
   ```

3. **Middleware**:  
   Middleware in Hono is used to handle cross-cutting concerns like authentication, logging, etc.  
 
   ```js
   app.use('*', async (c, next) => {
     console.log('Request received');
     await next();
   });
   ```

4. **Response Helpers**:  
   Hono provides simple methods like `c.text()`, `c.json()`, `c.html()` to send responses.

## Basic Setup
1. **Installation (Node.js)**:  
   ```bash
   npm install hono
   ```

2. **Deno Usage**:  
   ```js
   import { Hono } from 'https://deno.land/x/hono/mod.ts';
   
   const app = new Hono();
   
   app.get('/', (c) => c.text('Hello from Deno!'));
   
   console.log('Listening on http://localhost:3000');
   app.fire();
   ```

3. **Cloudflare Workers Example**:  
   ```js
   import { Hono } from 'hono';
   
   const app = new Hono();
   
   app.get('/', (c) => c.text('Running on Cloudflare Workers'));
   
   export default app;
   ```

## Common Routing Patterns
- **Basic Routes**:  
   ```js
   app.get('/hello', (c) => c.text('Hello World!'));
   ```

- **Dynamic Routes**:  
   ```js
   app.get('/user/:id', (c) => {
     const userId = c.req.param('id');
     return c.text(`User ID: ${userId}`);
   });
   ```

- **Query Parameters**:  
   ```js
   app.get('/search', (c) => {
     const query = c.req.query('q');
     return c.text(`Search Query: ${query}`);
   });
   ```

- **Post Request**:  
   ```js
   app.post('/submit', async (c) => {
     const data = await c.req.json();
     return c.json({ message: 'Data received', data });
   });
   ```

## Middleware Examples
- **Global Middleware for Logging**:  
   ```js
   app.use('*', async (c, next) => {
     console.log(`Request: ${c.req.method} ${c.req.url}`);
     await next();
   });
   ```

- **Error Handling Middleware**:  
   ```js
   app.use('*', async (c, next) => {
     try {
       await next();
     } catch (err) {
       return c.json({ error: 'Something went wrong' }, 500);
     }
   });
   ```

## Key Methods Cheat Sheet
| Method            | Description                         |
|-------------------|-------------------------------------|
| `c.text()`        | Send plain text response            |
| `c.json()`        | Send JSON response                  |
| `c.html()`        | Send HTML response                  |
| `c.req.param()`   | Access dynamic route parameters     |
| `c.req.query()`   | Access query parameters             |
| `c.req.header()`  | Access request headers              |

:::tip

1. **Start Small**:  
   Build a simple API with GET and POST routes to understand the core structure.

2. **Use Middleware Wisely**:  
   Add logging, CORS, and error-handling middleware for robustness.

3. **Deploy on Edge**:  
   Deploy to platforms like Cloudflare Workers or Vercel for instant scalability.

4. **Check Hono Documentation**:  
   Visit the [Hono Docs](https://hono.dev/) for advanced guides and API references.

:::
