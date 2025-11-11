# Gin Framework

## 0. Install & Bootstrap

```bash
go mod init example.com/app
go get github.com/gin-gonic/gin
```

```go title="main.go"
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default() // Logger + Recovery middleware
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    r.Run(":8080")
}
```

## 1. Routing Basics

```go
r := gin.New()
r.Use(gin.Logger(), gin.Recovery())

r.GET("/health", healthHandler)
r.POST("/users", createUser)
r.PUT("/users/:id", updateUser)
r.DELETE("/users/:id", deleteUser)

// Route groups
api := r.Group("/api")
v1 := api.Group("/v1")
v1.GET("/items", listItems)

// Wildcards
r.GET("/files/*path", func(c *gin.Context) {
    path := c.Param("path") // like /a/b/c.txt
    c.String(200, path)
})
```

## 2. Params, Query, Form

```go
// Path params
r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")
    c.JSON(200, gin.H{"id": id})
})

// Query ?q=abc&page=2
r.GET("/search", func(c *gin.Context) {
    q := c.Query("q")
    page := c.DefaultQuery("page", "1")
    c.JSON(200, gin.H{"q": q, "page": page})
})

// Form (x-www-form-urlencoded or multipart)
r.POST("/submit", func(c *gin.Context) {
    name := c.PostForm("name")
    tags := c.PostFormArray("tags")
    c.JSON(200, gin.H{"name": name, "tags": tags})
})
```

## 3. JSON Binding & Validation

```go
type CreateUserReq struct {
    Email string `json:"email" binding:"required,email"`
    Name  string `json:"name"  binding:"required,min=2,max=64"`
    Age   int    `json:"age"   binding:"gte=0,lte=150"`
}

r.POST("/users", func(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // create...
    c.JSON(201, gin.H{"id": 1, "email": req.Email})
})
```

:::tip

* `ShouldBindJSON` (no panic) vs `BindJSON` (writes 400 and may abort).
* Works with `form`, `query`, `uri` tags too.

:::

## 4. Responses

```go
c.JSON(200, gin.H{"ok": true})
c.XML(200, obj)
c.String(200, "hello")
c.Data(200, "text/plain", []byte("raw"))
c.Redirect(302, "/login")
c.Header("X-Trace", "abc123")
c.Status(204)
```

## 5. Middleware

```go
func Auth() gin.HandlerFunc {
    return func(c *gin.Context) {
        if c.GetHeader("X-Token") == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "missing token"})
            return
        }
        c.Next()
    }
}

r := gin.New()
r.Use(gin.Logger(), gin.Recovery(), Auth())

// Group-specific middleware
admin := r.Group("/admin", Auth())
admin.GET("/dashboard", dash)
```

:::note

* `c.Next()` continues; `c.Abort()` stops further handlers.
* You can attach values: `c.Set("userID", id)` → `c.Get("userID")`.

:::

## 6. Error Handling

```go
// Return errors inline
if err != nil {
    c.Error(err) // adds to c.Errors
    c.JSON(500, gin.H{"error": "internal"})
    return
}

// Centralized error handler (middleware)
r.Use(func(c *gin.Context) {
    c.Next()
    if len(c.Errors) > 0 {
        // log c.Errors.String()
        c.JSON(-1, gin.H{"error": c.Errors[0].Error()}) // -1 keeps existing status
    }
})
```

## 7. File Uploads & Static

```go
// Single file
r.POST("/upload", func(c *gin.Context) {
    f, _ := c.FormFile("file")
    _ = c.SaveUploadedFile(f, "./uploads/"+f.Filename)
    c.JSON(201, gin.H{"name": f.Filename})
})

// Multiple files
r.POST("/uploads", func(c *gin.Context) {
    form, _ := c.MultipartForm()
    files := form.File["files"]
    for _, f := range files {
        _ = c.SaveUploadedFile(f, "./uploads/"+f.Filename)
    }
    c.Status(201)
})

// Static assets
r.Static("/assets", "./public")
```

## 8. Templates (HTML)

```go
r.LoadHTMLGlob("templates/*.tmpl")

r.GET("/welcome", func(c *gin.Context) {
    c.HTML(200, "index.tmpl", gin.H{"title": "Welcome", "name": "Fee"})
})
```

`index.tmpl` example:

