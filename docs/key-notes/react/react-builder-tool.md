---
description: React-app | Vite | Remix | Next-app
tags: [React]
---

# React Builder Tools

| Feature / Tool                            | create-remix                                     | create-next-app                                                         | create-vite (React template)           |
| ----------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------- |
| **Framework/Library**                     | Remix (React-based)                              | Next.js (React)                                                         | React (with Vite)                      |
| **Build Time**                            | Fast (Remix's server-side rendering)             | Fast (Next.js's server-side rendering)                                  | Fast (Vite's native ES modules)        |
| **Hot Module Replacement (HMR)**          | Yes                                              | Yes                                                                     | Yes                                    |
| **TypeScript Support**                    | Yes (with plugins)                               | Yes                                                                     | Yes                                    |
| **CSS Pre-processors**                    | Yes (with plugins)                               | Yes (with plugins)                                                      | Yes (with plugins)                     |
| **Code Splitting**                        | Yes (Remix's route-based code splitting)         | Yes (Next.js's automatic code splitting)                                | Yes (Vite's native ES modules)         |
| **Server-Side Rendering (SSR)**           | Yes (Remix's core feature)                       | Yes (Next.js's core feature)                                            | No (client-side rendering)             |
| **Static Site Generation (SSG)**          | No                                               | Yes (Next.js's getStaticProps)                                          | No                                     |
| **Incremental Static Regeneration (ISR)** | No                                               | Yes (Next.js's getStaticProps & revalidate)                             | No                                     |
| **API Routes**                            | Yes (Remix's API routes)                         | Yes (Next.js's API routes)                                              | No (with plugins)                      |
| **Community & Ecosystem**                 | Growing                                          | Large and mature                                                        | Growing                                |
| **Official Documentation**                | [Remix Docs](https://remix.run/docs)             | [Next.js Docs](https://nextjs.org/docs)                                 | [Vite Docs](https://vitejs.dev/guide/) |
| **Default File Structure**                | `src/routes` (route-based)                       | `pages` (page-based)                                                    | `src` (component-based)                |
| **Default Routing**                       | Remix's `useRouteLoaderData` and `useLoaderData` | Next.js's `getStaticProps`, `getServerSideProps`, and `getInitialProps` | React Router (with `BrowserRouter`)    |

:::info Note

1. All tools support [JavaScript](../../technologies/js/index.mdx) and have plugins for additional functionality.
2. The community and ecosystem size can vary over time.
3. The build time can depend on various factors, such as **project size** and **complexity**.
4. The comparison is based on the latest stable versions of the tools at the time of writing.
5. This table focuses on the core features of each tool within the React ecosystem; additional features may be available with plugins or extensions.

:::

:::warning

`create-react-app` is [deprecated](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) - with React 19

:::
