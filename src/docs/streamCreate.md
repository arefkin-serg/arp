## Create stream *POST* {#post}

Creates a stream

#### Endpoint
```console
https://api.streamgorilla.com/v1/streams?assets={boolean}
```

#### Request body

```json
{
  "title": "Calm ocean waves",
  "endpoint": "rtmp://a.rtmp.youtube.com/live2",
  "stream_key": "ubjm-3fcc-47fc-2jio-73ac",
  "assets": {
    "video": [
      {
        "filename": "waves.mp4",
        "url": "https://gorilla.s3.amazonaws.com/wave.mp4"
      }
    ],
    "audio": [
      {
        "filename": "lofi-beats.mp3",
        "url": "https://gorilla.s3.amazonaws.com/lofi-beats.mp3"
      }
    ]
  }
}
```


#### code 201 (Stream created)

```json
{
  "data": {
    "id": "f37a2964-ea7c-4fd5-8ccd-2026a744ebb8",
    "type": "streams",
    "attributes": {
      "title": "Calm ocean waves",
      "endpoint": "rtmp://a.rtmp.youtube.com/live2",
      "status": "started"
    },
    "links": {
      "self": "https://api.streamgorilla.com/v1/stream/f37a2964-ea7c-4fd5-8ccd-2026a744ebb8"
    }
  }
}
```

#### code 400 (Missing required parameters)

```json
{
  "errors": [
    {
      "title": "Missing or invalid parameters"
    }
  ]
}
```

#### code 500 (An error has occurred)
```json
{
  "errors": [
    {
      "title": "Something went wrong"
    }
  ]
}
```
