---
description: A delightful JavaScript Testing Framework with a focus on simplicity.
tags:
  - Library
  - JavaScript
  - Testing
---

# Jest

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

## References

- [Offical Docs](https://jestjs.io/docs/getting-started)
- [Usage API](https://jestjs.io/docs/api)
