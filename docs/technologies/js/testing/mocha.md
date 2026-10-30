---
description: A feature-rich JavaScript test framework running on Node.js and in the browser.
tags:
  - Framework
  - JavaScript
  - Testing
---

# Mocha

> **Quick reference:** [JavaScript Testing Cheatsheet](./cheatsheet.mdx)

- Mocha 12 requires **[Node.js](../env/nodejs.md) 20.19+ or 22.12+** (Mocha 11 required Node.js 18+)
- `describe()`: Defines a test suite.
- `it()`: Defines a test case.
- `assert`: Built-in assertion library.
- `chai`: Popular assertion library (optional).

## Getting Started

1. Add package to projects

   ```bash
   npm i --save-dev mocha
   ```

2. Making test

   ```js title="test/mocha.test.js"
   import assert from "assert";

   describe("Array", () => {
     describe("#indexOf()", () => {
       it("should return -1 when the value is not present", () => {
         assert.equal([1, 2, 3].indexOf(4), -1);
       });
     });
   });
   ```

3. Add Script

   ```json title='package.json'
   {
     "scripts": {
       "test": "mocha"
     }
   }
   ```

## Basic concepts

```js
describe("test suite", () => {
  // 'done' to be called to complete the test, and it is OPTIONAL
  it("test case info", (done) => {
    // do some stuff ...
    done();
  });
});
```

## Assertions

> **USING**: `assert.<func>(...args)`
>
> The table follows Chai's `assert` style (`import { assert } from "chai"`). Node's built-in `node:assert` has `equal`, `strictEqual`, `deepStrictEqual`, `ok` and `throws`, but not `isOk` / `isNull` / `isUndefined`.

| Function                        | Using                                     |
| ------------------------------- | ----------------------------------------- |
| equal(actual, expected)         | Checks for loose equality (`==`).         |
| deepEqual(actual, expected)     | Checks for deep equality.                 |
| notEqual(actual, expected)      | Checks for inequality.                    |
| strictEqual(actual, expected)   | Checks for strict equality (`===`).       |
| isOk(value)                     | Checks if value is truthy.                |
| isNull(value)                   | Checks if value is null.                  |
| isUndefined(value)              | Checks if value is undefined.             |
| throws(function, expectedError) | Checks if function throws expected error. |

## Hooks

```js
describe("hooks", () => {
  before(() => {
    // runs once before the first test in this block
  });

  after(() => {
    // runs once after the last test in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  // test cases
});
```

```js
// Describing hook - apply for all hooks

beforeEach(function namedFun() {
  // beforeEach:namedFun
});

beforeEach("some description", () => {
  // beforeEach:some description
});
```

## Folder structure

```plaintext
project-name/
├── package.json
├── src/
│   ├── index.js
│   └── utils.js
├── test/
│   ├── math/
│   │   └── math.test.js
│   ├── utils/
│   │   └── utils.test.js
│   └── index.test.js
└── .gitignore
```

## References

- [Mocha](https://mochajs.org)
- [`chaijs` - Add-ons](https://www.chaijs.com/)
