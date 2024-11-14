---
description: ORM Tech
tags:
  - Java
  - Spring boot
---

# JPA

## Definitions

- **JPA (Java Persistence API)**: A standard API for object-relational mapping (ORM) in Java.
- **Hibernate**: A popular ORM framework implementing JPA, offering extra features like caching, batch processing, and more.
- **Spring Data JPA**: A Spring module providing an abstraction layer for JPA, simplifying repository creation and data access patterns.

## Setting Up JPA with Hibernate and Spring Data JPA

### Adding Dependencies

Add the necessary dependencies to your `pom.xml` (for Maven) or `build.gradle` (for Gradle):

**For Maven:**

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

**For Gradle:**

```groovy title="build.gradle"
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'com.h2database:h2'
```

### Basic Configuration

```properties title="application.properties"
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
```

## Creating Entities with JPA

### Define JPA Entity Classes

- Annotate your class with `@Entity`.
- Add an `@Id` annotation to the primary key field.
- Use `@GeneratedValue(strategy = GenerationType.IDENTITY)` for auto-generated primary keys.

```java
import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // getters and setters
}
```

### Mapping Relationships

- **@OneToOne**: A one-to-one association.
- **@OneToMany**: One-to-many association, use a `List` or `Set`.
- **@ManyToOne**: Many-to-one association.
- **@ManyToMany**: Many-to-many association.

Example for `@OneToMany`:

```java
@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees;

    // getters and setters
}
```

## Using Spring Data JPA Repositories

### Define Repository Interfaces

Spring Data JPA provides CRUD and query methods out of the box.

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}
```

### Custom Queries with @Query

For complex queries, use the `@Query` annotation with JPQL or native SQL.

Example:

```java
@Query("SELECT u FROM User u WHERE u.email = ?1")
User findByEmail(String email);
```

## Best Practices

### Use DTOs for Data Transfer

To avoid returning entire entities and exposing database details, use Data Transfer Objects (DTOs) or projections.

### Use Lazy Loading Appropriately

For relationships, use `@OneToMany(fetch = FetchType.LAZY)` and load data only when needed.

### Optimize with Batch Fetching

Prevent the N+1 select problem by setting batch fetching in `application.properties`:

```properties
spring.jpa.properties.hibernate.default_batch_fetch_size=10
```

### Avoid Long Transactions

Limit transaction scope by keeping database interactions brief. Perform complex calculations outside the transaction boundary when possible.

### Implement Proper Exception Handling

Use `@Transactional` and `try-catch` blocks to manage exceptions effectively.

## Transaction Management

### Transactional Methods

Annotate methods with `@Transactional` to manage database transactions.

```java
@Transactional
public void updateUser(User user) {
    userRepository.save(user);
}
```

### Propagation and Isolation Levels

Customize transaction behavior:

- **Propagation**: `REQUIRED`, `REQUIRES_NEW`, etc.
- **Isolation**: `READ_COMMITTED`, `REPEATABLE_READ`, etc.

```java
@Transactional(isolation = Isolation.SERIALIZABLE)
public void processTransaction() {
    // transactional code here
}
```

## Performance Tuning

### Enable Caching

Use the second-level cache for entities that don’t change often.

```properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
```

### Optimize Fetching Strategies

Use `@EntityGraph` to fetch only necessary data in complex queries.

Example:

```java
@EntityGraph(attributePaths = {"department", "roles"})
List<User> findAllUsersWithDepartmentAndRoles();
```

### Database Indexing

Ensure that your frequently queried fields are indexed to speed up data retrieval.

## Error Handling and Debugging

### Log SQL Statements

Enable SQL logging to debug queries:

```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Handle Exceptions Properly

Use `@ControllerAdvice` to centralize exception handling in Spring applications.

Example:

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
```

## Testing JPA with Spring Boot

### Unit Testing Repositories

```java
@RunWith(SpringRunner.class)
@DataJpaTest // lightweight testing of JPA repositories.
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByName() {
        userRepository.save(new User("John", "john@example.com"));
        List<User> users = userRepository.findByName("John");
        assertEquals(1, users.size());
    }
}
```

### Integration Testing with H2 Database

Use H2 or an in-memory database for integration testing.
