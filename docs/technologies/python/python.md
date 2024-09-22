---
description: OOP languages
tags:
  - Programming language
  - Python
  - OOP
---

# Python

## Install

- Link [install](https://www.python.org/downloads/)
- Checking

  ```bash
  python --version
  ```

## Basics

### Syntax and Variables

Python uses simple, clean syntax. Variables don't need explicit declarations.

```python
# Basic variables
x = 10
y = 3.14
name = "Alice"

# Printing values
print(x, y, name)
```

### Control Flow

```python
# if-else example
x = 10
if x > 5:
    print("x is greater than 5")
else:
    print("x is 5 or less")

# for loop example
for i in range(5):
    print(i)
```

### Functions

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

### Data Structures

Python has built-in data structures like **lists**, **dictionaries**, and **sets**

```python
# List
numbers = [1, 2, 3, 4]
print(numbers)

# Tuple - ordered and unchangeable
ord_numbers = (1, 2, 3, 4)
print(ord_numbers)

# Dictionary
person = {"name": "Alice", "age": 25}
print(person["name"])

# Set
unique_values = {1, 2, 3, 3}
print(unique_values)
```

### Error Handling

Handle errors gracefully using try-except blocks.

```python
try:
    x = int("not a number")
except ValueError as e:
    print(f"Error: {e}")
```

## Object-Oriented Programming (OOP)

Python supports OOP with classes and objects.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, my name is {self.name} and I'm {self.age} years old.")

person = Person("Alice", 25)
person.greet()
```

## Modules and Packages

You can import modules to reuse code across files.

```python
# Importing a built-in module
import math
print(math.sqrt(16))

# Creating your own module (save as my_module.py)
def say_hello():
    return "Hello from the module!"

# In another file
from my_module import say_hello
print(say_hello())
```

## File I/O

Python makes file reading and writing simple.

```python
# Writing to a file
with open("test.txt", "w") as file:
    file.write("Hello, World!")

# Reading from a file
with open("test.txt", "r") as file:
    content = file.read()
    print(content)
```

## List Comprehensions and Lambda Functions

List comprehensions provide a concise way to create lists.

```python
# List comprehension
squares = [x**2 for x in range(5)]
print(squares)

# Lambda functions
double = lambda x: x * 2
print(double(5))
```

## Advanced Python Concepts

### Iterators and Generators

Iterators help in traversing through sequences, and generators lazily produce values.

```python
# Iterator example
my_list = [1, 2, 3]
my_iter = iter(my_list)

print(next(my_iter))
print(next(my_iter))

# Generator example
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for count in countdown(5):
    print(count)
```

### Decorators

Decorators modify the behavior of functions without changing their code.

```python
def decorator(func):
    def wrapper():
        print("Before the function call")
        func()
        print("After the function call")
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

### Context Managers

Context managers ensure proper resource management (e.g., opening/closing files).

```python
with open("file.txt", "w") as file:
    file.write("Writing with a context manager.")
```

### Regular Expressions

Regular expressions are used for string pattern matching.

```python
import re

pattern = r"\d+"
text = "There are 123 apples"

match = re.findall(pattern, text)
print(match)  # Output: ['123']
```
