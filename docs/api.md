# DevFlow AI – API Specification

All responses adhere to the standard JSON contract:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "Human readable error description"
  }
}
```

---

## Express Backend Endpoints (`http://localhost:5000/api/v1`)

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/health` | Overall backend health | 200 |
| `GET` | `/health/database` | PostgreSQL connection check | 200, 503 |
| `GET` | `/health/redis` | Redis ping check | 200, 503 |
| `GET` | `/health/ai-service` | Internal proxy check to FastAPI | 200, 503 |

---

## FastAPI AI Service Endpoints (`http://localhost:8000`)

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/health` | AI service status | 200 |
| `GET` | `/health/database` | PostgreSQL async connection check | 200, 503 |
| `GET` | `/health/redis` | Redis async ping check | 200, 503 |
