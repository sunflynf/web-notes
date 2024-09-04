---
description: Setting head in React
tags:
    - JavaScript
    - TypeScript
    - React
    - Extension
---

# React Helmet

`react-helmet` is a reusable React component that helps manage changes to the document head, like updating the page title, adding meta tags, or linking external stylesheets.

## Features

- Supports all valid head tags: `title`, `base`, `meta`, `link`, `script`, `noscript`, and `style` tags.
- Supports attributes for `body`, `html` and `title` tags.
- Supports server-side rendering.
- **Nested components override duplicate head changes.**
- Duplicate head changes are preserved when specified in the same component (support for tags like "apple-touch-icon").
- Callback for tracking DOM changes.

## Using

```jsx
import React from 'react';
import { Helmet } from 'react-helmet';

function MyComponent() {
  return (
    <div>
      <Helmet>
        <title>My Awesome App</title>
        <meta name="description" content="This is my awesome application" />
        <link rel="canonical" href="https://www.myawesomeapp.com" />
      </Helmet>
      <h1>Welcome to My Awesome App</h1>
    </div>
  );
}

export default MyComponent;
```
