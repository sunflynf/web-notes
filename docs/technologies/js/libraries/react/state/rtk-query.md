---
description: Redux add-ons
tags:
  - JavaScript
  - TypeScript
  - React
  - Redux
  - Extension
---

# Redux Toolkits Query

> `@redux-toolkits/query`

## Project Structure

```txt
my-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── app/
│   │   ├── store.ts
│   │   └── api.ts
│   ├── features/
│   │   ├── counter/
│   │   │   ├── Counter.tsx
│   │   │   └── counterSlice.ts
│   │   └── posts/
│   │       ├── Posts.tsx
│   │       └── postsApi.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── tsconfig.json
├── package.json
└── ...
```

## Steps-by-step

1. **Setup RTK Query Service:** Define an API service using `createApi` and `fetchBaseQuery`.
2. **Configure the Store:** Add the API reducer and middleware to the Redux store.
3. **Fetch Data in Components:** Use the generated hooks (e.g., `useGetPostsQuery`) to fetch data in your components.

## Setting Up RTK Query

1. **Install necessary packages:**

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. **Create the Redux store and API service:**

   ```ts title="src/app/store.ts"
   import { configureStore } from "@reduxjs/toolkit";
   import { setupListeners } from "@reduxjs/toolkit/query";
   import { postsApi } from "../features/posts/postsApi";
   import counterReducer from "../features/counter/counterSlice";

   const store = configureStore({
     reducer: {
       counter: counterReducer,
       [postsApi.reducerPath]: postsApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(postsApi.middleware),
   });

   setupListeners(store.dispatch);

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   export default store;
   ```

   ```ts title="src/features/posts/postsApi.ts"
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

   interface Post {
     id: number;
     title: string;
     body: string;
   }

   export const postsApi = createApi({
     reducerPath: "postsApi",
     baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
     endpoints: (builder) => ({
       getPosts: builder.query<Post[], void>({
         query: () => "posts",
       }),
       getPostById: builder.query<Post, number>({
         query: (id) => `posts/${id}`,
       }),
     }),
   });

   export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
   ```

3. **Provide the store to your React app:**

   ```tsx title="src/index.tsx"
   import React from "react";
   import ReactDOM from "react-dom";
   import { Provider } from "react-redux";
   import store from "./app/store";
   import App from "./App";

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById("root")
   );
   ```

4. **Create a component that fetches data using RTK Query:**

   ```tsx title="src/features/posts/Posts.tsx"
   import React from "react";
   import { useGetPostsQuery } from "./postsApi";

   const Posts: React.FC = () => {
     const { data: posts, error, isLoading } = useGetPostsQuery();

     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.toString()}</div>;

     return (
       <div>
         <h1>Posts</h1>
         <ul>
           {posts?.map((post) => (
             <li key={post.id}>
               <h2>{post.title}</h2>
               <p>{post.body}</p>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default Posts;
   ```

5. **Use the connected component in your app:**

   ```tsx title="src/App.tsx"
   import React from "react";
   import Counter from "./features/counter/Counter";
   import Posts from "./features/posts/Posts";

   const App: React.FC = () => {
     return (
       <div>
         <h1>Redux Toolkit Query Example</h1>
         <Counter />
         <Posts />
       </div>
     );
   };

   export default App;
   ```

## **Comparison**: React Redux Thunk vs. React Redux Query

**React Redux Thunk** and **React Redux Query (RTK Query)** are two popular tools for managing side effects and API interactions in React-Redux applications. While both serve the purpose of handling async operations, they differ in terms of features, ease of use, and how they are structured.

### 1. React Redux Thunk

**Redux Thunk** is a middleware that allows you to write action creators that return a function instead of an action. This function can then dispatch multiple actions and interact with APIs or any asynchronous logic (e.g., fetch data from a server).

#### Key Features:

- **Flexibility:** Thunk gives full control over the logic of dispatching actions. You can conditionally dispatch actions, chain them, or even delay them.
- **Manual Setup:** Thunk requires a lot of manual work. You need to explicitly manage loading, success, and error states by dispatching actions for each stage of an async operation.
- **Boilerplate Code:** You have to manually create actions, reducers, and logic for handling different API states (loading, success, failure), which can lead to a lot of repetitive code.
- **Customizable:** If you need full control over the API interaction flow or need a highly customizable solution, Thunk can be a good fit.

