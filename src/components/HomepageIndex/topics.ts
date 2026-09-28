// Curated index shown on the home page. Each topic links to a doc id and
// counts every published doc whose id starts with `prefix` (defaults to the
// doc's folder). Ids that no longer exist are skipped, so the page never
// links to a missing note.

export type Marker = "y" | "o" | "g" | "c" | "p";

export type Topic = {
  label: string;
  doc: string;
  prefix?: string;
};

export type Area = {
  name: string;
  marker: Marker;
  topics: Topic[];
};

export const areas: Area[] = [
  {
    name: "Languages",
    marker: "y",
    topics: [
      { label: "JavaScript", doc: "technologies/js/index" },
      { label: "TypeScript", doc: "technologies/js/ts" },
      { label: "Java", doc: "technologies/java/index" },
      {
        label: "C#",
        doc: "technologies/dotnet/csharp-core-study-guide",
        prefix: "technologies/dotnet/",
      },
      { label: "Go", doc: "technologies/go/index" },
      { label: "Python", doc: "technologies/python/index" },
      { label: "PHP", doc: "technologies/php/index" },
      { label: "HTML", doc: "technologies/web-basics/html/index" },
      {
        label: "CSS",
        doc: "technologies/web-basics/styles/css/index",
        prefix: "technologies/web-basics/styles/",
      },
    ],
  },
  {
    name: "Frameworks",
    marker: "o",
    topics: [
      { label: "React", doc: "technologies/js/libraries/react/index" },
      { label: "Next.js", doc: "technologies/js/fe-frameworks/react/nextjs" },
      { label: "Vue", doc: "technologies/js/fe-frameworks/vue/index" },
      {
        label: "Angular",
        doc: "technologies/js/fe-frameworks/angular/index",
      },
      {
        label: "NestJS",
        doc: "technologies/js/be-frameworks/nest",
      },
      {
        label: "Express",
        doc: "technologies/js/be-frameworks/express/index",
      },
      {
        label: "Spring",
        doc: "technologies/java/spring-framework/index",
      },
      {
        label: "ASP.NET Core",
        doc: "technologies/dotnet/asp-net-core",
      },
      { label: "Gin", doc: "technologies/go/frameworks/gin" },
      { label: "Laravel", doc: "technologies/php/laravel/index" },
      { label: "FastAPI", doc: "technologies/python/frameworks/fastapi" },
      { label: "Django", doc: "technologies/python/frameworks/django" },
    ],
  },
  {
    name: "Data",
    marker: "g",
    topics: [
      {
        label: "PostgreSQL",
        doc: "technologies/database/relational/postgre",
      },
      { label: "MySQL", doc: "technologies/database/relational/mysql" },
      { label: "MongoDB", doc: "technologies/database/no-sql/mongodb" },
      {
        label: "SQL",
        doc: "technologies/database/relational/sql-fundamental",
      },
      {
        label: "Node.js ORMs",
        doc: "technologies/js/api/orm/index",
      },
      {
        label: "JPA",
        doc: "technologies/java/api/jpa",
        prefix: "technologies/java/api/",
      },
      {
        label: "EF Core",
        doc: "technologies/dotnet/entity-framework-core",
      },
    ],
  },
  {
    name: "Infrastructure",
    marker: "c",
    topics: [
      { label: "Docker", doc: "technologies/docker-knowledge" },
      { label: "ELK stack", doc: "cloud-computing/elk-stack/index" },
      { label: "Serverless", doc: "cloud-computing/serverless" },
      { label: "Cloud platforms", doc: "cloud-computing/cloud-platforms" },
      { label: "Azure Blob", doc: "technologies/dotnet/azure-blob-sdk" },
    ],
  },
  {
    name: "Practices",
    marker: "p",
    topics: [
      { label: "REST responses", doc: "key-notes/rest-api-response" },
      { label: "Authentication", doc: "key-notes/authentication" },
      { label: "API versioning", doc: "key-notes/api-versioning" },
      { label: "Naming", doc: "key-notes/naming" },
      { label: "Version control", doc: "key-notes/version-control-tools" },
      { label: "Interviews", doc: "key-notes/interviews/index" },
    ],
  },
];

export const startHere: { doc: string; title: string; summary: string }[] = [
  {
    doc: "key-notes/rest-api-response",
    title: "RESTful API response",
    summary: "Ten rules for JSON responses: envelopes, errors, paging.",
  },
  {
    doc: "key-notes/authentication",
    title: "Authentication flows",
    summary: "JWT, OAuth 2.0 and token refresh as sequence diagrams.",
  },
  {
    doc: "key-notes/naming",
    title: "Naming conventions",
    summary: "camelCase, snake_case, kebab-case and where each is used.",
  },
  {
    doc: "technologies/js/api/orm/index",
    title: "Node.js ORMs compared",
    summary: "Sequelize, Prisma, TypeORM, Objection.js and Drizzle in one table.",
  },
];
