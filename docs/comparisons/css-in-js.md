---
description: build CSS style with JavaScript
tags: [Frontend, CSS, JavaScript]
---

# CSS in JS

| CSS-in-JS Library | Style Definition | Composition | Server-Side Rendering (SSR) |  Community & Support |
|---|---|---|---|:---:|
| **styled-components** | template literals | ✅ (Composition via props) | ✅ (via ReactDOMServer) | ★★★★☆ |
| **emotion** | template literals + string interpolation | ✅ (Composition via props + interpolation) | ✅ (via emotion-server) | ★★★★☆ |
| **JSS** | JavaScript objects | ✅ (Composition via props + classes) | ✅ (via JSS's server renderer) | ★★★★☆ |
| **goober** | template literals + string interpolation | ✅ (Composition via props + interpolation) | ✅ (via goober's server renderer) | ★★★☆☆ |
| **twind** | utility classes + preflight styles | ✅ (Composition via utility classes) | ✅ (via twind's server renderer) | ★★★☆☆ |
| **vanilla-extract** | TypeScript + CSS variables | ✅ (Composition via props and CSS variables) | ✅ (via vanilla-extract's server renderer) | ★★★★☆ |

:::info All package above have

- Theming: Support `ThemeProvider`
- Hot Module Replacement (HMR)
:::

## Key

- **Style Definition:** The way styles are defined in the CSS-in-JS library.
- **Composition:** How components can be composed to create more complex styles.
- **Theming:** Support for theming and dynamic styling.
- **Server-Side Rendering (SSR):** Support for server-side rendering, which is crucial for SEO and initial load performance.
- **Hot Module Replacement (HMR):** Support for hot module replacement, which allows you to update modules in your application without a full reload.
- **Community & Support:** The size and activity of the community, as well as the availability of documentation and support.

## Brief comparison of the libraries

> Based on some additional factors

| Library | TypeScript Support | CSS Modules Support | CSS-in-JS API | Learning Curve |
|---|---|:---:|---|---|
| **styled-components** | ✅ (via `styled-components/macro`) | ✅ | ✅ (template literals) | Easy |
| **emotion** | ✅ (via `@emotion/styled` and `@emotion/react`) | ✅ | ✅ (template literals and string interpolation) | Easy to Moderate |
| **JSS** | ✅ | ✅ | ✅ (JavaScript objects) | Moderate |
| **goober** | ✅ (via `@emotion/react` and `@emotion/styled`) | ✅ | ✅ (template literals and string interpolation) | Easy |
| **twind** | ✅ (via `twind/preset-auto`) | ✅ | ✅ (utility classes) | Easy |
| **vanilla-extract** | ✅ (built-in) | ✅ | ✅ (TypeScript and CSS variables) | Moderate to Hard |

## Additional Notes

- **styled-components** and **emotion** are the most popular CSS-in-JS libraries, with a large community and extensive documentation.
- **JSS** is a more traditional CSS-in-JS library that uses JavaScript objects to define styles. It has a larger learning curve but offers more flexibility and power.
- **goober** is a performant and lightweight alternative to **emotion**, with a similar API and feature set.
- **twind** is a utility-first CSS-in-JS library that focuses on simplicity and ease of use. It's a good choice if you prefer a more functional and composable approach to styling.
- **vanilla-extract** is a newer CSS-in-JS library that focuses on type safety and performance. It's a good choice if you prefer a more functional and type-safe approach to styling, and if you're using TypeScript.
