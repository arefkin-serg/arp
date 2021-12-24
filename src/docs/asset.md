## Find asset by ID *GET* {#get}

Returns a single asset

#### Endpoint
```console
https://api.streamgorilla.com/v1/assets/{uuid}
```

#### Parameters

| Name |  Required  | Type
| - | - |  - |
| uuid  | Yes | string


#### code 200 (Successful operation)

```json
{
  "data": {
    "id": "f37a2964-ea7c-4fd5-8ccd-2026a744ebb8",
    "type": "assets",
    "attributes": {
      "stream_id": "0ca4af2c-6be3-403d-86ab-e20f42753011",
      "title": "Video of my cat",
      "url": "https://gorilla.s3.amazonaws.com/some/bucket/somewhere/cat.mp4",
      "filename": "cat.mp4",
      "status": "downloaded"
    },
    "links": {
      "self": "https://api.assetgorilla.com/v1/asset/f37a2964..."
    }
  }
}
```

#### code 404 (Asset not found)

```json
{
  "errors": [
    {
      "status": "404",
      "title": "Not Found"
    }
  ]
}
```