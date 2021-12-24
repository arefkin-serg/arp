## Token *GET* {#get}


Retrieve JWT for logged in user, corresponding to User#uid

#### Endpoint
```console
https://staging.api.streamgorilla.com/token
```

#### code 200 (Token retrieval successful)

```json
{
 "firebase": {
  "token": "fyJhbGciOiJSuZI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1..."
 }
}
```

#### code 401 (Unauthorized)

```json
{
 "error": "You need to sign in or sign up before continuing."
}
```