```html
<html>
    <body>
        <h1>{{ .title }}</h1>
        <p>Hello, {{ .name }}</p>
    </body>
</html>
```

## 9. Timeouts, Context, and Cancellation

Use server-level timeouts for safety (see graceful section).

```go
r.GET("/slow", func(c *gin.Context) {
    ctx := c.Request.Context()
    select {
    case <-time.After(2 * time.Second):
        c.String(200, "done")
    case <-ctx.Done():
        c.Status(499) // client closed request (custom)
    }
})
```

## 10. JWT/Auth (pattern)

```go
func JWT() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := strings.TrimPrefix(c.GetHeader("Authorization"), "Bearer ")
        claims, err := verify(token) // your verify
        if err != nil {
            c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
            return
        }
        c.Set("sub", claims.Sub)
        c.Next()
    }
}

api := r.Group("/api", JWT())
api.GET("/me", func(c *gin.Context) {
    sub, _ := c.Get("sub")
    c.JSON(200, gin.H{"sub": sub})
})
```

## 11. CORS, Rate Limit, Logging (common middlewares)

* CORS: `github.com/gin-contrib/cors`
* Gzip: `github.com/gin-contrib/gzip`
* Secure headers: `github.com/unrolled/secure` (wrap as middleware)
* Request ID: `github.com/gin-contrib/requestid`
* Prometheus metrics: `github.com/zsais/go-gin-prometheus` or custom
* Rate limit: `github.com/didip/tollbooth_gin` or roll your own token bucket

```go
// Example: CORS
import "github.com/gin-contrib/cors"

r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"https://example.com"},
    AllowMethods:     []string{"GET","POST","PUT","DELETE"},
    AllowHeaders:     []string{"Authorization","Content-Type"},
    AllowCredentials: true,
    MaxAge: 12 * time.Hour,
}))
```

## 12. Graceful Shutdown

```go
srv := &http.Server{
    Addr:         ":8080",
    Handler:      r,
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
    IdleTimeout:  60 * time.Second,
}

go func() { _ = srv.ListenAndServe() }()

quit := make(chan os.Signal, 1)
signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
<-quit

ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
_ = srv.Shutdown(ctx)
```

## 13. Testing Handlers (httptest)

```go
func setup() *gin.Engine {
    r := gin.New()
    r.GET("/ping", func(c *gin.Context) { c.String(200, "pong") })
    return r
}

func TestPing(t *testing.T) {
    r := setup()
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/ping", nil)
    r.ServeHTTP(w, req)

    if w.Code != 200 || w.Body.String() != "pong" {
        t.Fatalf("unexpected: %d %s", w.Code, w.Body.String())
    }
}
```

## 14. Performance Tips

* Prefer **`ShouldBind`** variants to avoid double parsing.
* Reuse `jsoniter` or stdlib? Stick to stdlib unless profiling proves otherwise.
* Keep middleware minimal and cheap; instrument with metrics.
* For very hot paths, consider pooled buffers or streaming (`c.Stream`).
* Run with `GOMAXPROCS` tuned (often defaults well), profile with `pprof`.

## 15. Common Pitfalls

* Forgetting to **return** after `c.AbortWithStatusJSON` (handler might keep running).
* Writing headers/body **after** you’ve already responded.
* Not closing request bodies on upstream calls (leaks file descriptors).
* Doing heavy CPU work on the request goroutine without timeouts.
* Global mutable state without locks; use DI, per-request context, or sync primitives.

## 16. Minimal Production Skeleton

```txt
cmd/app/main.go
internal/httpserver/router.go
internal/httpserver/middleware.go
internal/handler/user.go
internal/service/user.go
internal/repo/user_repo.go
internal/platform/db/postgres.go
pkg/ (shared utilities)
```

* Wire dependencies once in `main`.
* Keep handlers thin; push logic into services.

## 17. Handy Snippets

### **Pagination parsing**

```go
page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
if size > 100 { size = 100 }
```

### **Download file**

```go
c.FileAttachment("./reports/a.csv", "report.csv")
```

### **Streaming**

```go
c.Stream(func(w io.Writer) bool {
    _, _ = w.Write([]byte("chunk\n"))
    time.Sleep(100 * time.Millisecond)
    return true // false to stop
})
```
