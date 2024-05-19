1. **Install `react-router-dom`**:
   ```bash
   npm install react-router-dom
   ```

2. **Set Up Router**:
   Wrap your application in a router component, usually done in the root file (e.g., `index.js` or `App.js`).

   ```javascript
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

3. **Define Routes**:
   Inside your main `App` component, define the routes using the `Routes` and `Route` components.

   ```javascript
   import React from 'react';
   import { Routes, Route } from 'react-router-dom';
   import Home from './components/Home';
   import About from './components/About';
   import Contact from './components/Contact';
   import NotFound from './components/NotFound';

   const App = () => {
     return (
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
     );
   };

   export default App;
   ```

4. **Create Components**:
   Create the components that will be rendered for each route.

   ```javascript
   // Home.js
   import React from 'react';

   const Home = () => {
     return <div>Home Page</div>;
   };

   export default Home;

   // About.js
   import React from 'react';

   const About = () => {
     return <div>About Page</div>;
   };

   export default About;

   // Contact.js
   import React from 'react';

   const Contact = () => {
     return <div>Contact Page</div>;
   };

   export default Contact;

   // NotFound.js
   import React from 'react';

   const NotFound = () => {
     return <div>404 - Not Found</div>;
   };

   export default NotFound;
   ```

5. **Navigation**:
   Use the `Link` component to navigate between routes.

   ```javascript
   import React from 'react';
   import { Link } from 'react-router-dom';

   const Navbar = () => {
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

6. **Integrate Navigation**:
   Integrate the `Navbar` component into your `App` component.

   ```javascript
   import React from 'react';
   import { Routes, Route } from 'react-router-dom';
   import Home from './components/Home';
   import About from './components/About';
   import Contact from './components/Contact';
   import NotFound from './components/NotFound';
   import Navbar from './components/Navbar';

   const App = () => {
     return (
       <div>
         <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </div>
     );
   };

   export default App;
   ```

7. **Handle URL Parameters**:
   Use the `useParams` hook to access route parameters.

   ```javascript
   // ItemDetail.js
   import React from 'react';
   import { useParams } from 'react-router-dom';

   const ItemDetail = () => {
     const { id } = useParams();
     return <div>Item Detail for item with ID: {id}</div>;
   };

   export default ItemDetail;

   // In your App.js or Routes configuration
   <Route path="/item/:id" element={<ItemDetail />} />
   ```

8. **Programmatic Navigation**:
   Use the `useNavigate` hook for programmatic navigation.

   ```javascript
   import React from 'react';
   import { useNavigate } from 'react-router-dom';

   const Home = () => {
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

   export default Home;
   ```
