# Elastic Search

ElasticSearch is a powerful, distributed search and analytics engine designed for working with large datasets. It's commonly used for log and event data, full-text search, and analytics. To use it effectively, you need to understand how to interact with its RESTful API, structure your data properly, and optimize your queries. Here's a step-by-step guide on getting started:

## Install

- **Single Node Installation**: If you're testing locally, you can download and run ElasticSearch directly on your machine.
  - Download it from the [official Elastic website](https://www.elastic.co/downloads/elasticsearch).
  - Unzip the downloaded file and run it with `bin/elasticsearch` (Linux/Mac) or `bin\elasticsearch.bat` (Windows).
- **Docker Installation**: For a more isolated setup, you can use Docker:
  ```bash
  docker pull docker.elastic.co/elasticsearch/elasticsearch:8.0.0
  docker run -p 9200:9200 -e "discovery.type=single-node" elasticsearch:8.0.0
  ```

## Understand the Core Concepts

- **Index**: Like a database table, where you store documents of similar nature.
- **Document**: A single record or JSON object stored in an index.
- **Field**: Each attribute within a document, like a column in a relational database.
- **Cluster and Node**: ElasticSearch can run as a single node or a cluster with multiple nodes for better scalability.

## Indexing Data (Storing Data)

ElasticSearch stores data in JSON format. Here’s an example of indexing (adding) a document to an index:

- **Create or Use an Index**:
  ```json
  PUT /my_index
  ```
- **Add a Document**:
  ```json
  POST /my_index/_doc/1
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "published_year": 1925
  }
  ```

## Querying Data

ElasticSearch offers several types of queries:

- **Match Query**: Searches for documents that contain specific terms in a field.
  ```json
  GET /my_index/_search
  {
    "query": {
      "match": { "title": "Gatsby" }
    }
  }
  ```
- **Term Query**: Looks for exact matches, often used for fields with exact values (like IDs).
  ```json
  GET /my_index/_search
  {
    "query": {
      "term": { "author": "F. Scott Fitzgerald" }
    }
  }
  ```
- **Range Query**: Searches within a numeric or date range.
  ```json
  GET /my_index/_search
  {
    "query": {
      "range": {
        "published_year": { "gte": 1900, "lte": 1950 }
      }
    }
  }
  ```

## Updating Documents

You can update existing documents using the `update` API:

```json
POST /my_index/_update/1
{
  "doc": {
    "title": "The Great Gatsby - Updated"
  }
}
```

## Deleting Documents

- **Delete a Document**:
  ```json
  DELETE /my_index/_doc/1
  ```
- **Delete an Index**:
  ```json
  DELETE /my_index
  ```

## Analyzing Data

ElasticSearch has an analysis engine for handling text searches, including tokenizers, analyzers, and filters to process text data.

- **Analyzers**: These break text into terms and normalize it, enabling full-text search.
- **Aggregation Queries**: Useful for analytics and reporting, aggregations allow you to group and analyze data, such as counting, averaging, and histogram creation.

```json
GET /my_index/_search
{
  "aggs": {
    "by_author": {
      "terms": { "field": "author.keyword" }
    }
  }
}
```

## Monitoring and Scaling

- **Kibana**: ElasticSearch integrates well with Kibana, which provides a dashboard and data visualization features.
- **Scaling**: ElasticSearch is designed to scale horizontally, meaning you can add nodes to distribute the data and load across the cluster.

## Use Cases

ElasticSearch is highly flexible and supports various applications:

- **Log and Event Data Analysis**: Storing and analyzing logs from applications.
- **Real-time Data Analysis**: Aggregating and analyzing data in real time, e.g., monitoring performance metrics.
- **E-commerce Search**: Enabling fast, accurate product searches with filters, faceting, and auto-suggestions.
- **Full-text Search**: Implementing search functionality for websites, blogs, or documents.

## Sample Walkthrough

Here's a simple sequence that combines multiple operations:

1. **Create an index**:
   ```json
   PUT /library
   ```
2. **Index a book**:
   ```json
   POST /library/_doc/1
   {
     "title": "1984",
     "author": "George Orwell",
     "year": 1949
   }
   ```
3. **Search by author**:
   ```json
   GET /library/_search
   {
     "query": {
       "match": { "author": "Orwell" }
     }
   }
   ```
4. **Aggregate by publication year**:
   ```json
   GET /library/_search
   {
     "size": 0,
     "aggs": {
       "years": {
         "terms": { "field": "year" }
       }
     }
   }
   ```
