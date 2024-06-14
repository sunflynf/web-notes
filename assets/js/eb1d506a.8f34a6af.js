"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[3737],{9402:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>t,toc:()=>d});var r=s(4848),i=s(8453);const a={description:"Backend Frameworks in JavaScript ecosystem.",tags:["Backend","JavaScript","TypeScript","MVC","RESTapis"]},c="Express",t={id:"summarize/backend/JS_TS/Express",title:"Express",description:"Backend Frameworks in JavaScript ecosystem.",source:"@site/docs/summarize/backend/JS_TS/Express.md",sourceDirName:"summarize/backend/JS_TS",slug:"/summarize/backend/JS_TS/Express",permalink:"/web-notes/docs/summarize/backend/JS_TS/Express",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/backend/JS_TS/Express.md",tags:[{inline:!0,label:"Backend",permalink:"/web-notes/docs/tags/backend"},{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"},{inline:!0,label:"TypeScript",permalink:"/web-notes/docs/tags/type-script"},{inline:!0,label:"MVC",permalink:"/web-notes/docs/tags/mvc"},{inline:!0,label:"RESTapis",permalink:"/web-notes/docs/tags/res-tapis"}],version:"current",frontMatter:{description:"Backend Frameworks in JavaScript ecosystem.",tags:["Backend","JavaScript","TypeScript","MVC","RESTapis"]},sidebar:"documentSidebar",previous:{title:"JavaScript",permalink:"/web-notes/docs/category/javascript"},next:{title:"Hono",permalink:"/web-notes/docs/summarize/backend/JS_TS/Hono"}},l={},d=[{value:"Setup",id:"setup",level:2},{value:"Middleware",id:"middleware",level:2},{value:"Routing",id:"routing",level:2},{value:"Handling Requests",id:"handling-requests",level:2},{value:"Advanced Topics",id:"advanced-topics",level:2},{value:"Best Practices",id:"best-practices",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"express",children:"Express"}),"\n",(0,r.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Install Express:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm install express\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Basic Server:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(port, () => {\n  console.log(`Server is running on http://localhost:${port}`);\n});\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"middleware",children:"Middleware"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Using Middleware:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const express = require('express');\nconst app = express();\n\n// Built-in middleware for parsing JSON\napp.use(express.json());\n\n// Custom middleware\napp.use((req, res, next) => {\n  console.log(`${req.method} request for ${req.url}`);\n  next();\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Serving Static Files:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.use(express.static('public'));\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"routing",children:"Routing"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Basic Routing:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.get('/', (req, res) => {\n  res.send('GET request to the homepage');\n});\n\napp.post('/', (req, res) => {\n  res.send('POST request to the homepage');\n});\n\napp.put('/user', (req, res) => {\n  res.send('PUT request to /user');\n});\n\napp.delete('/user', (req, res) => {\n  res.send('DELETE request to /user');\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Route Parameters:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.get('/users/:userId/books/:bookId', (req, res) => {\n  res.send(req.params);\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Query Strings:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.get('/search', (req, res) => {\n  res.send(req.query);\n});\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"handling-requests",children:"Handling Requests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Request Object:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.get('/user/:id', (req, res) => {\n  console.log(req.params.id);  // Route parameters\n  console.log(req.query.name); // Query parameters\n  console.log(req.body);       // Request body (for POST/PUT requests)\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Response Object:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.get('/json', (req, res) => {\n  res.json({ name: 'Express' });\n});\n\napp.get('/status', (req, res) => {\n  res.status(404).send('Not Found');\n});\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"advanced-topics",children:"Advanced Topics"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Router:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const router = express.Router();\n\nrouter.get('/', (req, res) => {\n  res.send('Home page');\n});\n\nrouter.get('/about', (req, res) => {\n  res.send('About page');\n});\n\napp.use('/pages', router);\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Error Handling:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).send('Something broke!');\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Environment Variables:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const port = process.env.PORT || 3000;\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Using Template Engines:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"app.set('view engine', 'pug');\napp.set('views', './views');\n\napp.get('/template', (req, res) => {\n  res.render('index', { title: 'Hey', message: 'Hello there!' });\n});\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"CORS:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const cors = require('cors');\napp.use(cors());\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Environment Configuration:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"require('dotenv').config();\nconst port = process.env.PORT || 3000;\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Security:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const helmet = require('helmet');\napp.use(helmet());\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Logging:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const morgan = require('morgan');\napp.use(morgan('combined'));\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>t});var r=s(6540);const i={},a=r.createContext(i);function c(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);