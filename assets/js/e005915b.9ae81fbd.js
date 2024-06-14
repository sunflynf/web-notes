"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[7622],{6748:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var l=s(4848),i=s(8453);const r={tags:["Frontend","JavaScript","Library"]},t="jQuery",c={id:"summarize/frontend/library/jQuery",title:"jQuery",description:"- jQuery is JavaScript library",source:"@site/docs/summarize/frontend/library/jQuery.md",sourceDirName:"summarize/frontend/library",slug:"/summarize/frontend/library/jQuery",permalink:"/web-notes/docs/summarize/frontend/library/jQuery",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/frontend/library/jQuery.md",tags:[{inline:!0,label:"Frontend",permalink:"/web-notes/docs/tags/frontend"},{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"},{inline:!0,label:"Library",permalink:"/web-notes/docs/tags/library"}],version:"current",frontMatter:{tags:["Frontend","JavaScript","Library"]},sidebar:"documentSidebar",previous:{title:"React",permalink:"/web-notes/docs/summarize/frontend/library/React"},next:{title:"UI - Style sheet build",permalink:"/web-notes/docs/category/ui---style-sheet-build"}},d={},o=[{value:"DOM Traversal &amp; Manipulation",id:"dom-traversal--manipulation",level:2},{value:"Selectors",id:"selectors",level:3},{value:"Getters",id:"getters",level:3},{value:"Setters",id:"setters",level:3},{value:"Element changes",id:"element-changes",level:3},{value:"Styles",id:"styles",level:3},{value:"Dimension",id:"dimension",level:3},{value:"Traversing",id:"traversing",level:3},{value:"Event handling",id:"event-handling",level:2},{value:"Effects",id:"effects",level:2},{value:"AJAX",id:"ajax",level:2},{value:"Resources",id:"resources",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"jquery",children:"jQuery"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"jQuery"})," is ",(0,l.jsx)(n.strong,{children:"JavaScript"})," library"]}),"\n",(0,l.jsx)(n.li,{children:"Write less, do more"}),"\n",(0,l.jsxs)(n.li,{children:["Basic syntax: ",(0,l.jsx)(n.code,{children:"$(selector).<action>()"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"dom-traversal--manipulation",children:"DOM Traversal & Manipulation"}),"\n",(0,l.jsx)(n.h3,{id:"selectors",children:"Selectors"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Use css selector inside $() to point element"}),"\n",(0,l.jsxs)(n.li,{children:["It can be tag (",(0,l.jsx)(n.code,{children:"p"}),"), id (",(0,l.jsx)(n.code,{children:"#first-name"}),"), className (",(0,l.jsx)(n.code,{children:".btn.btn-primary"}),"), specific element (",(0,l.jsx)(n.code,{children:"ul:first-child"}),")"]}),"\n",(0,l.jsxs)(n.li,{children:["View more: ",(0,l.jsx)(n.a,{href:"/web-notes/docs/summarize/frontend/styles/cores/CSS3",children:"CSS Selectors"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'$(document).ready(function(){ // Required\n  $("button").click(function(){\n    $("p").hide();\n  });\n});\n'})}),"\n",(0,l.jsx)(n.h3,{id:"getters",children:"Getters"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).text()"})," - innerText"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).html()"})," - innerHTML"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).val()"})," - value (input)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).attr(key)"})," - ",(0,l.jsx)(n.code,{children:'$("#wiki-link").attr("href")'})]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"setters",children:"Setters"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$(selector).text(string | function(index, currentText){ return string; })"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$(selector).html(htmlStr | function(index, currentHtmlStr){ return htmlString; })"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$(selector).val(any)"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).attr(key, function(index, currentVal))"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'$("#w3s").attr({ "href" : "https://www.w3schools.com/jquery/", "title" : "W3Schools jQuery Tutorial" });'})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'$("#wiki-link").attr("href", "https://www.link-css.com")'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"element-changes",children:"Element changes"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).append(...elements)"})," - Add at the end of selector element (last child)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).prepend(...elements)"})," - Add at the start of seletor element (first child)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).after(...elements)"})," - Add AFTER selector element"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).before(...elements)"})," - Add BEFORE selector element"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).remove()"})," - Remove selector element (and its child)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).remove(child_selector)"})," - Remove child of selector element"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).empty()"})," - Remove it's child"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"styles",children:"Styles"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'$(selector).addClass("class-1 class-2 class-n")'})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).removeClass()"})," - same above but remove class"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"$(selector).toggleClass()"})," - same above but add + remove"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:'$(selector).css({ "property": "value", ... })'})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"dimension",children:"Dimension"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"width()"}),", ",(0,l.jsx)(n.code,{children:"height()"})," - size of element ",(0,l.jsx)(n.strong,{children:"(excludes padding, border, margin)"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"innerWidth()"}),", ",(0,l.jsx)(n.code,{children:"innerHeight()"})," - includes ",(0,l.jsx)(n.strong,{children:"padding"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"outerWidth()"}),", ",(0,l.jsx)(n.code,{children:"outerHeight()"})," - includes ",(0,l.jsx)(n.strong,{children:"padding"})," + ",(0,l.jsx)(n.strong,{children:"border"})," + ",(0,l.jsxs)(n.em,{children:[(0,l.jsx)(n.strong,{children:"margin"})," if add (true)"]})]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"traversing",children:"Traversing"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:'<body class="ancestors"> body (great-great-grandparent)\n  <div style="width:500px;">div (great-grandparent)\n    <ul>ul (grandparent)  \n      <li>li (direct parent)\n        <span>span</span>\n      </li>\n    </ul>\n    <p>Some text 1</p>\n    <p>Some text 2</p>\n  </div>\n</body>\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'// --- PARENT ---\n$("span").parent() // -> li\n$("span").parents() // -> [body, div, ul, li]\n$("span").parents("div") // ->  [div]\n$("span").parentsUntil("div") // -> [ul, li]\n// --- CHILDREN ---\n$("div").children(); // -> [ul, p, p]\n$("div").children("p:first"); // -> (selector) only first child (p)\n$("div").find("p, span"); // -> [p, p, span]\n$("div").find("*"); // -> all descendants of div [ul, li, span, p, p]\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-html",children:"<body>\n  <div>div (parent)\n    <p>p</p>\n    <span>span</span>\n    <h2>h2</h2>\n    <h3>h3</h3>\n    <p>p</p>\n    <b>b</b>\n  </div>\n</body>\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'// --- SIBLINGS ---\n$("h2").siblings(); // -> [p, span, h3, p, b]\n$("h2").next(); // -> h3\n$("h2").nextAll(); // -> [h3, p, b]\n$("h2").nextUntil("b"); // -> [h3, p]\n$("h2").<prev|prevAll|prevUntil>();\n\n// --- FILTER ---\n$(selector).first(); // -> first of specific element\n$(selector).last();\n$(selector).last();\n$(selector).eq(index); // -> elements[index]\n$(selector).filter(selector_props); // -> elements match props\n$(selector).not(selector_props); // -> elements not match props\n'})}),"\n",(0,l.jsx)(n.h2,{id:"event-handling",children:"Event handling"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Mouse: ",(0,l.jsx)(n.code,{children:"click"}),", ",(0,l.jsx)(n.code,{children:"dblclick"}),", ",(0,l.jsx)(n.code,{children:"mouseenter"}),", ",(0,l.jsx)(n.code,{children:"mouseleave"})]}),"\n",(0,l.jsxs)(n.li,{children:["Keyboard: ",(0,l.jsx)(n.code,{children:"keypress"}),", ",(0,l.jsx)(n.code,{children:"keydown"}),", ",(0,l.jsx)(n.code,{children:"keyup"})]}),"\n",(0,l.jsxs)(n.li,{children:["Form: ",(0,l.jsx)(n.code,{children:"submit"}),", ",(0,l.jsx)(n.code,{children:"change"}),", ",(0,l.jsx)(n.code,{children:"focus"}),", ",(0,l.jsx)(n.code,{children:"blur"})]}),"\n",(0,l.jsxs)(n.li,{children:["Document/Window: ",(0,l.jsx)(n.code,{children:"load"}),", ",(0,l.jsx)(n.code,{children:"resize"}),", ",(0,l.jsx)(n.code,{children:"scroll"}),", ",(0,l.jsx)(n.code,{children:"unload"})]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'$("p").click(function(){\n  $(this).hide(); // this -> current element (p)\n});\n'})}),"\n",(0,l.jsx)(n.h2,{id:"effects",children:"Effects"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:["Common syntax: ",(0,l.jsx)(n.code,{children:"$(selector).<effect>(speed?, callback?)"})]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Mount: hide, show, toggle"}),"\n",(0,l.jsxs)(n.li,{children:["Fade: fadeIn, fadeOut, fadeToggle, ",(0,l.jsx)(n.code,{children:"fadeTo(speed, opacity, callback?)"})]}),"\n",(0,l.jsx)(n.li,{children:"Slide: slideDown, slideUp, slideToggle"}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Animation"}),": ",(0,l.jsx)(n.code,{children:"$(selector).animation({ params }, speed?, callback?)"})]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"$(\"button\").click(function(){\n  $(\"div\").animate({\n    left: '250px',\n    height: '+=150px', // relative values\n    width: '+=150px'\n  });\n  // $(\"div\").animate({\n  //   width: 'toggle' // Pre-defined values: show, hide, toggle\n  // });\n});\n// Queues Functionality\n$(\"button\").click(function(){\n  var div = $(\"div\");\n  div.animate({height: '300px', opacity: '0.4'}, \"slow\");\n  div.animate({width: '300px', opacity: '0.8'}, \"slow\");\n  div.animate({height: '100px', opacity: '0.4'}, \"slow\");\n  div.animate({width: '100px', opacity: '0.8'}, \"slow\");\n}); \n"})}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Stop"})," effect: ",(0,l.jsx)(n.code,{children:"$(selector).stop(stopAll?, goToEnd?)"})]}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Method Chaining"}),":"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Using effect will return this, so it can apply another effect after current effect done"}),"\n",(0,l.jsxs)(n.li,{children:["Using: ",(0,l.jsx)(n.code,{children:"$(selector).<effect1>().<effect2>()...<effectN>()"})]}),"\n",(0,l.jsxs)(n.li,{children:["Exp: ",(0,l.jsx)(n.code,{children:'$("#p1").css("color", "red").slideUp(2000).slideDown(2000);'})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"ajax",children:"AJAX"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$(selector).load(URL, data?, callback?)"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'$("button").click(function(){\n  $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){\n    if(statusTxt == "success")\n      alert("External content loaded successfully!");\n    if(statusTxt == "error")\n      alert("Error: " + xhr.status + ": " + xhr.statusText);\n  });\n});\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$.get(URL, function(return_data, status){})"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'$("button").click(function(){\n  $.get("demo_test.asp", function(data, status){\n    alert("Data: " + data + "\\nStatus: " + status);\n  });\n});\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"$.post(URL, data, function(return_data, status){})"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:'$("button").click(function(){\n  $.post("demo_test_post.asp",\n  {\n    name: "Donald Duck",\n    city: "Duckburg"\n  },\n  function(data, status){\n    alert("Data: " + data + "\\nStatus: " + status);\n  });\n});\n'})}),"\n",(0,l.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://jquery.com/",children:"jQuery Docs"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://jqueryui.com/",children:"jQuery UI"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.w3schools.com/jquery",children:"w3schools"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>c});var l=s(6540);const i={},r=l.createContext(i);function t(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);