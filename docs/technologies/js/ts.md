---
description: Web languages - support type for JavaScript
tags:
    - Programming lang
    - JavaScript
    - TypeScripts
---

# TypeScript

**TypeScript** is **JavaScript** with _added syntax for types_.

- TypeScript being converted into JavaScript means it runs anywhere that JavaScript runs!
- Add to project with **npm**: `npm install typescript --save-dev`
- Check: `npx tsc`
- Config compiler: `npx tsc --init` -> `tsconfig.json`

## Basic Types

```ts
// Type Assignment
let firstName: string = 'Dylan'; // Explicit
let firstName = 'Dylan'; // Implicit -> auto be string

// Primitives type
let isTrue: boolean = false;
let firstNum: number = 0;
let yourName: string = 'My Name';
let myVirtualBalance = new BigInt('999999999999999');
let mySymbol: symbol = new Symbol('SIMP');

// SPECIAL
// 'undefined' | 'null' maybe useless
let dontUseThis: never;
let thing: any; 
let something: unknown; // any but safe, cast with "as"

// () => void -> function return undefined
function doIt(): () => void { }

// T[]
const listAgeValid: number[] = [];
const BLACK_LIST: readonly string[] = [];

// Tuples: [T1, T2, ..., Tn]
// - Can use 'readonly'
const materials: [string, number, boolean] = ['truffles', 2, false];

// Object
let car : {
  model: string,
  year: number,
  mileage?: number, // OPTIONAL property
  [x: string]: any, // OPTIONAL information
}
```

## Enums

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

## Interfaces & Type Aliases

### interface

- `interface` only apply to **object**
- `interface` can `extend` each other's definition.

```ts
interface Rectangle {
  height: number,
  width: number
}
const rectangle: Rectangle = {
  height: 20,
  width: 10
};

interface ColoredRectangle extends Rectangle {
  color: string
}
// keyof ColoredRectangle -> 'height' | 'width' | 'color'
// variable: keyof Interface (or ObjectType)
const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};
```

### type aliases

:::info

- Recommend using `type` instead of `interface` if not use `class`
- [Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

:::

```ts
type CarYear = number | string; // Union types - value can be 1 of 2 types
type CarType = string;
type CarModel = string;
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear: CarYear = 2001; // or "2001"
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const car: Car = {
  year: carYear,
  type: carType,
  model: carModel
};
```

```ts
// Type Alias
type Negate = (value: number) => number;

// in this function, the parameter `value` automatically gets assigned 
// the type `number` from the type `Negate`
const negateFunction: Negate = (value) => value * -1;
```

## Casting

```ts
// var as type
let value = x as string; 

// <type>var
let value = <string>x;

// Force casting - Usually use for fetching data
let value = (x as unknown) as number;
```

## Class

- Review: [JavaScript Class](./index.mdx)
- **JavaScript Class with clear OOP**
- Visibility modifiers
  - `private` - Class member only
  - `protected` - Class member, Classes inherit it
  - `public` - anywhere
- `implements` multiple `interface`
- `extends` only one `class`
- `override` function
- `abstract` class - not use to create Object

```ts
class Person {
  private name: string;
  // private readonly name: string; // now name can't change

  // Use private with params
  // public constructor(private name: string) {}
  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const person = new Person("Jane");
// person.name isn't accessible from outside the class since it's private
console.log(person.getName()); 
```

```ts
interface Shape {
  getArea: () => number;
}

class Rectangle implements Shape {
  // using protected for these members allows access 
  // from classes that extend from this class, such as Square
  public constructor(
    protected readonly width: number, 
    protected readonly height: number
  ) {}

  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}

class Square extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  // this toString replaces the toString from Rectangle
  public override toString(): string {
    return `Square[width=${this.width}]`;
  }
}
```

```ts
abstract class Polygon {
  public abstract getArea(): number;

  public toString(): string {
    return `Polygon[area=${this.getArea()}]`;
  }
}

class Rectangle extends Polygon {
  public constructor(
    protected readonly width: number, 
    protected readonly height: number
  ) {
    super();
  }

  public getArea(): number {
    return this.width * this.height;
  }
}
```

## Generic

```ts
// string is default type if it not provide
class NamedValue<T = string> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

const value = new NamedValue('myNumber');
value.setValue('myValue');
console.log(value.toString()); // myNumber: myValue

const value2 = new NamedValue<number>('myNumber');
value2.setValue(10);
console.log(value2.toString()); // myNumber: 10
```

```ts
interface Nested<T> {
  something: T
}
type Wrapped<T> = { value: T };
const wrappedValue: Wrapped<number> = { value: 10 };
```

```ts
// extends limit types
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}
console.log(createPair<string, number>('hello', 42)); // ['hello', 42]
```

## Utility Types

- `Record<K, V>`
- `Excludes<TypeUnion, TypeRemove>`
- `Readonly<T>` - Apply TS features only
- `Patial<I>` - All keys are **OPTIONAL**
- `Required<I>` - All keys are **REQUIRED**
- `Omit<I, 'key1' | 'key2'>` - Remove keys of interface
- `Pick<I, 'key1' | 'key2'>` - Choose keys of interface
- function
  - `ReturnType<FT>`
  - `Parameters<FT>[paramIndex]`

```ts
const nameAgeMap: Record<string, number> = { 'Alice': 21, 'Bob': 25 };

interface Car {
  make: string;
  model: string;
  mileage?: number;
}

const nothingCar: Partial<Car> = {};
const myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000 // `Required` forces mileage to be defined
};

type Primitive = string | number | boolean
const value: Exclude<Primitive, string> = "Hello"; // Error

type PointGenerator = () => { x: number; y: number; };
// { x: number, y: number }
const point: ReturnType<PointGenerator> = { x: 10, y: 20 };

type PointPrinter = (p: { x: number; y: number; }, ss?: boolean) => void;
// 0: { x: number, y: number }
// 1: boolean
// 2: undefined
const point: Parameters<PointPrinter>[0] = { x: 10, y: 20 };
```

## TypeScript 5.x+

### Template Literal Types

```ts
type Color = "red" | "green" | "blue";
type HexColor<T extends Color> = `#${string}`;

// Usage:
let myColor: HexColor<"blue"> = "#0000FF";
```

### Index Signature Labels

```ts
type DynamicObject = { [key: string as `dynamic_${string}`]: string };

// Usage:
let obj: DynamicObject = { dynamic_key: "value" };
```

## Resources

1. [TypeScript docs](https://www.typescriptlang.org/docs/)
2. [w3schools - TypeScript](https://www.w3schools.com/typescript/index.php)
