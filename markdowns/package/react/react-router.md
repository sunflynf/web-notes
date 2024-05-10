- React Router enables **Client-side routing**
- **ADD TO PROJECT**: `npm i -D react-router-dom`
- **React Router** for mobile app write by **React Native**: `react-router-native`

### Table of contents

### Routers
- Router type 🤔
  - **Browser** - default
  - **Hash** - use when server not support get full URL
  - **Memory** - for Testing setup
  - **Statis** - support **Server-Side rendering**
- `<[Browser|Hash|Memory|Native|Static]Router/>` - Small application & less affect by url
- `create[Broswer|Hash|Memory|Static]Router([ ... ], opt?: {})` - Easy maintain & improve, works with SEO

```jsx
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
// --- Plain objects ---
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
const AppRoutes = () => <RouterProvider router={router} fallbackElement={<BigSpinner />}/>;
export default AppRoutes;
```

### Route
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
- path
  - "" -> / (current url)
  - "/things" -> /things
  - "/things/:thingId" -> /things/12a-bc
  - "*" -> /any-slug | /c1/c11/c111
  - "/:lang?/categories -> /categories | /fr/categories | /vi/categories | ... 


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

### Components


### Hooks
