---
description: Backend Frameworks in JavaScript ecosystem.
tags:
   - Backend
   - JavaScript
   - TypeScript
   - MVC
   - RESTapis
---

# Express

## Setup

1. **Install Express:**

   ```bash
   npm install express
   ```

2. **Basic Server:**

   ```javascript
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

## Middleware

1. **Using Middleware:**

   ```javascript
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

2. **Serving Static Files:**

   ```javascript
   app.use(express.static('public'));
   ```

## Routing

1. **Basic Routing:**

   ```javascript
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

2. **Route Parameters:**

   ```javascript
   app.get('/users/:userId/books/:bookId', (req, res) => {
     res.send(req.params);
   });
   ```

3. **Query Strings:**

   ```javascript
   app.get('/search', (req, res) => {
     res.send(req.query);
   });
   ```

## Handling Requests

1. **Request Object:**

   ```javascript
   app.get('/user/:id', (req, res) => {
     console.log(req.params.id);  // Route parameters
     console.log(req.query.name); // Query parameters
     console.log(req.body);       // Request body (for POST/PUT requests)
   });
   ```

2. **Response Object:**

   ```javascript
   app.get('/json', (req, res) => {
     res.json({ name: 'Express' });
   });

   app.get('/status', (req, res) => {
     res.status(404).send('Not Found');
   });
   ```

## Advanced Topics

1. **Router:**

   ```javascript
   const router = express.Router();

   router.get('/', (req, res) => {
     res.send('Home page');
   });

   router.get('/about', (req, res) => {
     res.send('About page');
   });

   app.use('/pages', router);
   ```

2. **Error Handling:**

   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).send('Something broke!');
   });
   ```

3. **Environment Variables:**

   ```javascript
   const port = process.env.PORT || 3000;
   ```

4. **Using Template Engines:**

   ```javascript
   app.set('view engine', 'pug');
   app.set('views', './views');

   app.get('/template', (req, res) => {
     res.render('index', { title: 'Hey', message: 'Hello there!' });
   });
   ```

5. **CORS:**

   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

## Best Practices

1. **Environment Configuration:**

   ```javascript
   require('dotenv').config();
   const port = process.env.PORT || 3000;
   ```

2. **Security:**

   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

3. **Logging:**

   ```javascript
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```
