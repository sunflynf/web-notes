---
description: Meta, why?
tags:
    - Frontend
    - JavaScript
    - TypeScript
    - Library
---

# React

- Building User Interface
- Single-page Application
- Create Reuseable UI Components (Virtual DOM)
- To use React in production, you need **npm** which is included with [Node.js](https://www.w3schools.com/nodejs/nodejs_get_started.asp).

## Builder Tools

- [Create React App](https://create-react-app.dev/)
  - Includes built tools such as **webpack**, **Babel**, and **ESLint**.
  - `npx create-react-app app-name`
  - `npm start` | `yarn start`
- [React Vite](https://vitejs.dev/guide/)
  - `npm create vite app-name --template react`
  - `npm create vite app-name --template react-ts`
  - `npm run dev`

## Render

```html title="public/index.html"
<body>
  <!-- Your code will put inside root (or any id) div -->
  <div id="root"></div>
</body>
```

```jsx title="src/index.jsx"
import ReactDOM from 'react-dom/client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<p>Hello</p>);
```

## JSX

- JavaScript XML
- Write HTML in JS
- `<>` | `<Fragment>` | `<React.Fragment>`

```jsx
const secretText = 'Daniel';
const age = 17;
const users = (
  <>
    <div>John Doe</div>
    <div className='woman'>Mary Jane</div>
    <input type='text' />
    <div>{1 + 1} {secretText}</div> // Expression {}
    {(age >= 18) ? 'mature' : 'child'} // if statement
  </>
)
```

## Components

> **Lifecycle**: Mounting (add + 1st render), Updating (re-render), Unmounting (remove)

### Class Component

**Class** `Name` extends **React.Component**

- `contructor(props?) { super(props?); // state configs }`
- `static getDerivedStateFormProps(props, state) { return {} }` - Call before render (create & update)
- `render() { return <JSX/> }`
- `componentDidMount() {}` - Call after 1st render
- `shouldComponentUpdate() { return true|false; }` - Set up 1 time
- `getSnapshotBeforeUpdate(props, state) {}` - access props & state _before_ update
- `componentDidUpdate() {}` - Call after component update
- `componentWillUnmount() {}` - Call before component is about to be removed

```jsx
class Car1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red"
    };
  }

  changeColor = () => this.setState({ color: "blue" });

  render() {
    return <h2>I am a {this.state.color} {this.props.model}!</h2>;
  }
}

// Use with props: <Car1 model="Mustang" />
```

### Function Component

```jsx
function Name(props?) { return <JSX /> }
```

- Props: `{ children: null|JSX.Element, attr1: value1, attr2: value2, ..., attrN: valueN }`
- Using with props: `<Component attr1={value1} {...otherAttr} />`
- Using with children: `<Parent {...attrs}><Children /></Parent>`
- Event
  - Based on HTML Events
  - `on<EventName>={(event?) => {}}`
- Conditionals
  - `conditions ? <CompIfTrue /> : <CompIfFalse />`
  - `conditions && <CompIfTrue />`
- List:
  - Using: `{listRender.map((item, index) => { return (<JSX key={index} {...item} />); } )}`
  - Each children should have a unique key

```jsx
function Car2() {
  return <h2>Hi, I am a Car!</h2>;
}
// Arrow function (with default props)
const Garage = ({ showGarage = true }) => {
  if (!showGarage) return <Fragment />;
  return (
    <>
      <h1>Who lives in my Garage?</h1>
      <Car2 /> {/* Component nested */}
    </>
  );
}

export default Garage;
// split component to reuse
// Using: import Garage from 'components/Garage';
```

### Feature Component

- `<Fragment> | <>` - Wrap all Elements and render in UI without unexpected element
- `<Suspense fallback={<Spinner />}>{children}</Suspense>`
  - Only Suspense-enabled data sources will activate the Suspense component.
    - Data fetching with Suspense-enabled frameworks like **Relay** and **Next.js**
    - Lazy-loading component code with `lazy`: `const LazyReviewCar = lazy(() => import('./components/cars/ReviewCar.js'));')`
    - Reading the value of a **Promise** with `use`
- `<StrictMode><App/></StrictMode>` - find common bugs in your components early during development
- `<Profiler id='Component' onRender={onRender}><Component /></Profiler>`
  - `const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {}`
  - [View params explains](https://react.dev/reference/react/Profiler#onrender-parameters)

## Styles component

- Using sass/scss: `npm i sass`
- Both **CSS** & **SASS** can using as file or module

```css title="custom.css"
.custom-font-weight {
  font-weight: bold;
}
.bg-red {
  background: #FF0000;
}
```

```jsx title="Custom.jsx"
import React from 'react'; // To use JSX
import styleModule from 'custom.module.css'; // import as module
import 'custom.css'; // using css file

const Custom = ({ name }) => {
  const customStyle = {
    fontSize: '2rem',
    color: '#333333'
  };
  // css module class will display like [filename]_[classname]__[hash]
  return (
    <div className='custom-font-weight' style={styleModule['bg-red']}>
      <span style={customStyle}>{'Hello ' + name}</span>
    </div>
  );
}
```

## Hooks

:::info Rules of Hooks

- Call them at the top level in the body of
  - function component
  - custom Hook
- **Do not call Hooks**
  - inside conditions or loops.
  - after a conditional return statement. **NOTE HERE FOR NEXT PROJECT**
  - in event handlers.
  - in class components.
  - inside functions passed to useMemo, useReducer, or useEffect.
  - inside try/catch/finally blocks.

:::

- Hooks **cannot** be conditional
- `import { use<HookName> } from <'react'|'address-of-custom-hooks'>`

### useState

- Structure `const [state, setState] = useState(initState);`
- `state` change after setState call -> component re-render
- `setState(newState)` | `setState(prevState => { return newState })` (use with callback)

```jsx
import { useState } from "react";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const toggleColor = () => {
    setCar(previousState => {
      const color = previousState.color === "red" ? "blue" : "red";
      return { ...previousState, color }
    });
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={toggleColor}
      >Toggle color</button>
    </>
  )
}
```

### useDeferredValue

:::info

- **Debouncing** - wait for the user to stop typing (e.g. for a second) before updating the list.
- **Throttling** - update the list every once in a while (e.g. at most once a second).

:::

- `useDeferredValue` is better suited to optimizing rendering because it is **deeply integrated with React itself** and **adapts to the user’s device**.
- Usage
  - Showing stale content while fresh content is loading
  - Deferring re-rendering for a part of the UI

```jsx
import { useDeferredValue } from 'react';

export default function App() {
  const [filter, setFilter] = useState('');
  const deferredFitler = useDeferredValue(filter);

  return (
    <div className="container mt-3">
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        className="w-100"
      />
      <ListAnimalMap filter={deferredFitler} />
    </div>
  );
}
```

### useReducer

- Tracking complex state (like object) -> Same tech like [React-Redux](../../../../technologies/js/libraries/react/state/react-redux.md)
- Custom handle state
- Syntax: `const [state, dispatch] = useReducer(reducer, initialState);`
- **reducer**: `const reducer = (currentState, action: { type, [any]?: value }) => { return newState }`
- **Update**: `dispatch({ type, [any]?: value })`

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Taylor', age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}
```

### useRef

- Persist value of component (not affect if component re-render)
- Used to access a DOM element directly
- Declare: `const elRef = useRef(initValue || undefined);` . (**Recommend using `initValue` if ref not element**)
- Add to element: `<element ref={elRef} />`
- Value of ref
  - Get: `elRef.current`
  - Set: `elRef.current = any;`

### useImperativeHandle

- Customize the handle exposed as a `ref`
- Combine with `forwardRef`
- `useImperativeHandle(ref, createHandle, dependencies?)`
- **If you can express something as a prop, you should not use a ref.**

```jsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const ValidInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref,
    () => ({
      addRandomNumber: (max = Number.MAX_SAFE_INTEGER) => {
        inputRef.current.value = (Math.random() * max).toFixed(0);
      },
    }), []);

  return <input type="text" ref={inputRef} {...props} />;
});

export default function App() {
  const pointingRef = useRef();
  const onBtnClick = () => pointingRef.current && pointingRef.current.addRandomNumber();

  return (
    <div>
      <ValidInput ref={pointingRef} />
      <button type="button" onClick={onBtnClick}>Random number</button>
    </div>
  );
}

```

### useEffect & useLayoutEffect

- Perform side effect in component
  - fetching data
  - directly update DOM
  - timers
- Syntax: `useEffect(<function>, [...dependencies]?)`
  - Effect run 1st after component render
  - Effect recall if dependencies has change, none if dependencies is []
- `useLayoutEffect`
  - A version of `useEffect` that fires before the browser repaints the screen.
  - Only use in case need to calculate layout before show UI (tooltips, popover, ...)

```jsx
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    // clean up function
    return () => clearTimeout(timer)
  }, [count]); // render when count change

  return <h1>I've rendered {count} times!</h1>;
}
```

:::tip Avoid useless fetch when unmount component

Apply for _Component_ which can fetch data when mount to avoid refetch with **StrictMode** or `useEffect` has `show` dependency

```tsx
<button type="button" onClick={() => setShow(!show)}>
    Show modal
