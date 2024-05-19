### Project Structure
```
my-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── routes/
│       └── AppRoutes.tsx
├── tsconfig.json
├── package.json
└── ...

```

### 1. **Setting Up the Project**

First, install the necessary packages:
```bash
npm install react-router-dom @types/react-router-dom
npm install typescript @types/node @types/react @types/react-dom
```

### 2. **index.tsx**
Set up the router in your main entry file.

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

### 3. **App.tsx**
Define the main structure and routes of your application.

```tsx
// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/layout/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
```

### 4. **Navbar Component**
Create a common navigation component.

```tsx
// src/components/layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

### 5. **Page Components**
Create page components that are linked to different routes.

```tsx
// src/pages/HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return <div>Home Page</div>;
};

export default HomePage;

// src/pages/AboutPage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return <div>About Page</div>;
};

export default AboutPage;

// src/pages/ContactPage.tsx
import React from 'react';

const ContactPage: React.FC = () => {
  return <div>Contact Page</div>;
};

export default ContactPage;

// src/pages/NotFoundPage.tsx
import React from 'react';

const NotFoundPage: React.FC = () => {
  return <div>404 - Not Found</div>;
};

export default NotFoundPage;
```

### 6. **Handle URL Parameters**
Use the `useParams` hook to access route parameters.

```tsx
// src/pages/ItemDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface ItemDetailParams {
  id: string;
}

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<ItemDetailParams>();
  return <div>Item Detail for item with ID: {id}</div>;
};

export default ItemDetailPage;

// In your App.tsx or Routes configuration
<Route path="/item/:id" element={<ItemDetailPage />} />
```

### 7. **Programmatic Navigation**
Use the `useNavigate` hook for programmatic navigation.

```tsx
// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
};

export default HomePage;
```
