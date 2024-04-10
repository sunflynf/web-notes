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
#### Variable's name
> Start with (A-Z) (a-z) $ _
> **Allowed**: abc, student1, $prevDOM, _current, compare_2Arrays;
> **Not allowed**: 1student, ?person

#### Operators
- Math: `+` `-` `*` `/` `%` `**`
- Compare: 
    - value: `==` `!=` 
    - type & value: `===` `!==`
    - not: `!`

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