</button>
{show && <Modal show={show} onHide={() => setShow(false)} />}
```

```tsx title="Modal.tsx"
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  show: boolean;
  onHide: () => void;
};

const Modal: React.FC<ModalProps> = ({ show, onHide }) => {
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    (async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/typicode/demo/posts",
          { signal },
        );
        if (!signal.aborted) {
          if (res.ok) {
            const data = await res.json();
            console.log(data);
          } else {
            console.log("Status: ", res.status);
          }
        }
      } catch (err) {
        if (!signal.aborted) {
          console.log(err);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [show]);

  return createPortal(
    <div
      className='custom-modal'
      onClick={onHide}
    >
      Hello
    </div>,
    document.body,
  );
};

export default Modal;
```

:::

### useCallback & useMemo

- **Problem**: Component re-render when
  - function & value inside (not state) re-render
  - children use props includes that function & value re-render
  - `=> Need to control re-render when it need with dependencies`
- `useCallback`
  - Using: `const memorizeFunction = useCallback(() => {}, [...dependencies])`
  - Avoid child component re-render if function of parent re-render
- `useMemo`
  - Using: `const memorizeValue = useMemo(() => any, [...dependencies])`

### useContext

- Manage state globally
- State use in component that need it, avoid put parent props -> child props -> ... -> n-child props (prop drilling)

:::info How to use

- **Step 1 - Create**
  - `const Context = createContext(defaultValue?);`
  - Context now is High Order Component
  - defaultValue can put inside to get recommend for state (IDE Support)
- **Step 2 - Wrap**
  - `<Context.Provider value={{ state1, setState1, state2, sampleArr, ..., any }}>{children}</Context.Provider>`
  - All children inside `<Context.Provider>` can use all props in value
  - value should be an object
- **Step 3 - Get value**
  - `const { state1, state2 } = useContext(Context);`
  - Put Context to `useContext` to get correct value holder
  - Get only props need to using

:::

```jsx
import { useState, createContext, useContext } from "react";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 4</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```

### useId

- `const uniqueId = useId();`
- UniqueId will create 1 time for Component when it render
- Use in case common Component (like Input) reuse more than 2 in parent component -> Avoid dupplicate Id when using

```jsx
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label htmlFor={passwordHintId}>Password</label>
      <input type="password" id={passwordHintId} />
    </>
  );
}

