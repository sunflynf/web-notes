---
description: Elasticsearch local setup, index design, mappings, indexing and query patterns for developers
---

# Elasticsearch Integration Guide

Elasticsearch is the storage and query engine in the ELK stack. Developers integrate with it by sending JSON documents, defining index mappings, and querying data through REST APIs or official client libraries.

## When to Use It

- Full-text search for documents, products, notes, or knowledge bases.
- Centralized log and event search from application services.
- Aggregations for metrics, reporting, and operational troubleshooting.
- Fast filtering over large semi-structured JSON datasets.

## Local Setup

Keep Elasticsearch, Logstash and Kibana on the same version (9.5.5 is the latest 9.x patch as of 2026-10). Disabling security is for local development only.

Use Docker for repeatable development:

```bash
docker network create elk
docker run --name elasticsearch --net elk -p 9200:9200 \
  -e discovery.type=single-node \
  -e xpack.security.enabled=false \
  docker.elastic.co/elasticsearch/elasticsearch:9.5.5
```

Check the node:

```bash
curl http://localhost:9200
```

For production-like environments, keep security enabled and connect with HTTPS, API keys, or service credentials.

## Index Design

Create indices around access patterns, not only source systems. Logs commonly use time-based names:

```text
logs-api-dev-2026.06.11
orders-search-v1
audit-events-prod-2026.06
```

Define mappings before indexing important data. Use `keyword` for exact filters, `text` for full-text search, `date` for timestamps, and numeric types for metrics.

```json
PUT /logs-api-dev
{
  "mappings": {
    "properties": {
      "@timestamp": { "type": "date" },
      "level": { "type": "keyword" },
      "service.name": { "type": "keyword" },
      "trace.id": { "type": "keyword" },
      "duration_ms": { "type": "long" },
      "message": { "type": "text" }
    }
  }
}
```

## Indexing Documents

Send structured JSON. Avoid free-form logs as the only source of truth.

```json
POST /logs-api-dev/_doc
{
  "@timestamp": "2026-06-11T10:30:00Z",
  "level": "ERROR",
  "service": { "name": "checkout-api" },
  "trace": { "id": "7d9f2a" },
  "duration_ms": 842,
  "message": "Payment provider timeout"
}
```

## Query Patterns

Use `match` for analyzed text and `term` for exact keyword values.

```json
GET /logs-api-dev/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "service.name": "checkout-api" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ],
      "must": [
        { "match": { "message": "timeout" } }
      ]
    }
  }
}
```

Aggregate fields for dashboards and alerts:

```json
GET /logs-api-dev/_search
{
  "size": 0,
  "aggs": {
    "errors_by_service": {
      "terms": { "field": "service.name" }
    }
  }
}
```

## Developer Checklist

- Use stable field names across services.
- Create mappings before high-volume indexing starts.
- Store secrets outside documents; redact tokens and passwords before ingestion.
- Add correlation fields such as `trace.id`, `request.id`, and `user.id` when allowed.
- Test queries with expected production filters: service, environment, timestamp, level, and tenant.
- Monitor index size, shard count, rejected writes, and slow queries.
