---
description: Most popular tech stack for Node.js dev
tags: [MongoDB, Express, Node, React]
---

# MERN

- [MongoDB](/docs/technologies/database/no-sql/MongoDB.md)
- [Express](/docs/technologies/js/frameworks/backend/express.md)
- [React](/docs/technologies/js/libraries/react/index.md)
- [Node.js](/docs/technologies/js/env/nodejs.md)

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
  - Use [Git](/docs/tools/version-control/index.mdx) for version control. Maintain a clean and meaningful commit history.
  - Use branching strategies (e.g., Git Flow).

- **Code Quality:**
  - Use linters (e.g., [ESLint](https://eslint.org/)) and formatters (e.g., [Prettier](https://prettier.io/)) to maintain code quality.
  - Write unit tests (e.g., [Jest](/docs/technologies/js/testing/jest.md), [Mocha](/docs/technologies/js/testing/mocha.md)) and integration tests.

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