export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>s
      <PasswordField />
    </>
  );
}
```

---

:::tip combine tech

- **Suspense** + `lazy`
- `createContext` -> Context (Context.Provider value={}) -> `useContext`(Context)
- `useRef` -> `forwardRef` -> `useImperativeHandle`

:::

---

## ReactDOM.createPortal

- Render some children into a different part of the DOM (drawer, modal, tooltips, ...)
- `createPortal(children, domNode, key?)`

## React Compiler (React v19)

[Documents](https://19.react.dev/learn/react-compiler#getting-started)

### Configs

#### Existing project

```jsx
const ReactCompilerConfig = {
  // specific directory
  sources: (filename) => {
    return filename.indexOf('src/path/to/dir') !== -1;
  },
  compilationMode: "annotation",
};

// src/app.jsx
export default function App() {
  "use memo";
  // ...
}
```

#### New project

```js title="babel.config.js"
const ReactCompilerConfig = { /* ... */ };

module.exports = function () {
  return {
    plugins: [
      ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
      // ...
    ],
  };
};
```

```js title="vite.config.js"
const ReactCompilerConfig = { /* ... */ };

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      }),
    ],
    // ...
  };
});
```

```js title="next.config.js"
// npm install next@canary babel-plugin-react-compiler
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
```

## Resources

1. [React official page](https://react.dev/)
2. [React - w3schools](https://www.w3schools.com/react/default.asp)
3. [React - TypeScript](https://react-typescript-cheatsheet.netlify.app)
4. [React handbook](https://reacthandbook.dev/)
