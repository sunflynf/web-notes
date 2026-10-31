---
description: Spring Security with spring-boot-starter-security - SecurityFilterChain configuration, authentication, authorization, CORS/CSRF, sessions and testing
---

# Spring Security

## Getting Started

**Add Spring Security Dependency**

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Spring Security will automatically add basic authentication to all endpoints once this dependency is added.

## Understanding Key Components

- **Authentication**: Verifies the user's identity.
- **Authorization**: Determines if an authenticated user has permission to perform specific actions.
- **Principal**: Represents the current authenticated user in the application.
- **Roles & Authorities**: Roles are high-level groupings of authorities (permissions) that define access levels.

## Configuring Authentication

You can use multiple methods for authentication in Spring Security:

### In-Memory Authentication (for Prototyping or Testing)

Configure in-memory authentication with specific users and roles.

:::note

`WebSecurityConfigurerAdapter` was removed in Spring Security 6 (Spring Boot 3+). Configuration is now done by declaring beans such as `SecurityFilterChain` and `UserDetailsService`, using the lambda DSL.

:::

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user").password("{noop}password").roles("USER").build();
        UserDetails admin = User.withUsername("admin").password("{noop}admin").roles("ADMIN").build();
        return new InMemoryUserDetailsManager(user, admin);
    }
}
```

:::info

`{noop}` is a password encoder that tells Spring Security to expect plain text. Use other password encoders like `BCryptPasswordEncoder` in production.

:::

### Database Authentication

For production, authenticate users from a database.

1. **Define a UserDetailsService implementation** that fetches user details from the database.
2. **Use a Password Encoder** for storing hashed passwords.

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### JWT Authentication

To use JWT tokens for authentication:

1. Create a login endpoint that generates a JWT upon successful authentication.
2. Configure a `JWTAuthenticationFilter` to validate tokens on each request, or use `spring-boot-starter-oauth2-resource-server` with `http.oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))` to validate JWTs without a custom filter.

## Authorization: Configuring Access Control

Authorization configurations control access to resources based on roles or permissions.

### Role-Based Access Control

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
            .requestMatchers("/public/**").permitAll()
            .anyRequest().authenticated())
        .formLogin(Customizer.withDefaults());
    return http.build();
}
```

### Method-Level Authorization

Use annotations to restrict access at the method level:

- `@PreAuthorize` – To check access before method execution.
- `@Secured` – Specify roles required to access the method.

```java
@PreAuthorize("hasRole('ADMIN')")
public void someAdminMethod() {
    // Method logic
}
```

Enable method-level security with:

```java
@Configuration
@EnableMethodSecurity // replaces @EnableGlobalMethodSecurity; prePostEnabled is on by default
public class MethodSecurityConfig {
}
```

## Handling CORS and CSRF

### CORS (Cross-Origin Resource Sharing)

Enable CORS for REST APIs that might be accessed from a different domain:

```java
// inside your SecurityFilterChain bean
http.cors(Customizer.withDefaults()); // picks up the CorsConfigurationSource bean below

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://allowed-origin.com"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### CSRF (Cross-Site Request Forgery)

By default, CSRF is enabled. You can disable it for stateless APIs (like JWT):

```java
// inside your SecurityFilterChain bean
http.csrf(csrf -> csrf.disable());
```

:::warning

Only disable CSRF if you know it is not needed, such as with stateless REST APIs.
:::

## Session Management

Spring Security manages sessions by default. You can configure session policies to meet your security requirements:

```java
// inside your SecurityFilterChain bean
http.sessionManagement(session -> session
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // For JWT or token-based authentication
```

Options:

- `SessionCreationPolicy.ALWAYS`: Always create a session.
- `SessionCreationPolicy.IF_REQUIRED`: Create a session only if required.
- `SessionCreationPolicy.NEVER`: Never create a session but use one if it exists.
- `SessionCreationPolicy.STATELESS`: Do not store sessions.

## Custom Authentication & Authorization Logic

To add custom authentication:

1. Create an `AuthenticationProvider` to customize user validation.
2. Implement custom filters for additional request checks (e.g., `OncePerRequestFilter`).

## Configuring OAuth2 and Social Login

For OAuth2 authentication:

1. Add the `spring-boot-starter-oauth2-client` dependency.
2. Configure `application.yml` or `application.properties` with your provider settings.

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your-client-id
            client-secret: your-client-secret
            scope: profile, email
```

Spring Boot simplifies this setup with OAuth providers like Google, GitHub, etc.

## Testing Security Configurations

1. **Unit Testing**: Use `@WithMockUser` to simulate users with specific roles for testing.
2. **Integration Testing**: Test endpoints with and without authentication to verify security configurations.

```java
@Test
@WithMockUser(username = "user", roles = {"USER"})
public void whenUserAccessUserPage_thenSuccess() throws Exception {
    mvc.perform(get("/user/page")).andExpect(status().isOk());
}
```

## Best Practices

- **Use Strong Password Encoders**: Always use a secure password encoder like `BCryptPasswordEncoder`.
- **Limit Session and Token Lifespan**: Configure session timeouts or token expiration to reduce attack windows.
- **Enable HTTPS**: Secure communications by configuring HTTPS in production.
- **Restrict Sensitive Endpoints**: Limit access to admin or critical endpoints by roles or permissions.
- **Use Custom Error Handling**: Customize error messages for failed authentications to avoid information disclosure.
