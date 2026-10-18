const appData = {
  navigation: [
    { id: "welcome", title: "Chào mừng" },
    {
      id: "core",
      title: "Khái niệm Cốt lõi",
      sub: [
        { id: "modules", title: "Modules" },
        { id: "controllers", title: "Controllers" },
        { id: "providers", title: "Providers & Services" },
        { id: "di", title: "Dependency Injection" },
        { id: "lifecycle", title: "Vòng đời Yêu cầu" },
        { id: "validation", title: "Validation (DTOs)" },
      ],
    },
    { id: "packages", title: "Các Gói Phổ biến" },
    {
      id: "advanced",
      title: "Chủ đề Nâng cao",
      sub: [
        { id: "microservices", title: "Microservices" },
        { id: "websockets", title: "WebSockets" },
      ],
    },
    { id: "security", title: "Bảo mật" },
  ],
  content: {
    welcome: {
      title: "Chào mừng đến với Hướng dẫn Tương tác về NestJS",
      intro:
        "Tài liệu này được thiết kế để giúp bạn khám phá và hiểu sâu hơn về framework NestJS. Thay vì một tài liệu văn bản dài, bạn có thể điều hướng qua các chủ đề, xem các ví dụ mã và tương tác với các sơ đồ để nắm bắt các khái niệm một cách trực quan. Hãy chọn một chủ đề từ thanh điều hướng bên trái để bắt đầu.",
    },
    core: {
      modules: {
        title: "Modules: Tổ chức Mã nguồn",
        intro:
          "Modules là nền tảng của kiến trúc ứng dụng NestJS. Chúng giúp đóng gói các thành phần liên quan như controllers và providers, tạo ra một cấu trúc có tổ chức và dễ quản lý. Mỗi ứng dụng có ít nhất một module gốc (root module).",
        details: `
                            <p class="mb-4">Decorator <code>@Module()</code> nhận một đối tượng metadata để định nghĩa module:</p>
                            <ul class="list-disc list-inside space-y-2 mb-4">
                                <li><strong>imports:</strong> Danh sách các module khác mà module này cần.</li>
                                <li><strong>controllers:</strong> Danh sách các controller thuộc module này.</li>
                                <li><strong>providers:</strong> Danh sách các provider (thường là services) sẽ được Nest injector khởi tạo.</li>
                                <li><strong>exports:</strong> Các provider mà module này cung cấp cho các module khác.</li>
                            </ul>
                            <p>NestJS cũng hỗ trợ các loại module chuyên biệt như <strong>Feature Modules</strong> (cho các tính năng cụ thể), <strong>Shared Modules</strong> (tái sử dụng providers), <strong>Global Modules</strong>, và <strong>Dynamic Modules</strong> (cấu hình động).</p>
                        `,
        code: `
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [], // ví dụ: DatabaseModule
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Chia sẻ UsersService cho các module khác
})
export class UsersModule {}`,
      },
      controllers: {
        title: "Controllers: Xử lý Yêu cầu",
        intro:
          "Controllers chịu trách nhiệm xử lý các yêu cầu HTTP đến và trả về phản hồi. Chúng được nhóm lại với nhau một cách hợp lý và được đánh dấu bằng decorator <code>@Controller()</code>, có thể nhận một tiền tố đường dẫn.",
        details: `
                            <p class="mb-4">Các decorator phương thức HTTP được sử dụng để liên kết các phương thức controller với các yêu cầu cụ thể:</p>
                            <ul class="list-disc list-inside space-y-2 mb-4">
                                <li><code>@Get()</code>, <code>@Post()</code>, <code>@Put()</code>, <code>@Delete()</code>, <code>@Patch()</code></li>
                            </ul>
                            <p class="mb-4">NestJS cung cấp các decorator tiện lợi để truy cập vào các phần của request:</p>
                            <ul class="list-disc list-inside space-y-2">
                                <li><code>@Param('id')</code>: Tham số đường dẫn (ví dụ: /users/:id)</li>
                                <li><code>@Query('role')</code>: Tham số truy vấn (ví dụ: /users?role=admin)</li>
                                <li><code>@Body()</code>: Toàn bộ nội dung request body</li>
                                <li><code>@Req()</code>, <code>@Res()</code>: Truy cập đối tượng request/response gốc.</li>
                            </ul>
                        `,
        code: `
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}`,
      },
      providers: {
        title: "Providers & Services: Logic Nghiệp vụ",
        intro:
          "Providers là một khái niệm cơ bản trong NestJS. Hầu hết chúng là các services, được thiết kế để đóng gói logic nghiệp vụ, giữ cho controllers gọn gàng. Providers được đánh dấu bằng <code>@Injectable()</code> và có thể được inject vào các thành phần khác thông qua Dependency Injection.",
        details: `
                            <p class="mb-4">Services là nơi logic nghiệp vụ phức tạp, các tương tác với cơ sở dữ liệu, hoặc các lệnh gọi API bên ngoài được thực hiện. Việc tách logic này ra khỏi controllers giúp:</p>
                            <ul class="list-disc list-inside space-y-2 mb-4">
                                <li><strong>Tăng khả năng tái sử dụng:</strong> Một service có thể được inject vào nhiều controllers.</li>
                                <li><strong>Cải thiện khả năng kiểm thử:</strong> Dễ dàng viết unit test cho các service một cách độc lập.</li>
                                <li><strong>Tuân thủ nguyên tắc Single Responsibility:</strong> Controllers chỉ xử lý luồng HTTP, services xử lý logic nghiệp vụ.</li>
                            </ul>
                        `,
        code: `
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}`,
      },
      di: {
        title: "Dependency Injection (DI)",
        intro:
          "Dependency Injection (DI) là một mẫu thiết kế cốt lõi trong NestJS. Nó cho phép các lớp yêu cầu các phụ thuộc từ bên ngoài thay vì tự tạo ra chúng. NestJS quản lý việc tạo và 'inject' các phụ thuộc này, giúp mã nguồn trở nên linh hoạt, tách rời và dễ kiểm thử hơn.",
        details: `
                            <p class="mb-4">Trong NestJS, DI thường được thực hiện thông qua constructor. Khi một lớp (ví dụ: Controller) khai báo một provider (ví dụ: Service) trong constructor của nó, NestJS IoC container sẽ tự động giải quyết và cung cấp một instance của provider đó.</p>
                            <p class="mb-4"><strong>Phạm vi (Scopes) của Provider:</strong></p>
                            <ul class="list-disc list-inside space-y-2">
                                <li><strong>Singleton (mặc định):</strong> Một instance duy nhất được chia sẻ trên toàn bộ ứng dụng.</li>
                                <li><strong>Request-scoped:</strong> Một instance mới cho mỗi yêu cầu đến.</li>
                                <li><strong>Transient:</strong> Một instance mới mỗi khi nó được inject.</li>
                            </ul>
                        `,
        code: `
// users.controller.ts
// NestJS sẽ tự động inject một instance của UsersService
// vào constructor của UsersController.
constructor(private readonly usersService: UsersService) {}
`,
      },
      lifecycle: {
        title: "Vòng đời Yêu cầu (Request Lifecycle)",
        intro:
          "Hiểu được thứ tự các thành phần được thực thi trong một yêu cầu HTTP là rất quan trọng. Sơ đồ dưới đây minh họa luồng xử lý từ khi client gửi yêu cầu đến khi nhận được phản hồi. <strong>Nhấp vào từng bước để xem chi tiết.</strong>",
        interactiveElement: "lifecycleDiagram",
      },
      validation: {
        title: "Validation với DTOs, class-validator & class-transformer",
        intro:
          "Xác thực dữ liệu đầu vào là một phần thiết yếu của bất kỳ ứng dụng nào. NestJS cung cấp một <code>ValidationPipe</code> mạnh mẽ, tích hợp liền mạch với các thư viện <code>class-validator</code> và <code>class-transformer</code> để cung cấp một cách xác thực dựa trên decorator.",
        details: `
                            <p class="mb-4"><strong>Data Transfer Objects (DTOs)</strong> là các lớp TypeScript định nghĩa cấu trúc dữ liệu được truyền qua mạng. Bằng cách sử dụng các decorator từ <code>class-validator</code> trong các DTO, chúng ta có thể khai báo các quy tắc xác thực một cách rõ ràng.</p>
                            <p class="mb-4">Khi một <code>ValidationPipe</code> toàn cục được kích hoạt với tùy chọn <code>transform: true</code>, nó sẽ:</p>
                            <ul class="list-disc list-inside space-y-2">
                                <li>Tự động xác thực các request body, query params, và path params dựa trên DTO của chúng.</li>
                                <li>Chuyển đổi payload thuần (plain JavaScript object) thành một instance đã được định kiểu của lớp DTO.</li>
                                <li>Loại bỏ các thuộc tính không mong muốn (whitelisting).</li>
                                <li>Ném ra một <code>BadRequestException</code> với các thông báo lỗi chi tiết nếu xác thực thất bại.</li>
                            </ul>
                        `,
        code: `
// create-post.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

// posts.controller.ts
@Post()
create(@Body() createPostDto: CreatePostDto) {
  // createPostDto ở đây đã được xác thực và là một instance của CreatePostDto
  return this.postsService.create(createPostDto);
}

// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
`,
      },
    },
    packages: {
      title: "Các Gói Phổ biến và Tích hợp",
      intro:
        "Hệ sinh thái NestJS được làm phong phú bởi nhiều gói thư viện giúp giải quyết các vấn đề phổ biến. Dưới đây là danh sách một số gói quan trọng nhất, cùng với mục đích và cách tích hợp cơ bản của chúng. Nhấp vào một thẻ để xem ví dụ mã.",
      items: [
        {
          id: "config",
          name: "@nestjs/config",
          purpose: "Quản lý cấu hình ứng dụng linh hoạt, thường qua file .env.",
        },
        {
          id: "typeorm",
          name: "@nestjs/typeorm",
          purpose: "Tích hợp TypeORM để làm việc với cơ sở dữ liệu quan hệ.",
        },
        {
          id: "mongoose",
          name: "@nestjs/mongoose",
          purpose: "Tích hợp Mongoose để làm việc với MongoDB.",
        },
        {
          id: "swagger",
          name: "@nestjs/swagger",
          purpose: "Tự động tạo tài liệu API theo chuẩn OpenAPI (Swagger).",
        },
        {
          id: "passport",
          name: "@nestjs/passport",
          purpose:
            "Tích hợp Passport.js để triển khai các chiến lược xác thực.",
        },
        {
          id: "jwt",
          name: "@nestjs/jwt",
          purpose:
            "Cung cấp các tiện ích để làm việc với JSON Web Tokens (JWT).",
        },
        {
          id: "axios",
          name: "@nestjs/axios",
          purpose: "Thực hiện các yêu cầu HTTP đến các dịch vụ khác.",
        },
        {
          id: "throttler",
          name: "@nestjs/throttler",
          purpose: "Triển khai rate limiting để bảo vệ API.",
        },
      ],
      codeSamples: {
        config: `// app.module.ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}

// any.service.ts
constructor(private configService: ConfigService) {
  const dbHost = this.configService.get<string>('DATABASE_HOST');
}`,
        typeorm: `// app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(...)],
})
export class AppModule {}
                        
// users.module.ts
imports: [TypeOrmModule.forFeature([User])],

// users.service.ts
constructor(
  @InjectRepository(User)
  private usersRepository: Repository<User>,
) {}`,
        mongoose: `// app.module.ts
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}

// cats.module.ts
imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],

// cats.service.ts
constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}`,
        swagger: `// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('API')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);`,
        passport: `// auth.module.ts
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

// protected.controller.ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}`,
        jwt: `// auth.module.ts
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}

// auth.service.ts
constructor(private jwtService: JwtService) {}
async login(user: any) {
  const payload = { username: user.username, sub: user.userId };
  return {
    access_token: this.jwtService.sign(payload),
  };
}`,
        axios: `// some.module.ts
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [SomeService]
})
export class SomeModule {}

// some.service.ts
constructor(private readonly httpService: HttpService) {}
fetchData() {
  return this.httpService.get('https://api.example.com/data');
}`,
        throttler: `// app.module.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}`,
      },
    },
    advanced: {
      microservices: {
        title: "Kiến trúc Microservices",
        intro:
          "NestJS cung cấp sự hỗ trợ mạnh mẽ để xây dựng các ứng dụng dựa trên kiến trúc microservices. Nó trừu tượng hóa nhiều chi tiết phức tạp của giao tiếp liên dịch vụ, cho phép các nhà phát triển tập trung vào logic nghiệp vụ.",
        tabs: [
          {
            id: "communication",
            title: "Chiến lược Giao tiếp",
            content: `
                                    <p class="mb-4">Việc chọn phương thức giao tiếp phù hợp là rất quan trọng. NestJS hỗ trợ cả hai mô hình chính:</p>
                                    <ul class="list-disc list-inside space-y-2 mb-4">
                                        <li><strong>Đồng bộ (Request-Response):</strong> Phù hợp cho các tương tác cần phản hồi ngay lập tức. Các công nghệ phổ biến bao gồm <strong>REST API</strong> và <strong>gRPC</strong> (hiệu suất cao, dựa trên RPC).</li>
                                        <li><strong>Bất đồng bộ (Event-Based):</strong> Phù hợp để tách rời các dịch vụ và xử lý các luồng công việc không cần phản hồi ngay. Điều này thường được thực hiện thông qua các message broker như <strong>Kafka</strong>, <strong>RabbitMQ</strong>, hoặc <strong>NATS</strong>.</li>
                                    </ul>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">So sánh gRPC và Kafka</h4>
                                    <div class="overflow-x-auto">
                                        <table class="w-full text-left border-collapse">
                                            <thead>
                                                <tr>
                                                    <th class="border-b-2 p-2 bg-slate-100">Tính năng</th>
                                                    <th class="border-b-2 p-2 bg-slate-100">gRPC</th>
                                                    <th class="border-b-2 p-2 bg-slate-100">Kafka</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="border-b"><td class="p-2 font-medium">Kiểu giao tiếp</td><td class="p-2">Đồng bộ (RPC) / Streaming hai chiều</td><td class="p-2">Bất đồng bộ (Pub/Sub)</td></tr>
                                                <tr class="border-b bg-slate-50"><td class="p-2 font-medium">Độ trễ</td><td class="p-2">Rất thấp</td><td class="p-2">Thấp đến trung bình</td></tr>
                                                <tr class="border-b"><td class="p-2 font-medium">Độ tin cậy</td><td class="p-2">Cần logic retry ở tầng ứng dụng</td><td class="p-2">Cao, tin nhắn được lưu trữ bền vững</td></tr>
                                                <tr class="border-b bg-slate-50"><td class="p-2 font-medium">Trường hợp sử dụng</td><td class="p-2">Giao tiếp nội bộ, yêu cầu độ trễ cực thấp</td><td class="p-2">Kiến trúc hướng sự kiện, data pipelines</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                `,
          },
          {
            id: "db",
            title: "Mẫu Thiết kế CSDL",
            content: `
                                    <p class="mb-4">Một trong những mẫu thiết kế phổ biến và được khuyến khích nhất trong kiến trúc microservices là <strong>Database-per-Service</strong>.</p>
                                    <p class="mb-4">Theo mẫu này, mỗi microservice sở hữu và quản lý cơ sở dữ liệu riêng của mình. Điều này có nghĩa là các dịch vụ khác không thể truy cập trực tiếp vào cơ sở dữ liệu đó. Thay vào đó, chúng phải giao tiếp thông qua API của dịch vụ sở hữu.</p>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">Ưu điểm:</h4>
                                    <ul class="list-disc list-inside space-y-2 mb-4">
                                        <li><strong>Ghép nối lỏng (Loose Coupling):</strong> Các dịch vụ hoàn toàn độc lập với nhau về mặt dữ liệu.</li>
                                        <li><strong>Linh hoạt về công nghệ:</strong> Mỗi dịch vụ có thể chọn loại cơ sở dữ liệu phù hợp nhất (ví dụ: SQL cho dịch vụ giao dịch, NoSQL cho dịch vụ hồ sơ người dùng).</li>
                                        <li><strong>Khả năng mở rộng độc lập:</strong> Schema và hiệu suất của cơ sở dữ liệu có thể được tối ưu hóa cho từng dịch vụ.</li>
                                    </ul>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">Thách thức:</h4>
                                    <p>Mẫu này cũng mang lại những thách thức như quản lý các <strong>giao dịch phân tán</strong> và đảm bảo <strong>tính nhất quán dữ liệu</strong> trên toàn hệ thống, đòi hỏi phải sử dụng các mẫu nâng cao như <strong>Saga Pattern</strong> hoặc <strong>Event Sourcing</strong>.</p>
                                `,
          },
          {
            id: "scaling",
            title: "Mở rộng và Logging",
            content: `
                                    <h4 class="text-lg font-semibold mb-2">Mở rộng (Scaling)</h4>
                                    <p class="mb-4">Khả năng mở rộng là một lợi ích chính của microservices. NestJS rất phù hợp với các nền tảng container như Docker và Kubernetes.</p>
                                    <div class="chart-container my-4">
                                        <canvas id="scalingChart"></canvas>
                                    </div>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">Logging và Monitoring Tập trung</h4>
                                    <p class="mb-4">Trong một môi trường phân tán, việc gỡ lỗi trở nên phức tạp. Do đó, một hệ thống logging tập trung là bắt buộc. Các giải pháp phổ biến bao gồm <strong>ELK Stack</strong> (Elasticsearch, Logstash, Kibana) hoặc <strong>Grafana Loki</strong>.</p>
                                    <p>Một khái niệm quan trọng là <strong>Correlation ID (hoặc Trace ID)</strong>. Đây là một ID duy nhất được tạo ra ở điểm vào của hệ thống và được truyền qua tất cả các lệnh gọi dịch vụ tiếp theo. Việc ghi lại ID này trong mọi log message cho phép theo dõi một yêu cầu duy nhất trên toàn bộ hành trình của nó qua các microservices.</p>
                                `,
          },
          {
            id: "challenges",
            title: "Thách thức & Giải pháp",
            content: `
                                    <p class="mb-4">Kiến trúc microservices giải quyết nhiều vấn đề nhưng cũng tạo ra những thách thức mới. Dưới đây là một số vấn đề thường gặp và các mẫu giải pháp tương ứng.</p>
                                    <div id="ms-challenges-accordion" class="space-y-2"></div>
                                `,
          },
        ],
        challenges: [
          {
            title: "Thử thách: Giao dịch Phân tán",
            content:
              "Làm thế nào để đảm bảo tính nhất quán khi một hoạt động nghiệp vụ trải dài trên nhiều dịch vụ? Ví dụ: tạo đơn hàng bao gồm việc giảm tồn kho (dịch vụ sản phẩm) và xử lý thanh toán (dịch vụ thanh toán).<br/><br/><strong>Giải pháp: Saga Pattern.</strong> Thay vì một giao dịch ACID lớn, Saga chia hoạt động thành một chuỗi các giao dịch cục bộ. Mỗi giao dịch cục bộ cập nhật cơ sở dữ liệu trong một dịch vụ duy nhất và xuất bản một sự kiện để kích hoạt giao dịch tiếp theo. Nếu một bước thất bại, Saga sẽ thực thi các giao dịch bù để hoàn tác các bước đã hoàn thành trước đó.",
          },
          {
            title: "Thử thách: Truy vấn Liên Dịch vụ",
            content:
              "Làm thế nào để lấy dữ liệu cần thiết từ nhiều dịch vụ khi không thể thực hiện JOIN trên các cơ sở dữ liệu?<br/><br/><strong>Giải pháp 1: API Composition.</strong> Một dịch vụ tổng hợp (aggregator) hoặc API Gateway sẽ gọi API của nhiều dịch vụ khác và kết hợp kết quả trước khi trả về cho client.<br/><strong>Giải pháp 2: CQRS (Command Query Responsibility Segregation).</strong> Tách biệt các mô hình cho việc ghi (commands) và đọc (queries). Mô hình đọc có thể duy trì một view được denormalize, được tối ưu hóa cho các truy vấn, bằng cách lắng nghe các sự kiện từ nhiều dịch vụ.",
          },
          {
            title: "Thử thách: Khả năng Phục hồi (Resilience)",
            content:
              "Hệ thống sẽ phản ứng như thế nào nếu một dịch vụ quan trọng không khả dụng?<br/><br/><strong>Giải pháp: Circuit Breaker Pattern.</strong> Mẫu này hoạt động như một proxy cho các lệnh gọi đến một dịch vụ. Nếu dịch vụ đó bắt đầu thất bại liên tục, circuit breaker sẽ 'mở', làm cho các lệnh gọi tiếp theo thất bại ngay lập tức mà không cần chờ timeout. Sau một khoảng thời gian, nó sẽ chuyển sang trạng thái 'nửa mở' để thử lại một vài lệnh gọi. Nếu thành công, nó sẽ 'đóng' lại và cho phép lưu lượng truy cập bình thường.",
          },
        ],
      },
      websockets: {
        title: "WebSockets: Ứng dụng Real-Time",
        intro:
          "NestJS cung cấp một module <code>@nestjs/websockets</code> mạnh mẽ để xây dựng các ứng dụng real-time. Nó tích hợp với các thư viện phổ biến như <strong>Socket.IO</strong> và <strong>ws</strong>, cung cấp một bộ công cụ khai báo để xử lý giao tiếp hai chiều.",
        tabs: [
          {
            id: "gateway",
            title: "Gateways & Events",
            content: `
                                    <p class="mb-4">Trong NestJS, các WebSocket server được gọi là <strong>Gateways</strong>. Đây là các lớp được đánh dấu bằng decorator <code>@WebSocketGateway()</code>. Chúng có thể xử lý các sự kiện trong vòng đời kết nối như <code>OnGatewayConnection</code> và <code>OnGatewayDisconnect</code>.</p>
                                    <p class="mb-4">Để lắng nghe các tin nhắn từ client, chúng ta sử dụng decorator <code>@SubscribeMessage('eventName')</code> trên một phương thức. Decorator <code>@MessageBody()</code> được dùng để trích xuất payload từ tin nhắn.</p>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">Phát (Broadcasting) Sự kiện</h4>
                                    <p>Để gửi tin nhắn đến tất cả các client đã kết nối hoặc một nhóm client cụ thể (trong một 'room'), chúng ta inject instance của server (ví dụ: <code>Server</code> từ Socket.IO) bằng decorator <code>@WebSocketServer()</code> và sử dụng các phương thức của nó như <code>server.emit()</code> hoặc <code>server.to('roomName').emit()</code>.</p>
                                `,
            code: `
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { message: string; room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    // Gửi tin nhắn đến một phòng cụ thể
    this.server.to(data.room).emit('newMessage', { 
      user: client.id, 
      text: data.message 
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    client.emit('joinedRoom', room); // Gửi xác nhận lại cho client
  }
}`,
          },
          {
            id: "ws-security",
            title: "Bảo mật & Thách thức",
            content: `
                                    <h4 class="text-lg font-semibold mb-2">Bảo mật Kênh Real-time</h4>
                                    <p class="mb-4">Bảo mật các kết nối WebSocket là cực kỳ quan trọng. Một cách tiếp cận phổ biến là sử dụng cùng một chiến lược xác thực như API REST, thường là JWT.</p>
                                    <p class="mb-4">Client có thể gửi JWT như một phần của handshake query hoặc trong payload của một sự kiện 'authenticate'. Phía server, một <strong>WebSocket Guard</strong> có thể được tạo để xác minh token này trước khi cho phép kết nối hoặc xử lý các tin nhắn tiếp theo. Guard này có thể trích xuất token, xác thực nó bằng <code>JwtService</code>, và gắn thông tin người dùng vào đối tượng socket để sử dụng sau này.</p>
                                    <h4 class="text-lg font-semibold mb-2 mt-6">Các Vấn đề Thực tế và Giải pháp</h4>
                                    <div id="ws-challenges-accordion" class="space-y-2"></div>
                                `,
          },
        ],
        challenges: [
          {
            title: "Thử thách: Mở rộng (Scaling) và Trạng thái",
            content:
              "Khi mở rộng theo chiều ngang (nhiều instance), làm thế nào để các instance server khác nhau giao tiếp với nhau? Ví dụ, người dùng A kết nối với Server 1, người dùng B kết nối với Server 2. Làm thế nào Server 1 có thể gửi tin nhắn cho người dùng B?<br/><br/><strong>Giải pháp: WebSocket Adapters.</strong> Các thư viện như Socket.IO cung cấp các adapter (ví dụ: <code>socket.io-redis</code>). Adapter này sử dụng một message broker như Redis để phát các sự kiện giữa tất cả các instance của server. Khi Server 1 gọi <code>server.to('room').emit()</code>, adapter sẽ xuất bản tin nhắn đó lên kênh Redis. Tất cả các instance khác (bao gồm Server 2) đang lắng nghe kênh này sẽ nhận được tin nhắn và gửi nó đến các client được kết nối của chúng trong phòng đó.",
          },
          {
            title:
              "Thử thách: Kết nối chết (Dead Connections) và Khả năng phục hồi",
            content:
              "Một kết nối có thể bị ngắt đột ngột do sự cố mạng mà cả client và server đều không nhận ra ngay lập tức, dẫn đến lãng phí tài nguyên.<br/><br/><strong>Giải pháp: Heartbeat (Ping/Pong).</strong> Giao thức WebSocket có một cơ chế ping/pong tích hợp. Socket.IO tự động quản lý điều này. Server định kỳ gửi một gói 'ping' và mong đợi một gói 'pong' từ client trong một khoảng thời gian nhất định. Nếu không nhận được 'pong', server sẽ coi kết nối đã chết và đóng nó lại. Điều này giúp dọn dẹp các kết nối zombie một cách hiệu quả.",
          },
        ],
      },
    },
    security: {
      title: "Bảo mật Ứng dụng NestJS",
      intro:
        "Bảo mật là một khía cạnh không thể bỏ qua. NestJS, bằng cách tích hợp với các giải pháp đã được kiểm chứng và cung cấp các khối xây dựng như Guards và Pipes, giúp việc bảo mật ứng dụng trở nên dễ quản lý hơn.",
      tabs: [
        {
          id: "auth",
          title: "Xác thực & Ủy quyền",
          content: `
                                <h4 class="text-lg font-semibold mb-2">Xác thực (Authentication) với Passport và JWT</h4>
                                <p class="mb-4">Xác thực là quá trình xác minh danh tính của người dùng. NestJS thường sử dụng <code>@nestjs/passport</code> cùng với các chiến lược (strategies) như <code>passport-jwt</code> để triển khai xác thực dựa trên JSON Web Token (JWT).</p>
                                <p class="mb-4">Luồng hoạt động điển hình:</p>
                                <ol class="list-decimal list-inside space-y-2 mb-6">
                                    <li>Người dùng đăng nhập bằng username/password.</li>
                                    <li>Server xác thực thông tin, nếu đúng, tạo một JWT chứa thông tin người dùng (ví dụ: userId, roles) và ký nó bằng một khóa bí mật.</li>
                                    <li>Server trả JWT về cho client.</li>
                                    <li>Client lưu JWT (thường trong localStorage hoặc cookie) và gửi nó trong header <code>Authorization: Bearer &lt;token&gt;</code> cho mỗi yêu cầu tiếp theo đến các route được bảo vệ.</li>
                                    <li>Một <code>AuthGuard('jwt')</code> trên server sẽ tự động xác minh token, giải mã payload và gắn nó vào đối tượng request (<code>req.user</code>).</li>
                                </ol>
                                <h4 class="text-lg font-semibold mb-2">Ủy quyền (Authorization) với Guards</h4>
                                <p>Ủy quyền là quá trình xác định những gì một người dùng đã xác thực được phép làm. Điều này thường được triển khai bằng các <strong>Guards</strong> tùy chỉnh. Một <code>RolesGuard</code>, ví dụ, có thể kiểm tra xem <code>req.user.roles</code> có chứa vai trò cần thiết để truy cập một endpoint cụ thể hay không.</p>
                            `,
        },
        {
          id: "common-threats",
          title: "Các Mối đe dọa Phổ biến",
          content: `
                                <p class="mb-4">Ngoài xác thực/ủy quyền, việc bảo vệ ứng dụng khỏi các cuộc tấn công web phổ biến là rất quan trọng.</p>
                                <div id="security-threats-accordion" class="space-y-2"></div>
                            `,
        },
      ],
      threats: [
        {
          title: "Rate Limiting (Giới hạn Tần suất Yêu cầu)",
          content:
            "<strong>Vấn đề:</strong> Kẻ tấn công có thể cố gắng làm quá tải dịch vụ của bạn bằng cách gửi một số lượng lớn yêu cầu (tấn công từ chối dịch vụ - DoS) hoặc thực hiện các cuộc tấn công brute-force vào các endpoint đăng nhập.<br/><br/><strong>Giải pháp: <code>@nestjs/throttler</code>.</strong> Module này cung cấp một <code>ThrottlerGuard</code> có thể được áp dụng toàn cục để giới hạn số lượng yêu cầu từ một IP trong một khoảng thời gian nhất định. Ví dụ: giới hạn 10 yêu cầu mỗi 60 giây cho mỗi IP.",
        },
        {
          title: "Cross-Origin Resource Sharing (CORS)",
          content:
            "<strong>Vấn đề:</strong> Theo mặc định, các trình duyệt web thực thi 'same-origin policy', ngăn chặn một trang web gửi yêu cầu đến một domain khác với domain của nó. Điều này có thể gây ra vấn đề khi frontend và backend của bạn được lưu trữ trên các domain khác nhau.<br/><br/><strong>Giải pháp: Kích hoạt CORS.</strong> Trong NestJS, bạn có thể dễ dàng kích hoạt CORS bằng cách gọi <code>app.enableCors()</code> trong file <code>main.ts</code>. Bạn có thể cấu hình chi tiết các origin, method, và header được phép.",
        },
        {
          title: "Bảo vệ HTTP Headers với Helmet",
          content:
            "<strong>Vấn đề:</strong> Nhiều lỗ hổng bảo mật web có thể được khai thác thông qua các HTTP header được cấu hình không đúng cách.<br/><br/><strong>Giải pháp: Middleware <code>helmet</code>.</strong> Helmet là một tập hợp các middleware giúp bảo mật ứng dụng của bạn bằng cách thiết lập các HTTP header bảo mật khác nhau (ví dụ: <code>X-Content-Type-Options</code>, <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code>). Bạn có thể áp dụng nó bằng cách gọi <code>app.use(helmet())</code> trong <code>main.ts</code>.",
        },
        {
          title: "Cross-Site Request Forgery (CSRF)",
          content:
            "<strong>Vấn đề:</strong> CSRF là một cuộc tấn công lừa người dùng đã xác thực thực hiện một hành động không mong muốn trên một ứng dụng web mà họ đang đăng nhập. Ví dụ, một trang web độc hại có thể chứa một form tự động gửi yêu cầu thay đổi email của người dùng trên trang web của bạn.<br/><br/><strong>Giải pháp: CSRF Tokens.</strong> Sử dụng middleware như <code>csurf</code>. Middleware này tạo ra một token duy nhất, bí mật cho mỗi phiên người dùng và yêu cầu token đó phải được gửi cùng với mỗi yêu cầu thay đổi trạng thái (POST, PUT, DELETE). Vì trang web độc hại không biết token này, nó không thể giả mạo yêu cầu thành công. Giải pháp này thường được sử dụng trong các ứng dụng web truyền thống dựa trên session/cookie.",
        },
      ],
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  const contentArea = document.getElementById("content-area");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const menuOpenIcon = document.getElementById("menu-open-icon");
  const menuCloseIcon = document.getElementById("menu-close-icon");

  let scalingChartInstance = null; // Biến để lưu trữ instance của biểu đồ

  // --- Modal Logic ---
  const modalBackdrop = document.getElementById("modal-backdrop");
  const codeModal = document.getElementById("code-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalCode = document.getElementById("modal-code");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const copyCodeBtn = document.getElementById("copy-code-btn");

  function openModal(title, code) {
    modalTitle.textContent = title;
    modalCode.textContent = code;
    modalBackdrop.classList.remove("hidden");
    codeModal.classList.remove("hidden");
  }

  function closeModal() {
    modalBackdrop.classList.add("hidden");
    codeModal.classList.add("hidden");
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  copyCodeBtn.addEventListener("click", () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = modalCode.textContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      copyCodeBtn.textContent = "Đã sao chép!";
      setTimeout(() => {
        copyCodeBtn.textContent = "Sao chép Mã";
      }, 2000);
    } catch (err) {
      console.error("Không thể sao chép mã", err);
    }
    document.body.removeChild(tempTextArea);
  });

  // --- Navigation & Content Rendering ---
  function renderNavigation() {
    let navHtml = "";
    appData.navigation.forEach((item) => {
      navHtml += `
                        <div>
                            <a href="#${item.id}" data-id="${
        item.id
      }" class="sidebar-link block py-2.5 px-4 rounded-md font-medium text-slate-300">${
        item.title
      }</a>
                            ${
                              item.sub
                                ? `
                                <div class="pl-4 mt-2 space-y-1">
                                    ${item.sub
                                      .map(
                                        (subItem) => `
                                        <a href="#${item.id}/${subItem.id}" data-id="${item.id}" data-sub-id="${subItem.id}" class="sidebar-link-sub block py-2 px-4 rounded-md text-slate-400 text-sm hover:bg-slate-700">${subItem.title}</a>
                                    `
                                      )
                                      .join("")}
                                </div>`
                                : ""
                            }
                        </div>
                    `;
    });
    nav.innerHTML = navHtml;
  }

  function renderContent(sectionId, subSectionId = null) {
    let contentHtml = "";
    const sectionData = appData.content[sectionId];

    if (!sectionData) {
      contentArea.innerHTML = "<h2>Nội dung không tìm thấy</h2>";
      return;
    }

    let dataToShow = sectionData;
    if (subSectionId) {
      dataToShow = sectionData[subSectionId];
    }

    if (dataToShow) {
      contentHtml = `
                        <div id="${sectionId}-${
        subSectionId || "main"
      }" class="content-section space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-sm">
                            <h2 class="text-3xl font-bold text-slate-800 border-b pb-4">${
                              dataToShow.title
                            }</h2>
                            <p class="text-slate-600">${dataToShow.intro}</p>
                            ${
                              dataToShow.details
                                ? `<div class="prose max-w-none text-slate-600">${dataToShow.details}</div>`
                                : ""
                            }
                            ${
                              dataToShow.interactiveElement
                                ? renderInteractiveElement(
                                    dataToShow.interactiveElement,
                                    sectionId,
                                    subSectionId
                                  )
                                : ""
                            }
                            ${
                              dataToShow.tabs
                                ? renderTabs(
                                    dataToShow.tabs,
                                    sectionId,
                                    subSectionId
                                  )
                                : ""
                            }
                            ${
                              dataToShow.items
                                ? renderPackageCards(dataToShow.items)
                                : ""
                            }
                            ${
                              dataToShow.code
                                ? `<pre class="code-block">${dataToShow.code.trim()}</pre>`
                                : ""
                            }
                        </div>
                    `;
    }

    contentArea.innerHTML = contentHtml;
    const newSection = document.querySelector(".content-section");
    if (newSection) newSection.classList.add("active");

    // Activate post-render scripts
    if (dataToShow.interactiveElement === "lifecycleDiagram")
      initLifecycleDiagram();
    if (dataToShow.tabs) initTabs(sectionId, subSectionId);
    if (dataToShow.items) initPackageCards();
    // We call initScalingChart from within initTabs now
    if (dataToShow.challenges) initAccordions(sectionId, subSectionId);
  }

  function updateActiveLinks(sectionId, subSectionId = null) {
    document
      .querySelectorAll(".sidebar-link, .sidebar-link-sub")
      .forEach((l) => {
        l.classList.remove("active", "active-sub");
      });

    const mainLink = document.querySelector(
      `.sidebar-link[data-id="${sectionId}"]`
    );
    if (mainLink) mainLink.classList.add("active");

    if (subSectionId) {
      const subLink = document.querySelector(
        `.sidebar-link-sub[data-sub-id="${subSectionId}"]`
      );
      if (subLink) subLink.classList.add("active-sub");
    }
  }

  function handleNavigation() {
    const hash = window.location.hash.slice(1);
    const [sectionId, subSectionId] = hash.split("/");

    const targetSection = sectionId || "welcome";
    const targetSubSection =
      subSectionId ||
      appData.navigation.find((s) => s.id === targetSection)?.sub?.[0].id;

    renderContent(targetSection, targetSubSection);
    updateActiveLinks(targetSection, targetSubSection);
  }

  // --- Interactive Elements Rendering & Init ---
  function renderInteractiveElement(type, sectionId, subSectionId) {
    if (type === "lifecycleDiagram") {
      return `
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-9 items-center gap-2 text-center text-sm font-medium">
                                <div id="step-middleware" class="lifecycle-step p-3 bg-white border-slate-300 rounded-lg shadow-sm">Middleware</div>
                                <div class="lifecycle-arrow text-2xl">&rightarrow;</div>
                                <div id="step-guards" class="lifecycle-step p-3 bg-white border-slate-300 rounded-lg shadow-sm">Guards</div>
                                <div class="lifecycle-arrow text-2xl">&rightarrow;</div>
                                <div id="step-interceptors-pre" class="lifecycle-step p-3 bg-white border-slate-300 rounded-lg shadow-sm">Interceptors (Pre-Controller)</div>
                                <div class="lifecycle-arrow text-2xl">&rightarrow;</div>
                                <div id="step-pipes" class="lifecycle-step p-3 bg-white border-slate-300 rounded-lg shadow-sm">Pipes</div>
                                <div class="lifecycle-arrow text-2xl">&rightarrow;</div>
                                <div class="p-3 bg-emerald-600 text-white rounded-lg shadow-md">Controller</div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-5 items-center gap-2 text-center text-sm font-medium">
                                <div class="p-3 bg-blue-600 text-white rounded-lg shadow-md col-span-1 md:col-start-3">Service</div>
                                <div class="lifecycle-arrow text-2xl -rotate-90 md:rotate-0">&downarrow;</div>
                                <div id="step-interceptors-post" class="lifecycle-step p-3 bg-white border-slate-300 rounded-lg shadow-sm">Interceptors (Post-Controller)</div>
                            </div>
                             <div id="lifecycle-details" class="mt-6 p-4 bg-slate-50 rounded-lg min-h-[100px] transition-all duration-300">
                                <p class="text-slate-500">Nhấp vào một bước để xem mô tả chi tiết.</p>
                            </div>
                        </div>
                    `;
    }
    return "";
  }

  function initLifecycleDiagram() {
    const steps = {
      middleware:
        "Thực thi logic tùy chỉnh. Có thể thay đổi đối tượng request và response. Ví dụ: logging, CORS, helmet.",
      guards:
        "Xác định quyền truy cập. Dựa trên vai trò, quyền hạn (permissions), ACLs, v.v. Nếu trả về false, yêu cầu sẽ bị từ chối.",
      "interceptors-pre":
        "Liên kết logic bổ sung trước khi handler được thực thi. Có thể biến đổi request hoặc ghi đè hành vi của handler.",
      pipes:
        "Biến đổi và xác thực dữ liệu đầu vào (request body, params, queries). Chuyển đổi chuỗi thành số, xác thực DTOs.",
      "interceptors-post":
        "Chạy sau khi handler đã thực thi. Có thể biến đổi kết quả trả về hoặc xử lý các ngoại lệ.",
    };
    const stepElements = document.querySelectorAll(".lifecycle-step");
    const detailsContainer = document.getElementById("lifecycle-details");

    stepElements.forEach((stepEl) => {
      stepEl.addEventListener("click", () => {
        stepElements.forEach((el) => el.classList.remove("active"));
        stepEl.classList.add("active");
        const stepId = stepEl.id.replace("step-", "");
        detailsContainer.innerHTML = `<p class="text-slate-700">${steps[stepId]}</p>`;
      });
    });
  }

  function renderTabs(tabs, sectionId, subSectionId) {
    return `
                    <div class="border-b border-slate-200">
                        <nav id="tabs-${sectionId}-${subSectionId}" class="-mb-px flex space-x-4" aria-label="Tabs">
                            ${tabs
                              .map(
                                (tab, index) => `
                                <button data-tab-target="${
                                  tab.id
                                }" class="tab-button whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                                  index === 0
                                    ? "active"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }">
                                    ${tab.title}
                                </button>
                            `
                              )
                              .join("")}
                        </nav>
                    </div>
                    <div id="tab-content-${sectionId}-${subSectionId}" class="mt-4">
                        ${tabs
                          .map(
                            (tab, index) => `
                            <div id="${tab.id}" class="tab-pane ${
                              index === 0 ? "" : "hidden"
                            }">
                                <div class="prose max-w-none text-slate-600">${
                                  tab.content
                                }</div>
                                ${
                                  tab.code
                                    ? `<pre class="code-block mt-4">${tab.code.trim()}</pre>`
                                    : ""
                                }
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `;
  }

  function initTabs(sectionId, subSectionId) {
    const tabButtons = document.querySelectorAll(
      `#tabs-${sectionId}-${subSectionId} .tab-button`
    );
    const tabPanes = document.querySelectorAll(
      `#tab-content-${sectionId}-${subSectionId} .tab-pane`
    );

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const targetId = button.getAttribute("data-tab-target");
        tabPanes.forEach((pane) => {
          if (pane.id === targetId) {
            pane.classList.remove("hidden");
          } else {
            pane.classList.add("hidden");
          }
        });

        if (targetId === "scaling") initScalingChart();
        if (targetId === "challenges")
          initAccordions("advanced", "microservices");
        if (targetId === "ws-security")
          initAccordions("advanced", "websockets");
        if (targetId === "common-threats") initAccordions("security", "main");
      });
    });
    // Trigger click on the first tab to initialize content
    if (tabButtons.length > 0) tabButtons[0].click();
  }

  function renderPackageCards(items) {
    return `
                    <div id="package-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${items
                          .map(
                            (item) => `
                            <div data-id="${item.id}" class="package-card bg-white rounded-lg shadow-md p-6 cursor-pointer border border-transparent hover:border-emerald-500">
                                <h4 class="text-xl font-semibold text-slate-800">${item.name}</h4>
                                <p class="text-slate-600 mt-2">${item.purpose}</p>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                 `;
  }

  function initPackageCards() {
    document.querySelectorAll(".package-card").forEach((card) => {
      card.addEventListener("click", () => {
        const packageId = card.dataset.id;
        const code = appData.content.packages.codeSamples[packageId];
        const title = appData.content.packages.items.find(
          (p) => p.id === packageId
        ).name;
        openModal(`Ví dụ Tích hợp: ${title}`, code);
      });
    });
  }

  function initAccordions(sectionId, subSectionId) {
    let accordionId;
    let challenges;
    if (sectionId === "advanced" && subSectionId === "microservices") {
      accordionId = "ms-challenges-accordion";
      challenges = appData.content.advanced.microservices.challenges;
    } else if (sectionId === "advanced" && subSectionId === "websockets") {
      accordionId = "ws-challenges-accordion";
      challenges = appData.content.advanced.websockets.challenges;
    } else if (sectionId === "security") {
      accordionId = "security-threats-accordion";
      challenges = appData.content.security.threats;
    }

    if (!accordionId || !challenges) return;

    const container = document.getElementById(accordionId);
    if (!container) return;

    container.innerHTML = challenges
      .map(
        (item, index) => `
                    <div class="border border-slate-200 rounded-md">
                        <div class="accordion-header flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100">
                            <h5 class="font-semibold text-slate-700">${item.title}</h5>
                            <span class="accordion-icon text-slate-500 transform transition-transform duration-300">&plus;</span>
                        </div>
                        <div class="accordion-content">
                           <div class="p-4 border-t border-slate-200 prose max-w-none text-slate-600">${item.content}</div>
                        </div>
                    </div>
                `
      )
      .join("");

    container.querySelectorAll(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".accordion-icon");
        const isOpen = content.style.maxHeight;

        if (isOpen) {
          content.style.maxHeight = null;
          icon.innerHTML = "&plus;";
          icon.classList.remove("rotate-45");
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          icon.innerHTML = "&times;";
          icon.classList.add("rotate-45");
        }
      });
    });
  }

  function initScalingChart() {
    const ctx = document.getElementById("scalingChart");
    if (!ctx) return;

    if (scalingChartInstance) {
      scalingChartInstance.destroy();
    }

    scalingChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mở rộng Dọc (Up)", "Mở rộng Ngang (Out)"],
        datasets: [
          {
            label: "Khả năng chịu tải tối đa",
            data: [6, 10],
            backgroundColor: "rgba(5, 150, 105, 0.6)",
            borderColor: "rgba(5, 150, 105, 1)",
            borderWidth: 1,
          },
          {
            label: "Chi phí ở quy mô lớn",
            data: [8, 5],
            backgroundColor: "rgba(244, 63, 94, 0.6)",
            borderColor: "rgba(244, 63, 94, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: "So sánh Chiến lược Mở rộng" },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                const value = context.parsed.y;
                const scaleText =
                  value > 7 ? "Cao" : value > 4 ? "Trung bình" : "Thấp";
                return `${label}${scaleText}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                if (value === 0) return "Thấp";
                if (value === 5) return "Trung bình";
                if (value === 10) return "Cao";
                return "";
              },
            },
          },
        },
      },
    });
  }

  // --- Mobile Menu Toggle ---
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
  });

  // --- Initial Load ---
  renderNavigation();
  handleNavigation();
  window.addEventListener("hashchange", handleNavigation);
  // Hide sidebar on link click on mobile
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth < 768) {
      sidebar.classList.add("-translate-x-full");
      menuOpenIcon.classList.remove("hidden");
      menuCloseIcon.classList.add("hidden");
    }
  });
});
