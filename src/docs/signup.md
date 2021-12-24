## Creates new user *POST* {#post}

Login with your email and password in order to receive a token for use with Bearer Authentication

#### Endpoint
```console
https://api.streamgorilla.com/signup

```

#### Request body

```json
{
  "user": {
    "email": "gorilla@example.com",
    "password": "mysekrit"
  }
}
```

#### code 200 (new user registration successful)

```json
{
  "data": {
    "id": 4218,
    "type": "users",
    "attributes": {
      "email": "gorilla@example.com"
    }
  }
}
```

#### code 400 (user already exists)

```json
{
  "errors": [
    {
      "title": "Invalid email",
      "detail": "Email has already been taken"
    }
  ]
}
```
