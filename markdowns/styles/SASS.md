**SASS** is a stylesheet language that’s compiled to **[[CSS]]**
> **Preprocessing**: `sass --watch input.scss output.css`
---
### Variables
> Code styles: `.sass` & `.scss` (use semicolon and curly brackets)
```sass
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```
```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
### Nesting
```scss
.markdown-body {
  a {
    color: blue;
    &:hover {
      color: red;
    }
  }
}
```
```css
.markdown-body a {
  color: blue;
}
.markdown-body a:hover {
  color: red;
}
```
### Modules
```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```
### Mixins
```scss
@mixin heading-font {
  font-family: sans-serif;
  font-weight: bold;
}
h1 {
  @include heading-font;
}
/* With variables */
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}
.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```
```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```
### Extend/Inheritance
```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}
.success {
  @extend %message-shared;
  border-color: green;
}
.error {
  @extend %message-shared;
  border-color: red;
}
.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
```css
/* This CSS will print because %message-shared is extended. */
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```
### Operators
#### Build-In Modules
- `sass:math` provides functions that operate on numbers.
- `sass:string` makes it easy to combine, search, or split apart strings.
- `sass:color` generates new colors based on existing ones, making it easy to build color themes.
- `sass:list` lets you access and modify values in lists.
- `sass:map` makes it possible to look up the value associated with a key in a map, and much more.
- `sass:selector` provides access to Sass’s powerful selector engine.
- `sass:meta` exposes the details of Sass’s inner workings.
#### Loops
```scss
@for $i from 1 through 4 {
  .item-#{$i} { left: 20px * $i; }
}

$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```
```scss
$menu-items: home about services contact;

@each $item in $menu-items {
  .photo-#{$item} {
    background: url('images/#{$item}.jpg');
  }
}
```
```scss
$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');

@each $id, $image in $backgrounds {
  .photo-#{$id} {
    background: url($image);
  }
}
```
### Features
#### Lists
```scss
$list: (a b c);
nth($list, 1)  // starts with 1
length($list) // 3
```
#### Maps
```scss
$map: (key1: value1, key2: value2, key3: value3);
map-get($map, key1)
```
#### Conditionals
```scss
@if $position == 'left' {
   position: absolute;
   left: 0;
}
@else if $position == 'right' {
   position: absolute;
   right: 0;
}
@else {
   position: static;
}
```
#### Interpolation
```scss
.#{$klass} { ... }      // Class
call($function-name)    // Functions

@media #{$tablet}
font: #{$size}/#{$line-height}
url("#{$background}.jpg")
```
---
### Resources:
1. [sass-lang](https://sass-lang.com/)
2. [devhints](https://devhints.io/sass)
3. [w3schools](https://www.w3schools.com/sass)
