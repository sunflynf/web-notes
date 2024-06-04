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

### Reference

```java
// The root class of the Java hierarchy. All classes inherit this
Object obj = new Object();

String str = "Hello world!";
int[] numbers = {1, 2, 3, 4, 5};
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
// switch
int day = 3;
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Invalid day";
};
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
// there also has do-while & while
```

## OOP

### Classes

```java
public class Car {
    String color;
    int year;
    
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
Car myCar = new Car("Red", 2020);
myCar.display();
```

### Interfaces

```java
public interface IAnimal {
    void eat();
    void sleep();
}
```

### Inheritance

```java
public interface IControl {
  default void jump() {
    System.out.println("Jump");
  }
}
public interface IAnimal {
    void eat();
    void sleep();
}

public class Animal {
    void makeSound() {
        System.out.println("Animal sound");
    }
}

public class Dog extends Animal implements IAnimal, IControl {
    // default method of interface can avoid
    public void eat() {
        System.out.println("Dog eats");
    }    
    public void sleep() {
        System.out.println("Dog sleeps");
    }
    // override
    void makeSound() {
        System.out.println("Bark");
    }
}
```
