---
description: A powerful, feature-packed frontend toolkit.
tags:
  - CSS
  - SASS
  - Frontend
---

# Bootstrap 5

Bootstrap is a popular front-end framework for building responsive, mobile-first websites using pre-designed components and utility classes.

> _This note for Bootstrap version 5.3 (04-2024)_

```txt
-- VARIANTS --
primary  --> blue
success  --> green
danger   --> red
warning  --> yellow
info     --> skyblue
light    --> white
dark     --> black
```

## How to use?

### HTML + CDN

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Anything</title>
    <!-- CDN link here -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1>Hello</h1>
    <!-- CDN script here -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    \
    <!-- Add Popper below in case using dropdowns, popovers or tooltips -->
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
      integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

### Stable

- [Download source from bootstrap](https://github.com/twbs/bootstrap/archive/v5.3.3.zip)
- Extract all and put it to project
- Import in to HTML index file

### With package manager

```bash
npm install bootstrap@version
# or
yarn add bootstrap@version
```

_Recommend add-ons_

- **React**: [react-bootstrap](https://react-bootstrap.github.io/)
- **Vue3**: [bootstrap-vue-next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
- **Angular**: [@ng-bootstrap/ng-bootstrap](https://ng-bootstrap.github.io)

## Core Concepts

1. **Grid System**:  
   Bootstrap uses a 12-column grid layout to create responsive designs. 

   ```html
   <div class="container">
     <div class="row">
       <div class="col-md-6">Column 1</div>
       <div class="col-md-6">Column 2</div>
     </div>
   </div>
   ```

2. **Responsive Breakpoints**:  
   Bootstrap’s classes adapt based on screen sizes like `sm`, `md`, `lg`, `xl`, `xxl`. 

   ```html
   <div class="d-none d-md-block">Visible on md and larger</div>
   ```

3. **Components**:  
   Pre-built UI elements like buttons, navbars, modals, and more. 

   ```html
   <button class="btn btn-primary">Primary Button</button>
   ```

4. **Utility Classes**:  
   Quick styles for padding, margin, text alignment, etc.  

   ```html
   <div class="p-3 m-2 text-center bg-light">Utility Class Example</div>
   ```

## Common Classes

- **Typography**: `h1`, `text-muted`, `fw-bold`, `text-uppercase`
- **Colors**: `text-primary`, `bg-success`, `border-danger`
- **Spacing**: `p-3`, `m-2`, `px-5`, `py-2`
- **Flexbox**: `d-flex`, `justify-content-center`, `align-items-center`
- **Display**: `d-none`, `d-block`, `d-inline-block`

## Bootstrap Grid Cheat Sheet

| Class              | Description                                |
| ------------------ | ------------------------------------------ |
| `.container`       | Fixed-width container                      |
| `.container-fluid` | Full-width container                       |
| `.row`             | Creates a horizontal group of columns      |
| `.col` / `.col-*`  | Columns in different sizes (e.g., `col-6`) |

## Key Bootstrap Components

1. **Navbar**

   ```html
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <a class="navbar-brand" href="#">Navbar</a>
   </nav>
   ```

2. **Modal**

   ```html
   <button
     type="button"
     class="btn btn-primary"
     data-bs-toggle="modal"
     data-bs-target="#exampleModal"
   >
     Launch Modal
   </button>
   <div class="modal fade" id="exampleModal">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title">Modal Title</h5>
           <button
             type="button"
             class="btn-close"
             data-bs-dismiss="modal"
           ></button>
         </div>
         <div class="modal-body">Modal content here...</div>
       </div>
     </div>
   </div>
   ```

3. **Card**
   ```html
   <div class="card" style="width: 18rem;">
     <img src="..." class="card-img-top" alt="..." />
     <div class="card-body">
       <h5 class="card-title">Card Title</h5>
       <p class="card-text">Some quick example text.</p>
       <a href="#" class="btn btn-primary">Go somewhere</a>
     </div>
   </div>
   ```

## References

- [Bootstrap Documents (5.3.x)](https://getbootstrap.com/docs/5.3)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React-bootstrap](https://react-bootstrap.github.io/)
- [Angular + bootstrap](https://ng-bootstrap.github.io/#/home)
- [Vue + bootstrap](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
