---
sidebar_position: 4
title: Azure Blob SDK & Azure Cloud Services
description: Complete technical learning guide for Azure Blob Storage SDK and Azure Cloud Services
tags:
  - azure
  - azureblobstorage
  - cloud
  - dotnet
  - csharp
  - storage
  - devops
  - cloudnative
---

> **Quick reference:** [Azure Blob Cheatsheet](./azure-blob-cheatsheet.mdx)

## Overview

Microsoft Azure is a cloud computing platform providing compute, storage, networking, security, identity, AI, and DevOps tooling.

**Azure Blob Storage** is Microsoft's scalable object storage service designed for:
- File storage
- Media hosting
- Backups
- Logging
- Data lakes
- Static websites

---

## Blob Storage Use Cases

| Use Case | Example |
|----------|---------|
| File Uploads | Images, PDFs, Videos |
| Backups | System snapshots |
| Static Hosting | Frontend websites |
| Streaming | Video delivery |
| Logs | Application logging |
| Data Lakes | Big data analytics |

---

## Azure Storage Architecture

```mermaid
flowchart TD
    Client[Client Application]
    SDK[Azure Blob SDK]
    AzureStorage[Azure Storage Account]
    Containers[Blob Containers]
    Blobs[Blob Objects]

    Client --> SDK
    SDK --> AzureStorage
    AzureStorage --> Containers
    Containers --> Blobs
```

---

## Storage Services

| Service | Purpose |
|---------|---------|
| Blob Storage | Object/file storage |
| Queue Storage | Messaging |
| Table Storage | NoSQL key-value |
| File Shares | SMB file system |

---

## Blob Types

| Blob Type | Description |
|-----------|-------------|
| Block Blob | Files/images/videos |
| Append Blob | Logging scenarios |
| Page Blob | Virtual disks |

---

## Azure Blob Storage Hierarchy

```mermaid
flowchart TD
    StorageAccount --> Container
    Container --> Blob
    Blob --> Versions
```

---

## Installing Azure Blob SDK

```bash
dotnet add package Azure.Storage.Blobs
```

---

## Authentication Methods

| Method | Recommended For |
|--------|----------------|
| Connection String | Development |
| Shared Access Signature (SAS) | Temporary access |
| Managed Identity | Production |
| Microsoft Entra ID (formerly Azure AD) | Enterprise auth |

```json
{
  "AzureStorage": {
    "ConnectionString": "DefaultEndpointsProtocol=https;..."
  }
}
```

---

## Blob SDK Workflow

```mermaid
flowchart LR
    App --> BlobServiceClient
    BlobServiceClient --> BlobContainerClient
    BlobContainerClient --> BlobClient
    BlobClient --> AzureBlobStorage
```

---

## Creating BlobServiceClient

```csharp
using Azure.Storage.Blobs;

var client = new BlobServiceClient(connectionString);
```

### Dependency Injection in ASP.NET Core

```csharp
builder.Services.AddSingleton(x =>
{
    return new BlobServiceClient(
        builder.Configuration["AzureStorage:ConnectionString"]);
});
```

---

## Common Operations

### Creating Containers

```csharp
var containerClient = client.GetBlobContainerClient("images");
await containerClient.CreateIfNotExistsAsync();
```

### Uploading Files

```csharp
var blobClient = containerClient.GetBlobClient("photo.jpg");
await blobClient.UploadAsync(stream, overwrite: true); // without overwrite it throws if the blob exists
```

### Downloading Files

```csharp
// DownloadAsync() is obsolete; use DownloadStreamingAsync() or DownloadContentAsync()
var response = await blobClient.DownloadStreamingAsync();
return response.Value.Content;
```

### Deleting Files

```csharp
await blobClient.DeleteIfExistsAsync();
```

### Listing Blobs

```csharp
await foreach (var blob in containerClient.GetBlobsAsync())
{
    Console.WriteLine(blob.Name);
}
```

---

## Upload Workflow

```mermaid
sequenceDiagram
    participant User
    participant API
    participant BlobSDK
    participant AzureBlob

    User->>API: Upload File
    API->>BlobSDK: UploadAsync()
    BlobSDK->>AzureBlob: Store Blob
    AzureBlob-->>API: Success
    API-->>User: File Uploaded
```

---

## Generating SAS Tokens

Shared Access Signatures allow temporary secure access.

```csharp
var sasUri = blobClient.GenerateSasUri(
    BlobSasPermissions.Read,
    DateTimeOffset.UtcNow.AddHours(1));
```

`GenerateSasUri` only works when the client was built with a shared key (connection string or `StorageSharedKeyCredential`); check `blobClient.CanGenerateSasUri`. With Entra ID / Managed Identity, request a user delegation key via `BlobServiceClient.GetUserDelegationKeyAsync` and build the SAS with `BlobSasBuilder`.

---

## Blob Metadata & Tags

```csharp
await blobClient.SetMetadataAsync(new Dictionary<string, string>
{
    { "UploadedBy", "Admin" }
});

await blobClient.SetTagsAsync(new Dictionary<string, string>
{
    { "Category", "Invoice" }
});
```

---

## Blob Access Tiers

| Tier | Usage |
|------|-------|
| Hot | Frequently accessed |
| Cool | Infrequent access (min. 30 days) |
| Cold | Rarely accessed, still online (min. 90 days) |
| Archive | Offline, must be rehydrated before reading (min. 180 days) |

```csharp
await blobClient.SetAccessTierAsync(AccessTier.Cool);
```

---

## Security Best Practices

