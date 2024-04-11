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

> - `!""`, `!0`, `!null`, `!undefined` -> true
> - `![]`, `!{}` -> false
> - `condition && value` -> `condition === true ? value : undefined`
> - `value || defaultValue` -> `!!value ? value : defaultValue`

### Data Types
- `undefined`
- `null`
- `boolean`: `true`, `false`
- `number`
- `string`:
    - `'single quote'`
    - `"double quote"`
    - Template Strings (ES6): `` ` `` `some ${value} here!` `` ` ``-> dynamic value
    - **String** as **Object**: `let strObj = new String("hi!");`
- `object`
    - `{}`
    - `[]` - `['value 1', 'value 2']` -> `{ 0: 'value 1', 1: 'value 2' }`
    - `Date`
    - `Set`
    - `Map`
- `function`
- `Bigint` (ES2020)

### Functions
```js
function funcNoParams() {}

function add2Nums(a, b) {
    return a + b; 
}

function logAll(all = "nothing") {
    console.log(all);
}

// call
funcNoParams();
add2Nums(1, 2); // return 3 but not log
logAll(); // log "nothing"
logAll("all"); // log "all"

// Assign
const iCanAdd2Nums = add2Nums; // now iCanAdd2Nums -> function
console.log(iCanAdd2Nums(1, 3)) // log "4"
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

### Arrays

> ![NOTE]
> - Range of number: `-(2^53 - 1)` to `+(2^53 - 1)`
> - Numbers are **Always 64-bit Floating Point** (the international IEEE 754 standard)
> - This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63
> - Integers (numbers without a period or exponent notation) are accurate **up to 15 digits**.
> - Arithmetic between a `BigInt` and a `Number` is **not allowed** (type conversion lose information).
> - Unsigned right shift (>>>) can not be done on a `BigInt` (it does not have a fixed width).
> - A `BigInt` can not have decimals.

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



### Resources
1. [w3schools](https://www.w3schools.com/js)

--- 
### Todo
- [ ] Array
- [ ] Date
- [ ] Math
- [ ] Condition
    - [ ] If else
    - [ ] Switch case default
- [ ] Loop
    - [ ] For / For in / For of
    - [ ] While / Do while
- [ ] Set
- [ ] Map
- [ ] Class
- [ ] Module
- [ ] JSON
- [ ] Node.js
