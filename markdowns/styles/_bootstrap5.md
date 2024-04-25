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
- _Recommend add-ons in **React**_: `react-bootstrap`
- _Recommend add-ons in **Vue3**_: `bootstrap-vue-next`
- _Recommend add-ons in **Angular**_: `@ng-bootstrap/ng-bootstrap`

### Systems

### Components

### Resources

### Versions
- [Bootstrap 5.2](https://getbootstrap.com/docs/5.2)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3)
