---
description: Fully CSS Frameworks
tags:
  - CSS
  - Frontend
  - UI Framework
---

# tailwindcss

A utility-first CSS framework that provides low-level classes to build custom designs without writing custom CSS.

## Core Concepts

1. **Utility Classes**:  
   Small, single-purpose classes like `text-center`, `bg-blue-500`, `p-4`, etc.

   ```html
   <div class="bg-gray-200 p-4 text-center">Hello, Tailwind!</div>
   ```

2. **Responsive Design**:  
   Use breakpoints like `sm`, `md`, `lg`, `xl`, `2xl` for responsive styling.

   ```html
   <div class="text-sm md:text-lg lg:text-xl">Responsive Text</div>
   ```

3. **Customization**:  
   Easily customize colors, spacing, etc., through `tailwind.config.js`.

4. **State Variants**:  
   Apply styles on hover, focus, etc.

   ```html
   <button class="bg-blue-500 hover:bg-blue-700 text-white">Hover Me</button>
   ```

5. **Dark Mode**:  
   Use `dark:` prefix for dark mode styles.

   ```html
   <div class="bg-white dark:bg-gray-800 text-black dark:text-white">
     Dark Mode
   </div>
   ```

## Common Utility Classes

- **Spacing**: `p-4`, `m-2`, `px-6`, `py-3`
- **Colors**: `text-red-500`, `bg-green-200`
- **Typography**: `text-xl`, `font-bold`, `uppercase`
- **Flexbox/Grid**: `flex`, `grid`, `justify-center`, `items-center`
- **Borders**: `border`, `border-2`, `rounded-lg`
- **Shadows**: `shadow-md`, `shadow-lg`

:::tip

1. **Use the JIT Mode (Just-In-Time Compiler)** for faster builds and smaller output.
2. **Install Tailwind Plugins** for forms, typography, or aspect ratios to extend features.
3. **Play with Tailwind’s Playground**: Try out [Tailwind Play](https://play.tailwindcss.com/).

:::

## References

- [Official Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Labs YouTube Channel](https://www.youtube.com/@TailwindLabs) (Includes screencasts, tutorials, and best practices)
- [Awesome Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss) (A curated list of tools, utilities, and more)
- **UI Components & Templates:**
  - [Tailwind UI](https://tailwindui.com/) (Official, paid component library)
  - [Headless UI](https://headlessui.com/) (Unstyled, accessible UI components by Tailwind Labs)
  - [Flowbite](https://flowbite.com/) (Open-source components)
  - [DaisyUI](https://daisyui.com/) (Tailwind CSS Components plugin)
