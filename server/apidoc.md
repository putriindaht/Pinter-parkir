# Pinter Parkir API Documentation

# Endpoints:

List of availabele endpoints:

- POST / login
- POST / register
- GET / subscriptions
- GET / locations
- GET / vehicles
- POST / vehicles
- DELETE / vehicles
- POST / transactions
- POST / finish/transactions
- GET / transactions
- PATCH / transactions
- GET / parkingrecords
- POST / parkingrecords
- PATCH / parkingrecords/in
- PATCH / parkingrecords/out

## 1.POST/login

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```

- _Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

## 2.POST /register

### Description:

- Register customer

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": "string"
}
```

## 3. GET / subscriptions

### Description:

- get all subscription package

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
[
    {
        "id": 1,
        "name": "A",
        "durationAmount": 1,
        "durationUnit": "month",
        "price": 300000,
        "description": "Parking package for 1 month"
    },
    ....
]
```

## 4. GET / locations

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
[
    {
        "id": 1,
        "name": "Green Office Park 1 BSD",
        "coordinate": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                -6.301482183783541,
                106.65056945767215
            ]
        },
        "address": "Jl. BSD Raya Bar., Sampora, Kec. Cisauk, Kabupaten Tangerang, Banten 15345"
    }
    ...
]
```

## 5. GET / vehicles

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
[
  {
    "id": 1,
    "licenseNumber": "B-99-X",
    "brand": "Toyota",
    "color": "black",
    "UserId": 1,
    "nickname": "myCar"
  }
  ...
]
```

## 6. POST / vehicles

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

-Body:

### Response

- _Response (201 - Created)_

```json
{
  "id": "integer",
  "licenseNumber": "string",
  "UserId": "integer"
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": "string"
}
```

## 7. DELETE / vehicles

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- _Response (200 - Ok)_

```json
{
  "message": "string"
}
```

## 8. POST / transactions

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

```json
{
  "token": "string",
  "url": "string"
}
```

## 9. POST / finish/transactions

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

```json
{
  "message": "string"
}
```

## 10. GET / transactions

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- 200 - OK

```json
[
    {
        "id": "integer",
        "status": "string",
        "orderId": "string",
        "startDate": "date",
        "expiredDate": "date",
        "SubscriptionId": "integer",
        "UserId": "integer",
        "Subscription": {
            "id": "integer",
            "name": "string",
            "durationAmount": "integer",
            "durationUnit": "string",
            "price": "integer",
            "description": "string"
        }
    },
    ....
]
```

## 11. PATCH / transactions

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- 200 - Ok

```json
{
  "message": "string"
}
```

## 12. POST / parkingrecords

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

### Response

- 200 - ok

```json
{
  "message": "string"
}
```

## 13. GET / parkingrecords/in

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

## Response

- 200 - Ok

```json
["integer"]
```

## 15 PATCH / parkingrecords/out

### Request

- Headers:

```json
{
  "access_token": "string"
}
```

## Response

- 200 - Ok

```json
["integer"]
```

## Global Error

### Response:

- Response (500 - Internal Server Error)

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

- Response (404 - Not Found)

```json
{
  "statusCode": 404,
  "message": "string"
}
```
