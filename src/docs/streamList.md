## List streams *GET* {#get}

List all streams

#### Endpoint
```console
https://api.streamgorilla.com/v1/streams?assets={boolean}
```

#### Parameters

| Name |  Required  | Type
| - | - |  - |
| assets (Include assets in payload)  | No | boolean 


#### code 200 (Successful operation)

```json
{
  "data": [
    {
      "id": "f37a2964-ea7c-4fd5-8ccd-2026a744ebb8",
      "type": "streams",
      "attributes": {
        "title": "Calm ocean waves",
        "endpoint": "rtmp://a.rtmp.youtube.com/live2",
        "status": "started"
      },
      "relationships": {
        "assets": {
          "data": [
            {
              "type": "assets",
              "id": "a9d110c9-61de-4e4a-9e88-056bd3b492e0"
            }
          ],
          "meta": {
            "count": 1
          }
        }
      },
      "links": {
        "self": "https://api.streamgorilla.com/v1/stream/f37a2964-ea7c-4fd5-8ccd-2026a744ebb8"
      }
    }
  ],
  "included": [
    {
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
        "self": "https://api.assetgorilla.com/v1/asset/f37a2964-ea7c-4fd5-8ccd-2026a744ebb8"
      }
    }
  ]
}
```

#### code 401 (Error: Unauthorized)

```json
{
  "error": "You need to sign in or sign up before continuing."
}
```