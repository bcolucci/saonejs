
# Sources

## File

### Line by line (default)

```json
{
  "events": {
    "type": "file",
    "path": "./events.txt"
  }
}
```

### JSON file (item by item from an array)

```json
{
  "events": {
    "type": "file",
    "mode": "json",
    "path": "./events.json"
  }
}
```

### ElasticSearch

```json
{
  "lastWeekEvents": {
    "type": "elasticsearch",
    "index": "myApp",
    "type": "events",
    "query": {
      "constant_score": {
        "query": {
          "range": {
            "createdAt": {
              "from":"now-7d"
            }
          }
        }
      }
    }
  }
}
```
