---
description: Backend Frameworks support REST APIs.
tags:
  - Backend
  - Java
  - Kotlin
  - XML
  - Spring
  - REST APIs
---

# Spring

```mermaid
flowchart LR
    subgraph Core concepts
        Controller <-->|DTO| Service(["`Service
        *Optional*`"])
        Service <-->|Model| Repository
        Controller <-->|Model| Repository
        Repository <--> Entity
    end
    Entity <--> Database[(Database)]
    Controller --> |Templates| View(["`**View**
    *Mustache*,
    *Thymleaf*, ...
    `"])
    %% Add-ons
    SpringData("`**Spring data**
     JDBC, JPA
     MongoDB,
     Redis, ...
    `") -.->|@Table| Repository
    Validation -.->|@Rule| Entity
    Security(Security) -.->|Filter Chain| Controller
    Swagger(Swagger) -.->|@Annotation| Controller
    HOAS -.->|jackson| Controller
    Actuator(Actuator) -.->|health| Controller
    subgraph Testing
        %% Testing
        JUnit([JUnit]) --> Repository
        JUnit --> Service
        Mockito --> Repository
        Mockito([Mockito]) -->|Inject mocks| Service
        MockMvc([MockMvc]) --> Controller
    end
    %% Cloud
    %% AI
    %% LDAP
```
