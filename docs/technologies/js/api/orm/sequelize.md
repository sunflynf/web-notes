---
description: A promise-based ORM
tags:
    - JavaScript
    - TypeScript
---

# Sequelize

## 1. Project Setup

Initialize a Node.js project and install dependencies.

```bash
# Install main packages
npm install typescript ts-node @types/node --save-dev

# Create tsconfig.ts
npx tsc --init

# For specific databases:
npm install sqlite3  # SQLite
npm install pg pg-hstore  # PostgreSQL
npm install mysql2  # MySQL

# Express
npm install express sequelize

# Nest
npm install @nestjs/config reflect-metadata rxjs @nestjs/sequelize sequelize-typescript 
```

## 2. Sequelize Configuration

### Database Connection

```typescript title="src/config/database.ts"
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'sqlite', // or 'postgres', 'mysql'
  storage: './database.sqlite', // SQLite only
  // For PostgreSQL/MySQL:
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  models: [__dirname + '/../**/*.model.ts'], // Load all models
});

// Test connection
async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ force: true }); // Use migrations in production
  } catch (error) {
    console.error('Connection error:', error);
  }
}

connect();
```

## 3. Define Models

```typescript title="src/models/user.model.ts"
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string;
}
```

## 4. Using Sequelize with Express

### Setup Express

```typescript title="src/index.ts"
import express from 'express';
import { sequelize } from './config/database';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

### Routes

```typescript title="src/routes/user.routes.ts"
import { Router } from 'express';
import { User } from '../models/user.model';

const router = Router();

// Create user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default router;
```

## 5. Using Sequelize with NestJS

### Setup NestJS

### Configure Sequelize

```typescript title="src/app.module.ts"
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './database.sqlite',
      models: [User],
      autoLoadModels: true,
      synchronize: true, // Use migrations in production
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

### Create Users Module

```bash title="Generate a module, service, and controller"
npx @nestjs/cli generate module users
npx @nestjs/cli generate service users
npx @nestjs/cli generate controller users
```

```typescript title="src/users/users.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: { firstName: string; lastName?: string }) {
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.findAll();
  }
}
```

```typescript title="src/users/users.controller.ts"
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: { firstName: string; lastName?: string }) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

## 6. Best Practices

- **Migrations**: Use `sequelize-cli` for production schema changes:

  ```bash
  npm install sequelize-cli
  npx sequelize-cli init
  ```

- **Validation**: Use DTOs (NestJS) or middleware (Express) for input validation.
- **Error Handling**: Implement global error handlers.
- **TypeScript**: Leverage `sequelize-typescript` for type safety.
- **Security**: Store credentials in `.env` and use prepared statements.

## Recommend for setup Sequelize

- Use Plain Sequelize (`extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes`)
  - You’re working in a project with existing plain Sequelize code.
  - You want minimal dependencies or prefer explicit schema definitions.
  - You’re using **Express** and *don’t need NestJS’s dependency injection*.
- Use `sequelize-typescript`
  - You’re building a **TypeScript-first** project, especially with **NestJS**.
  - You prefer concise, decorator-based syntax.
  - You want better integration with TypeScript’s type system and frameworks.

## References

- [Official Document - Sequelize](https://sequelize.org/)
- [Official Document - NestJS Sequelize](https://docs.nestjs.com/recipes/sql-sequelize)
