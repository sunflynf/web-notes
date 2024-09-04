---
description: Backend Frameworks in JavaScript ecosystem.
tags:
   - Backend
   - JavaScript
   - TypeScript
   - MVC
   - REST APIs
---

# Express

## Setup

### 1. Install Express

```bash
npm i express
```

:::info Auto reload server

```bash
npm i -D nodemon
```

```json
"start": "node src/index.js",
"watch": "nodemon src/index.js --experimental-modules",
```

:::

### 2. Basic Server

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Middlewares

### Using Middleware

```js
const express = require('express');
const app = express();

// Built-in middleware for parsing JSON
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
```

### Serving Static Files

```js
app.use(express.static('public'));
```

## Routing

### Basic

```js
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

app.put('/user', (req, res) => {
  res.send('PUT request to /user');
});

app.delete('/user', (req, res) => {
  res.send('DELETE request to /user');
});
```

### Route Parameters

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});
```

### Query Strings

```js
app.get('/search', (req, res) => {
  res.send(req.query);
});
```

## Handling Requests

### Request Object

```js
app.get('/user/:id', (req, res) => {
  console.log(req.params.id);  // Route parameters
  console.log(req.query.name); // Query parameters
  console.log(req.body);       // Request body (for POST/PUT requests)
});
```

### Response Object

```js
app.get('/json', (req, res) => {
  res.json({ name: 'Express' });
});

app.get('/status', (req, res) => {
  res.status(404).send('Not Found');
});
```

## Advanced Topics

### Router

```js
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

app.use('/pages', router);
```

### Error Handling

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Environment Variables

```js
const port = process.env.PORT || 3000;
```

[Best practices](#environment-configuration)

### Using Template Engines

:::info Popular templates

- [EJS](/docs/technologies/js/templates/ejs.md)
- [Mustache](/docs/technologies/js/templates/mustache.md)
- [Pug (Jade)](/docs/technologies/js/templates/pug.md)
:::

```js
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/template', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

### CORS

```js
const cors = require('cors');
app.use(cors());
```

## Best Practices

### Environment Configuration

   ```js
   require('dotenv').config();

   // Note: Module JS using
   // import dotenv from 'dotenv';
   // dotenv.config();

   const port = process.env.PORT || 3000;
   ```

### Security

   ```js
   const helmet = require('helmet');
   app.use(helmet());
   ```

### Logging

   ```js
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```
