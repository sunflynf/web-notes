> **TypeScript** is **JavaScript** with _added syntax for types_.
> - TypeScript being converted into JavaScript means it runs anywhere that JavaScript runs!
> - Add to project with **npm**: `npm install typescript --save-dev`
> - Check: `npx tsc`
> - Config compiler: `npx tsc --init` -> `tsconfig.json`

### Table of contents

### Basic Types
- Type Assignment:
  - Explicit: `let firstName: string = "Dylan";`
  - Implicit (guess): `let firstName = "Dylan";` -> string
- Primitives type:
  - main: `boolean`, `number`, `string`
  - other: `bigint`, `symbol`
- Special type:
  - `any`
  - `unknown` - safe `any`, add type later with casting (use "as" keyword)
  - `never`, `undefined`, `null` - maybe useless
  - Array
    - `const arr: number[] = [];` | `string[]` | `Something[]`
    - `const PAGE_MODE: readonly string[] = ['view', 'create', 'edit']`
  - Tuples
    - Array for multiple type - `let tuple: [number, boolean, string] = [2, false, 'abc']`
    - Can use `readonly`
  - Object
    - `let car: { model: string, year: number, mileage?: number, [x: string]: any }`
    - `?` use for optional
    - This type can replace by `type` or `interface`
   
### Enums
```ts
enum CardinalDirections {
  North, // 1
  East,
  South,
  West // 4
}
enum StatusCodes {
  NotFound = 404, // it can be string like "404"
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// Exp: StatusCode.NotFound
```

### Interfaces & Type Aliases
