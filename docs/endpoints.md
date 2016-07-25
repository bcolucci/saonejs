
# Endpoints

## Void

```json
{
  "workflows": [
    "mySource -> #void"
  ]
}
```

## Console

Direct usage
```json
{
  "workflows": [
    "mySource -> #console"
  ]
}
```

With configuration:
```json
{
  "endpoints": {
    "prettyConsole": {
      "type": "console",
      "pretty": true,
      "indent": 2
    }
  },
  "workflows": [
    "mySource -> prettyConsole"
  ]
}
```
