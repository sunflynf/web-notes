# Folder Structure

## Option A — Domain-Oriented (recommended for growing apps)

```txt
yourapp/
├─ cmd/
│  └─ api/
│     ├─ main.go                # wire everything, start HTTP server
│     └─ config.yaml            # optional default config
├─ internal/                    # private app code (not importable by others)
│  ├─ platform/                 # cross-cutting infra
│  │  ├─ httpserver/            # server setup (router, middlewares, graceful shutdown)
│  │  ├─ db/                    # connection pools (pgx/sqlx), migrations runner
│  │  ├─ config/                # config load/validate (env, file)
│  │  ├─ logger/                # structured logging
│  │  └─ observability/         # metrics, tracing, pprof
│  ├─ domain/                   # business domains (feature modules)
│  │  ├─ user/
│  │  │  ├─ entity.go           # core types (User) + invariants
│  │  │  ├─ repo.go             # repository interface(s)
│  │  │  ├─ service.go          # business logic (use cases)
│  │  │  ├─ transport/
│  │  │  │  ├─ http/            # HTTP handlers, DTOs, validators, route registration
│  │  │  │  └─ grpc/            # (optional) gRPC service impl
│  │  │  └─ repo/
│  │  │     ├─ pg/              # postgres implementation
│  │  │     └─ memory/          # in-memory (for tests)
│  │  └─ auth/ ...              # another domain (same pattern)
│  └─ app/
│     └─ wiring.go              # dependency graph (DI), module registration
├─ migrations/                  # SQL migrations (golang-migrate/goose/atlas)
├─ pkg/                         # optional: reusable code safe to be imported by others
├─ scripts/                     # dev/ops scripts (make targets call these)
├─ deployments/                 # k8s manifests, helm, docker-compose
├─ docs/                        # ADRs, API docs, architecture diagrams
├─ Makefile
├─ go.mod
└─ .github/workflows/ci.yml     # CI: lint, test, race, vuln scan
```

:::info Why this works

- **Encapsulation**: `internal/` keeps internals private; consumers can’t import.
- **Bounded contexts**: each **domain** owns its types, repo interfaces, services, and transports. Clear seams = safer refactors.
- **Testability**: in-memory repo + HTTP handlers live close to the domain.

:::

## Option B — Layered (simple start, okay for small apps)

```txt
yourapp/
├─ cmd/api/main.go
├─ internal/
│  ├─ handler/          # HTTP handlers (Gin/Echo), route setup
│  ├─ service/          # business logic
│  ├─ repo/             # DB implementations
│  ├─ entity/           # core types
│  ├─ platform/         # config/db/log/obs/httpserver (same as Option A)
│  └─ app/wiring.go
├─ migrations/
└─ ...
```

:::info When to use

- Quick PoC or single-team service.
- You can migrate to domain-oriented later by grouping files per feature.

:::

---

## Minimal wiring ([Gin](/docs/technologies/go/frameworks/gin.md) + pgx) — where things live

```go title="cmd/api/main.go"
func main() {
    cfg := config.Load()                    // internal/platform/config
    log := logger.New(cfg.Log)              // internal/platform/logger
    db  := db.NewPool(cfg.DB)               // internal/platform/db (pgxpool)
    srv := httpserver.New(cfg.HTTP)         // internal/platform/httpserver

    container := app.Wire(cfg, log, db)     // internal/app/wiring.go
    router := httpserver.BuildRouter(container) // registers domain routes

    srv.Start(router)                       // graceful shutdown inside
}
```

```go title="internal/app/wiring.go"
type Container struct {
    UserService *user.Service
    AuthService *auth.Service
    // ...
}

func Wire(cfg config.Config, log *slog.Logger, pool *pgxpool.Pool) *Container {
    userRepo := userpg.New(pool)            // internal/domain/user/repo/pg
    userSvc  := user.NewService(userRepo)   // internal/domain/user/service.go

    authRepo := authpg.New(pool)
    authSvc  := auth.NewService(authRepo, userRepo)

    return &Container{UserService: userSvc, AuthService: authSvc}
}
```

```go title="internal/domain/user/transport/http/routes.go"
func Register(r *gin.RouterGroup, svc *user.Service) {
    r.GET("/users/:id", getUser(svc))
    r.POST("/users", createUser(svc))
}
```

---

## Testing layout

```txt
internal/
└─ domain/
   └─ user/
      ├─ service_test.go        # unit tests (use memory repo)
      ├─ repo/
      │  └─ memory/
      │     └─ repo.go
      └─ transport/http/
         └─ handler_test.go     # httptest + gin engine
```

- Enable race detector in CI: `go test -race ./...`
- Add integration tests hitting a test DB (spin with docker-compose).

---

## Config strategy

- **12-factor**: env vars first, file as default.
- Validate on boot; fail fast.
- Consider `koanf` or `viper` if you need merges.

```env
CONFIG_*
DB_DSN=postgres://...
HTTP_ADDR=:8080
LOG_LEVEL=info
```

---

## Migrations

- Keep SQL in `/migrations`.
- Tooling options: `golang-migrate`, `goose`, `atlas`.
- Run on boot (optional) or via Make target.

```cmd
make migrate-up
make migrate-down
```

---

## Observability

- **Logging**: structured (slog/zap).
- **Metrics**: Prometheus `/metrics` endpoint.
- **Tracing**: OpenTelemetry exporters (OTLP).
- **pprof**: gated in non-prod or behind auth.

---

## Makefile (starter)

```makefile
.PHONY: run test lint tidy migrate-up
run:    ## Start API
\tgo run ./cmd/api
test:   ## Run tests with race
\tgo test -race ./...
lint:   ## Static checks
\tgolangci-lint run
tidy:
\tgo mod tidy
migrate-up:
\tmigrate -path migrations -database $$DB_DSN up
```

---

## Naming & import boundaries (rules that save you later)

- Domains **never** import each other’s `transport/http` or `repo/pg` packages.
  They talk via **interfaces** in their own domain (e.g., `user/repo.go`).
- Cross-domain collaboration happens in **services**; if a cycle appears, extract an interface into a neutral place or create a new domain for shared concerns.
- Keep handlers **thin** (bind/validate → call service → present response).
  Keep repositories **dumb** (SQL only), no business logic.

---

## Quick picks

- **New service, long runway** → **Option A** (domain-oriented)
- **Tiny API / short-lived** → Option B (layered)
- **Monorepo with multiple services** → keep each service under `cmd/<svc>` with its own wiring; share platform libs under `internal/platform` or a dedicated shared module.