| Feature | Purpose |
|---------|---------|
| Managed Identity | Remove secrets |
| SAS Tokens | Limited access |
| Private Endpoints | Internal networking |
| Encryption | Protect data |
| RBAC | Fine-grained permissions |

### Managed Identity (Production Recommended)

```csharp
using Azure.Identity;

var client = new BlobServiceClient(
    new Uri("https://mystorage.blob.core.windows.net"),
    new DefaultAzureCredential());
```

---

## Azure RBAC Roles

| Role | Access |
|------|--------|
| Storage Blob Data Reader | Read |
| Storage Blob Data Contributor | Read/Write/Delete |
| Storage Blob Data Owner | Full data access, including ACLs on Data Lake Gen2 |
| Owner | Manages the resource (control plane); does not by itself grant blob data access with Entra ID auth |

---

## Major Azure Cloud Services

| Service | Purpose |
|---------|---------|
| App Service | Web app hosting |
| Azure Functions | Serverless |
| AKS | Kubernetes |
| Azure SQL | Managed SQL |
| Cosmos DB | NoSQL database |
| Service Bus | Messaging |
| Key Vault | Secret management |
| Application Insights | Monitoring |

---

## Azure Cloud Architecture

```mermaid
flowchart TD
    Users --> Frontend
    Frontend --> APIGateway
    APIGateway --> ASPNETAPI
    ASPNETAPI --> BlobStorage
    ASPNETAPI --> AzureSQL
    ASPNETAPI --> ServiceBus
    ServiceBus --> BackgroundWorker
```

---

## Deploy ASP.NET Core to Azure

```bash
az webapp up --name myapp
```

Deploy workflow:

```mermaid
flowchart LR
    Developer --> GitHub
    GitHub --> AzurePipelines
    AzurePipelines --> AzureAppService
```

---

## Azure Functions — Blob Trigger

```csharp
public static class BlobTriggerFunction
{
    [FunctionName("BlobTriggerFunction")]
    public static void Run(
        [BlobTrigger("images/{name}")]
        Stream blob)
    {
    }
}
```

---

## Azure Service Bus

| Feature | Description |
|---------|-------------|
| Queues | Point-to-point |
| Topics | Publish/subscribe |
| Dead Letter Queue | Failed messages |
| Retry Policies | Reliability |

---

## Azure Key Vault

```csharp
builder.Configuration.AddAzureKeyVault(
    new Uri(vaultUrl),
    new DefaultAzureCredential());
```

---

## Application Insights

```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

```mermaid
flowchart TD
    Application --> ILogger
    ILogger --> ApplicationInsights
    ApplicationInsights --> AzurePortal
```

---

## Local Development with Azurite

```bash
docker run -p 10000:10000 mcr.microsoft.com/azure-storage/azurite
```

---

## Dockerizing ASP.NET Core + Azure SDK

```docker
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY . .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

---

## Performance Optimization

| Optimization | Benefit |
|-------------|---------|
| Async Uploads | Scalability |
| CDN | Faster delivery |
| Compression | Lower bandwidth |
| Access Tiers | Lower cost |
| Parallel Uploads | Faster transfers |

### Retry Policies

```csharp
var options = new BlobClientOptions
{
    Retry =
    {
        MaxRetries = 5
    }
};
```

---

## Geo-Redundancy Options

| Replication | Description |
|-------------|-------------|
| LRS | Local redundancy |
| ZRS | Zone redundancy |
| GRS | Geo redundancy |
| RA-GRS | Read-access geo redundancy |

---

## Lifecycle Management

Automatically move blobs to cheaper tiers:

```mermaid
flowchart LR
    Hot --> Cool
    Cool --> Cold
    Cold --> Archive
    Archive --> Delete
```

---

## Event-Driven Architecture

```mermaid
flowchart TD
    BlobUpload --> EventGrid
    EventGrid --> AzureFunction
    AzureFunction --> Processing
```

---

## Common Pitfalls

| Mistake | Problem |
|---------|---------|
| Storing secrets in code | Security risk |
| Using account keys everywhere | Poor security |
| Missing retry policies | Reliability issues |
| No lifecycle management | High storage cost |
| Large synchronous uploads | Poor scalability |

---

## Azure Blob SDK Cheat Sheet

| Task | Code |
|------|------|
| Create Client | `new BlobServiceClient()` |
| Get Container | `GetBlobContainerClient()` |
| Upload Blob | `UploadAsync()` |
| Download Blob | `DownloadStreamingAsync()` / `DownloadContentAsync()` |
| Delete Blob | `DeleteIfExistsAsync()` |
| Generate SAS | `GenerateSasUri()` |

---

## Interview Questions

### Beginner
1. What is Azure Blob Storage?
2. What is BlobServiceClient?
3. Difference between containers and blobs?
4. What are SAS tokens?
5. What is Managed Identity?

### Intermediate
1. Explain Azure RBAC.
2. Difference between Blob Storage tiers?
3. How would you upload large files?
4. Explain Azure Functions.
5. What is Azurite?

### Advanced
1. How would you secure Azure Blob Storage?
2. Explain Azure storage replication strategies.
3. How would you design a scalable upload service?
4. Explain event-driven architecture using Azure.
5. How would you optimize Azure storage cost?

---

## Learning Roadmap

```mermaid
flowchart TD
    AzureBasics --> StorageAccounts
    StorageAccounts --> BlobSDK
    BlobSDK --> Security
    Security --> AppService
    AppService --> Functions
    Functions --> Messaging
    Messaging --> Monitoring
    Monitoring --> Kubernetes
```
