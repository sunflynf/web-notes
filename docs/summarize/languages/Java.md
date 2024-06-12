---
description: OOP languages
tags:
    - Programming lang
    - OOP
---

# JAVA

## Table of contents

## Introduce

- **Java** works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc.)
- It is open-source and free
- It is secure, fast and powerful
- It has huge community support
- **Java** is an **object oriented language** which gives a clear structure to programs and allows code to be reused, lowering development costs

> [**Set up Java** in computer](https://www.w3schools.com/java/java_getstarted.asp)

- Compile & running in cmd | Terminal
  - `javac` build `.java` to `.class`
  - `java` run `.class` file

```cmd
> javac Main.java
> java Main 
```

## Syntax

```java
public class Main {
  public static void main(String[] args) {
    /* This is comment
       in multiple lines
    */
    // System.out.print(1 + 1); // This print not enter a new line
    System.out.println("Hello World");
  }
}
```

### Variables

- `type variableName = value;`
- `final type variableName = value;` - Unchange value
- variable's name are case-sensitive
- [Java keywords](https://howtodoinjava.com/java/basics/java-keywords/)

### Naming

```java
package com.company.appname.feature.layer;

enum Direction {NORTH, EAST, SOUTH, WEST}

public interface IControl {};
public class UserControl implements IControl {
    private final String SECRET_KEY = "Nothing!";
    private String username;
    private Properties properties;

    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {
        return this.username;
    }
};

// Generic: 
// <K,V> -> key, value
// <T> -> type
// <E> -> collection elements
// <S> -> service loaders
public interface UserAction<T extends Gender> extends Action<T> {}

// Annotation
public @interface FunctionalInterface {}
public @Test Documented {}
```

## Data Types

### Primitive

| Type | Describe | Range |
|--|--|--|
| byte | 8-bit integer | -128 to 127 |
| short | 16-bit integer | -32,768 to 32,767. |
| int | 32-bit integer | -2^31 to 2^31-1 |
| long | 64-bit integer | -2^63 to 2^63-1 |
| float | 32-bit floating-point |  |
| double | 64-bit floating-point |  |
| char | 16-bit Unicode character |  |
| boolean | true / false |  |

```java
boolean isValid = false;
int age = 20;
long onlineUsers = 3_000_000L; // or 3000000
float weight = 2.5f;
double balanceAmount = -2000.277d;
```

### Reference

```java
// The root class of the Java hierarchy. All classes inherit this
Object obj = new Object();

String str = "Hello world!";
int[] numbers = {1, 2, 3, 4, 5};

// (Integer|Long).MAX_VALUE
Integer iNumber = Integer.MIN_VALUE; 

// (Float|Double)
// - NEGATIVE|POSITIVE_INFINITY
// - MIN_VALUE: The smallest positive value greater than zero that can be represented in a float|double variable.
// - MAX_VALUE: The largest positive value that can be represented in a float|double variable.
// - NaN: not a number of type
Float fNumber = Float.NEGATIVE_INFINITY; 
```

## Blocks

```java
public class Demo {
    private Integer number;

    // constructor
    public Demo() {}

    {
        // Non-static block statement
        // Executed every Demo is created
        System.out.println("Non-static block executed")
    }

    static {
        // Executed once when the class is loaded by JVM
        System.out.println("Static block executed")
    }
}
```

## Collection Framework

![java-collections-cheat-sheet](https://github.com/sunflynf/web-notes/assets/75079929/6f945578-cb29-452d-b22e-1bbac827898e)

- **Collection**: root interface for all collection classes

## Control Flow

```java
// if else
if (condition) {
    // code block
} else if (anotherCondition) {
    // another code block
} else {
    // default code block
}
```

```java
enum Day { MON, TUE, WED, THUR, FRI, SAT, SUN }
public static Boolean isWeekDay(Day day) 
{
    boolean result = false;
    switch(day) {
        case MON, TUE, WED, THUR, FRI: 
            result = true;
            break;
        case SAT, SUN: 
            result = false;
            break;
        default: 
            throw new IllegalArgumentException("Invalid day: " + day.name())
    }
    return result;
}

// switch + arrow break (JDK 13+)
int day = 3;
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Invalid day";
};

// instanceof parsing (JDK 17+)
Object o;
switch (o) 
{
    case Integer i -> String.format("int %d", i);
    case Double d  -> String.format("double %f", d);
    case String s  -> String.format("String %s", s);
    default        -> o.toString();
}
```

```java
// for loop
int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println(number);
}

// Enhanced for loop
int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println(number);
}

// Collection.forEach
List<Integer> listNumber = List.of(1, 2, 3, 4, 5);
listNumber.forEach(num -> {}); // use with callback

// there also has do-while & while
int i = 1, sum = 0;
do {
    sum += i;
    i++;
} while(i <= 5)
```

```java
outer_loop:
for (int i = 0; i <= 5; i++) {
    inner_loop:
    for (int j = 0; j <= 5; j++) {
        // break; // breaks inner loop only
        break outer_loop; // same way with "continue"
    }
}
```

## OOP

### Classes

```java
public class Car {
    String color;
    int year;

    // Default constructor with no arguments
    public Car() {
        this.color = "Blue";
        this.year = 2024;
    }
    
    // Custom constructor
    public Car(String color, int year) {
        this.color = color;
        this.year = year;
    }

    public void display() {
        System.out.println("Color: " + color + ", Year: " + year);
    }
}
```

```java
// Using
Car defaultCar = new Car(); // "Blue", 2024
Car myCar = new Car("Red", 2020);
myCar.display();
```

### Interfaces

```java
public interface IAnimal {
    static String sound = "E"; 
    void eat();
    void sleep();
    // Can use without override method
    default void wakeUp () {
        System.out.println("Open eyes!");
    }
}
```

### Encapsulation

```java
// private attributes + public methods
class User {
    private String name;
    private Date dob;

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }
}
```

### Polymorphism

```java
class CustomMath {
    // overload method
    public int sum(int a, int b) { return a + b; }
    public long sum(int a, int b, int c) { return a + b + c; }
    public float sum(float a, float b) { return a + b; }
}
```

```java
class Shape {
    void draw() {
        System.out.println("Drawing lines...");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a circle...");
    }
}

Shape c = new Circle();
c.draw(); // Drawing a circle
```

### Abstraction

```java
interface Battery { void charge(); }
interface Horn { void horn(); }

// abstract class cannot use to create object
abstract class Car {
    int wheels;
    String name;

    abstract void run();
}
```

### Inheritance

```java
class Car {
    String name;
    // other configs
}

final class NotInherited {
    // extends raise Error
}

class ElectricCar extends Car {
    // attributes
    public ElectricCar(String name, float enginePower) {
        super(name); // put props to parents
    }
    // methods
}
```

- [ ] static method
- [ ] final & static final
- [ ] default method in interface

## Record

## Optional

## Collection

### Functional Interface

### Lambda

## Stream

## Exception

## Threads
