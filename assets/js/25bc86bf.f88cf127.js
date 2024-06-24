"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[1103],{121:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=t(4848),s=t(8453);const a={description:"Frontend / Fullstack Frameworks for SEO & SSR",tags:["Frontend","JavaScript","TypeScript","React"]},o="Next.js",i={id:"summarize/frontend/framework/NextJS",title:"Next.js",description:"Frontend / Fullstack Frameworks for SEO & SSR",source:"@site/docs/summarize/frontend/framework/NextJS.md",sourceDirName:"summarize/frontend/framework",slug:"/summarize/frontend/framework/NextJS",permalink:"/web-notes/docs/summarize/frontend/framework/NextJS",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/frontend/framework/NextJS.md",tags:[{inline:!0,label:"Frontend",permalink:"/web-notes/docs/tags/frontend"},{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"},{inline:!0,label:"TypeScript",permalink:"/web-notes/docs/tags/type-script"},{inline:!0,label:"React",permalink:"/web-notes/docs/tags/react"}],version:"current",frontMatter:{description:"Frontend / Fullstack Frameworks for SEO & SSR",tags:["Frontend","JavaScript","TypeScript","React"]},sidebar:"documentSidebar",previous:{title:"Angular",permalink:"/web-notes/docs/summarize/frontend/framework/Angular"},next:{title:"Libraries",permalink:"/web-notes/docs/category/libraries"}},l={},c=[{value:"Features",id:"features",level:2},{value:"Install &amp; Setup",id:"install--setup",level:2},{value:"Project Structures",id:"project-structures",level:3},{value:"Using",id:"using",level:2},{value:"Page &amp; Routing",id:"page--routing",level:3},{value:"API Routes",id:"api-routes",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"nextjs",children:"Next.js"}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Client-side rendering"}),"\n",(0,r.jsx)(n.li,{children:"Server-side rendering"}),"\n",(0,r.jsx)(n.li,{children:"Static site generation"}),"\n",(0,r.jsx)(n.li,{children:"Improve performance and SEO"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"install--setup",children:"Install & Setup"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# Create a new Next.js app\nnpx create-next-app@latest my-next-app\ncd my-next-app\n\n# Start the development server\nnpm run dev\n"})}),"\n",(0,r.jsx)(n.h3,{id:"project-structures",children:"Project Structures"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-txt",children:"my-next-app/\n\u251c\u2500\u2500 node_modules/\n\u251c\u2500\u2500 pages/\n\u2502   \u251c\u2500\u2500 api/\n\u2502   \u2502   \u2514\u2500\u2500 hello.js\n\u2502   \u251c\u2500\u2500 _app.js\n\u2502   \u251c\u2500\u2500 _document.js\n\u2502   \u2514\u2500\u2500 index.js\n\u251c\u2500\u2500 public/\n\u251c\u2500\u2500 styles/\n\u2502   \u2514\u2500\u2500 globals.css\n\u251c\u2500\u2500 .gitignore\n\u251c\u2500\u2500 package.json\n\u2514\u2500\u2500 README.md\n"})}),"\n",(0,r.jsx)(n.h2,{id:"using",children:"Using"}),"\n",(0,r.jsx)(n.h3,{id:"page--routing",children:"Page & Routing"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"// pages/index.js\nexport default function Home() {\n  return <h1>Home Page</h1>;\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"// pages/posts/[id].js\nimport { useRouter } from 'next/router';\n\nexport default function Post() {\n  const router = useRouter();\n  const { id } = router.query;\n  return <p>Post: {id}</p>;\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"api-routes",children:"API Routes"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"// pages/api/hello.js\nexport default function handler(req, res) {\n  res.status(200).json({ text: 'Hello' });\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var r=t(6540);const s={},a=r.createContext(s);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);