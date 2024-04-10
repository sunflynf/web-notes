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
