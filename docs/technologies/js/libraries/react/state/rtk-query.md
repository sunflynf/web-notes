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
   import { configureStore } from '@reduxjs/toolkit';
   import { setupListeners } from '@reduxjs/toolkit/query';
   import { postsApi } from '../features/posts/postsApi';
   import counterReducer from '../features/counter/counterSlice';

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
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   interface Post {
     id: number;
     title: string;
     body: string;
   }

   export const postsApi = createApi({
     reducerPath: 'postsApi',
     baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
     endpoints: (builder) => ({
       getPosts: builder.query<Post[], void>({
         query: () => 'posts',
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
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import store from './app/store';
   import App from './App';

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

4. **Create a component that fetches data using RTK Query:**

   ```tsx title="src/features/posts/Posts.tsx"
   import React from 'react';
   import { useGetPostsQuery } from './postsApi';

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
   import React from 'react';
   import Counter from './features/counter/Counter';
   import Posts from './features/posts/Posts';

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
