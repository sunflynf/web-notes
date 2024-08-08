---
description: A dynamic preprocessor style sheet language that can be compiled into CSS
tags:
    - CSS
    - Frontend
---

# Less.js

- **Leaner Style Sheets** is a backwards-compatible language extension for CSS.
- Link: [Less.js](https://lesscss.org)

## Setting

Add to `devDependencies` of `package.json`: `npm i less --save-dev`

Add to browser:

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="less.js" type="text/javascript"></script>
```

[See more config](https://lesscss.org/usage/#less-options)

## Using

### Variables

```less
@width: 10px;
@height: @width + 10px;

#header {
    width: @width;
    height: @height;
}

@min768: ~'(min-width: 768px)'; // Escaping
@min768: (min-width: 768px); // Escaping - Less 3.5+
```

### Operations

```less
// numbers are converted into the same units
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// example with variables
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```

### Mixins

:::note

Both `id` & `class` can be a mixins
:::

```less
.bordered {
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
}

#menu a {
    color: #111;
    .bordered();
}

.post a {
    color: red;
    .bordered();
}

// Alias mixin with variables
#theme.dark.navbar {
    .colors(light) {
        primary: purple;
    }
    .colors(dark) {
        primary: black;
        secondary: grey;
    }
}

.navbar {
    @colors: #theme.dark.navbar.colors(dark); // NOTE HERE!
    background: @colors[primary];
    border: 1px solid @colors[secondary];
}
```

:::info **MIXIN GUARDS**

Structure: `.mixin(params) when [not] (condition 1) [and | ,] (condition n) { ... }`

```less
.mixin(@a) when (lightness(@a) >= 50%) {
    background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
    background-color: white;
}
.mixin(@a) {
    color: @a;
}
.class1 {
    .mixin(#ddd);
}
.class2 {
    .mixin(#555);
}
```

```css
.class1 {
    background-color: black;
    color: #ddd;
}
.class2 {
    background-color: white;
    color: #555;
}
```

:::

### Nesting

```less
.component {
    width: 300px;
    padding: 10%;
    .logo {
        max-width: 50%;
    }
    &-fluid {
        // component-fluid
        padding: 10px;
    }
    @media (min-width: 768px) {
        width: 600px;
        @media (min-resolution: 192dpi) {
            background-image: url(/img/retina2x.png);
        }
    }
    @media (min-width: 1280px) {
        width: 800px;
    }
}
```

<!-- ![less parent selectors](./assets/less_parent_selectors.png) -->

### Function

```less
@base: #f04615;
@width: 0.5;

.class {
    width: percentage(@width); // returns `50%`
    color: saturate(@base, 5%);
    background-color: spin(lighten(@base, 25%), 8);
}
```

- Logical:
  - if: `attribute: if(condition, T_return, F_return);`
  - boolean: `@variable: boolean(compare)` - support for if
- String
  - escape | e: `@variable: escape(string_to_escape)` - return content without quotes | undefined
- List - Example: `@list: "banana", "tomato", "potato", "peach";`
  - length: `n: length(@list);` -> 4
  - extract: `value: extract(@list, 3);` -> potato
  - range: `value: range(10px, 30px, 10);` -> 10px 20px 30px
  - each:

```less
@selectors: blue, green, red;
each(@selectors, {
  .sel-@{value} {
    a: b;
  }
});

@set: {
    one: blue;
    two: green;
    three: red;
};
.set {
    each(@set, {
    @{key}-@{index}: @value;
  });
}
```

```css
.sel-blue {
    a: b;
}
.sel-green {
    a: b;
}
.sel-red {
    a: b;
}

.set {
    one-1: blue;
    two-2: green;
    three-3: red;
}
```

- Math
  - `ceil(2.4) -> 3`
  - `floor(2.6) -> 2`
  - `percentage(0.5) -> 50%`
  - `round(1.67) -> 2; round(1.67, 1) -> 1.7`
  - `sqrt(25cm) -> 5cm` - keep unit
  - `abs(-18.25%) -> 18.25%` - keep unit
  - sin(theta), cos(theta), tan(theta) - asin(x), acos(x), atan(x)
  - pi()
  - `pow(a, b) -> a ^ b` - keep first's unit
  - `mod(a, b) -> a % b` - keep first's unit
  - min(...vals); max(...vals)
- Type `is[type] - Exp: isnumber`
  - number, string, color, keyword, url,
  - pixel, em, percentage
  - unit, ruleset, defined
- Misc
  - color(color_string) -> parse color
  - image-size(url) -> height width - image-height(url); image-width(url);
  - convert(value_with_unit, new_unit) - Exp: `convert(9s, "ms") // 9000ms`
  - data-uri([mimetype], url) -> url("encoded_img")

### **Namespaces** & Accessors

```less
#bundle() {
    // () is mark this as namespace
    .button {
        display: block;
        border: 1px solid black;
        background-color: grey;
        &:hover {
            background-color: white;
        }
    }
    .tab {
        ...;
    }
    .citation {
        ...;
    }
}

.border-radius(@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}

// Using
#header a {
    color: orange;
    #bundle.button(); // can also be written as #bundle > .button
}

.content {
    .first-row {
        .border-radius(); // default is 5px
    }
    .second-row {
        .border-radius(8px);
    }
}
```

:::info Overloading

```less
.mixin(@color) {
    color-1: @color;
}
.mixin(@color, @padding: 2) {
    color-2: @color;
    padding-2: @padding;
}
.mixin(@color, @padding, @margin: 2) {
    color-3: @color;
    padding-3: @padding;
    margin: @margin @margin @margin @margin;
}
.some .selector div {
    .mixin(#008000);
}
```

```css
.some .selector div {
    color-1: #008000;
    color-2: #008000;
    padding-2: 2;
}
```

:::

### Map

> **Version**: Less 3.5+

```less
#colors() {
    primary: blue;
    secondary: green;
}

.button {
    color: #colors[primary];
    border: 1px solid #colors[secondary];
}
```

### Import

```less
@import 'library'; // library.less
@import 'typo.css';
```

### Extend???

## Tips & Tricks

- `!important` apply for all configs in mixins
- `@arguments` in mixins
- `@rest...` get others arguments in `.mixins(@first, @rest...)`
