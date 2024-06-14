"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[8060],{3752:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>c,toc:()=>d});var r=s(4848),i=s(8453);const t={description:"Web languages - support type for JavaScript",tags:["Programming lang","JavaScript","TypeScripts"]},l="TypeScript",c={id:"summarize/languages/TypeScript",title:"TypeScript",description:"Web languages - support type for JavaScript",source:"@site/docs/summarize/languages/TypeScript.md",sourceDirName:"summarize/languages",slug:"/summarize/languages/TypeScript",permalink:"/web-notes/vi/docs/summarize/languages/TypeScript",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/languages/TypeScript.md",tags:[{inline:!0,label:"Programming lang",permalink:"/web-notes/vi/docs/tags/programming-lang"},{inline:!0,label:"JavaScript",permalink:"/web-notes/vi/docs/tags/java-script"},{inline:!0,label:"TypeScripts",permalink:"/web-notes/vi/docs/tags/type-scripts"}],version:"current",frontMatter:{description:"Web languages - support type for JavaScript",tags:["Programming lang","JavaScript","TypeScripts"]},sidebar:"documentSidebar",previous:{title:"JavaScript",permalink:"/web-notes/vi/docs/summarize/languages/JavaScript"},next:{title:"Environment",permalink:"/web-notes/vi/docs/category/environment"}},a={},d=[{value:"Basic Types",id:"basic-types",level:2},{value:"Enums",id:"enums",level:2},{value:"Interfaces &amp; Type Aliases",id:"interfaces--type-aliases",level:2},{value:"interface",id:"interface",level:3},{value:"type",id:"type",level:3},{value:"Casting",id:"casting",level:2},{value:"Class",id:"class",level:2},{value:"Generic",id:"generic",level:2},{value:"Utility Types",id:"utility-types",level:2},{value:"TypeScript 5.x+",id:"typescript-5x",level:2},{value:"Template Literal Types",id:"template-literal-types",level:3},{value:"Index Signature Labels",id:"index-signature-labels",level:3},{value:"Resources",id:"resources",level:2}];function o(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"typescript",children:"TypeScript"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"TypeScript"})," is ",(0,r.jsx)(n.strong,{children:"JavaScript"})," with ",(0,r.jsx)(n.em,{children:"added syntax for types"}),"."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"TypeScript being converted into JavaScript means it runs anywhere that JavaScript runs!"}),"\n",(0,r.jsxs)(n.li,{children:["Add to project with ",(0,r.jsx)(n.strong,{children:"npm"}),": ",(0,r.jsx)(n.code,{children:"npm install typescript --save-dev"})]}),"\n",(0,r.jsxs)(n.li,{children:["Check: ",(0,r.jsx)(n.code,{children:"npx tsc"})]}),"\n",(0,r.jsxs)(n.li,{children:["Config compiler: ",(0,r.jsx)(n.code,{children:"npx tsc --init"})," -> ",(0,r.jsx)(n.code,{children:"tsconfig.json"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"basic-types",children:"Basic Types"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Type Assignment:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Explicit: ",(0,r.jsx)(n.code,{children:'let firstName: string = "Dylan";'})]}),"\n",(0,r.jsxs)(n.li,{children:["Implicit (guess): ",(0,r.jsx)(n.code,{children:'let firstName = "Dylan";'})," -> string"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Primitives type:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["main: ",(0,r.jsx)(n.code,{children:"boolean"}),", ",(0,r.jsx)(n.code,{children:"number"}),", ",(0,r.jsx)(n.code,{children:"string"})]}),"\n",(0,r.jsxs)(n.li,{children:["other: ",(0,r.jsx)(n.code,{children:"bigint"}),", ",(0,r.jsx)(n.code,{children:"symbol"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Special type:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"any"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"unknown"})," - safe ",(0,r.jsx)(n.code,{children:"any"}),', add type later with casting (use "as" keyword)']}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"never"}),", ",(0,r.jsx)(n.code,{children:"undefined"}),", ",(0,r.jsx)(n.code,{children:"null"})," - maybe useless"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"void"})," - for ",(0,r.jsx)(n.strong,{children:"function"})," return ",(0,r.jsx)(n.code,{children:"undefined"})]}),"\n",(0,r.jsxs)(n.li,{children:["Array","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"const arr: number[] = [];"})," | ",(0,r.jsx)(n.code,{children:"string[]"})," | ",(0,r.jsx)(n.code,{children:"Something[]"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"const PAGE_MODE: readonly string[] = ['view', 'create', 'edit']"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Tuples","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Array for multiple type - ",(0,r.jsx)(n.code,{children:"let tuple: [number, boolean, string] = [2, false, 'abc']"})]}),"\n",(0,r.jsxs)(n.li,{children:["Can use ",(0,r.jsx)(n.code,{children:"readonly"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Object","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"let car: { model: string, year: number, mileage?: number, [x: string]: any }"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"?"})," use for optional"]}),"\n",(0,r.jsxs)(n.li,{children:["This type can replace by ",(0,r.jsx)(n.code,{children:"type"})," or ",(0,r.jsx)(n.code,{children:"interface"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"enums",children:"Enums"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'enum CardinalDirections {\n  North, // 1\n  East,\n  South,\n  West // 4\n}\nenum StatusCodes {\n  NotFound = 404, // it can be string like "404"\n  Success = 200,\n  Accepted = 202,\n  BadRequest = 400\n}\n// Exp: StatusCode.NotFound\n'})}),"\n",(0,r.jsx)(n.h2,{id:"interfaces--type-aliases",children:"Interfaces & Type Aliases"}),"\n",(0,r.jsx)(n.h3,{id:"interface",children:"interface"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"interface"})," only apply to ",(0,r.jsx)(n.strong,{children:"object"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"interface"})," can ",(0,r.jsx)(n.code,{children:"extend"})," each other's definition."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"interface Rectangle {\n  height: number,\n  width: number\n}\nconst rectangle: Rectangle = {\n  height: 20,\n  width: 10\n};\n\ninterface ColoredRectangle extends Rectangle {\n  color: string\n}\n// keyof ColoredRectangle -> 'height' | 'width' | 'color'\n// variable: keyof Interface (or ObjectType)\nconst coloredRectangle: ColoredRectangle = {\n  height: 20,\n  width: 10,\n  color: \"red\"\n};\n"})}),"\n",(0,r.jsx)(n.h3,{id:"type",children:"type"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"NOTE"}),": Recommend using ",(0,r.jsx)(n.code,{children:"type"})," instead of ",(0,r.jsx)(n.code,{children:"interface"})," if not use ",(0,r.jsx)(n.code,{children:"class"}),"\n",(0,r.jsx)(n.a,{href:"https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",children:"Interface vs Type"})]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'type CarYear = number | string; // Union types - value can be 1 of 2 types\ntype CarType = string;\ntype CarModel = string;\ntype Car = {\n  year: CarYear,\n  type: CarType,\n  model: CarModel\n}\n\nconst carYear: CarYear = 2001; // or "2001"\nconst carType: CarType = "Toyota"\nconst carModel: CarModel = "Corolla"\nconst car: Car = {\n  year: carYear,\n  type: carType,\n  model: carModel\n};\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// Type Alias\ntype Negate = (value: number) => number;\n\n// in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`\nconst negateFunction: Negate = (value) => value * -1;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"casting",children:"Casting"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Casting doesn't actually change the type of the data within the variable => Force casting"}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"variable as type"}),". Exp: ",(0,r.jsx)(n.code,{children:"x as string"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<type>variable"}),". Exp: ",(0,r.jsx)(n.code,{children:"<string>x"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Force casting"}),": ",(0,r.jsx)(n.code,{children:"(variable as unknown|any) as type"}),". Exp: ",(0,r.jsx)(n.code,{children:"(x as unknown) as number"})]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"class",children:"Class"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Review: ",(0,r.jsx)(n.a,{href:"/web-notes/vi/docs/summarize/languages/JavaScript",children:"JavaScript Class"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"JavaScript Class with clear OOP"})}),"\n",(0,r.jsxs)(n.li,{children:["Visibility modifiers","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"private"})," - Class member only"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"protected"})," - Class member, Classes inherit it"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"public"})," - anywhere"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"implements"})," multiple ",(0,r.jsx)(n.code,{children:"interface"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"extends"})," 1 ",(0,r.jsx)(n.code,{children:"class"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"override"})," function"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"abstract"})," class - not use to create Object"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"class Person {\n  private name: string;\n  // private readonly name: string; // now name can't change\n\n  // Use private with params\n  // public constructor(private name: string) {}\n  public constructor(name: string) {\n    this.name = name;\n  }\n\n  public getName(): string {\n    return this.name;\n  }\n}\n\nconst person = new Person(\"Jane\");\nconsole.log(person.getName()); // person.name isn't accessible from outside the class since it's private\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"interface Shape {\n  getArea: () => number;\n}\n\nclass Rectangle implements Shape {\n  // using protected for these members allows access from classes that extend from this class, such as Square\n  public constructor(protected readonly width: number, protected readonly height: number) {}\n\n  public getArea(): number {\n    return this.width * this.height;\n  }\n\n  public toString(): string {\n    return `Rectangle[width=${this.width}, height=${this.height}]`;\n  }\n}\n\nclass Square extends Rectangle {\n  public constructor(width: number) {\n    super(width, width);\n  }\n\n  // this toString replaces the toString from Rectangle\n  public override toString(): string {\n    return `Square[width=${this.width}]`;\n  }\n}\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"abstract class Polygon {\n  public abstract getArea(): number;\n\n  public toString(): string {\n    return `Polygon[area=${this.getArea()}]`;\n  }\n}\n\nclass Rectangle extends Polygon {\n  public constructor(protected readonly width: number, protected readonly height: number) {\n    super();\n  }\n\n  public getArea(): number {\n    return this.width * this.height;\n  }\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"generic",children:"Generic"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// string is default type if it not provide\nclass NamedValue<T = string> {\n  private _value: T | undefined;\n\n  constructor(private name: string) {}\n\n  public setValue(value: T) {\n    this._value = value;\n  }\n\n  public getValue(): T | undefined {\n    return this._value;\n  }\n\n  public toString(): string {\n    return `${this.name}: ${this._value}`;\n  }\n}\n\nconst value = new NamedValue('myNumber');\nvalue.setValue('myValue');\nconsole.log(value.toString()); // myNumber: myValue\n\nconst value2 = new NamedValue<number>('myNumber');\nvalue2.setValue(10);\nconsole.log(value2.toString()); // myNumber: 10\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"interface Nested<T> {\n  something: T\n}\ntype Wrapped<T> = { value: T };\nconst wrappedValue: Wrapped<number> = { value: 10 };\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"// extends limit types\nfunction createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {\n  console.log(`creating pair: v1='${v1}', v2='${v2}'`);\n  return [v1, v2];\n}\nconsole.log(createPair<string, number>('hello', 42)); // ['hello', 42]\n"})}),"\n",(0,r.jsx)(n.h2,{id:"utility-types",children:"Utility Types"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Record<K, V>"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Excludes<TypeUnion, TypeRemove>"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Readonly<T>"})," - Apply TS features only"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Patial<I>"})," - All keys are ",(0,r.jsx)(n.strong,{children:"OPTIONAL"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Required<I>"})," - All keys are ",(0,r.jsx)(n.strong,{children:"REQUIRED"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Omit<I, 'key1' | 'key2'>"})," - Remove keys of interface"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Pick<I, 'key1' | 'key2'>"})," - Choose keys of interface"]}),"\n",(0,r.jsxs)(n.li,{children:["function","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ReturnType<FT>"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Parameters<FT>[paramIndex]"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const nameAgeMap: Record<string, number> = { 'Alice': 21, 'Bob': 25 };\n\ninterface Car {\n  make: string;\n  model: string;\n  mileage?: number;\n}\n\nconst nothingCar: Partial<Car> = {};\nconst myCar: Required<Car> = {\n  make: 'Ford',\n  model: 'Focus',\n  mileage: 12000 // `Required` forces mileage to be defined\n};\n\ntype Primitive = string | number | boolean\nconst value: Exclude<Primitive, string> = \"Hello\"; // Error\n\ntype PointGenerator = () => { x: number; y: number; };\n// { x: number, y: number }\nconst point: ReturnType<PointGenerator> = { x: 10, y: 20 };\n\ntype PointPrinter = (p: { x: number; y: number; }, ss?: boolean) => void;\n// 0: { x: number, y: number }\n// 1: boolean\n// 2: undefined\nconst point: Parameters<PointPrinter>[0] = { x: 10, y: 20 };\n"})}),"\n",(0,r.jsx)(n.h2,{id:"typescript-5x",children:"TypeScript 5.x+"}),"\n",(0,r.jsx)(n.h3,{id:"template-literal-types",children:"Template Literal Types"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'type Color = "red" | "green" | "blue";\ntype HexColor<T extends Color> = `#${string}`;\n\n// Usage:\nlet myColor: HexColor<"blue"> = "#0000FF";\n'})}),"\n",(0,r.jsx)(n.h3,{id:"index-signature-labels",children:"Index Signature Labels"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'type DynamicObject = { [key: string as `dynamic_${string}`]: string };\n\n// Usage:\nlet obj: DynamicObject = { dynamic_key: "value" };\n'})}),"\n",(0,r.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.typescriptlang.org/docs/",children:"TypeScript docs"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.w3schools.com/typescript/index.php",children:"w3schools - TypeScript"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var r=s(6540);const i={},t=r.createContext(i);function l(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);