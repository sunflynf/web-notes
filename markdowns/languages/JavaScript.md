### Table of contents
1. [Position in HTML](#position-in-html)
2. [Web workers](#web-workers)

### Position in HTML
```html
<!DOCTYPE html>
<html>
    <head>
        <!-- Other tags -->
        <!-- <script>
            function myFunction() {
                document.getElementById("demo").innerHTML = "Paragraph changed.";
            }
        </script> -->
    </head>
    <body>
        <p id="demo">A Paragraph</p>
        <button type="button" onclick="myFunction()">Try it</button>

        <!-- Recommend put in here, before body end tag -->
        <script>
            function myFunction() {
                document.getElementById("demo").innerHTML = "Paragraph changed.";
            }
        </script>
        <!-- use JavaScript file with src -->
        <script src="./script.js"></script>
    </body>
</html>
```

### Syntax
```js
var a = 'a'; // for old browser like IE
let b = 1; // flexiable value
const C = Math.PI; // constant - can not change

// Literals (fixed value): 1, 2.5, -10, "some text"
// Variables: a, b, C
```
| |Scope|Redeclare|Reassign|Hoisted|Binds this|
|--|--|--|--|--|--|
|`var`|	|x|x|x|x|
|`let`|x| |x| | |
|`const`|x| | | | |
> ![NOTE] `Array` and `Object` assign with `const` **can update**, but can't reassign

#### Variable's name
> Start with (A-Z) (a-z) $ _
> - **Allowed**: `abc`, `student1`, `$prevDOM`, `_current`, `compare_2Arrays`
> - **Not allowed**: `1student`, `?person`

#### Operators
- Math:
    - Number: `+` `-` `*` `/` `%` `**`
    - Assignment: `=` `++` `+=` `--` `-=` `*=` `/=` `%=`
    - String: `+` `+=`
    - Bitwise: (can assign like `<operator>=`)
        - And `&`
        - Or `|`
        - Not `~`
        - Xor `^`
        - shift: `<<` `<<<` `>>` `>>>`
- Compare: 
    - value: `==` `!=` `>` `>=` `<` `<=`
    - type & value: `===` `!==`
    - logical: `!` (not) `&&` (and) `||` (or)
    - ternary: `(condition) ? (value if true) : (value if false)`
    - type: `typeof` -> type; `instanceof` -> true | false
- **Coalescing (ES2020)**: `??`.
    - _Exp_: `let val = pi ?? 3.14;`
    - Explain: `let val = (pi !== null && pi !== undefined) ? pi : 3.14;`
- **Optional Chaining (ES2020)**:
    - _Exp_: `let currentAge = user?.age;`
    - Explain: `let currentAge = (user !== null && user !== undefined) ? user.age : undefined`
    - Note: this operators avoid error when object user is null or undefined

> - `!""`, `!0`, `!null`, `!undefined` -> true
> - `![]`, `!{}` -> false
> - `condition && value` -> `condition === true ? value : undefined`
> - `value || defaultValue` -> `!!value ? value : defaultValue`

### Data Types
- `undefined`
- `boolean`: `true`, `false`
- `number`
- `string`:
    - `'single quote'`
    - `"double quote"`
    - Template Strings (ES6): `` ` `` `some ${value} here!` `` ` ``-> dynamic value
    - **String** as **Object**: `let strObj = new String("hi!");`
- `object`
    - `null` - ???
    - `{}`
    - `[]` - `['value 1', 'value 2']` -> `{ 0: 'value 1', 1: 'value 2' }`
    - `Date`
    - `Set`
    - `Map`
- `function`
- `Bigint` (ES2020)

```js
"John".constructor                // Returns function String()  {[native code]}
(3.14).constructor                // Returns function Number()  {[native code]}
false.constructor                 // Returns function Boolean() {[native code]}
[1,2,3,4].constructor             // Returns function Array()   {[native code]}
{name:'John',age:34}.constructor  // Returns function Object()  {[native code]}
new Date().constructor            // Returns function Date()    {[native code]}
function () {}.constructor        // Returns function Function(){[native code]}
```

### String
```js
let text = "Hello    World!";
text.length; // 15
// Getter
text[0]; // H
text.charAt(0); // H
text.charCodeAt(0); // 72 (UTF-16)
text.at(-2); // text.charAt(text.length - 2) -> d | Introduce ES2022
// Convert
text.toUpperCase(); // HELLO    WORLD!;
text.toLowerCase(); // hello    world!;
// Features
text.concat(' How r u?'); // Hello    World! How r u?
text.trim(); // Hello World!
text.replace("World", "My Fen"); // Hello    My Fen!
text.replace(/WORLD/ig, "My Fen"); // Hello    My Fen! (use RegEx - insensitive + global match)
text.split(); // ["H", "e", "l", "l", "o", ... , "!"]
text.split("   "); // ["Hello", "World!"]
// Extracting
text.slice(start, end?); // allowed negative
text.substring(start, end?);
text.substr(start, len?);
```
```js
let text = "Please locate where 'locate' occurs!";
// Search
text.indexOf('test'); // -1
text.indexOf('locate'); // 7
text.indexOf('locate', 15); // 21 
text.search(/LOCALE/ig, 15); // 21 - same indexOf, but it can use RegEx
text.lastIndexOf('locale'); // 21 - search from last
text.match(/locale/g); // ['locate', 'locate']
text.includes('locate', 15); // true - ES6 + case sensitive (15 is optional) 
text.startsWith('locate'); // false - ES6 + case sensitive 
text.endsWith('locate'); // false - ES6 + case sensitive 
```
```js
// Other rarely use features
text.trimStart(); // ES2019 
text.trimEnd(); // ES2019
text.padStart(length, anyText); // ES2017 -> Pad a string with anyText until it reaches the length
text.padEnd(length, anyText); // ES2017
text.repeat(count); // ES6
text.replaceAll(/WORLD/ig, "My Fen"); // ES2021
text.matchAll(/ate/ig); // ES2020
```

### Number & BigInt
```js
const a1 = 10;
const a2 = 10.23;
const a3 = 123e5; // 123 * 10^5 = 12 300 000 // exponent
const a4 = 123e-5; // 123 * 10^(-5) = 0.00123
const a5 = 100 / "thing"; // NaN (Not a Number)
const a6 = 2 / 0; // Infinity; also has -Infinity
const a7 = 0xFF; // hexadecimal - F * (16^1) + F * (16^0) = 15 * 16 + 15 * 1 = 255
const a8 = new Number(123) // object - not recommend
// constant
Number.NaN;
Number.EPSILON; // (1 + 1/n) ^ n
Number.MIN_VALUE; // Min number posible in JS 
Number.MAX_VALUE; // Max number posible in JS
Number.NEGATIVE_INFINITY;
Number.POSITIVE_INFINITY;
// methods
a1.toString(base?); // base: 2, 8, 10 (default), 12, 16, 32
a1.toExponential(count); // Exp: (2.5).toExponential(4) -> 2.5000e+0
a1.toFixed(count); // Exp: (1234.5678).toFixed(2) -> 1234.56
a1.toPrecision(len); // Exp: (1234).toPrecision(2) -> 1.2e+3 | (1234).toPrecision(6) -> 1234.00
Number.isNaN(num);
// Convert with global JavaScript methods
Number(val); // Note: Number(new Date('1970-01-01')) -> 0; parse date will calculate from 00:00:00 01/01/1970
parseFloat(val);
parseInt(val);
```
```js
let x = 1234567890123456789012345n; // n mark for BigInt
let y = BigInt(1234567890123456789012345);
typeof x; // 'bigint'
// ES6 constants
Number.MIN_SAFE_INTEGER;
Number.MAX_SAFE_INTEGER;
// ES6 methods
Number.isInteger(num);
Number.isSafeInteger(num); // safe in range (note)
```

> ![NOTE]
> - Range of number: `-(2^53 - 1)` to `+(2^53 - 1)`
> - Numbers are **Always 64-bit Floating Point** (the international IEEE 754 standard)
> - This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63
> - Integers (numbers without a period or exponent notation) are accurate **up to 15 digits**.
> - Arithmetic between a `BigInt` and a `Number` is **not allowed** (type conversion lose information).
> - Unsigned right shift (>>>) can not be done on a `BigInt` (it does not have a fixed width).
> - A `BigInt` can not have decimals.

### Functions
```js
function funcNoParams() {}

function add2Nums(a, b) {
    return a + b; 
}

function logAll(all = "nothing") { // default parameters introduce in ES2015
    console.log(all);
}

// (ES6) This is function, too! Should use as callback
const arrowFunc = () => {};
const arrowFuncWithParams = (params = 'ok') => {
    console.log(params);
};

// call
funcNoParams();
add2Nums(1, 2); // return 3 but not log
logAll(); // log "nothing"
logAll("all"); // log "all"
arrowFuncWithParams(); // log "ok"

// Assign
const iCanAdd2Nums = add2Nums; // now iCanAdd2Nums -> function
console.log(iCanAdd2Nums(1, 3)) // log "4"
```
```js
// Hoisted - function push on top when program start
sum(1, 1); // run normally
function sum(a, b) { return a + b; }; 
// Self-Invoking
(function () {
  let x = "Hello!!";  // I will invoke myself
})();
// Function -> Object
function myFunction(a, b) {
  return arguments.length; // [a, b] -> 2
}
// Constructors
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
  this.name = function() {
    return this.firstName + " " + this.lastName;
  };
}
// Closures - High Order Function
const add = (function() {
    let counter = 0; // private, user don't know this
    return function () {
        counter += 1;
        return counter;
    }
})();
// After run self-invoking (only 1 time) -> add = function() { counter += 1; return counter; };
// counter start with 0, call add() will increase
```
> ![Arrow function] (ES6)
> - Not have own `this`
> - Arrow function not hoisted -> Define before call

```js
// call, apply
const person = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  },
  information: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
const person1 = {
  firstName:"John",
  lastName: "Doe"
}
person.fullName.call(person1); // John Doe - person (this) -> person1, now person1 is "this"
person.information.call(person1, "Oslo", "Norway"); // Oslo + Norway are extra arguments
person.information.aplly(person1, ["Oslo", "Norway"]); // apply use array instead of arguments separately
// bind - borrow function
const person = {
  firstName:"John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
  display: function () {
    let x = document.getElementById("demo");
    x.innerHTML = this.firstName + " " + this.lastName;
  }
}
const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}
let fullName = person.fullName.bind(member); // Hege Nilsen - current "this" of person in function is "this" of member
// Use bind in callback
setTimeout(person.display, 3000); // undefined undefined - current "this" is window
const display = person.display.bind(person); // point current "this" is person
setTimeout(display, 3000); // John Doe 
```

### Object
```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() { // anonymous function
    return this.firstName + " " + this.lastName;
  }
};
// get
person.firstName; // John
person['lastName']; // Doe
person.fullName(); // John Doe
person.age; // undefined
person.action(); // Error
// set
person.id = 1234;
person.action = function() {
    console.log("RUN");
} // now you can use persion.action()
// check
"id" in person; // true
```
```js
const user1 = { name: 'A', age: 20 };
const user2 = user1; // user1 === user2
const user3 = { name: 'A', age: 20 }; // user1 !== user3 && user2 !== user3 (diff address)
// Update same object
user2.age = 21; // -> user1['age'] = 21
user1.name = 'B'; // -> user2['name'] = 'B'
// Nested Objects
const myObj = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    cars: [
      {name:"Ford", models:["Fiesta", "Focus", "Mustang"]},
      {name:"BMW", models:["320", "X3", "X5"]},
      {name:"Fiat", models:["500", "Panda"]}
    ],
    getInformation: () => this.firstName + ' - ' + this.age, // this -> myObj. Using: myObj.getInformation()
    // ES5 Feature: Accessors (get + set) -> support behind the sences
    get fullname() {
        return this.firstName + " " + this.lastName; // using: myObj.fullname
    },
    set exactAge (yearBorn) {
        this.age = new Date().getFullYear() - yearBorn; // this.exactAge = 2001; -> age = 2024 - 2001   
    }
}
```
```js
Object.create(); // {} - new Object, better use literals object like: const newObj = {}
Object.keys(myObj); // ['firstName', 'lastName', 'age', 'cars', 'getInformation', 'fullname', 'exactAge']
Object.values(myObj);
/*
    [
      'John',
      'Doe',
      30,
      [
        { name: 'Ford', models: [Array] },
        { name: 'BMW', models: [Array] },
        { name: 'Fiat', models: [Array] }
      ],
      [Function: getInformation],
      'John Doe',
      undefined // setters
    ]
*/
const obj = { counter: 0 };
Object.defineProperty(obj, "reset", {
  get : function () {this.counter = 0;}
}); // object.reset
Object.defineProperty(obj, "add", {
  set : function (value) {this.counter += value;}
}); // object.add = x; -> counter += x;
// Protect
Object.seal(object); // Prevents changes of object properties (not values)
Object.isSealed(object); // Returns true if object is sealed
Object.freeze(object); // Prevents any changes to an object
Object.isFrozen(object); // Returns true if object is frozen
```

> ![Why using Getters & Setters?]
> - It gives simpler syntax
> - It allows equal syntax for properties and methods
> - It can secure better data quality
> - It is useful for doing things behind-the-scenes

> ![Tips & tricks]
> - Clone object: `const newObj = { ...oldObj };`
> - Check object has props: `prop_name in {} -> boolean`

### Arrays
```js
const cars = ["Saab", "Volvo", "BMW"];
// Getter
cars[1]; // Volvo
cars.length; // 3
// Setter
cars[2] = "Toyota"; // ["Saab", "Volvo", "Toyota"]
cars[4] = "Tesla"; // ["Saab", "Volvo", "Toyota", undefined, "Tesla"]
// Methods
cars.toString(); // Saab,Volvo,BMW
cars.sort(); // ["BMW", "Saab", "Volvo"]
Array.isArray(cars); // true
typeof cars; // "object"
```
```js
const animals = ["dog", "cat", "duck", "chicken"];
animals.at(-1); // chicken - (ES2022) works like animal[index] but allow negative
animals.join(", "); // "dog, cat, duck, chicken"
animals.concat(["fish", "renekton", "shark"]); // return ["dog", "cat", "duck", "chicken", "fish", "renekton", "shark"]
animals.concat("fish", "renekton", "shark"); // same above
animals.pop(); // Remove + return end animal (chicken)
animals.push("monkey"); // Add new animals at the end + return new length of array
animals.shift(); // Remove + return first animal (dog)
animals.unshift("snake"); // Add new animals at the start + return new length of array

// SPECIALS
[].slice(start, end?); // Return new Array copy from original array
[].splice(start, length?, ...items?);
/* this method can use to insert middle
    - Exp: animals.splice(2, 0, "bird", "penguin") -> ["dog", "cat", "bird", "penguin", "duck", "chicken"]
    - Return array includes delete items
*/
[].toSpliced(start, length?, ...items?);
/* this method works like splice but keep original array
    - ES2023
    - Return new array
*/
```
```js
const computer = ["monitor", "mouse", "keyboard", "speaker"];
// Search
computer.indexOf("mouse"); // 1 - indexOf(item, start?)
computer.indexOf("paper"); // -1
computer.lastIndexOf("mouse"); // 1 - same indexOf but reverse search
computer.includes("speaker"); // true (ES2016)

computer.find(i => i.length > 5);
/*  Structure: [].find((item, index, currentArray) => boolean) 
    - Result (Exp): "monitor"
    - Return first item match
    - ES6
*/
computer.findIndex(i => i === 'mouse'); // 1 - structure like above feature (ES6)
[].findLast();
[].findLastIndex();

// Sort
[].sort();
[].sort((a, b) => {}); // custom sort
[].reverse();

// Iteration
[].forEach((item, index, currentArray) => {});
[].map((item, index, currentArray) => any[]); // return new Array + keep original array
[].filter((item, index, currentArray) => boolean); // return new Array + keep original array
[].reduce((preValue, item, index, currentArray) => newValue, initialValue); 
[].reduceRight((preValue, item, index, currentArray) => newValue, initialValue); // right-to-left
[].every((item, index, currentArray) => boolean);
// Return true if all items pass conditions.
// Exp: ["Anna", "Daniel", "Keth"].every(i => i.includes('a')) -> false
[].some((item, index, currentArray) => boolean);
// Return true if any item pass conditions.
// Exp: ["Anna", "Daniel", "Keth"].some(i => i.includes('a')) -> true
```
```js
// Array Spread (ES6)
const q1 = ["Jan", "Feb", "Mar"];
const q2 = ["Apr", "May", "Jun"];
const q3 = ["Jul", "Aug", "Sep"];
const q4 = ["Oct", "Nov", "Dec"];
const year = [...q1, ...q2, ...q3, ...q4];
// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
```
```js
// Rarely use
[].copyWithin(indexOverwrite, indexStartCopy?, indexEndCopy?); // arr copy same length (can have diff values)
[].toSorted(); // ES2023 - return new Array + keep original array
[].toReversed(); // ES2023 - return new Array + keep original array
[[1,2],[3,4],[5,6]].flat(); // [1, 2, 3, 4, 5, 6] (ES2019) 
[].flatMap((item, index, currentArray) => any[]); // [].map().flat() (ES2019)
[].with(index, replace); // return new Array with replace item + keep original array
Array.from("text"); // ["t", "e", "x", "t"] (ES6)
// Should use only in object
["a", "b", "c"].keys(); // [0, 1, 2]
["a", "b", "c"].entries(); // [[0, "a"], [1, "b"], [2, "c"]]
```

> ![Note]:
> - Arrays are a special kind of objects, with **numbered indexes**.
> - Array random order: [].sort(() => 0.5 - Math.random());

### Date
```js
// Using
new Date() // current time
new Date(date string) // '2024-04-12T14:00:00'
new Date(year,month)
new Date(year,month,day)
new Date(year,month,day,hours)
new Date(year,month,day,hours,minutes)
new Date(year,month,day,hours,minutes,seconds)
new Date(year,month,day,hours,minutes,seconds,ms)
new Date(milliseconds)
// Methods
const dd = new Date('2024-4-32'); // Invalid Date - instanceof Date
const d = new Date('2024-4-12'); // 2024-04-12T00:00:00.000Z
d.toString();     // Fri Apr 12 2024 00:00:00 GMT+0000 (Coordinated Universal Time)
d.toDateString(); // Fri Apr 12 2024
d.toUTCString();  // Fri, 12 Apr 2024 00:00:00 GMT
d.toISOString();  // 2024-04-12T00:00:00.000Z
```
> [Date methods](https://www.w3schools.com/jsref/jsref_obj_date.asp)

### Math
```js
Math.round(4.4); // 4 - rounded to nearest integer
Math.round(4.5); // 5
Math.ceil(4.4); // 5 - rounded up
Math.floor(4.6); // 4 - rounded down
Math.trunc(4.1); // 4 - get integer part
Math.trunc(4.9); // 4 (ES6)
Math.sign(x); // -1: negative, 0, 1: positive (ES6)
// Calculate
Math.pow(a, b); // a ^ b
Math.sqrt(x); // x ^ (1/2)
Math.abs(x); // |x|
Math.min(...numbers); // min in list
Math.max(...numbers); // max in list
Math.random(); // value from 0 -> 1. Exp: 0.026311254760328362
```
> [Number methods]('https://www.w3schools.com/jsref/jsref_obj_math.asp')

### Conditions
```js
// Ternary
const variable = condition ? value_if_true : value_if_false;

// If else
if (condition1) {  }
else if (condition2) {  }
...
else {  }

// Switch Case (use ===)
switch(value) {
    case type1:
    case type2:
        // handle
        break; // or return
    case type3:
        // handle
        break; // or return
    default:
        // handle if value not same any type
        break; // or return
}

// try catch
try {
    // handle
} catch(error) {
    // handle if try has error
} finally {
    // always handle, it can skip
}
```

### Loop
```js
// Exp: for(let i = 0; i <= 5; i++) {}
// Loop with count, arr length, can use break | continue inside
for (let v = start; v_conditions; v_update) {
    // handle
}

for (key in object) {
    // { firstName: Vo, lastName: Phi, birth: 2001 }
    // -> loop: firstName >> lastName >> birth
}

for (value of []) {
    // for of suit with
    // - Array
    // - String
    // - Set
    // - Map >> [[k1, v1], [k2, v2], ..., [kn, vn]]
}

while(condition) {
    // do it util fail condition
};

do {
    // call 1 time before check condition
    // do it again util fail condition
} while(condition);
```

### Features
#### Set
```js
const s = new Set([12, 23, 34, 23, 25]); // Set(4) { 12, 23, 34, 25 }
s.size; // 4
s.add(44); // 12, 23, 34, 25, 44
s.delete(23); // 12, 34, 25, 44
s.has(23); // false
s.forEach(i => {})
s.values(); // use in loop for of
```
#### Map
```js
const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);
fruilt.size; // 3
fruilt.set("mango", 400);
fruilt.get("bananas"); // 300
fruits.delete("apples"); // remove apples
fruits.has("apples"); // false
fruits.forEach((key, value) => {});
fruits.entries(); // use in loop for of, item is [key, value]
```

### Events
> **HTML** 'thing' need **JS** react
> - Common: `onchange` `onclick` `onmouseover` `onmouseout` `onkeydown` `onload`
> - [List DOM events](https://www.w3schools.com/jsref/dom_obj_event.asp)

### `this`
- Alone -> **global object**.
- In an object method -> **object**.
- In a function -> **global object**.
- In a function, in strict mode -> `undefined`.
- In an event -> the element that received the event.
- Methods like `call()`, `apply()`, and `bind()` can refer this to any object.

### Module
```js
// EXPORT
export const season = "Summer";
export const year = 2024;
// or
const season = "Summer";
const year = 2024;
export { season, year };
// default
const getMyAge = (birthYear) => currentYear - birthYear; 
export default getMyAge;

// IMPORT
import { season, year } from './somefiles';
import getMyAge from './somefiles2'; // default
```

### JSON
```json
{
    "employees":[
          {"firstName":"John", "lastName":"Doe"},
          {"firstName":"Anna", "lastName":"Smith"},
          {"firstName":"Peter", "lastName":"Jones"}
    ]
}
```
```js
const listEmployee_string = JSON.stringify(employees);
const listEmployee_object = JSON.parse(employees);
```

### Class (ES6)
> - A JavaScript class is not an object.
> - It is a template for JavaScript objects.
```js
class Car {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }
  present() {
    return 'I have a ' + this.brand;
  } 
}

class Model extends Car {
  constructor(brand, year, model) {
    super(brand, year); // Car's contructors
    this.model = model;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

const car1 = new Car("Ford", 2014);
const car2 = new Model("Ford", 2014, "Mustand");
```
```js
// Class with getter & setter
class Car {
  constructor(brand) {
    this._carname = brand;
  }
  get carname() {
    return this._carname;
  }
  set carname(x) {
    this._carname = x;
  }
  // static - using: Car.wheels | Car.welcome('Xiaomi')
  static wheels = 4;
  static welcome(text = 'Vinfast') {
    return 'Welcome to ' + text;
  }
}
```

### Promise & Async
```js
// Promise
const myPromise = new Promise(function(resolve, reject) {
    // someThing
    if(ok) resolve();
    else reject();
})
myPromise.then(
    cb_if_success,
    cb_if_error
);
// Promise.all
const myPromises = Promise.all([promise1, promise2, ..., promiseN]);
// async + await
async function () { // return Promise<?>
    let result = await myPromises;
    return result;
};
```

### Versions
| Version (year) | Features |
| --- | --- |
| ES1 (1997) | 1st edition|
| ES2 (1998) | 2nd edition|
| ES3 (1999) | RegEx <br> try/catch/finally <br> switch + case <br> do + while | 
| ES5 (2009) | `"strict mode"` <br> JSON Support <br> `String.trim()` <br> `Array.isArray()` <br> Array iteration methods |
| ES6 (2015) | `let` & `const` <br> default param's values <br> `Array.find()` <br> `Array.findIndex()` |
| ECMAScript 2016 | Exponential operator `**` <br> `Array.includes()` |
| ECMAScript 2017 | `Object.entries()` <br> `Object.values()` <br> async/await |
| ECMAScript 2018 | Rest/Spread properties (...) <br> Asynchronous iteration <br> `Promise.finally()` |
| ECMAScript 2019 | `String.trimStart()` <br> `String.trimEnd()` <br> `Array.flat()` <br> `Object.formEntries()` |
| ECMAScript 2020 | Nullish Coalescing Operator `??` |

### Document Object Model
- [DOM Document](https://www.w3schools.com/js/js_htmldom_document.asp)
- Event Listener
    - `element.addEventListener(eventName, callback, useCapture?)`
    - `element.removeEventListener(eventName, callback)`
- Property:
    - `element.<nodeName|nodeValue|nodeType>`
    - [Node Properties](https://www.w3schools.com/js/js_htmldom_navigation.asp)
- Navigation `element.<navigate>`
    - `parentNode` - li -> ul; li.parentNode
    - `childNodes[index]` ul -> li(2); ul.childNodes[1]
    - `firstChild`
    - `lastChild`
    - `nextSibling` div -> div (same order)
    - `previousSibling`
- Nodes
    - Root Nodes: `document.body`, `document.documentElement`
    - `document.createElement(tagName)`
    - `document.createTextNode(text)` - put this inside element
    - `element.appendChild(node|elementChild)`
    - `element.insertBefore(markChild, newChild)`
    - `element.removeChild(node|elementChild)`
    - `element.replaceChild(markChild, replaceChild)`
- HTMLCollection (live) - collection of **elements**: `getElementsByTagName()`, `getElementsByClass()` 
- Node Lists (static) - collection of **nodes**: `querySelectorAll()`

### Browser Object Model
- Windows size: `window.innerHeight`, `window.innerWidth`
- Windows Methods:
    - `window.open()`
    - `window.close()`
    - `window.moveTo()`
    - `window.resizeTo()`
- Screen: `window.screen.<?>` - `width | height | availWidth | availHeight | colorDepth | pixelDepth`
- Location: `window.location.<?>` (Exp: `https://www.w3schools.com/js/js_window_location.asp`)
    - `href` - `https://www.w3schools.com/js/js_window_location.asp`
    - `hostname` - `https://www.w3schools.com`
    - `pathname` - js/js_window_location.asp
    - `protocol` - https:
    - `assign(url)` - navigate to url
- History: `window.history.<back()|forward()|go(count)>` - count can negative, base on history stack
- Navigator: `window.navigator.<?>`
    - Contains **information** about the visitor's browser.
    - Some useful keys: `cookieEnabled`, `platform`, `appVersion`, `language`, `onLine`
    - [API Geolocation](https://www.w3schools.com/js/js_api_geolocation.asp)
- Popup:
    - `window.alert(text)` -> void
    - `window.confirm(text)` -> boolean
    - `window.prompt(text, defaultValue)` -> string | null
- Time:
    - `setTimeout(function, miliseconds)` - Execute 1 time after waiting
    - `clearTimeout(var_setTimeout)`
    - `setInterval(function, miliseconds)` - Loop execute after `miliseconds`
    - `clearInterval(var_setInterval)`
- Cookies: `window.cookie` - Cookie exp: `'firstname="John";lastname="Doe";age:30'`
- API Storage:
    - `sessionStorage` - clear after close brower tab
    - `localStorage`
    - **Methods**: `<storage>.<?>`
        - length
        - key(n) - name of key _n_th
        - getItem(key)
        - setItem(key, val)
        - removeItem(key)
        - clear()

### Web Workers
> independent JavaScript works behind the sences
```js
let wwk;
function startWorker() {
    if (typeof(Worker) == "undefined") {
        // Web worker support!
        wwk = new Worker("for_worker.js", {}); // {} is optional        
    }
    wwk.onmessage = (e) => { // something here! }
}
function stopWorker() {
    wwk.terminate();
    wwk = undefined; // reuse
}
```

### Fetch API 
> Why? Cause JSON better than AJAX
```js
// normal fetch return Promise<status>
fetch(url)
    .then(() => Promise<?>)
    // other middlewares "then"
    .then(() => {})
    .catch(err => {})
// async + await
async function getData() {
    const result = await fetch(url);
    return result
}
```

### Resources
1. [w3schools](https://www.w3schools.com/js)
2. [Asynchronous JavaScript And XML | AJAX](https://www.w3schools.com/js/js_ajax_intro.asp)
