## Start stream *PUT* {#put}

Starts a stream

#### Endpoint
```console
https://api.streamgorilla.com/v1/streams/{uuid}/start
```

#### Parameters

| Name |  Required  | Type
| - | - |  - |
| uuid | Yes | string 


#### code 202 (Stream queued to start)


#### code 503 (Stream not ready)

```json
{
  "errors": [
    {
      "title": "Stream 024fff7f-c7cb-436f-b952-c4ca64d8e589 not ready"
    }
  ]
}
```