#### When to use Redux Thunk:

- If you need fine-grained control over your async logic and how actions are dispatched.
- When you're building a very custom API interaction flow, such as complex side effects, conditional dispatching, retries, or custom caching mechanisms.
- In smaller projects where the overhead of setting up a tool like RTK Query may not be justified.

#### Example of Redux Thunk:

```javascript
// Action creator using Thunk
export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: "FETCH_USER_START" });

  try {
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();

    dispatch({ type: "FETCH_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_FAILURE", payload: error });
  }
};
```

### 2. React Redux Query (RTK Query)

**RTK Query** is a data-fetching and caching tool built into **Redux Toolkit**. It abstracts a lot of the boilerplate away and provides a more declarative approach to fetching and caching data.

#### Key Features:

- **Built-in Caching and Automatic Re-fetching:** RTK Query automatically caches the data and handles re-fetching logic (e.g., when invalidation occurs). It manages when to fetch new data or use cached data.
- **Less Boilerplate:** Unlike Thunk, you don’t have to create action creators, reducers, or dispatch logic manually. RTK Query automatically generates them for you.
- **Data Synchronization:** RTK Query allows you to easily keep your UI in sync with your server by providing features like query invalidation, automatic polling, and background refetching.
- **Error/Loading State Handling:** It handles loading, success, and error states out of the box, so you don’t have to manage these manually.
- **Declarative API:** Instead of imperative calls like in Thunk, RTK Query promotes a declarative API where you define your endpoints and use hooks to fetch or mutate data.

#### When to use RTK Query:

- For API-driven applications where data fetching, caching, and synchronization are primary concerns.
- When you want a fast, minimal setup with reduced boilerplate and automatic handling of common async logic (e.g., loading and error states).
- In projects where you need to manage a lot of data fetching operations or require caching and automatic refetching for performance.
- If you’re already using Redux Toolkit, RTK Query integrates seamlessly with Redux.

#### Example of RTK Query:

```javascript
// Defining an API slice using RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;

// Using the generated hook in a component
const UserProfile = ({ userId }) => {
  const { data, error, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{data.name}</div>;
};
```

### When to Use Redux Thunk vs. RTK Query

| **Criteria**                       | **Redux Thunk**                            | **RTK Query**                                |
| ---------------------------------- | ------------------------------------------ | -------------------------------------------- |
| **Ease of Use**                    | Requires manual setup and more boilerplate | Automatic state management, less boilerplate |
| **Caching**                        | Manual, requires custom logic              | Built-in automatic caching                   |
| **Error Handling**                 | Requires manual action dispatch            | Automatic error and loading state handling   |
| **Boilerplate**                    | High (need to write actions, reducers)     | Minimal (auto-generates actions, reducers)   |
| **Use Case**                       | Fine-grained control, complex side effects | API-driven apps with common data-fetching    |
| **Automatic Refetching**           | Requires manual implementation             | Automatic refetching                         |
| **Custom Logic for Async Actions** | Easily customizable for complex workflows  | Limited customization of async flows         |
| **Integration with Redux**         | More manual integration with Redux state   | Seamless integration with Redux Toolkit      |

### Which Should You Use?

1. **Use Redux Thunk** if:

   - You have complex async workflows (e.g., chained or conditional API calls).
   - You need very fine-grained control over the dispatching of actions and state changes.
   - You don’t mind managing the loading, error, and success states manually.
   - Your project already uses custom middleware and doesn’t require caching or automatic refetching.

2. **Use RTK Query** if:
   - You want a simpler, more declarative way of fetching and caching data in your React app.
   - You need automatic caching, refetching, and data synchronization features.
   - Your project is heavily API-driven and you want to reduce the amount of boilerplate code.
   - You’re already using **Redux Toolkit** and want a fully integrated solution for managing API data.

In summary, **Redux Thunk** is great for custom async logic, but **RTK Query** offers a higher-level, out-of-the-box solution for handling API requests with less effort and built-in features like caching, automatic refetching, and error handling. RTK Query is the recommended choice for most API-heavy applications due to its simplicity and powerful features.
