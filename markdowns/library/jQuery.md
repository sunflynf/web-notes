### Table of contents

> - **jQuery** is **JavaScript** library
> - Write less, do more
> - Basic syntax: `$(selector).<action>()`

### DOM Traversal & Manipulation
#### Selectors
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
#### Getters
- `$(selector).text()` - innerText
- `$(selector).html()` - innerHTML
- `$(selector).val()` - value (input)
- `$(selector).attr(key)` - `$("#wiki-link").attr("href")`
#### Setters
- `$(selector).text(string | function(index, currentText){ return string; })`
- `$(selector).html(htmlStr | function(index, currentHtmlStr){ return htmlString; })`
- `$(selector).val(any)`
- `$(selector).attr(key, function(index, currentVal))`
  - `$("#w3s").attr({ "href" : "https://www.w3schools.com/jquery/", "title" : "W3Schools jQuery Tutorial" });`
  - `$("#wiki-link").attr("href", "https://www.link-css.com")`

### Event handling
- Mouse: `click`, `dblclick`, `mouseenter`, `mouseleave` 
- Keyboard: `keypress`, `keydown`, `keyup`
- Form: `submit`, `change`, `focus`, `blur`
- Document/Window: `load`, `resize`, `scroll`, `unload`
```js
$("p").click(function(){
  $(this).hide(); // this -> current element (p)
});
```
#### Effects
> Common syntax: `$(selector).<effect>(speed?, callback?)`
> - Mount: hide, show, toggle
> - Fade: fadeIn, fadeOut, fadeToggle, `fadeTo(speed, opacity, callback?)`
> - Slide: slideDown, slideUp, slideToggle

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

> **Method Chaining**:
> - Using effect will return this, so it can apply another effect after current effect done
> - Using: `$(selector).<effect1>().<effect2>()...<effectN>()`
> - Exp: `$("#p1").css("color", "red").slideUp(2000).slideDown(2000);`

### AJAX

### Resources
1. [jQuery Docs](https://jquery.com/)
1. [jQuery UI](https://jqueryui.com/)
2. [w3schools](https://www.w3schools.com/jquery)
