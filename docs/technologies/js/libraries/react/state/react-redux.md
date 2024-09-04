---
description: Complex state control in React
tags:
    - JavaScript
    - TypeScript
    - React
    - Extension
---

# React - Redux

The official binding library for integrating Redux with React.

![How redux works](https://www.scaler.com/topics/images/updation-process-using-redux.gif)

## Project Structure

> This structure is for reference purposes only

```txt
my-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Counter.tsx
│   │   └── ...
│   ├── store/
│   │   ├── actions.ts
│   │   ├── reducers.ts
│   │   ├── store.ts
│   │   └── types.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── tsconfig.json
├── package.json
└── ...
```

## Steps-by-steps

1. **Setup Redux Store:** Configure a Redux store using `@reduxjs/toolkit`.
2. **Provide Store:** Wrap your app with the `Provider` component from `react-redux`.
3. **Connect Components:** Use `useSelector` to access state and `useDispatch` to dispatch actions within your components.

## Setting Up Redux

1. **Install necessary packages:**

   ```bash
   npm install redux react-redux @reduxjs/toolkit
   ```

2. **Create Redux store and reducers:**

   ```ts  title="src/store/store.ts"
   import { configureStore } from '@reduxjs/toolkit';
   import counterReducer from './reducers';

   const store = configureStore({
     reducer: {
       counter: counterReducer,
     },
   });

   export default store;
   ```

   ```ts title="src/store/reducers.ts"
   import { createSlice } from '@reduxjs/toolkit';

   export interface CounterState {
     value: number;
   }

   const initialState: CounterState = {
     value: 0,
   };

   const counterSlice = createSlice({
     name: 'counter',
     initialState,
     reducers: {
       increment: (state) => {
         state.value += 1;
       },
       decrement: (state) => {
         state.value -= 1;
       },
       incrementByAmount: (state, action) => {
         state.value += action.payload;
       },
     },
   });

   export const { increment, decrement, incrementByAmount } = counterSlice.actions;

   export default counterSlice.reducer;
   ```

3. **Provide the store to your React app:**

   ```tsx title="src/index.tsx"
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import store from './store/store';
   import App from './App';

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

4. **Create a component that interacts with the store:**

   ```tsx title="src/components/Counter.tsx"
   import React from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import { RootState } from '../store/store';
   import { increment, decrement, incrementByAmount } from '../store/reducers';

   const Counter: React.FC = () => {
     const count = useSelector((state: RootState) => state.counter.value);
     const dispatch = useDispatch();

     return (
       <div>
         <div>
           <button onClick={() => dispatch(decrement())}>-</button>
           <span>{count}</span>
           <button onClick={() => dispatch(increment())}>+</button>
         </div>
         <div>
           <button onClick={() => dispatch(incrementByAmount(5))}>
             Increment by 5
           </button>
         </div>
       </div>
     );
   };

   export default Counter;
   ```

5. **Use the connected component in your app:**

   ```tsx title="src/App.tsx"
   import React from 'react';
   import Counter from './components/Counter';

   const App: React.FC = () => {
     return (
       <div>
         <h1>Redux Counter</h1>
         <Counter />
       </div>
     );
   };

   export default App;
   ```

## TypeScript Types

For better TypeScript support, you should define types for your store and dispatch.

```ts title="src/store/store.ts"
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```
