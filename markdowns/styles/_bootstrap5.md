### Table of contents

---
> - Bootstrap is a free front-end framework
> - Mobile-first
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
    - Normal: `--bs-<color_type>-<color|bg>`
    - RGB: `--bs-<color_type>-<color|bg>-rgb`
    - Color mode: `--bs-<theme_mode>`, `--bs-<theme_mode>-<rgb|bg-subtle|text-emphasis>` 
  - Type:
    - color: `body`, `secondary`, `teriary`, `emphasis`, `border`  
    - bg: `body`, `secondary`, `teriary`
    - theme_mode: `primary`, `success`, `danger`, `warning`, `info`, `light`, `dark`
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

### Components

### Resources

### Versions
- [Bootstrap 5.2](https://getbootstrap.com/docs/5.2)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3)
