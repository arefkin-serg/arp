## Authenticates user **POST**

Login with your email and password in order to receive a token for use with Bearer Authentication

#### Endpoint
```console
"https://staging.api.streamgorilla.com/login" 

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

#### code 200 (login successful)

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

#### code 401 (login not authorized)

```json
{
 "error": "Invalid Email or password."
}
```
