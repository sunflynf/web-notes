# jQuery

## Table of contents

- [DOM Traversal & Manipulation](#dom-traversal--manipulation)
  - [Selectors](#selectors)
  - [Getters](#getters)
  - [Setters](#setters)
  - [Element Changes](#element-changes)
  - [Styles](#styles)
  - [Dimension](#dimension)
  - [Traversing](#traversing)

- [Event handling](#event-handling)
- [Effects](#effects)
- [AJAX](#ajax)
- [Resources](#resources)

---

> - **jQuery** is **JavaScript** library
> - Write less, do more
> - Basic syntax: `$(selector).<action>()`

## DOM Traversal & Manipulation

### Selectors
>
> - Use css selector inside $() to point element
> - It can be tag (`p`), id (`#first-name`), className (`.btn.btn-primary`), specific element (`ul:first-child`)
> - View more: [CSS Selectors](../styles/CSS3.md#combinators)

```js
$(document).ready(function(){ // Required
  $("button").click(function(){
    $("p").hide();
  });
});
```

### Getters

- `$(selector).text()` - innerText
- `$(selector).html()` - innerHTML
- `$(selector).val()` - value (input)
- `$(selector).attr(key)` - `$("#wiki-link").attr("href")`

### Setters

- `$(selector).text(string | function(index, currentText){ return string; })`
- `$(selector).html(htmlStr | function(index, currentHtmlStr){ return htmlString; })`
- `$(selector).val(any)`
- `$(selector).attr(key, function(index, currentVal))`
  - `$("#w3s").attr({ "href" : "https://www.w3schools.com/jquery/", "title" : "W3Schools jQuery Tutorial" });`
  - `$("#wiki-link").attr("href", "https://www.link-css.com")`

### Element changes

- `$(selector).append(...elements)` - Add at the end of selector element (last child)
- `$(selector).prepend(...elements)` - Add at the start of seletor element (first child)
- `$(selector).after(...elements)` - Add AFTER selector element
- `$(selector).before(...elements)` - Add BEFORE selector element
- `$(selector).remove()` - Remove selector element (and its child)
- `$(selector).remove(child_selector)` - Remove child of selector element
- `$(selector).empty()` - Remove it's child

### Styles

- `$(selector).addClass("class-1 class-2 class-n")`
- `$(selector).removeClass()` - same above but remove class
- `$(selector).toggleClass()` - same above but add + remove
- `$(selector).css({ "property": "value", ... })`

### Dimension

- `width()`, `height()` - size of element **(excludes padding, border, margin)**
- `innerWidth()`, `innerHeight()` - includes **padding**
- `outerWidth()`, `outerHeight()` - includes **padding** + **border** + _**margin** if add (true)_

### Traversing

```html
<body class="ancestors"> body (great-great-grandparent)
  <div style="width:500px;">div (great-grandparent)
    <ul>ul (grandparent)  
      <li>li (direct parent)
        <span>span</span>
      </li>
    </ul>
    <p>Some text 1</p>
    <p>Some text 2</p>
  </div>
</body>
```

```js
// --- PARENT ---
$("span").parent() // -> li
$("span").parents() // -> [body, div, ul, li]
$("span").parents("div") // ->  [div]
$("span").parentsUntil("div") // -> [ul, li]
// --- CHILDREN ---
$("div").children(); // -> [ul, p, p]
$("div").children("p:first"); // -> (selector) only first child (p)
$("div").find("p, span"); // -> [p, p, span]
$("div").find("*"); // -> all descendants of div [ul, li, span, p, p]
```

```html
<body>
  <div>div (parent)
    <p>p</p>
    <span>span</span>
    <h2>h2</h2>
    <h3>h3</h3>
    <p>p</p>
    <b>b</b>
  </div>
</body>
```

```js
// --- SIBLINGS ---
$("h2").siblings(); // -> [p, span, h3, p, b]
$("h2").next(); // -> h3
$("h2").nextAll(); // -> [h3, p, b]
$("h2").nextUntil("b"); // -> [h3, p]
$("h2").<prev|prevAll|prevUntil>();

// --- FILTER ---
$(selector).first(); // -> first of specific element
$(selector).last();
$(selector).last();
$(selector).eq(index); // -> elements[index]
$(selector).filter(selector_props); // -> elements match props
$(selector).not(selector_props); // -> elements not match props
```

## Event handling

- Mouse: `click`, `dblclick`, `mouseenter`, `mouseleave`
- Keyboard: `keypress`, `keydown`, `keyup`
- Form: `submit`, `change`, `focus`, `blur`
- Document/Window: `load`, `resize`, `scroll`, `unload`

```js
$("p").click(function(){
  $(this).hide(); // this -> current element (p)
});
```

## Effects

> Common syntax: `$(selector).<effect>(speed?, callback?)`
>
> - Mount: hide, show, toggle
> - Fade: fadeIn, fadeOut, fadeToggle, `fadeTo(speed, opacity, callback?)`
> - Slide: slideDown, slideUp, slideToggle
>
> **Animation**: `$(selector).animation({ params }, speed?, callback?)`

```js
$("button").click(function(){
  $("div").animate({
    left: '250px',
    height: '+=150px', // relative values
    width: '+=150px'
  });
  // $("div").animate({
  //   width: 'toggle' // Pre-defined values: show, hide, toggle
  // });
});
// Queues Functionality
$("button").click(function(){
  var div = $("div");
  div.animate({height: '300px', opacity: '0.4'}, "slow");
  div.animate({width: '300px', opacity: '0.8'}, "slow");
  div.animate({height: '100px', opacity: '0.4'}, "slow");
  div.animate({width: '100px', opacity: '0.8'}, "slow");
}); 
```

> **Stop** effect: `$(selector).stop(stopAll?, goToEnd?)`
>
> **Method Chaining**:
>
> - Using effect will return this, so it can apply another effect after current effect done
> - Using: `$(selector).<effect1>().<effect2>()...<effectN>()`
> - Exp: `$("#p1").css("color", "red").slideUp(2000).slideDown(2000);`

## AJAX

- `$(selector).load(URL, data?, callback?)`

```js
$("button").click(function(){
  $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
    if(statusTxt == "success")
      alert("External content loaded successfully!");
    if(statusTxt == "error")
      alert("Error: " + xhr.status + ": " + xhr.statusText);
  });
});
```

- `$.get(URL, function(return_data, status){})`

```js
$("button").click(function(){
  $.get("demo_test.asp", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```

- `$.post(URL, data, function(return_data, status){})`

```js
$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```

## Resources

1. [jQuery Docs](https://jquery.com/)
2. [jQuery UI](https://jqueryui.com/)
3. [w3schools](https://www.w3schools.com/jquery)
