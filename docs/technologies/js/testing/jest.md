---
description: A delightful JavaScript Testing Framework with a focus on simplicity.
tags:
  - Library
  - JavaScript
  - Testing
---

# Jest

> **Quick reference:** [JavaScript Testing Cheatsheet](./cheatsheet.mdx)

## Getting Started

1. Install

    ```bash
    npm install --save-dev jest
    ```

2. Build test

    ```js title='sum.js'
    export function sum(a, b) {
      return a + b;
    }
    ```

    ```js title='sum.test.js'
    import { sum } from "./sum.js";

    test("adds 1 + 2 to equal 3", () => {
      expect(sum(1, 2)).toBe(3);
    });
    ```

3. Add Script

    ```json title='package.json'
    {
      "scripts": {
        "test": "jest"
      }
    }
    ```

:::note ES modules

Jest runs tests as CommonJS by default, so the `export` / `import` syntax above needs either Babel (`babel-jest` with `@babel/preset-env`) or native ESM mode: `node --experimental-vm-modules node_modules/jest/bin/jest.js`. Jest 30 requires Node.js 18+.

:::

## References

- [Official Docs](https://jestjs.io/docs/getting-started)
- [Usage API](https://jestjs.io/docs/api)
