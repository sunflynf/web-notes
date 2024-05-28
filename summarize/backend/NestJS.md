#### **Core Concepts**
- **Controller**: Handles incoming requests and returns responses.
- **Service**: Business logic layer; reusable across the application.
- **Module**: Groups related controllers and providers.
- **Provider**: Any class annotated with `@Injectable()` for dependency injection.

#### **Basic Commands**
- **Installation**: `npm install -g @nestjs/cli`
- **Create Project**: `nest new project-name`
- **Run Application**: `npm run start`

#### **Application Structure**
```plaintext
src/
  ├── app.controller.ts
  ├── app.controller.spec.ts
  ├── app.module.ts
  ├── app.service.ts
  ├── main.ts
```

#### **Controller**
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'This action returns all items';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns item #${id}`;
  }

  @Post()
  create(@Body() createItemDto: any): string {
    return 'This action adds a new item';
  }
}
```

#### **Service**
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  findAll(): string {
    return 'This action returns all items';
  }

  findOne(id: string): string {
    return `This action returns item #${id}`;
  }

  create(createItemDto: any): string {
    return 'This action adds a new item';
  }
}
```

#### **Module**
```typescript
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
```

#### **Main Entry File**
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

#### **DTO (Data Transfer Object)**
```typescript
export class CreateItemDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
}
```

#### **Pipes**
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

#### **Middleware**
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

#### **Interceptors**
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```

#### **Guards**
```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

#### **Decorators**
- **Custom Decorator**
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

#### **Testing**
- **Unit Test**
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

More detail: [NestJS documentation](https://docs.nestjs.com/).
