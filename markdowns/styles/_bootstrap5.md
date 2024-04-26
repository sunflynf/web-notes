### Table of contents

---
> - Bootstrap is a free front-end framework
> - Mobile-first
> - Bootstrap has 7 variants (color):
>   - `primary`
>   - `success`
>   - `danger`
>   - `warning`
>   - `info`
>   - `light`
>   - `dark`
> - This note for Bootstrap version 5.3 (04-2024)

### How to use?
**In HTML + CDN**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Anything</title>
    <!-- CDN link here -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <h1>Hello</h1>
    <!-- CDN script here -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>\
    <!-- Add Popper below in case using dropdowns, popovers or tooltips -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
  </body>
</html>
```

**Stable**
- [Download source from bootstrap](https://github.com/twbs/bootstrap/archive/v5.3.3.zip)
- Extract all and put it to project
- Import in to HTML index file

**With package manager**
- `npm install bootstrap@version`
- `yarn add bootstrap@version`
- _Recommend add-ons_
  - **React**: `react-bootstrap`
  - **Vue3**: `bootstrap-vue-next`
  - **Angular**: `@ng-bootstrap/ng-bootstrap`

### Customize
- Change colors
  - Syntax:
    - Normal: `--bs-{color_type}-{color|bg}`
    - RGB: `--bs-{color_type}-{color|bg}-rgb`
    - Color mode: `--bs-{color_variant}`, `--bs-{color_variant}-{rgb|bg-subtle|text-emphasis}` 
  - Type:
    - color: `body`, `secondary`, `teriary`, `emphasis`, `border`  
    - bg: `body`, `secondary`, `teriary`
- Setting Theme mode: `data-bs-theme="light|dark"`
  - Apply all pages - add to html tag
  - Apply to component - add to component tag

### Layout

#### Breakpoint
| Marked | Class | Dimensions |
| --- | --- | --- |
| Small | `sm` | >= 576px |
| Medium | `md` | >= 768px |
| Large | `lg` | >= 992px |
| Extra large | `xl` | >= 1200px |
| Extra extra large | `xxl` | >= 1400px |

#### Container 
> `<div class="container"></div>`
- `container`: max-width changes at each breakpoint
- `container-{breakpoint}`: 100% width until the specified breakpoint is reacted
- `container-fluid`: full width viewport

#### Grid 
> - 1 row has max 12 cols (default)
> - `row` & `col` class built with flex system
> - `grid` & `g-col-*` class built with grid system

- `grid`
  - `gap-{[0, 5]}`
  - `row-gap-{[0, 5]}`
  - `col-gap-{[0, 5]}`
  - `g-col-*`
  - `g-start-{n > 1}`
  - style options: `style=""`
    - `--bs-columns`
    - `--bs-rows` -> child: `grid-row`
    - `--bs-gap: horizontal vertical`
- `row`
  - `align-items-{start|center|end}`
  - `justify-content-{start|center|end}`
  - `justify-content-{around|between|evenly}` - space around, space between, space evenly
  - `g-*`, `gx-*`, `gy-*` - gap, column-gap, row-gap
  - `g-{breakpoint}-*`
  - `row-cols-{max_in_row | auto}` - set maximum cols per row
  - `row-cols-{breakpoint}-{max_in_row | auto}` - set maximum cols per row when reacted breakpoint
- `col` - nested in row or **stand alone**, auto resize
  - `align-self-{start|center|end}`
  - `order-{first|[1, 6]|last}` - reorder col by css
  - `offset-{n}` - Left margin by spaces of n columns. Exp: `offset-3` - margin-left equals 3 cols
  - `offset-{breakpoint}-{n}`
- `col-{[1, 12]}` - apply max-width (%)
- `col-{breakpoint}-{[1, 12]|auto}` - apply max-width (%) when reacted breakpoint

#### Flex
> Every thing go to the left
- `d-flex`
  - `flex-{row|column}`
  - `flex-{breakpoint}-{row|column}`
  - `flex-{row|column}-reverse`
  - `flex-{breakpoint}-{row|column}-reverse`
  - `justify-content-{start|center|end|around|between|evenly}`
  - `justify-content-{breakpoint}-{start|center|end|around|between|evenly}`
  - `align-items-{start|center|end|baseline|stretch}`
  - `align-items-{breakpoint}-{start|center|end|baseline|stretch}`
  - `align-content-{start|center|end|between|around|stretch}`
  - `align-content-{breakpoint}-{start|center|end|between|around|stretch}`
  - `flex-{wrap|nowrap|wrap-reverse}`
  - `flex-{breakpoint}-{wrap|nowrap|wrap-reverse}`
  - `gap-{[0, 5]}`
  - `d-{breakpoint}-flex`
- `d-inline-flex`: `display: inline-flex`
- `d-{breakpoint}-inline-flex`
- **child**:
  - `align-self-{start|center|end|baseline|stretch}` 
  - `align-self-{breakpoint}-{start|center|end|baseline|stretch}`
  - `order-{first|[0, 5]|last}`
  - `order-{breakpoint}-{first|[0, 5]|last}`
  - `flex-fill`
  - `flex-{breakpoint}-fill`
  - `flex-{grow|shrink}-{0|1}`
  - `flex-{breakpoint}-{grow|shrink}-{0|1}`

#### Space
- Size:
  - 0
  - 1 (0.25rem)
  - 2 (0.5rem)
  - 3 (1rem)
  - 4 (1.5rem)
  - 5 (3rem)
  - auto
- Position:
  - `s`: start | left
  - `e`: end | right
  - `t`: top
  - `b`: bottom
  - `x`: both left & right 
  - `y`: both top & bottom
- Margin: `m-{size}`, `m{position}-{size}`, `m{position}-{breakpoint}-{size}`
- Padding: `p-{size}`, `p{position}-{size}`, `p{position}-{breakpoint}-{size}`

### Components
#### Content
> Bootstrap has default font based on platform

| Font | Using |
| --- | --- |
| system-ui | Cross-platform (default user interface font) |
| san-serif | fallback |
| Arial | Basic web fallback |
| -apple-system | Safari for macOS & iOS |
| "Helvetica Neue" | older macOS & iOS |
| Roboto | Android |
| "Segoe UI" | Windows |
| "Noto Sans"<br>"Liberation Sans" | Linux |
| "Apple Color Emoji"<br>"Segoe UI Emoji"<br>"Segoe UI Symbol", "Noto Color Emoji" | Emoji |

```html
<!-- Example using Figure display -->
<figure>
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```

#### Text
- header(h1-h6): `display-{[1, 6]}`
- abbr: `initialism` (smaller dots)
- `text-body-secondary` - faded text
- `lead` - stand out text
- `mark` - `<mark>`
- `small` - `<small>`
- `text-decoration-underline` - `<u>`
- `text-decoration-line-through` - `<s>`
- `text-truncate` - Some longgggg te...
- Align:
  - `text-{start|center|end}`
- List:
  - `list-unstyled` - remove marked
  - `list-inline` + `list-inline-item`
#### Image
- `img-fluid` - width: 100%, height: "auto"
- `img-thumbnail` - make border
#### Table
- table
  - `table` - default based on current `data-bs-theme`
  - `table-{color_variant}` - can apply to `<thead>` or `<tr>` or `<td>` (special case)
  - `table-striped` - even & odd rows
  - `table-striped-columns`
  - `table-hover`
  - `table-bordered` - can mix with `border-{color_variant}`
  - `table-borderless`
  - `table-responsive`
  - `table-responsive-{breakpoint}`
  - `table-sm`
  - `caption-top`
- tbody
  - `table-group-divider` - thick top border
- tr
  - `table-active` - can apply to `<td>`
  - `align-{top|middle|bottom}` - vertical
#### Block
- `rounded` - border-radius
- `rounded-{[0, 5]}`
- `border`
- `border-{color_variant}`
#### Form
- label
  - `form-label`
- input
  - `form-control` - can apply to `<textarea>`
  - `form-control-{sm|lg}` - add to change size
  - `form-control-plaintext` - remove border + using with `readonly`
  - `form-control-color` - input[type="color"]
  - `form-range`
- `form-text` - extra text in form (can use as feedback or hint)
- select
  - `form-select`
  - `form-select-{sm|lg}`
- form check (wrap by `<div>`) apply both checkbox and radio
  - `form-check` - can add `form-switch` to change type of checkbox (not radio)
  - `form-check-reverse`
  - `form-check-inline` - multiple inline check
  - input: `form-check-input`
  - label: `form-check-label`
- form check (style: button)
  - input: `btn-check`
  - label: `btn btn-{color_variants}` + extra class of Button
- input group (wrap by `<div class="input-group">`)
  - child: `<span class="input-group-text">` + `<input class="form-control" />`
![image](https://github.com/sunflynf/web-notes/assets/75079929/aad40b5a-b938-427b-bf65-ff960f9feac2)


### Resources

### Versions
- [Bootstrap 5.2](https://getbootstrap.com/docs/5.2)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3)
