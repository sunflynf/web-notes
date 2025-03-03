---
description: Low-level methods for querying, updating, and managing database connections directly
tags:
  - Java
  - Database
  - Spring boot
---

# Java Database Connectivity

A standard API in Java for interacting with relational databases. It provides low-level methods for querying, updating, and managing database connections directly.

## **Core JDBC Components**

- **DriverManager**: Manages a list of database drivers. `DriverManager.getConnection(url, user, password)` is commonly used to obtain a `Connection` to the database.
- **Connection**: Represents a connection to a database. Used to create `Statement` and `PreparedStatement` objects for executing SQL queries.
- **Statement**: Used for executing static SQL statements and returning results. Use `Statement` for simple SQL but avoid it for dynamic queries due to SQL injection risks.
- **PreparedStatement**: A more secure and optimized alternative to `Statement` for executing parameterized queries.
- **ResultSet**: A table of data representing the result of a query.

### **JDBC Example Workflow**

1. **Load the JDBC Driver** (automatically loaded in most modern Java versions).
2. **Establish a Database Connection** using `DriverManager`.
3. **Create and Execute a Statement** to query the database.
4. **Process Results** using `ResultSet`.
5. **Close Connections** to free resources.

```java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "username";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM employees");
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                System.out.println("Employee ID: " + rs.getInt("id"));
                System.out.println("Name: " + rs.getString("name"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## **Spring Data JDBC Overview**

**Spring Data JDBC** is a lightweight framework from Spring that simplifies JDBC operations. It provides higher-level abstractions to avoid boilerplate code, handles connections and transactions, and integrates with Spring's dependency injection.

### **Features and Differences**

- **Focus on Simplicity**: Compared to Spring Data JPA, which is based on JPA/Hibernate, Spring Data JDBC is simpler and lighter.
- **No ORM Mapping**: Unlike JPA/Hibernate, it doesn’t use an object-relational mapper (ORM). It directly maps entities to tables with limited support for relationships.
- **CRUD Repositories**: Spring Data JDBC provides CRUD (Create, Read, Update, Delete) repositories for quick access to basic operations.

### **Setting Up Spring Data JDBC**

1. **Add Dependency** in `pom.xml` (for Maven):

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-jdbc</artifactId>
   </dependency>
   <dependency>
       <groupId>com.h2database</groupId>
       <artifactId>h2</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. **Define Configuration** in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.datasource.username=sa
   spring.datasource.password=password
   spring.datasource.initialization-mode=always
   ```

3. **Entity Definition**: Define a class as an entity.

   ```java
   import org.springframework.data.annotation.Id;

   public class Employee {
       @Id
       private Long id;
       private String name;
       private String department;
       // Getters and Setters
   }
   ```

4. **Repository Definition**: Use `CrudRepository` or `Repository`.

   ```java
   import org.springframework.data.repository.CrudRepository;

   public interface EmployeeRepository extends CrudRepository<Employee, Long> {
       // Custom query methods can be defined here
   }
   ```

5. **Service Layer** (optional): Implement a service for business logic.

   ```java
   import org.springframework.stereotype.Service;

   @Service
   public class EmployeeService {
       private final EmployeeRepository repository;

       public EmployeeService(EmployeeRepository repository) {
           this.repository = repository;
       }

       public Iterable<Employee> getAllEmployees() {
           return repository.findAll();
       }
       // Additional methods for custom logic
   }
   ```

6. **Usage in Controller**:

   ```java
   import org.springframework.web.bind.annotation.*;

   @RestController
   @RequestMapping("/employees")
   public class EmployeeController {
       private final EmployeeService employeeService;

       public EmployeeController(EmployeeService employeeService) {
           this.employeeService = employeeService;
       }

       @GetMapping
       public Iterable<Employee> getEmployees() {
           return employeeService.getAllEmployees();
       }

       @PostMapping
       public Employee addEmployee(@RequestBody Employee employee) {
           return employeeService.saveEmployee(employee);
       }
   }
   ```

## **Comparison and Best Practices**

| Aspect               | JDBC                              | Spring Data JDBC                             |
| -------------------- | --------------------------------- | -------------------------------------------- |
| **Abstraction**      | Low-level, manual SQL and mapping | Higher-level, managed by Spring              |
| **Transaction Mgmt** | Developer-managed, or Spring AOP  | Integrated transaction support               |
| **ORM Support**      | None, requires manual mapping     | No ORM, but supports direct mapping          |
| **CRUD Operations**  | Requires manual coding            | Provided by `CrudRepository`                 |
| **Complex Queries**  | SQL in code, or stored procedures | Supports query derivation and custom queries |

### Best Practices

1. **Use JDBC for**: Lightweight applications or cases where fine-grained control over SQL and database connections is required.
2. **Use Spring Data JDBC for**: Applications needing rapid development, automatic CRUD, and Spring integration without complex relationships or ORM features.
3. **Security**: Always use `PreparedStatement` with JDBC to prevent SQL injection.
4. **Error Handling**: For JDBC, handle `SQLException` explicitly; Spring Data JDBC manages exceptions, but custom error handling may be needed for complex apps.

### **Advanced Tips**

- **Custom Queries**: In Spring Data JDBC, add custom query methods using `@Query` or in a custom repository implementation if needed.
- **Testing**: Use H2 or another in-memory database for testing, or Spring’s test modules with transactional support.
- **Optimizing Performance**: Use connection pooling (e.g., HikariCP) in production environments for JDBC.
