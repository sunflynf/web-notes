"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[8089],{3107:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>t,metadata:()=>l,toc:()=>o});var r=a(4848),s=a(8453);const t={description:"Objects & Arrays handler library",tags:["Library","Extensions","JavaScript"]},i="Lodash",l={id:"summarize/package/lodash",title:"Lodash",description:"Objects & Arrays handler library",source:"@site/docs/summarize/package/lodash.md",sourceDirName:"summarize/package",slug:"/summarize/package/lodash",permalink:"/web-notes/docs/summarize/package/lodash",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/package/lodash.md",tags:[{inline:!0,label:"Library",permalink:"/web-notes/docs/tags/library"},{inline:!0,label:"Extensions",permalink:"/web-notes/docs/tags/extensions"},{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"}],version:"current",frontMatter:{description:"Objects & Arrays handler library",tags:["Library","Extensions","JavaScript"]},sidebar:"documentSidebar",previous:{title:"Axios",permalink:"/web-notes/docs/summarize/package/axios"},next:{title:"React Dependencies",permalink:"/web-notes/docs/category/react-dependencies"}},c={},o=[{value:"Math",id:"math",level:2},{value:"Array",id:"array",level:2},{value:"Objects - Array",id:"objects---array",level:2},{value:"Object - Utils",id:"object---utils",level:2},{value:"String",id:"string",level:2},{value:"Features",id:"features",level:3},{value:"Chain Sequences",id:"chain-sequences",level:2},{value:"Util",id:"util",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"lodash",children:"Lodash"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"This document just show famous features"}),"\n",(0,r.jsxs)(n.li,{children:["Full docs ",(0,r.jsx)(n.a,{href:"https://lodash.com/docs",children:"here"})]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import _ from 'lodash'; // common\nimport { func } from 'lodash'; // directly\n\n// Using\n_.func([], {});\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// TYPE\ntype arr<T> = T[];\ntype newArr<T> = T[];\ntype identity<T> = string | (T) => any;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"math",children:"Math"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"minBy(arr, identity?) => any;\nmaxBy(arr, identity?) => any;\n\n// mean & sum\nmean(arr) => (sum(arr) / arr.length);\n\n// meanBy & sumBy\nmeanBy(arr, identity) => any; // specific key\n\n// start default is 0\n// float default is false\n// _.random(5) -> number between 0 and 5 \nrandom(start?: number, end: number, float?: boolean) => number[]; \n"})}),"\n",(0,r.jsx)(n.h2,{id:"array",children:"Array"}),"\n",(0,r.jsx)(n.p,{children:"Base on Array methods: join, reverse"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"concat(arr[]) => newArr;\n\nindexOf(arr, value: any, start?: number) => number | -1;\nfind(arr, identity?, fromIndex?: number) => any;\n\nfilter(arr, identity?) => newArr;\nmap(arr, identity) => newArr; // _.map([{value: 1, label: 'ok'}], 'label') => ['ok']\nslice(arr, start?: number, end?: number) => newArr;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Features from ",(0,r.jsx)(n.strong,{children:"lodash"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// remove false, null, 0, \"\", undefined, NaN\n// [0, 1, false, 2, '', 3] -> [1, 2, 3]\ncompact(arr) => newArr;\n\nfill();\n\nflatten();\nflattenDeep();\n\nintersection();\nintersectionBy();\nintersectionWith();\nunion();\nxor();\n\nuniq();\nuniqBy();\n\npullAll();\nwithout();\n\nsortBy()\n\n// features\nsample()\nsampleSize()\nshuffle()\n"})}),"\n",(0,r.jsx)(n.h2,{id:"objects---array",children:"Objects - Array"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"every()\nsome()\n\ncountBy()\nforEach()\ngroupBy()\n// filter counter\nreject()\n\nclone()\ncloneDeep()\n"})}),"\n",(0,r.jsx)(n.h2,{id:"object---utils",children:"Object - Utils"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"defaults()\n\nkeys()\nvalues()\n\nmapKeys()\nmapValues()\n\nat()\nhas()\nget()\nupdate()\nunset()\n\nmerge()\n\npick()\npickBy()\nomit()\nomitBy()\n"})}),"\n",(0,r.jsx)(n.h2,{id:"string",children:"String"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"camelCase()\nkebabCase()\nsnakeCase()\nstartCase()\n\ndeburr()\nescapse()\nescapseRegExp()\nunescapse()\n\nrepeat()\n\ntruncate()\n\ntemplate()\n"})}),"\n",(0,r.jsx)(n.h3,{id:"features",children:"Features"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"debounce()\ndelay()\nthrottle()\n\ndefer()\nonce()\nwrap()\n\nisEmpty();\nisEquals();\n// null or undefined\nisNil();\n\ntoArray()\n"})}),"\n",(0,r.jsx)(n.h2,{id:"chain-sequences",children:"Chain Sequences"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// Lodash wrap and works like builder\n_(value);\n_.chain(value);\n\n// using\n_(value).method1().method2((o) => o.abc).method3().value();\n"})}),"\n",(0,r.jsx)(n.h2,{id:"util",children:"Util"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"defaultTo()\nuniqueId()\n\nflow()\n\ncond()\niteratee()\n\nisMatch()\nmatches()\n\nrange()\ntimes()\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"mixin()\n\nrunInContext()\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>l});var r=a(6540);const s={},t=r.createContext(s);function i(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);