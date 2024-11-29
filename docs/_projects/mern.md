---
description: Most popular tech stack for Node.js dev
tags: [MongoDB, Express, Node, React]
---

# MERN

- [MongoDB](../technologies/database/no-sql/mongodb.md)
- [Express](../technologies/js/be-frameworks/express.md)
- [React](../technologies/js/libraries/react/index.mdx)
- [Node.js](../technologies/js/env/nodejs.md)

## Directory Structure

A clean and consistent directory structure helps in keeping the project organized

```txt
my-mern-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── server.js
│   └── app.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
├── .env
├── .gitignore
├── package.json
├── README.md
└── yarn.lock or package-lock.json
```

## Backend Best Practices

- **Configuration Management:**
  - Use environment variables for configuration. Store them in a `.env` file.
  - Use a configuration file to load these variables (`config/` folder).

- **Modularization:**
  - Separate different concerns into modules (e.g., routes, controllers, models).
  - Use Express Router for modular routing (`routes/` folder).

- **Error Handling:**
  - Create a centralized error handling middleware (`middlewares/` folder).
  - Use try-catch blocks in controllers to handle asynchronous errors.

- **Database Schema:**
  - Define clear and consistent schemas using Mongoose (`models/` folder).
  - Use proper indexing and validation.

- **Security:**
  - Use libraries like `helmet` for securing HTTP headers.
  - Use `express-validator` for input validation.
  - Implement authentication and authorization properly (e.g., using JWT).

## Frontend Best Practices

- **Component Organization:**
  - Separate components into presentational and container components.
  - Organize components by feature or domain within the `components/` folder.

- **State Management:**
  - Use hooks for managing local state and side effects.
  - Use context or state management libraries (e.g., Redux or Context API) for global state.

- **Styling:**
  - Use CSS-in-JS libraries (e.g., styled-components) or CSS modules for styling.
  - Organize styles consistently within the `styles/` folder.

- **Service Layer:**
  - Create a service layer for API calls (`services/` folder).
  - Use libraries like Axios for making HTTP requests.

- **Routing:**
  - Use React Router for navigation and routing (`App.js` and `pages/` folder).
  - Organize routes by feature or domain within the `pages/` folder.

## General Best Practices

- **Version Control:**
  - Use [Git](../tools/version-control/index.mdx) for version control. Maintain a clean and meaningful commit history.
  - Use branching strategies (e.g., Git Flow).

- **Code Quality:**
  - Use linters (e.g., [ESLint](https://eslint.org/)) and formatters (e.g., [Prettier](https://prettier.io/)) to maintain code quality.
  - Write unit tests (e.g., [Jest](../technologies/js/testing/jest.md), [Mocha](../technologies/js/testing/mocha.md)) and integration tests.

- **Documentation:**
  - Maintain a clear and concise `README.md`.
  - Document API endpoints using tools like Swagger.

- **Dependency Management:**
  - Use a single package manager (npm or yarn).
  - Keep dependencies updated and manage them through `package.json`.

- **Build and Deployment:**
  - Use build tools (e.g., Webpack) and optimize the build process.
  - Automate deployment with CI/CD pipelines.

### Example Files

```js title='server.js'
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});
```

```jsx title='App.jsx'
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

## Run with 1 command

1. **Install the necessary packages:**

   ```bash
   npm install concurrently
   ```

2. **Set up your project structure:**

   ```txt
   my-project/
   ├── client/
   │   ├── src/
   │   ├── public/
   │   ├── package.json
   │   └── vite.config.js
   ├── server/
   │   ├── index.js
   │   └── package.json
   ├── package.json
   └── README.md
   ```

3. **Configure your `package.json`:**

    ```json title="package.json"
    {
      "name": "my-project",
      "version": "1.0.0",
      "scripts": {
        "start": "concurrently \"npm run client\" \"npm run server\"",
        "client": "cd client && npm run dev",
        "server": "cd server && npm run dev"
      },
      "devDependencies": {
        "concurrently": "^6.0.0"
      }
    }
    ```

      This example use `create-vite` for **React**

    ```json title="client/package.json"
    {
      "scripts": {
        "dev": "vite"
      },
    }
    ```

    ```json title="server/package.json"
    {
      "scripts": {
        "dev": "nodemon index.js"
      },
      "dependencies": {
        "express": "^4.17.1"
      },
      "devDependencies": {
        "nodemon": "^2.0.7"
      }
    }
    ```

4. **Run the project:**

    ```bash
    npm start
    ```
