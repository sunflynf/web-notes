> - Building User Interface
> - Single-page Application
> - Create Reuseable UI Components (Virtual DOM)
> - To use React in production, you need **npm** which is included with [Node.js]().

### Table of contents

### Builder Tools
- [Create React App](https://create-react-app.dev/)
  - Includes built tools such as **webpack**, **Babel**, and **ESLint**.
  - `npx create-react-app app-name`
  - `npm start` | `yarn start`
- [React Vite](https://vitejs.dev/guide/)
  - `npm create vite app-name --template react`
  - `npm create vite app-name --template react-ts`
  - `npm run dev`

### Render
```html
<body>
  <!-- Your code will put inside root (or any id) div -->
  <div id="root"></div>
</body>
```
```js
// index.js
import ReactDOM from 'react-dom/client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<p>Hello</p>);
```

### JSX
> - JavaScript XML
> - Write HTML in JS
> - <> | <Fragment> | <React.Fragment>
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

### Components
- Lifecycle: Mounting (add + 1st render), Updating (re-render), Unmounting (remove)
- **Class** <Name> extends **React.Component**
  - `contructor(props?) { super(props?); // state configs } `
  - `static getDerivedStateFormProps(props, state) { return {} }` - Call before render (create & update)
  - `render() { return <JSX/> }`
  - `componentDidMount() {}` - Call after 1st render
  - `shouldComponentUpdate() { return true|false; }` - Set up 1 time
  - `getSnapshotBeforeUpdate(props, state) {}` - access props & state _before_ update
  - `componentDidUpdate() {}` - Call after component update
  - `componentWillUnmount() {}` - Call before component is about to be removed
- function <Name>(props?) { return <JSX> }
  - Props: { attr1: value1, attr2: value2, ..., attrN: valueN }
  - Using with props `<Component attr1={value1} {...otherAttr} />`

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

```jsx
// Function
function Car2() {
  return <h2>Hi, I am a Car!</h2>;
}
// Arrow function
const Garage = () => {
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

### Hooks
