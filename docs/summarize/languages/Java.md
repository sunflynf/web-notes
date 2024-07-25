---
description: OOP languages
tags:
    - Programming lang
    - Java
    - OOP
---

# JAVA

- **Java** works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc.)
- It is open-source and free
- It is secure, fast and powerful
- It has huge community support
- **Java** is an **object oriented language** which gives a clear structure to programs and allows code to be reused, lowering development costs
- [**Set up Java** in computer](https://www.w3schools.com/java/java_getstarted.asp)

:::note Compile & running in cmd | Terminal
  
- `javac` build `.java` to `.class`
- `java` run `.class` file

```cmd
> javac Main.java
> java Main 
```

:::

## Syntax

```java
public class Main {
  public static void main(String[] args) {
    String name;
    // Manual input in console
    Scanner sc = new Scanner(System.in);

    /* This is comment
       in multiple lines
    */
    // System.out.print(1 + 1); // This print not enter a new line
    System.out.println("Enter name:");
    name = sc.nextLine();
    System.out.println("Hello " + name + "!");

    sc.close(); // garbage collector
  }
}
```

### Variables

- `[static] [final] type variableName = value;`
- Variable's name are **case-sensitive**
- [List Java keywords](https://howtodoinjava.com/java/basics/java-keywords/)

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
float[] amounts = new float[5]; // arr with length = 5

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

## Control Flow

### If-else

```java
if (condition) {
    // code block
} else if (anotherCondition) {
    // another code block
} else {
    // default code block
}

// Ternary
value = condition ? trueExpression : falseExpression;
```

### Switch-case-default

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

### For loop

```java
int[] numbers = {1, 2, 3, 4, 5};
for (int i = 0;  i < numbers.length; i++) {
    System.out.println(number);
}

// Enhanced for loop
for (int number : numbers) {
    System.out.println(number);
}

// Collection.forEach
List<Integer> listNumber = List.of(1, 2, 3, 4, 5);
listNumber.forEach(num -> {}); // use with callback
```

### While, Do-While Loop

```java
int i = 1, sum = 0;

// while(i <= 5) {
//     sum += i;
//     i++;
// }

do {
    sum += i;
    i++;
} while(i <= 5)
```

### Break loop

```java
// Labeled Statements
outer_loop:
for (int i = 0; i <= 5; i++) {
    inner_loop:
    for (int j = 0; j <= 5; j++) {
        // break; // breaks inner loop only
        break outer_loop; // same way with "continue"
    }
}
```

### Exception Handling

```java
try {
    // do something stuff
} 
catch (Exception err) {
    // It's fire, WATERRRRRRRRRR!
}
// OPTIONAL
finally {
    // You love me or hate me, I dont kare.
}
```

#### Try-with-resources

```java
try (BufferedReader br = new BufferedReader(new FileReader("C:/temp/test.txt"))) {
    String sCurrentLine;
    while ((sCurrentLine = br.readLine()) != null) {
        System.out.println(sCurrentLine);
    }
}
catch (IOException e) {
    // handle exception
}
```

#### throw

```java
static void allowedAlcohol(int age) {
    if (age >= 18) {
        System.out.print("OK!");
    } else {
        // catch in class call this function
        throw new WhyAreYouDrinkItException("This guy is cheater!"); 
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

// abstract class cannot use to create "new" object
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

### OOP Concepts

- `static` method
- `final` & `static final`
- `default` method in interface

## Arrays

- `type varName[]` or `type[] varName`
- `type varName[][]` or `type[][] varName`

```java
// String status[] = { "Active", "Inactive", "Purged" };
String status[] = new String[] { "Active", "Inactive", "Purged" };

// Printing
System.out.println(Arrays.toString( status ));
System.out.println(Arrays.deepToString( arrayOfArray )); // multi-dimentional
```

### Arrays Concepts

- Concatenate Arrays
- Splitting
- Resize
- Filter
- Map
- Clone

## Collection

![java-collections-cheat-sheet](https://github.com/sunflynf/web-notes/assets/75079929/6f945578-cb29-452d-b22e-1bbac827898e)

- **Collection**: root interface for all collection classes

## Records

- **JDK Version**: 14+
- **Records** are immutable data classes that require only the type and name of fields.

```java
// Yep, it's done! Now you can create Object like normal class.
public record Person(String name, String address) {}

// Using
Person person = new Person('John', 'Americano');
System.out.print(person.name()); // getters
```

```java
// Static variables & methods
public record Person(String name, String address) {
    public static String UNKNOWN_ADDRESS = "Unknown";    
    public static Person unnamed(String address) {
        return new Person("Unnamed", address);
    }
}

Person.UNKNOWN_ADDRESS;
Person.unnamed("Some where");
```

## Optional

- **JDK Version:** 8+
- `Optional` is meant to be used as a return type
- Using `Optional` in a **serializable** class will result in a **NotSerializableException**

```java
// Create empty Object
Optional<String> empty = Optional.empty(); 
empty.isPresent(); // Check there is value in object, current is false
empty.isEmpty(); // Check there is empty, current is true (ver 11+)

// Create Optional with static method
String name = "baeldung";
Optional<String> opt1 = Optional.of(name); // Maybe get NullPointerException
Optional<String> opt2 = Optional
    .ofNullable(name)
    .orElse("Default name"); // add-ons
    //.orElseGet(() -> "Default name"); // same above, but use function
    //.orElseThrow(IllegalArgumentException::new); // custom handling

    
```

### Functional Interface

```java
@FunctionalInterface
interface Square {
  int calculate(int x);
}

class Test {
  public static void main(String args[])
  {
    // lambda expression to define the calculate method
    Square s = (int x) -> x * x;

    // parameter passed and return type must be
    // same as defined in the prototype
    System.out.println(s.calculate(5));
  }
}
```

:::info Built-in Functional Interfaces

- **Runnable** –> `run()`
- **Comparable** –> `compareTo(`)
- **ActionListener** –> `actionPerformed()`
- **Callable** –> `call()`

:::

#### `Predicate<T>`

#### `Consumer<T>`

#### `Function<T, R>`

#### `Supplier<T>`

### Lambda

- Use as parameters of type **@FunctionalInterface**

```java
() -> doWhatEverYouWant();
(T a) -> a.doSomething();
(T a, T b) -> a + b;
(T1 a, T2 b, T2 c) -> {
    a.doStuff(b -> b.compare(c));
}
```

## Stream

- **Stream API** is used to process collections of objects
- **Features**
  - A stream is not a data structure instead it takes input from the Collections, Arrays or I/O channels.
  - Streams don’t change the original data structure, they only provide the result as per the pipelined methods.
  - Each intermediate operation is lazily executed and returns a stream as a result, hence various intermediate operations can be pipelined. Terminal operations mark the end of the stream and return the result.

## Exception

## Threads

---

## Resources

- [How to do in Java](https://howtodoinjava.com/java)
- [Pass-by-value or Pass-by-reference](https://howtodoinjava.com/java/basics/java-is-pass-by-value-lets-see-how/)
- [String methods & handling](https://howtodoinjava.com/series/java-string)
