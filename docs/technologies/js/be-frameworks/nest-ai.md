---
description: Building AI-powered applications with NestJS and LLM providers
tags:
  - Backend
  - NestJS
  - AI
  - LLM
  - TypeScript
---

# NestJS with AI Features

NestJS combined with AI libraries enables building intelligent backend systems using Large Language Models (LLMs). This guide covers integration patterns, best practices, and popular packages for AI-powered NestJS applications.

## Overview

Key benefits of using NestJS for AI applications:

- **TypeScript Support**: Type-safe AI integrations with full IDE support
- **Dependency Injection**: Elegant service management for AI clients
- **Middleware & Guards**: Built-in request validation and authentication
- **Decorators**: Powerful abstractions for AI operations
- **Modularity**: Organize AI features into reusable modules

## Core AI Libraries

### Popular LLM Provider SDKs

| Provider | Package | Model Examples |
|----------|---------|-----------------|
| OpenAI | `openai` | GPT-4, GPT-3.5-turbo, GPT-4V |
| Anthropic | `@anthropic-ai/sdk` | Claude 3, Claude Instant |
| Google | `@google/generative-ai` | Gemini Pro, Gemini Vision |
| Azure OpenAI | `@azure/openai` | GPT-4, GPT-3.5 |
| Ollama | `ollama` | Local models (Llama, Mistral, etc.) |
| LangChain | `langchain` | Framework for LLM chains |
| LlamaIndex | `llamaindex` | RAG (Retrieval Augmented Generation) |

## Getting Started

### 1. Install Dependencies

```bash
npm install openai class-validator class-transformer
npm install --save-dev @types/node
```

### 2. Setup Configuration

```typescript title="src/config/ai.config.ts"
import { ConfigModule, ConfigService } from '@nestjs/config';

export const aiConfig = () => ({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
  },
});

export const AiConfigModule = ConfigModule.forRoot({
  load: [aiConfig],
  isGlobal: true,
});
```

```bash title=".env"
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
```

### 3. Create AI Module and Service

```typescript title="src/ai/ai.service.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
  }

  async generateText(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.configService.get<string>('openai.model'),
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content || '';
  }
}
```

```typescript title="src/ai/ai.module.ts"
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';

@Module({
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
```

## Common Patterns

### Pattern 1: Simple Text Generation

```typescript title="src/content/content.service.ts"
import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ContentService {
  constructor(private aiService: AiService) {}

  async generateBlogPost(topic: string): Promise<string> {
    const prompt = `Write a comprehensive blog post about ${topic}. Include an introduction, main points, and conclusion.`;
    return this.aiService.generateText(prompt);
  }

  async summarizeText(text: string): Promise<string> {
    const prompt = `Summarize the following text in 3-4 sentences:\n\n${text}`;
    return this.aiService.generateText(prompt);
  }
}
```

### Pattern 2: System Messages and Context

```typescript title="src/ai/ai.service.ts"
async generateWithContext(
  userMessage: string,
  systemMessage: string,
): Promise<string> {
  const response = await this.openai.chat.completions.create({
    model: this.configService.get<string>('openai.model'),
    messages: [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  return response.choices[0].message.content || '';
}
```

Usage:

```typescript
const result = await this.aiService.generateWithContext(
  'What are the best practices?',
  'You are an expert software architect with 20 years of experience.'
);
```

### Pattern 3: Structured Output with Validation

```typescript title="src/ai/dto/analysis-result.dto.ts"
import { IsString, IsNumber, IsArray } from 'class-validator';

export class SentimentAnalysisDto {
  @IsString()
  sentiment: string;

  @IsNumber()
  score: number;

  @IsArray()
  @IsString({ each: true })
  keyPoints: string[];
}
```

```typescript title="src/ai/ai.service.ts"
async analyzeSentiment(text: string): Promise<SentimentAnalysisDto> {
  const prompt = `Analyze the sentiment of: "${text}"
    Return JSON: { "sentiment": "positive|negative|neutral", "score": 0-1, "keyPoints": [...] }`;

  const response = await this.openai.chat.completions.create({
    model: this.configService.get<string>('openai.model'),
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,
  });

  const content = response.choices[0].message.content || '';
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    sentiment: parsed.sentiment,
    score: parsed.score,
    keyPoints: parsed.keyPoints,
  };
}
```

### Pattern 4: Streaming Responses

```typescript title="src/ai/ai.service.ts"
async *generateTextStream(prompt: string): AsyncGenerator<string> {
  const stream = await this.openai.chat.completions.create({
    model: this.configService.get<string>('openai.model'),
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      yield content;
    }
  }
}
```

```typescript title="src/ai/ai.controller.ts"
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('stream')
  async streamResponse(@Body('prompt') prompt: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    for await (const chunk of this.aiService.generateTextStream(prompt)) {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
    }

    res.end();
  }
}
```

### Pattern 5: RAG (Retrieval Augmented Generation)

```typescript title="src/rag/rag.service.ts"
import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class RagService {
  constructor(private aiService: AiService) {}

  async answerWithContext(question: string, documents: string[]): Promise<string> {
    const context = documents.join('\n\n---\n\n');
    
    const prompt = `Based on the following context, answer the question.
    
Context:
${context}

Question: ${question}

Answer:`;

    return this.aiService.generateWithContext(
      prompt,
      'You are a helpful assistant. Answer based only on the provided context.',
    );
  }
}
```

