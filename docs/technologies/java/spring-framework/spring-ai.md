---
description: Building AI-powered applications with Spring AI
tags:
  - Spring
  - AI
  - LLM
  - ChatClient
---

# Spring AI

Spring AI provides a Spring-native way of developing AI applications using LLMs (Large Language Models). It abstracts common AI operations and provides a unified API across different AI providers.

## Overview

Spring AI simplifies AI integration by providing:

- **Model Abstraction**: Unified interface for different LLM providers (OpenAI, Anthropic, Azure, Ollama, etc.)
- **ChatClient**: Fluent API for interacting with AI models
- **Prompt Templates**: Dynamic prompt generation with variable substitution
- **Function Calling**: Invoke Java methods from AI models
- **Output Parsing**: Automatic conversion of AI responses to Java objects

## Getting Started

### Add Spring AI Dependency

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    <version>1.x.x</version>
</dependency>
```

### Configuration

Set your API key in `application.properties`:

```properties title="application.properties"
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4
```

## Core Components

### ChatClient

The primary interface for interacting with AI models:

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    private final ChatClient chatClient;

    public AiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateContent(String prompt) {
        return chatClient.prompt()
            .user(prompt)
            .call()
            .content();
    }
}
```

### ChatClient with System Message

```java
public String generateWithContext(String userQuery, String systemContext) {
    return chatClient.prompt()
        .system(systemContext)
        .user(userQuery)
        .call()
        .content();
}
```

## Prompt Templates

### Using Prompt Templates for Dynamic Content

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ChatClient.PromptUserSpec;

@Service
public class TemplateAiService {
    private final ChatClient chatClient;

    public TemplateAiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateProductDescription(String productName, String category) {
        return chatClient.prompt()
            .user(spec -> spec
                .text("Generate a product description for {productName} in the {category} category")
                .param("productName", productName)
                .param("category", category))
            .call()
            .content();
    }
}
```

## Output Parsing

### Parse Response as POJO

```java
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ChatClient.PromptUserSpec;

public record RecipeDetails(String name, String cookTime, List<String> ingredients) {}

@Service
public class RecipeService {
    private final ChatClient chatClient;

    public RecipeService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public RecipeDetails getRecipeDetails(String dishName) {
        return chatClient.prompt()
            .user("Generate recipe for: " + dishName)
            .call()
            .entity(RecipeDetails.class);
    }
}
```

## Function Calling

Enable AI to invoke Java methods:

```java
import java.util.function.Function;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FunctionConfig {

    @Bean
    public Function<GetWeatherRequest, String> getWeather() {
        return request -> "Weather in " + request.location() + ": 72°F";
    }
}

record GetWeatherRequest(String location) {}
```

Use function calling:

```java
@Service
public class WeatherService {
    private final ChatClient chatClient;

    public WeatherService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String getWeatherInfo(String location) {
        return chatClient.prompt()
            .user("What's the weather in " + location)
            .functions("getWeather")
            .call()
            .content();
    }
}
```

## Common Use Cases

### 1. Content Generation

Generate blogs, articles, descriptions, or marketing copy.

```java
public String generateBlogPost(String topic, int wordCount) {
    return chatClient.prompt()
        .system("You are an expert content writer")
        .user("Write a blog post about {topic} in approximately {wordCount} words")
        .call()
        .content();
}
```

### 2. Summarization

Summarize documents, articles, or chat histories.

```java
public String summarizeText(String text) {
    return chatClient.prompt()
        .system("Summarize the following text in 3-4 sentences")
        .user(text)
        .call()
        .content();
}
```

### 3. Q&A System

Build question-answering systems with context awareness.

```java
public String answerQuestion(String context, String question) {
    return chatClient.prompt()
        .system("Answer based on the provided context")
        .user("Context: {context}\n\nQuestion: {question}")
        .call()
        .content();
}
```

### 4. Code Generation/Analysis

Generate or analyze code.

```java
public String generateCode(String requirement) {
    return chatClient.prompt()
        .system("You are an expert Java developer")
        .user("Generate Java code for: " + requirement)
        .call()
        .content();
}
```

## Best Practices

### 1. Use System Messages for Context

Always provide system messages to set the AI's behavior and context:

```java
.system("You are a helpful customer support assistant")
.user(userQuery)
```

### 2. Handle Errors Gracefully

```java
try {
    return chatClient.prompt()
        .user(prompt)
        .call()
        .content();
} catch (Exception e) {
    log.error("AI call failed", e);
    return "Unable to process request. Please try again later.";
}
```

### 3. Implement Token Limits

Monitor and limit token usage to control costs:

```java
spring.ai.openai.chat.options.max-tokens=500
```

### 4. Cache Prompts and Responses

Cache frequently used prompts and responses to improve performance and reduce costs:

```java
@Cacheable(value = "aiResponses", key = "#prompt")
public String getCachedResponse(String prompt) {
    return chatClient.prompt()
        .user(prompt)
        .call()
        .content();
}
```

### 5. Use Structured Output for Consistency

When you need consistent response formats, parse to POJO:

```java
record SentimentAnalysis(String sentiment, double score, String reason) {}

public SentimentAnalysis analyzeSentiment(String text) {
    return chatClient.prompt()
        .user("Analyze sentiment: " + text)
        .call()
        .entity(SentimentAnalysis.class);
}
```

### 6. Implement Logging and Monitoring

```java
@Service
public class MonitoredAiService {
    private static final Logger log = LoggerFactory.getLogger(MonitoredAiService.class);
    private final ChatClient chatClient;

    public String processWithMonitoring(String input) {
        long startTime = System.currentTimeMillis();
        try {
            String result = chatClient.prompt()
                .user(input)
                .call()
                .content();
            
            long duration = System.currentTimeMillis() - startTime;
            log.info("AI call completed in {} ms", duration);
            return result;
        } catch (Exception e) {
            log.error("AI call failed", e);
            throw e;
        }
    }
}
```

## Supported AI Providers

Spring AI supports multiple LLM providers:

- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude
- **Google**: Gemini
- **Azure**: Azure OpenAI
- **Ollama**: Local models
- **HuggingFace**: Open-source models

## Key Dependencies

| Provider | Artifact ID |
|----------|-------------|
| OpenAI | spring-ai-openai-spring-boot-starter |
| Anthropic | spring-ai-anthropic-spring-boot-starter |
| Google | spring-ai-google-generativeai-spring-boot-starter |
| Azure | spring-ai-azure-openai-spring-boot-starter |
| Ollama | spring-ai-ollama-spring-boot-starter |

## Related Spring Projects

- **Spring Boot**: Foundation for building applications
- **Spring Web**: RESTful API endpoints
- **Spring Data**: Database access
- **Spring Security**: Authentication and authorization

## Resources

- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
