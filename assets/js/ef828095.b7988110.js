"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[2714],{9260:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>t});var r=s(4848),i=s(8453);const o={description:"CSS Frameworks",tags:["CSS","Frontend"]},l="SASS (SCSS)",a={id:"summarize/frontend/styles/cores/SASS",title:"SASS (SCSS)",description:"CSS Frameworks",source:"@site/docs/summarize/frontend/styles/cores/SASS.md",sourceDirName:"summarize/frontend/styles/cores",slug:"/summarize/frontend/styles/cores/SASS",permalink:"/web-notes/docs/summarize/frontend/styles/cores/SASS",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/frontend/styles/cores/SASS.md",tags:[{inline:!0,label:"CSS",permalink:"/web-notes/docs/tags/css"},{inline:!0,label:"Frontend",permalink:"/web-notes/docs/tags/frontend"}],version:"current",frontMatter:{description:"CSS Frameworks",tags:["CSS","Frontend"]},sidebar:"documentSidebar",previous:{title:"Less.js",permalink:"/web-notes/docs/summarize/frontend/styles/cores/Lessjs"},next:{title:"tailwindcss",permalink:"/web-notes/docs/summarize/frontend/styles/tailwindcss"}},c={},t=[{value:"Variables",id:"variables",level:2},{value:"Nesting",id:"nesting",level:2},{value:"Modules",id:"modules",level:2},{value:"Mixins",id:"mixins",level:2},{value:"Extend/Inheritance",id:"extendinheritance",level:2},{value:"Operators",id:"operators",level:2},{value:"Build-In Modules",id:"build-in-modules",level:3},{value:"Loops",id:"loops",level:3},{value:"Features",id:"features",level:2},{value:"Lists",id:"lists",level:3},{value:"Maps",id:"maps",level:3},{value:"Conditionals",id:"conditionals",level:3},{value:"Interpolation",id:"interpolation",level:3},{value:"Resources",id:"resources",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"sass-scss",children:"SASS (SCSS)"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"SASS"})," is a stylesheet language that\u2019s compiled to ",(0,r.jsx)(n.strong,{children:"CSS"})]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Preprocessing"}),": ",(0,r.jsx)(n.code,{children:"sass --watch input.scss output.css"})]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"variables",children:"Variables"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["Code styles: ",(0,r.jsx)(n.code,{children:".sass"})," & ",(0,r.jsx)(n.code,{children:".scss"})," (use semicolon and curly brackets)"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sass",children:"$font-stack: Helvetica, sans-serif\n$primary-color: #333\n\nbody\n  font: 100% $font-stack\n  color: $primary-color\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"$font-stack: Helvetica, sans-serif;\n$primary-color: #333;\n\nbody {\n  font: 100% $font-stack;\n  color: $primary-color;\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"nesting",children:"Nesting"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:".markdown-body {\n  a {\n    color: blue;\n    &:hover {\n      color: red;\n    }\n  }\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:".markdown-body a {\n  color: blue;\n}\n.markdown-body a:hover {\n  color: red;\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"modules",children:"Modules"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"// _base.scss\n$font-stack: Helvetica, sans-serif;\n$primary-color: #333;\n\nbody {\n  font: 100% $font-stack;\n  color: $primary-color;\n}\n\n// styles.scss\n@use 'base';\n\n.inverse {\n  background-color: base.$primary-color;\n  color: white;\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"mixins",children:"Mixins"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"@mixin heading-font {\n  font-family: sans-serif;\n  font-weight: bold;\n}\nh1 {\n  @include heading-font;\n}\n/* With variables */\n@mixin theme($theme: DarkGray) {\n  background: $theme;\n  box-shadow: 0 0 1px rgba($theme, .25);\n  color: #fff;\n}\n.info {\n  @include theme;\n}\n.alert {\n  @include theme($theme: DarkRed);\n}\n.success {\n  @include theme($theme: DarkGreen);\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:".info {\n  background: DarkGray;\n  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);\n  color: #fff;\n}\n\n.alert {\n  background: DarkRed;\n  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);\n  color: #fff;\n}\n\n.success {\n  background: DarkGreen;\n  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);\n  color: #fff;\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"extendinheritance",children:"Extend/Inheritance"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"/* This CSS will print because %message-shared is extended. */\n%message-shared {\n  border: 1px solid #ccc;\n  padding: 10px;\n  color: #333;\n}\n\n// This CSS won't print because %equal-heights is never extended.\n%equal-heights {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.message {\n  @extend %message-shared;\n}\n.success {\n  @extend %message-shared;\n  border-color: green;\n}\n.error {\n  @extend %message-shared;\n  border-color: red;\n}\n.warning {\n  @extend %message-shared;\n  border-color: yellow;\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:"/* This CSS will print because %message-shared is extended. */\n.warning, .error, .success, .message {\n  border: 1px solid #ccc;\n  padding: 10px;\n  color: #333;\n}\n\n.success {\n  border-color: green;\n}\n\n.error {\n  border-color: red;\n}\n\n.warning {\n  border-color: yellow;\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"operators",children:"Operators"}),"\n",(0,r.jsx)(n.h3,{id:"build-in-modules",children:"Build-In Modules"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:math"})," provides functions that operate on numbers."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:string"})," makes it easy to combine, search, or split apart strings."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:color"})," generates new colors based on existing ones, making it easy to build color themes."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:list"})," lets you access and modify values in lists."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:map"})," makes it possible to look up the value associated with a key in a map, and much more."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:selector"})," provides access to Sass\u2019s powerful selector engine."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"sass:meta"})," exposes the details of Sass\u2019s inner workings."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"loops",children:"Loops"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"@for $i from 1 through 4 {\n  .item-#{$i} { left: 20px * $i; }\n}\n\n$i: 6;\n@while $i > 0 {\n  .item-#{$i} { width: 2em * $i; }\n  $i: $i - 2;\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"$menu-items: home about services contact;\n\n@each $item in $menu-items {\n  .photo-#{$item} {\n    background: url('images/#{$item}.jpg');\n  }\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');\n\n@each $id, $image in $backgrounds {\n  .photo-#{$id} {\n    background: url($image);\n  }\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsx)(n.h3,{id:"lists",children:"Lists"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"$list: (a b c);\nnth($list, 1)  // starts with 1\nlength($list) // 3\n"})}),"\n",(0,r.jsx)(n.h3,{id:"maps",children:"Maps"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"$map: (key1: value1, key2: value2, key3: value3);\nmap-get($map, key1)\n"})}),"\n",(0,r.jsx)(n.h3,{id:"conditionals",children:"Conditionals"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:"@if $position == 'left' {\n   position: absolute;\n   left: 0;\n}\n@else if $position == 'right' {\n   position: absolute;\n   right: 0;\n}\n@else {\n   position: static;\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"interpolation",children:"Interpolation"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scss",children:'.#{$klass} { ... }      // Class\ncall($function-name)    // Functions\n\n@media #{$tablet}\nfont: #{$size}/#{$line-height}\nurl("#{$background}.jpg")\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://sass-lang.com/",children:"sass-lang"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://devhints.io/sass",children:"devhints"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.w3schools.com/sass",children:"w3schools"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var r=s(6540);const i={},o=r.createContext(i);function l(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);