## Advanced Features

### Vision/Image Analysis

```typescript title="src/ai/ai.service.ts"
async analyzeImage(imageUrl: string, prompt: string): Promise<string> {
  const response = await this.openai.chat.completions.create({
    model: 'gpt-4-vision',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content || '';
}
```

### Function Calling

```typescript title="src/ai/ai.service.ts"
async executeWithTools(
  prompt: string,
  tools: OpenAI.Chat.ChatCompletionTool[],
): Promise<any> {
  const response = await this.openai.chat.completions.create({
    model: this.configService.get<string>('openai.model'),
    messages: [{ role: 'user', content: prompt }],
    tools,
  });

  const toolCall = response.choices[0].message.tool_calls?.[0];
  if (toolCall) {
    return {
      toolName: toolCall.function.name,
      arguments: JSON.parse(toolCall.function.arguments),
    };
  }

  return null;
}
```

### Embeddings & Vector Search

```typescript title="src/embeddings/embeddings.service.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingsService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
```

## Controller & API Examples

```typescript title="src/ai/ai.controller.ts"
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate')
  async generateText(@Body('prompt') prompt: string) {
    const result = await this.aiService.generateText(prompt);
    return { success: true, data: result };
  }

  @Post('analyze')
  async analyzeSentiment(@Body('text') text: string) {
    const result = await this.aiService.analyzeSentiment(text);
    return { success: true, data: result };
  }

  @Get('health')
  async checkHealth() {
    return { status: 'ok', aiService: 'operational' };
  }
}
```

## Best Practices

### 1. Error Handling

```typescript title="src/ai/ai-error.filter.ts"
import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AiErrorFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An error occurred with the AI service';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as any;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### 2. Rate Limiting

```typescript title="src/app.module.ts"
import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10, // 10 requests per minute
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
```

### 3. Logging & Monitoring

```typescript title="src/ai/ai.service.ts"
import { Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateText(prompt: string): Promise<string> {
    const startTime = Date.now();
    
    try {
      this.logger.debug(`Generating text with prompt: ${prompt.substring(0, 50)}...`);
      
      const response = await this.openai.chat.completions.create({
        model: this.configService.get<string>('openai.model'),
        messages: [{ role: 'user', content: prompt }],
      });

      const duration = Date.now() - startTime;
      this.logger.log(`AI request completed in ${duration}ms`);

      return response.choices[0].message.content || '';
    } catch (error) {
      this.logger.error(`AI request failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}
```

### 4. Caching Responses

```typescript title="src/app.module.ts"
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 300000, // 5 minutes
    }),
  ],
})
export class AppModule {}
```

```typescript title="src/ai/ai.service.ts"
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AiService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateText(prompt: string): Promise<string> {
    const cacheKey = `ai:${Buffer.from(prompt).toString('base64')}`;
    const cached = await this.cacheManager.get<string>(cacheKey);

    if (cached) {
      return cached;
    }

    const result = await this.openai.chat.completions.create({
      // ...
    });

    const content = result.choices[0].message.content || '';
    await this.cacheManager.set(cacheKey, content);

    return content;
  }
}
```

### 5. Token Usage Tracking

```typescript title="src/ai/ai.service.ts"
interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

async generateText(prompt: string): Promise<{ content: string; usage: TokenUsage }> {
  const response = await this.openai.chat.completions.create({
    model: this.configService.get<string>('openai.model'),
    messages: [{ role: 'user', content: prompt }],
  });

  return {
    content: response.choices[0].message.content || '',
    usage: {
      promptTokens: response.usage?.prompt_tokens || 0,
      completionTokens: response.usage?.completion_tokens || 0,
      totalTokens: response.usage?.total_tokens || 0,
    },
  };
}
```

### 6. Input Validation

```typescript title="src/ai/dto/generate-text.dto.ts"
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class GenerateTextDto {
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  prompt: string;

  @IsOptional()
  @IsString()
  systemMessage?: string;
}
```

## Integration with Databases

### With TypeORM

```typescript title="src/ai/entities/ai-request.entity.ts"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('ai_requests')
export class AiRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  prompt: string;

  @Column('text')
  response: string;

  @Column('int')
  tokensUsed: number;

  @CreateDateColumn()
  createdAt: Date;
}
```

```typescript title="src/ai/ai.service.ts"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AiService {
  constructor(
    @InjectRepository(AiRequest)
    private aiRequestRepo: Repository<AiRequest>,
  ) {}

  async generateAndLog(prompt: string): Promise<string> {
    const result = await this.openai.chat.completions.create({
      // ...
    });

    const content = result.choices[0].message.content || '';
    
    await this.aiRequestRepo.save({
      prompt,
      response: content,
      tokensUsed: result.usage?.total_tokens || 0,
    });

    return content;
  }
}
```

## Testing AI Services

```typescript title="src/ai/ai.service.spec.ts"
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              const config = { 'openai.apiKey': 'test-key', 'openai.model': 'gpt-4' };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should generate text', async () => {
    const result = await service.generateText('Hello');
    expect(result).toBeDefined();
  });
});
```

## Resources

- [NestJS Official Documentation](https://docs.nestjs.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [LangChain.js Documentation](https://js.langchain.com/)
- [LlamaIndex TypeScript](https://ts.llamaindex.ai/)
