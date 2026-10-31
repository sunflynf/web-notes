---
description: Logstash pipeline model, filters, outputs and local validation with Docker
---

# Logstash Integration Guide

Logstash is the ingestion and transformation layer of the ELK stack. It reads events from inputs, applies filters, and writes normalized documents to Elasticsearch or another destination.

## Pipeline Model

A pipeline has three stages:

```text
input -> filter -> output
```

- **Input** reads from files, Beats, TCP/UDP, HTTP, queues, or streams.
- **Filter** parses, enriches, converts, redacts, and tags events.
- **Output** sends processed events to Elasticsearch, files, queues, or other systems.

## Local Pipeline Example

Create `logstash.conf` for application JSON logs:

```ruby
input {
  file {
    path => "/logs/app.log"
    start_position => "beginning"
    sincedb_path => "/dev/null"
    codec => "json"
  }
}

filter {
  date {
    match => ["timestamp", "ISO8601"]
    target => "@timestamp"
  }

  mutate {
    rename => { "service" => "[service][name]" }
    convert => { "duration_ms" => "integer" }
    add_field => { "environment" => "dev" }
    remove_field => ["password", "authorization"]
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "logs-%{[service][name]}-%{environment}-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug }
}
```

Run it with Docker on the same `elk` network as Elasticsearch:

```bash
docker run --rm --name logstash --net elk \
  -v ${PWD}/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
  -v ${PWD}/logs:/logs \
  docker.elastic.co/logstash/logstash:9.5.5
```

## Developer Integration Steps

1. Emit JSON logs from the application. One line should represent one event.
2. Include required fields: `timestamp`, `level`, `message`, `service`, `environment`, and request correlation IDs.
3. Parse timestamps in Logstash and write them to `@timestamp`.
4. Convert strings to numbers or booleans before indexing.
5. Redact sensitive fields before output.
6. Route different event families to predictable index names.

## Validation

Use `stdout { codec => rubydebug }` while developing filters. Confirm the event shape before sending to Elasticsearch. After indexing, query Elasticsearch for one known request ID or trace ID and verify field types in Kibana.

## Common Pitfalls

- Parsing plain text logs with fragile grok patterns when JSON logging is available.
- Letting unmapped fields create inconsistent Elasticsearch types.
- Indexing secrets, tokens, headers, or raw request bodies.
- Using one large index for unrelated event types.
