# Authentication Flows

## Traditional JWT (Stateless)

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Client_App as "Client App"
    participant Auth_Server as "Auth Server"
    participant Resource_Server as "Resource Server"

    User->>Client_App: Log in (username/password)
    Client_App->>Auth_Server: Send login credentials
    Auth_Server-->>Client_App: Return JWT
    Client_App->>Resource_Server: Send JWT in Authorization Header
    Resource_Server-->>Client_App: Return protected data
```

:::info Note

The **Auth Server does not maintain session state**. The JWT is signed, allowing the Resource Server to verify its integrity and authenticity **without database queries**.

:::

**Best Practices:**

* Always sign JWTs using strong algorithms like RS256 or HS256.
* Set an expiration (`exp`) and consider adding `iat` and `nbf` claims.
* Avoid putting sensitive user data directly inside JWT.

---

## OAuth 2.0

### Authorization Code Flow with Refresh Token

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant Client_App as "Client App"
    participant Auth_Server as "Auth Server"
    participant Resource_Server as "Resource Server"

    User->>Client_App: Access application
    Client_App->>User: Redirect to Auth Server
    User->>Auth_Server: Login + Grant Permission
    Auth_Server-->>User: Redirect back with Authorization Code
    User->>Client_App: Return authorization code
    Client_App->>Auth_Server: Exchange code + client_secret
    Auth_Server-->>Client_App: Return Access Token + Refresh Token
    Client_App->>Resource_Server: Send Access Token
    Resource_Server-->>Client_App: Return protected data

    Note over Client_App,Auth_Server: Token expires after 1 hour...
    Client_App->>Auth_Server: Send Refresh Token
    Auth_Server-->>Client_App: Return new Access Token
```

:::info Note

The **Refresh Token** enables obtaining a new access token without requiring the user to log in again.

:::

**Best Practices:**

* Store refresh tokens securely (e.g., in an HTTP-only, secure cookie).
* Set proper scopes during authorization.
* Rotate refresh tokens (RFC 6749 best practice).
* Implement PKCE (Proof Key for Code Exchange) for public clients (especially SPAs and mobile apps).

---

## Invalid / Revoked Tokens

```mermaid
sequenceDiagram
    autonumber
    participant Client_App as "Client App"
    participant Resource_Server as "Resource Server"
    participant Auth_Server as "Auth Server"

    Client_App->>Resource_Server: Send Access Token
    Resource_Server->>Auth_Server: Validate token
    Auth_Server-->>Resource_Server: Token expired or revoked
    Resource_Server-->>Client_App: 401 Unauthorized

    Note over Client_App,Auth_Server: (If Refresh Token available)
    Client_App->>Auth_Server: Send Refresh Token
    alt Valid Refresh Token
        Auth_Server-->>Client_App: Return new Access Token
    else Revoked or expired Refresh Token
        Auth_Server-->>Client_App: 403 Forbidden - Require re-login
    end
```

:::info Note

**Invalid or expired tokens** are rejected by the Resource Server. The app may use a Refresh Token to re-authenticate. If that fails, the user must log in again.

:::

**Enhancements:**

* Maintain a token blacklist (if using JWT statelessly) or a centralized introspection endpoint.
* Log token usage to detect anomalies (e.g., token replay).

---

## Quick Summary

| Flow                               | Advantages                | Disadvantages                               |
| ---------------------------------- | ------------------------- | ------------------------------------------- |
| **Traditional JWT**                | Fast, no DB lookup needed | Cannot revoke tokens early                  |
| **OAuth 2.0 + Refresh Token**      | Secure session management | More complex, requires secure token storage |
| **Revoked/Expired Token Handling** | Crucial for security      | Requires token introspection or blacklist   |

---

## Additional Concepts

### 1. Token Types

* **Access Token**: Short-lived; used to access protected APIs.
* **Refresh Token**: Long-lived; used to renew access tokens.
* **ID Token** (OpenID Connect): Contains user identity information (e.g., email, name).

### 2. Token Storage Strategies

| Client Type     | Access Token Storage      | Refresh Token Storage     |
| --------------- | ------------------------- | ------------------------- |
| Web (SPA)       | Memory (ephemeral)        | Secure HTTP-only cookies  |
| Mobile (native) | Secure Storage (Keychain) | Secure Storage (Keychain) |
| Backend         | Server-side session store | Encrypted DB or in-memory |

### 3. OpenID Connect (OIDC)

An identity layer on top of OAuth 2.0, OIDC provides authentication in addition to authorization. Commonly used for:

* Social login (Google, Facebook, etc.)
* SSO (Single Sign-On)
* Identity Federation
