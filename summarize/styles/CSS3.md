# CSS3

## Elements

### Text

| Attribute          | Value                                                  | Note                                                                                                         |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `background-color` | [[#Colour]]                                            |                                                                                                              |
| `color`            | [[#Colour]]                                            |                                                                                                              |
| `text-align`       | left, center, justify, right                           | "justify" - each line is stretched so that every line has equal width                                        |
| `text-align-last`  | left, center, justify, right                           | Apply only last row of text (long text)                                                                      |
| `direction`        | ltr (default), rtl                                     |                                                                                                              |
| `unicode-bidi`     | bidi-override                                          | Used together with `direction`                                                                               |
| `vertical-align`   | base-line (default), text-top, text-bottom, sub, super |                                                                                                              |
| `text-decoration`  | **Example**: underline #333 solid 5px                  | Shorthand: -line -color -style -thickness (All are optional)                                                 |
| `text-transform`   | uppercase, lowercase, capitalize                       |                                                                                                              |
| `text-indent`      | **Example**: 50px                                      | The indentation of the first line of a text                                                                  |
| `letter-spacing`   | **Example**: 2px                                       | The space between the characters in a text                                                                   |
| `word-spacing`     | **Example**: 10px                                      | The space between words in a text                                                                            |
| `line-height`      | **Example**: 0.8                                       | The space between lines. **NOTE:** should use between 0.8 -> 2                                               |
| `white-space`      | nowrap, wrap, pre, pre-line, pre-wrap                  | Specifies how white-space inside an element is handled                                                       |
| `text-shadow`      | **Example**: 2px 2px 5px blue, 2px -2px 5px red;       | Order: horizontal-shadow vertical-shadow blur(optional) color.<br/>**FEATURE**: use "," and add more shadow; |

### Fonts

![CSS Font Family](./assets/css_font_family.png)

Safe font for HTML & CSS

- Arial (sans-serif)
- Verdana (sans-serif)
- Tahoma (sans-serif)
- Trebuchet MS (sans-serif)
- Times New Roman (serif)
- Georgia (serif)
- Garamond (serif)
- Courier New (monospace)
- Brush Script MT (cursive)

> Using Google font: `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=FontName">`
>
> Add above tag to `<head>` tag

| Attribute      | Value                                      | Note                                                                  |
| -------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| `font`         | **Example**: 12px Arial, sans-serif        | -style -variant -weight -size(required)/line-height -family(required) |
| `font-family`  | **Example**: Arial, Helvetica, sans-serif; | Main font, Second font, fallback font (recommend)                     |
| `font-style`   | normal, italic / oblique                   |                                                                       |
| `font-weight`  | normal, bold, (100 -> 900)                 |                                                                       |
| `font-variant` | normal, small-caps                         |                                                                       |
| `font-size`    | **Example**: 0.8rem                        | **Recommend**: use `em`, `rem` instead of `px`                        |

### Link

```css
/* unvisited link */
a:link {
    color: violet;
}
/* visited link */
a:visited {
    color: green;
}
/* mouse over link */
a:hover {
    cursor: pointer; /* default */
}
/* selected link */
a:active {
    color: darkgreen !important;
}
```

### List

| Attribute             | Value                                                                                                                                                  | Note                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `list-style`          | **Example**: square inside url("sqpurple.gif");                                                                                                        | -type -position -image |
| `list-style-type`     | `none`, <br/> (ul): `circle`, `disc`, `square`; <br/> (ol): `decimal`, `decimal-leading-zero`, [`lower`, `upper`]-[`alpha`, `greek`, `latin`, `roman`] |                        |
| `list-style-position` | `outside`, `inside` (indent first line)                                                                                                                |                        |
| `list-style-image`    | url("image.type")                                                                                                                                      | Change mark icon       |

### Table

> **Recommend setup**
>
> ```css
> table {
>     width: 100%; /* full width */
>     border-collapse: collapse;
> }
> ```

| Attribute         | Value                                        | Note                                                         |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `caption-side`    | top, bottom                                  |                                                              |
| `border-collapse` | collapse, separate                           |                                                              |
| `border-spacing`  | (horizontal vertical) **Example**: 10px 20px | use in case `border-collapse: separate;`                     |
| `empty-cell`      | show (default), hide                         | use in case `border-collapse: separate;`                     |
| `table-layout`    | auto (default), fixed                        | **Tip**: `fixed` make table render faster (same size column) |

## Display

> Toggle element: `visibility: visible|hidden;`

| `display` value | Description                                      |
| --------------- | ------------------------------------------------ |
| none            | Remove element                                   |
| inline          |                                                  |
| block           |                                                  |
| flex            | a block-level flex **container**                 |
| grid            | a block-level grid **container**                 |
| inline-block    | display inline but it can set `height` & `width` |
| inline-flex     | a inline-level flex **container**                |
| inline-grid     | a inline-level grid **container**                |
| contents        | only show contents                               |

### Position

| `position` value | Description                                               |
| ---------------- | --------------------------------------------------------- |
| static           | default                                                   |
| fixed            | fixed on screen                                           |
| relative         | base on current position                                  |
| absolute         | base on nearest element has `position: relative;`         |
| sticky           | `relative` (normal) + `fixed` (scroll to sticks in place) |

> POSITION not `static`:
>
> - Combine with `left`, `top`, `right`, `bottom` (not includes 4)
> - Can use `z-index` to specifies the stack order

### Overflow

| `overflow[-x/-y]` value | description                       |
| ----------------------- | --------------------------------- |
| visible                 | default                           |
| hidden                  | hide content                      |
| scroll                  | show scroll if content out of box |
| auto                    |                                   |

> Special: `overflow-break: normal|break-word;` -> handle overflow words

### Layout: `float` and `clear`

- `float: none|left|right|inherit` specifies how an element should float.
- `clear: none|left|right|both|inherit` specifies what elements can float beside the cleared element and on which side.

---

## Combinators

```css
/* Child */
.root > .specified-child {
}
/* Adjacent Sibling */
.root + .first-placed-immediately-below {
}
/* General Sibling */
.root ~ .all-placed-immediately-below {
}
```

## Pseudo

> Structure
>
> - Pseudo Classes `selector:pseudo-class`
> - Pseudo Elements `selector::pseudo-element`

<https://www.w3schools.com/css/css_pseudo_classes.asp>

## Attributes

> Structure:
>
> - Has attribute `selector[attribute]`
> - Has attribute with exact value `selector[attribute="value"]`
> - Has attribute with exact value or like "value-" `selector[attribute|="value"]`
> - Has attribute containing word like "value" `selector[attribute~="value"]`
> - Has attribute start with value `selector[attribute^="value"]`
> - Has attribute end with value `selector[attribute$="value"]`
> - Has attribute includes word: value `selector[attribute*="value"]`

| Using                          | Description                                     | Example                |
| ------------------------------ | ----------------------------------------------- | ---------------------- |
| `selector[attribute]`          | Has attribute                                   | `a[target]`            |
| `selector[attribute="value"]`  | Has attribute with exact value                  | `a[target="_blank"]`   |
| `selector[attribute!="value"]` | Has attribute with exact value or like "value-" | `div[class="date"]`    |
| `selector[attribute~="value"]` | Has attribute containing exact word "value"     | `img[title~='animal']` |
| `selector[attribute^="value"]` | Has attribute start with value                  | `a[href^='https']`     |
| `selector[attribute$="value"]` | Has attribute end with value                    | `a[href$=".pdf"]`      |
| `selector[attribute*="value"]` | Has attribute includes word: value              | `img[title*="dog"]`    |

## Special

### Specificity

1. `*` - 0
2. element - 1
3. `.class` - 10
4. `#id` - 100
5. inline `style=""` - 1000
6. `!important` - Infinity

**NOTE**:

- Combination will sum all points. Example: `div#first-name.text-center` -> 1 + 100 + 10 = 111
- Selector with same point will apply latest rule

### Math function

| Method   | Note                       | Example                     |
| -------- | -------------------------- | --------------------------- |
| `calc()` | Good for set flexible size | `width: calc(100% - 10px);` |
| `min()`  | Use smaller value          | `height: min(50%, 200px);`  |
| `max()`  | Use larger value           | `height: max(400px, 60%);`  |

### Counter

```css
body {
    counter-reset: section;
}

h1 {
    counter-reset: subsection;
}

h1::before {
    counter-increment: section;
    content: 'Section ' counter(section) '. ';
}

h2::before {
    counter-increment: subsection;
    content: counter(section) '.' counter(subsection) ' ';
}
```

### `@font-face`: use your font

```css
@font-face {
    font-family: myFirstFont;
    src: url(sansation_light.woff);
    /* font-weight: bold;  */
    /* font-style: italic; */
}

div {
    font-family: myFirstFont;
}
```

## TODO

- [ ] `border-radius`
- [ ] `border-image`
- [ ] `special-color`: transparent, currentcolor
- [ ] `box-shadow`
- [ ] `transforms` + Animation
- [ ] Image properties
- [ ] Multiple Columns
- [ ] `resize`
- [ ] `var(--variable)`
- [ ] `box-sizing`
- [ ] Media Query
- [ ] Flex system
- [ ] Grid system
- [ ] Responsive Web Design
