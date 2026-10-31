---
description: Kibana setup, data views, KQL queries, dashboards and troubleshooting for Elasticsearch data
---

# Kibana Integration Guide

Kibana is the exploration and visualization layer for Elasticsearch data. Developers use it to validate ingestion, inspect logs, create dashboards, and troubleshoot application behavior.

## Initial Setup

Run Kibana on the same Docker network as Elasticsearch:

```bash
docker run --rm --name kibana --net elk -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 \
  docker.elastic.co/kibana/kibana:9.5.5
```

Open `http://localhost:5601` and create a data view that matches your indices, for example:

```text
logs-*-dev-*
```

Use `@timestamp` as the time field for log and event data.

## Developer Workflow

1. **Discover**: Search for a known `trace.id`, `request.id`, or `service.name` after generating a test request.
2. **Inspect fields**: Confirm field types are correct. IDs and status values should usually be `keyword`; messages should usually be `text`.
3. **Create saved searches**: Save common filters such as `service.name: checkout-api and level: ERROR`.
4. **Build dashboards**: Add panels for error count, latency percentiles, request volume, and top failing endpoints.
5. **Share links**: Use Kibana links in incident notes or PRs when validating behavior.

## Useful Query Examples

Search for recent errors from one service:

```text
service.name: "checkout-api" and level: "ERROR"
```

Search by trace ID:

```text
trace.id: "7d9f2a"
```

Find slow requests:

```text
duration_ms >= 1000 and service.name: "checkout-api"
```

## Dashboard Checklist

- Error rate by service and endpoint.
- Request count over time.
- Latency percentiles such as p50, p95, and p99.
- Top exceptions or error messages.
- Deployment version, environment, and host/container filters.

## Troubleshooting

If documents are missing, check the data view pattern, selected time range, and whether `@timestamp` was parsed correctly. If fields are not filterable, review the Elasticsearch mapping and ensure exact-match fields use `keyword`. If dashboards show partial data, confirm all services emit the same field names and environment values.
