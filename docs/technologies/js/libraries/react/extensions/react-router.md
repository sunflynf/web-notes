---
description: Set up routing
tags:
  - JavaScript
  - TypeScript
  - React
  - Extension
---

# React Router DOM

- Enables **Client-side routing**

```bash
# Add to project
npm i react-router-dom
# For React Native
npm i react-router-native
```

## Routers

| Type        | For                                      |
| ----------- | ---------------------------------------- |
| **Browser** | default                                  |
| **Hash**    | use when server not support get full URL |
| **Memory**  | for Testing setup                        |
| **Statis**  | support **Server-Side rendering**        |

```jsx
// <[Browser|Hash|Memory|Native|Static]Router/>
// -> Small application & less affect by url

// --- JSX Router ---
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="contact" element={<Contact />} />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          })
        }
      />
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login />}
          loader={redirectIfUser}
        />
        <Route path="logout" action={logoutUser} />
      </Route>
    </Route>
  )
);

// --- Return directly if using RouterComponent ---
const AppRouter = () => (
  <BrowserRouter>
    <Route path="/" element={<Root />}>{...}</Route>
  </BrowserRouter>;
)
```

```jsx
// create[Broswer|Hash|Memory|Static]Router([ ... ], opt?: {})
// -> Easy maintain & improve, works with SEO

// --- Plain objects ---
// Recommended for 6.4+
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: ({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          }),
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            loader: redirectIfUser,
          },
          {
            path: "logout",
            action: logoutUser,
          },
        ],
      },
    ],
  },
]);

// fallbackElement is optional
const AppRoutes = () => (
  <RouterProvider router={router} fallbackElement={<BigSpinner />} />
);
export default AppRoutes;
```

## Route

```ts
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
```

| Text                   | Path                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `""`                   | current url                                                                        |
| `"/things"`            | `/things`                                                                          |
| `"/things/:thingId"`   | `/things/12a-bc`                                                                   |
| `"*"`                  | `/any-slug` <br/> `/c1/c11/c111`                                                   |
| `"/:lang?/categories"` | `/categories` <br/> `/en/categories` <br/> `/fr/categories` <br/> `/vi/categories` |

```jsx
<Route
  // this path will match URLs like
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params.teamId); // "hotspur"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;

// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params.teamId); // "hotspur"
}
```

## Navigation

```jsx
import { Link } from "react-router-dom";

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

```jsx
import { Routes, Route } from "react-router-dom";
import { About, Contact, Home, NotFound } from "./pages";

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

## Form

```tsx
import { Form } from "react-router-dom";

const InputSearch = () => {
  return (
    <Form action="/search">
      <input type="text" name="name" />
    </Form>
  );
};
```

## Hooks

### useParams

```jsx
// In your App.js or Routes configuration
<Route path="/item/:id" element={<ItemDetail />} />;

// ItemDetail.js
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  return <div>Item Detail for item with ID: {id}</div>;
};
```

### useNavigate

```jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
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

### useLoaderData

```jsx title="App.jsx"
const router = [
  {
    path: "dashboard",
    element: <Dashboard />,
    loader: async ({ request }) => {
      const res = await fetch("/api/home-page");
      const data = await res.json();
      return data;
    },
  },
  // ...
];
```

```jsx title="Dashboard.jsx"
import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const data = useLoaderData();

  // ...
};
```
