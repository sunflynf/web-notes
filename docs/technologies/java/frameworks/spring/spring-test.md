---
description: spring-boot-starter-test
---

# Spring Testing

- **Unit Testing**: Testing individual units or methods in isolation, often by mocking dependencies.
- **Integration Testing**: Testing components together to ensure they interact as expected, typically involving databases or other external systems.
- **End-to-End Testing**: Testing the complete flow of an application from start to finish, often using tools like Selenium for web applications.

## Setting Up Testing Dependencies

**For Maven:**

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

**For Gradle:**

```groovy title="build.gradle"
testImplementation 'org.springframework.boot:spring-boot-starter-test'
```

:::info

`spring-boot-starter-test` includes 
- JUnit
- Mockito
- AssertJ
- Hamcrest
- Spring’s own testing utilities.

:::

## Unit Testing with Spring

### Writing Unit Tests for Service Layers

When testing services, isolate them by mocking dependencies with a framework like Mockito.

```java
@SpringBootTest
public class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void testFindUserById() {
        User user = new User(1L, "John", "john@example.com");
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User foundUser = userService.findUserById(1L);
        assertEquals("John", foundUser.getName());
    }
}
```

#### Testing with `@MockBean` and `@SpyBean`

- **@MockBean**: Creates a Mockito mock for a bean in the Spring context.
- **@SpyBean**: Wraps an actual Spring bean in a spy to allow partial mocking.

Use these annotations to replace or partially replace dependencies in your test class.

## Integration Testing

### Using `@SpringBootTest`

`@SpringBootTest` is used for integration tests that require the full Spring context.

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class ApplicationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetUser() throws Exception {
        mockMvc.perform(get("/api/users/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.name").value("John"));
    }
}
```

### Mocking HTTP Requests with `MockMvc`

Use `MockMvc` to test your controllers without needing an actual HTTP server.

```java
// Setup
@Autowired
private MockMvc mockMvc;

@Test
public void testCreateUser() throws Exception {
    mockMvc.perform(post("/api/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"John\", \"email\":\"john@example.com\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("John"));
}
```

## Testing Repositories

### Using `@DataJpaTest` for Repository Tests

`@DataJpaTest` provides a lightweight environment for testing JPA repositories. It uses an in-memory database by default, suitable for testing without external dependencies.

```java
@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByEmail() {
        userRepository.save(new User("John", "john@example.com"));
        User user = userRepository.findByEmail("john@example.com");
        assertNotNull(user);
        assertEquals("John", user.getName());
    }
}
```

## Testing with Mocking and Stubbing

### Using Mockito for Mocking

Mockito is integrated into Spring Boot Test. Use `@Mock` or `@MockBean` to mock dependencies and use `@InjectMocks` to inject them into your service.

```java
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testFindUserByEmail() {
        Mockito
            .when(userRepository.findByEmail("john@example.com"))
            .thenReturn(new User("John", "john@example.com"));

        User user = userService.findUserByEmail("john@example.com");
        assertEquals("John", user.getName());
    }
}
```

### Verifying Interactions

Use `Mockito.verify` to check that certain methods were called.

```java
@Test
public void testUserCreation() {
    userService.createUser(new User("John", "john@example.com"));
    Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
}
```

## Testing RestTemplate and External APIs

### Using MockRestServiceServer with RestTemplate

Mock HTTP interactions for tests involving `RestTemplate`.

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiServiceTest {

    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;

    @BeforeEach
    public void setup() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @Test
    public void testApiCall() {
        mockServer
            .expect(requestTo("/api/data"))
            .andRespond(withSuccess("{\"name\":\"John\"}", MediaType.APPLICATION_JSON));

        String response = restTemplate.getForObject("/api/data", String.class);
        assertEquals("{\"name\":\"John\"}", response);
    }
}
```

## Testing Configuration and Profiles

### Using Profiles in Tests

Use `@ActiveProfiles` to specify which profile(s) to activate for your test.

```java
@SpringBootTest
@ActiveProfiles("test")
public class ProfileSpecificTest {
    // Test configuration will apply settings from the `test` profile
}
```

### Testing Configuration Properties

If you want to test specific configuration properties, use `@TestPropertySource`.

```java
@SpringBootTest
@TestPropertySource(properties = { "spring.jpa.hibernate.ddl-auto=create-drop" })
public class CustomPropertiesTest {
    // Custom properties applied to this test
}
```

## Additional Testing Tips

### Transactional Tests with `@Transactional`

Annotate a test class or method with `@Transactional` to roll back changes after each test method.

```java
@SpringBootTest
@Transactional
public class TransactionalTest {
    // All database changes are rolled back after each test method
}
```

### Using TestContainers for Database Testing

Use [TestContainers](https://www.testcontainers.org/) to spin up Docker containers for databases like PostgreSQL or MySQL in your integration tests.

```java
@Container
static PostgreSQLContainer<?> postgresContainer = 
    new PostgreSQLContainer<>("postgres:latest");

@BeforeAll
static void setup() {
    postgresContainer.start();
}

@Test
public void testWithRealDatabase() {
    // Real database interaction with TestContainers
}
```

### Using `@BeforeAll`, `@BeforeEach`, and Other JUnit Annotations

- **@BeforeAll**: Executes once before all tests.
- **@BeforeEach**: Executes before each test.
- **@AfterEach** and **@AfterAll**: Similar to the above but after tests.
