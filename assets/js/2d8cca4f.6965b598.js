"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[508],{4683:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=s(4848),t=s(8453);const i={description:"Meta, why?",tags:["Frontend","JavaScript","TypeScript","Library"]},l="React",c={id:"summarize/frontend/library/React",title:"React",description:"Meta, why?",source:"@site/docs/summarize/frontend/library/React.md",sourceDirName:"summarize/frontend/library",slug:"/summarize/frontend/library/React",permalink:"/web-notes/docs/summarize/frontend/library/React",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/frontend/library/React.md",tags:[{inline:!0,label:"Frontend",permalink:"/web-notes/docs/tags/frontend"},{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"},{inline:!0,label:"TypeScript",permalink:"/web-notes/docs/tags/type-script"},{inline:!0,label:"Library",permalink:"/web-notes/docs/tags/library"}],version:"current",frontMatter:{description:"Meta, why?",tags:["Frontend","JavaScript","TypeScript","Library"]},sidebar:"documentSidebar",previous:{title:"Libraries",permalink:"/web-notes/docs/category/libraries"},next:{title:"jQuery",permalink:"/web-notes/docs/summarize/frontend/library/jQuery"}},o={},d=[{value:"Builder Tools",id:"builder-tools",level:2},{value:"Render",id:"render",level:2},{value:"JSX",id:"jsx",level:2},{value:"Components",id:"components",level:2},{value:"Class Component",id:"class-component",level:3},{value:"Function Component",id:"function-component",level:3},{value:"Feature Component",id:"feature-component",level:3},{value:"Styles component",id:"styles-component",level:2},{value:"Hooks",id:"hooks",level:2},{value:"useState",id:"usestate",level:3},{value:"useDeferredValue",id:"usedeferredvalue",level:3},{value:"useReducer",id:"usereducer",level:3},{value:"useRef",id:"useref",level:3},{value:"useImperativeHandle",id:"useimperativehandle",level:3},{value:"useEffect &amp; useLayoutEffect",id:"useeffect--uselayouteffect",level:3},{value:"useCallback &amp; useMemo",id:"usecallback--usememo",level:3},{value:"useContext",id:"usecontext",level:3},{value:"useId",id:"useid",level:3},{value:"ReactDOM.createPortal",id:"reactdomcreateportal",level:2},{value:"React Compiler (React v19)",id:"react-compiler-react-v19",level:2},{value:"Configs",id:"configs",level:3},{value:"Existing project",id:"existing-project",level:4},{value:"New project",id:"new-project",level:4},{value:"Resources",id:"resources",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"react",children:"React"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Building User Interface"}),"\n",(0,r.jsx)(n.li,{children:"Single-page Application"}),"\n",(0,r.jsx)(n.li,{children:"Create Reuseable UI Components (Virtual DOM)"}),"\n",(0,r.jsxs)(n.li,{children:["To use React in production, you need ",(0,r.jsx)(n.strong,{children:"npm"})," which is included with ",(0,r.jsx)(n.a,{href:"https://www.w3schools.com/nodejs/nodejs_get_started.asp",children:"Node.js"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"builder-tools",children:"Builder Tools"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://create-react-app.dev/",children:"Create React App"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Includes built tools such as ",(0,r.jsx)(n.strong,{children:"webpack"}),", ",(0,r.jsx)(n.strong,{children:"Babel"}),", and ",(0,r.jsx)(n.strong,{children:"ESLint"}),"."]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"npx create-react-app app-name"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"npm start"})," | ",(0,r.jsx)(n.code,{children:"yarn start"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://vitejs.dev/guide/",children:"React Vite"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"npm create vite app-name --template react"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"npm create vite app-name --template react-ts"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"npm run dev"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"render",children:"Render"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-html",children:'<body>\n  \x3c!-- Your code will put inside root (or any id) div --\x3e\n  <div id="root"></div>\n</body>\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"// index.js\nimport ReactDOM from 'react-dom/client';\n\nconst container = document.getElementById('root');\nconst root = ReactDOM.createRoot(container);\nroot.render(<p>Hello</p>);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"jsx",children:"JSX"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"JavaScript XML"}),"\n",(0,r.jsx)(n.li,{children:"Write HTML in JS"}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<>"})," | ",(0,r.jsx)(n.code,{children:"<Fragment>"})," | ",(0,r.jsx)(n.code,{children:"<React.Fragment>"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"const secretText = 'Daniel';\nconst age = 17;\nconst users = (\n  <>\n    <div>John Doe</div>\n    <div className='woman'>Mary Jane</div>\n    <input type='text' />\n    <div>{1 + 1} {secretText}</div> // Expression {}\n    {(age >= 18) ? 'mature' : 'child'} // if statement\n  </>\n)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Lifecycle"}),": Mounting (add + 1st render), Updating (re-render), Unmounting (remove)"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"class-component",children:"Class Component"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Class"})," ",(0,r.jsx)(n.code,{children:"Name"})," extends ",(0,r.jsx)(n.strong,{children:"React.Component"})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"contructor(props?) { super(props?); // state configs }"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"static getDerivedStateFormProps(props, state) { return {} }"})," - Call before render (create & update)"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"render() { return <JSX/> }"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"componentDidMount() {}"})," - Call after 1st render"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"shouldComponentUpdate() { return true|false; }"})," - Set up 1 time"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"getSnapshotBeforeUpdate(props, state) {}"})," - access props & state ",(0,r.jsx)(n.em,{children:"before"})," update"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"componentDidUpdate() {}"})," - Call after component update"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"componentWillUnmount() {}"})," - Call before component is about to be removed"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'class Car1 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      color: "red"\n    };\n  }\n\n  changeColor = () => this.setState({ color: "blue" });\n\n  render() {\n    return <h2>I am a {this.state.color} {this.props.model}!</h2>;\n  }\n}\n\n// Use with props: <Car1 model="Mustang" />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"function-component",children:"Function Component"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function Name(props?) { return <JSX /> }\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Props: ",(0,r.jsx)(n.code,{children:"{ children: null|JSX.Element, attr1: value1, attr2: value2, ..., attrN: valueN }"})]}),"\n",(0,r.jsxs)(n.li,{children:["Using with props: ",(0,r.jsx)(n.code,{children:"<Component attr1={value1} {...otherAttr} />"})]}),"\n",(0,r.jsxs)(n.li,{children:["Using with children: ",(0,r.jsx)(n.code,{children:"<Parent {...attrs}><Children /></Parent>"})]}),"\n",(0,r.jsxs)(n.li,{children:["Event","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Based on HTML Events"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"on<EventName>={(event?) => {}}"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Conditionals","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"conditions ? <CompIfTrue /> : <CompIfFalse />"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"conditions && <CompIfTrue />"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["List:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Using: ",(0,r.jsx)(n.code,{children:"{listRender.map((item, index) => { return (<JSX key={index} {...item} />); } )}"})]}),"\n",(0,r.jsx)(n.li,{children:"Each children should have a unique key"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function Car2() {\n  return <h2>Hi, I am a Car!</h2>;\n}\n// Arrow function (with default props)\nconst Garage = ({ showGarage = true }) => {\n  if (!showGarage) return <Fragment />;\n  return (\n    <>\n      <h1>Who lives in my Garage?</h1>\n      <Car2 /> {/* Component nested */}\n    </>\n  );\n}\n\nexport default Garage;\n// split component to reuse\n// Using: import Garage from 'components/Garage';\n"})}),"\n",(0,r.jsx)(n.h3,{id:"feature-component",children:"Feature Component"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<Fragment> | <>"})," - Wrap all Elements and render in UI without unexpected element"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<Suspense fallback={<Spinner />}>{children}</Suspense>"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Only Suspense-enabled data sources will activate the Suspense component.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Data fetching with Suspense-enabled frameworks like ",(0,r.jsx)(n.strong,{children:"Relay"})," and ",(0,r.jsx)(n.strong,{children:"Next.js"})]}),"\n",(0,r.jsxs)(n.li,{children:["Lazy-loading component code with ",(0,r.jsx)(n.code,{children:"lazy"}),": ",(0,r.jsx)(n.code,{children:"const LazyReviewCar = lazy(() => import('./components/cars/ReviewCar.js'));')"})]}),"\n",(0,r.jsxs)(n.li,{children:["Reading the value of a ",(0,r.jsx)(n.strong,{children:"Promise"})," with ",(0,r.jsx)(n.code,{children:"use"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<StrictMode><App/></StrictMode>"})," - find common bugs in your components early during development"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<Profiler id='Component' onRender={onRender}><Component /></Profiler>"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {}"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://react.dev/reference/react/Profiler#onrender-parameters",children:"View params explains"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"styles-component",children:"Styles component"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Using sass/scss: ",(0,r.jsx)(n.code,{children:"npm i sass"})]}),"\n",(0,r.jsxs)(n.li,{children:["Both ",(0,r.jsx)(n.strong,{children:"CSS"})," & ",(0,r.jsx)(n.strong,{children:"SASS"})," can using as file or module"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:"/* custom.css */\n.custom-font-weight {\n  font-weight: bold;\n}\n.bg-red {\n  background: #FF0000;\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import React from 'react'; // To use JSX\nimport styleModule from 'custom.module.css'; // import as module\nimport 'custom.css'; // using css file\n\nconst Custom = ({ name }) => {\n  const customStyle = {\n    fontSize: '2rem',\n    color: '#333333'\n  };\n  // css module class will display like [filename]_[classname]__[hash]\n  return (\n    <div className='custom-font-weight' style={styleModule['bg-red']}>\n      <span style={customStyle}>{'Hello ' + name}</span>\n    </div>\n  );\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"hooks",children:"Hooks"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Rules of Hooks","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Call them at the top level in the body of","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"function component"}),"\n",(0,r.jsx)(n.li,{children:"custom Hook"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Do not call Hooks","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"inside conditions or loops."}),"\n",(0,r.jsxs)(n.li,{children:["after a conditional return statement. ",(0,r.jsx)(n.strong,{children:"NOTE HERE FOR NEXT PROJECT"})]}),"\n",(0,r.jsx)(n.li,{children:"in event handlers."}),"\n",(0,r.jsx)(n.li,{children:"in class components."}),"\n",(0,r.jsx)(n.li,{children:"inside functions passed to useMemo, useReducer, or useEffect."}),"\n",(0,r.jsx)(n.li,{children:"inside try/catch/finally blocks."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Hooks cannot be conditional"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"import { use<HookName> } from <'react'|'address-of-custom-hooks'>"})}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"usestate",children:"useState"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Structure ",(0,r.jsx)(n.code,{children:"const [state, setState] = useState(initState);"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"state"})," change after setState call -> component re-render"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"setState(newState)"})," | ",(0,r.jsx)(n.code,{children:"setState(prevState => { return newState })"})," (use with callback)"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { useState } from "react";\n\nfunction Car() {\n  const [car, setCar] = useState({\n    brand: "Ford",\n    model: "Mustang",\n    year: "1964",\n    color: "red"\n  });\n\n  const toggleColor = () => {\n    setCar(previousState => {\n      const color = previousState.color === "red" ? "blue" : "red";\n      return { ...previousState, color }\n    });\n  }\n\n  return (\n    <>\n      <h1>My {car.brand}</h1>\n      <p>\n        It is a {car.color} {car.model} from {car.year}.\n      </p>\n      <button\n        type="button"\n        onClick={toggleColor}\n      >Toggle color</button>\n    </>\n  )\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"usedeferredvalue",children:"useDeferredValue"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Debouncing"})," - wait for the user to stop typing (e.g. for a second) before updating the list."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Throttling"})," - update the list every once in a while (e.g. at most once a second)."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"useDeferredValue"})," is better suited to optimizing rendering because it is ",(0,r.jsx)(n.strong,{children:"deeply integrated with React itself"})," and ",(0,r.jsx)(n.strong,{children:"adapts to the user\u2019s device"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Usage","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Showing stale content while fresh content is loading"}),"\n",(0,r.jsx)(n.li,{children:"Deferring re-rendering for a part of the UI"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { useDeferredValue } from \'react\';\n\nexport default function App() {\n  const [filter, setFilter] = useState(\'\');\n  const deferredFitler = useDeferredValue(filter);\n\n  return (\n    <div className="container mt-3">\n      <input\n        value={filter}\n        onChange={(e) => setFilter(e.target.value)}\n        type="text"\n        className="w-100"\n      />\n      <ListAnimalMap filter={deferredFitler} />\n    </div>\n  );\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"usereducer",children:"useReducer"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Tracking complex state (like object) -> Same tech like ",(0,r.jsx)(n.a,{href:"https://redux.js.org/",children:"Redux"})]}),"\n",(0,r.jsx)(n.li,{children:"Custom handle state"}),"\n",(0,r.jsxs)(n.li,{children:["Syntax: ",(0,r.jsx)(n.code,{children:"const [state, dispatch] = useReducer(reducer, initialState);"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"reducer"}),": ",(0,r.jsx)(n.code,{children:"const reducer = (currentState, action: { type, [any]?: value }) => { return newState }"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Update"}),": ",(0,r.jsx)(n.code,{children:"dispatch({ type, [any]?: value })"})]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { useReducer } from 'react';\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'incremented_age': {\n      return {\n        name: state.name,\n        age: state.age + 1\n      };\n    }\n    case 'changed_name': {\n      return {\n        name: action.nextName,\n        age: state.age\n      };\n    }\n  }\n  throw Error('Unknown action: ' + action.type);\n}\n\nconst initialState = { name: 'Taylor', age: 42 };\n\nexport default function Form() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  function handleButtonClick() {\n    dispatch({ type: 'incremented_age' });\n  }\n\n  function handleInputChange(e) {\n    dispatch({\n      type: 'changed_name',\n      nextName: e.target.value\n    }); \n  }\n\n  return (\n    <>\n      <input\n        value={state.name}\n        onChange={handleInputChange}\n      />\n      <button onClick={handleButtonClick}>\n        Increment age\n      </button>\n      <p>Hello, {state.name}. You are {state.age}.</p>\n    </>\n  );\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"useref",children:"useRef"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Persist value of component (not affect if component re-render)"}),"\n",(0,r.jsx)(n.li,{children:"Used to access a DOM element directly"}),"\n",(0,r.jsxs)(n.li,{children:["Declare: ",(0,r.jsx)(n.code,{children:"const elRef = useRef(initValue || undefined);"})," // Recommend using initValue if ref not element"]}),"\n",(0,r.jsxs)(n.li,{children:["Add to element: ",(0,r.jsx)(n.code,{children:"<element ref={elRef} />"})]}),"\n",(0,r.jsxs)(n.li,{children:["Value of ref","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Get: ",(0,r.jsx)(n.code,{children:"elRef.current"})]}),"\n",(0,r.jsxs)(n.li,{children:["Set: ",(0,r.jsx)(n.code,{children:"elRef.current = any;"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"useimperativehandle",children:"useImperativeHandle"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Customize the handle exposed as a ",(0,r.jsx)(n.code,{children:"ref"})]}),"\n",(0,r.jsxs)(n.li,{children:["Combine with ",(0,r.jsx)(n.code,{children:"forwardRef"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"useImperativeHandle(ref, createHandle, dependencies?)"})}),"\n",(0,r.jsxs)(n.li,{children:["NOTE: ",(0,r.jsx)(n.strong,{children:"If you can express something as a prop, you should not use a ref."})]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import React, { forwardRef, useRef, useImperativeHandle } from \'react\';\n\nconst ValidInput = forwardRef((props, ref) => {\n  const inputRef = useRef();\n\n  useImperativeHandle(ref,\n    () => ({\n      addRandomNumber: (max = Number.MAX_SAFE_INTEGER) => {\n        inputRef.current.value = (Math.random() * max).toFixed(0);\n      },\n    }), []);\n\n  return <input type="text" ref={inputRef} {...props} />;\n});\n\nexport default function App() {\n  const pointingRef = useRef();\n  const onBtnClick = () => pointingRef.current && pointingRef.current.addRandomNumber();\n\n  return (\n    <div>\n      <ValidInput ref={pointingRef} />\n      <button type="button" onClick={onBtnClick}>Random number</button>\n    </div>\n  );\n}\n\n'})}),"\n",(0,r.jsx)(n.h3,{id:"useeffect--uselayouteffect",children:"useEffect & useLayoutEffect"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Perform side effect in component","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"fetching data"}),"\n",(0,r.jsx)(n.li,{children:"directly update DOM"}),"\n",(0,r.jsx)(n.li,{children:"timers"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Syntax: ",(0,r.jsx)(n.code,{children:"useEffect(<function>, [...dependencies]?)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Effect run 1st after component render"}),"\n",(0,r.jsx)(n.li,{children:"Effect recall if dependencies has change, none if dependencies is []"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"useLayoutEffect"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["A version of ",(0,r.jsx)(n.code,{children:"useEffect"})," that fires before the browser repaints the screen."]}),"\n",(0,r.jsx)(n.li,{children:"Only use in case need to calculate layout before show UI (tooltips, popover, ...)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { useState, useEffect } from "react";\n\nfunction Timer() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    let timer = setTimeout(() => {\n      setCount((count) => count + 1);\n    }, 1000);\n    // clean up function\n    return () => clearTimeout(timer)\n  }, [count]); // render when count change\n\n  return <h1>I\'ve rendered {count} times!</h1>;\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"usecallback--usememo",children:"useCallback & useMemo"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Problem"}),": Component re-render","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"-> function & value inside (not state) re-render"}),"\n",(0,r.jsx)(n.li,{children:"-> children use props includes that function & value re-render"}),"\n",(0,r.jsx)(n.li,{children:"=> Need to control re-render when it need with dependencies"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"useCallback"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Using: ",(0,r.jsx)(n.code,{children:"const memorizeFunction = useCallback(() => {}, [...dependencies])"})]}),"\n",(0,r.jsx)(n.li,{children:"Avoid child component re-render if function of parent re-render"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"useMemo"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Using: ",(0,r.jsx)(n.code,{children:"const memorizeValue = useMemo(() => any, [...dependencies])"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"usecontext",children:"useContext"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Manage state globally"}),"\n",(0,r.jsx)(n.li,{children:"State use in component that need it, avoid put parent props -> child props -> ... -> n-child props (prop drilling)"}),"\n",(0,r.jsxs)(n.li,{children:["Using","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Create: ",(0,r.jsx)(n.code,{children:"const Context = createContext(defaultValue?);"})," - This is API?","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Context now is High Order Component"}),"\n",(0,r.jsx)(n.li,{children:"defaultValue can put inside to get recommend for state (IDE Support)"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Wrap: ",(0,r.jsx)(n.code,{children:"<Context.Provider value={{ state1, setState1, state2, sampleArr, ..., any }}>{children}</Context.Provider>"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["All children inside ",(0,r.jsx)(n.code,{children:"<Context.Provider>"})," can use all props in value"]}),"\n",(0,r.jsx)(n.li,{children:"value should be an object"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Get value ",(0,r.jsx)(n.code,{children:"const { state1, state2 } = useContext(Context);"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Put Context to ",(0,r.jsx)(n.code,{children:"useContext"})," to get correct value holder"]}),"\n",(0,r.jsx)(n.li,{children:"Get only props need to using"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'import { useState, createContext, useContext } from "react";\n\nconst UserContext = createContext();\n\nfunction Component1() {\n  const [user, setUser] = useState("Jesse Hall");\n\n  return (\n    <UserContext.Provider value={user}>\n      <h1>{`Hello ${user}!`}</h1>\n      <Component2 />\n    </UserContext.Provider>\n  );\n}\n\nfunction Component2() {\n  return (\n    <>\n      <h1>Component 2</h1>\n      <Component3 />\n    </>\n  );\n}\n\nfunction Component3() {\n  return (\n    <>\n      <h1>Component 3</h1>\n      <Component4 />\n    </>\n  );\n}\n\nfunction Component4() {\n  const user = useContext(UserContext);\n\n  return (\n    <>\n      <h1>Component 4</h1>\n      <h2>{`Hello ${user} again!`}</h2>\n    </>\n  );\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"useid",children:"useId"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"const uniqueId = useId();"})}),"\n",(0,r.jsx)(n.li,{children:"UniqueId will create 1 time for Component when it render"}),"\n",(0,r.jsx)(n.li,{children:"Use in case common Component (like Input) reuse more than 2 in parent component -> Avoid dupplicate Id when using"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { useId } from 'react';\n\nfunction PasswordField() {\n  const passwordHintId = useId();\n  return (\n    <>\n      <label htmlFor={passwordHintId}>Password</label>\n      <input type=\"password\" id={passwordHintId} />\n    </>\n  );\n}\n\nexport default function App() {\n  return (\n    <>\n      <h2>Choose password</h2>\n      <PasswordField />\n      <h2>Confirm password</h2>s\n      <PasswordField />\n    </>\n  );\n}\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Suspense"})," + ",(0,r.jsx)(n.code,{children:"lazy"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"createContext"})," -> Context (Context.Provider value=",") -> ",(0,r.jsx)(n.code,{children:"useContext"}),"(Context)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"useRef"})," -> ",(0,r.jsx)(n.code,{children:"forwardRef"})," -> ",(0,r.jsx)(n.code,{children:"useImperativeHandle"})]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"reactdomcreateportal",children:"ReactDOM.createPortal"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Render some children into a different part of the DOM"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"createPortal(children, domNode, key?)"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"react-compiler-react-v19",children:"React Compiler (React v19)"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://19.react.dev/learn/react-compiler#getting-started",children:"Documents"})}),"\n",(0,r.jsx)(n.h3,{id:"configs",children:"Configs"}),"\n",(0,r.jsx)(n.h4,{id:"existing-project",children:"Existing project"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'const ReactCompilerConfig = {\n  // specific directory\n  sources: (filename) => {\n    return filename.indexOf(\'src/path/to/dir\') !== -1;\n  },\n  compilationMode: "annotation",\n};\n\n// src/app.jsx\nexport default function App() {\n  "use memo";\n  // ...\n}\n'})}),"\n",(0,r.jsx)(n.h4,{id:"new-project",children:"New project"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"// babel.config.js\nconst ReactCompilerConfig = { /* ... */ };\n\nmodule.exports = function () {\n  return {\n    plugins: [\n      ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!\n      // ...\n    ],\n  };\n};\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'// vite.config.js\nconst ReactCompilerConfig = { /* ... */ };\n\nexport default defineConfig(() => {\n  return {\n    plugins: [\n      react({\n        babel: {\n          plugins: [\n            ["babel-plugin-react-compiler", ReactCompilerConfig],\n          ],\n        },\n      }),\n    ],\n    // ...\n  };\n});\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"// npm install next@canary babel-plugin-react-compiler\n// next.config.js\n/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  experimental: {\n    reactCompiler: true,\n  },\n};\n\nmodule.exports = nextConfig;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://react.dev/",children:"React official page"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.w3schools.com/react/default.asp",children:"React - w3schools"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var r=s(6540);const t={},i=r.createContext(t);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);