- React Router enables **Client-side routing**
- **ADD TO PROJECT**: `npm i -D react-router-dom`

### Table of contents

### Routers
#### Picking
- Router type:
  - **Browser** - default
  - **Hash** - use when server not support get full URL
  - **Memory** - for Testing setup
  - **Statis** - support **Server-Side rendering**
- `<[Browser|Hash|Memory|Native|Static]Router/>` - Small application & less effect by url
- `create[Broswer|Hash|Memory|Static]Router([ ... ], opt?: {})` - Easy maintain & improve, works with SEO

```jsx
// --- JSX Router ---
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
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
    element: <Root />,
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
