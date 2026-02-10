# API Reference

The FAIRmodels platform provides comprehensive APIs for programmatic access to model metadata, validation services, and model execution.

## 🌐 Available APIs

### 1. Metadata API

Access and search model metadata.

**Base URL**: `https://v3.fairmodels.org`

**Format**: JSON-LD, RDF/XML, HTML

### 2. Model Execution API

Execute predictions using containerized models.

**Base URL**: Model-specific (Docker containers)

**Format**: JSON

**Protocol**: REST

### 3. Validation API (FAIVOR)

Validate models on local datasets.

**Base URL**: Deployment-specific

**Format**: JSON

**Protocol**: REST

## 📋 Metadata API

### Endpoints

#### GET /

Retrieve all available models.

**Request:**
```bash
curl -H "Accept: application/json-ld" https://v3.fairmodels.org
```

**Response:**
```json
[
  {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "identifier": "uuid",
    "name": "Model Name",
    "description": "Model description",
    "url": "https://v3.fairmodels.org/instance/uuid"
  }
]
```

**Status Codes:**
- `200`: Success
- `500`: Server error

---

#### GET /instance/{id}

Retrieve detailed metadata for a specific model.

**Parameters:**
- `id` (path): Model unique identifier (UUID)

**Request:**
```bash
curl -H "Accept: application/json-ld" \
  https://v3.fairmodels.org/instance/e46b07fd-fbd5-4466-9e5b-79dfa36d347d
```

**Response:**
```json
{
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  "identifier": "e46b07fd-fbd5-4466-9e5b-79dfa36d347d",
  "name": "Example Model",
  "description": "Detailed description...",
  "version": "1.0.0",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "applicationCategory": "Clinical Decision Support",
  "url": "https://hub.docker.com/r/org/model",
  "license": "Apache-2.0",
  "performance": {
    "auc": 0.85,
    "accuracy": 0.82
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Model not found
- `500`: Server error

---

#### GET /search

Search models with filters.

**Query Parameters:**
- `q` (string): Search query
- `category` (string): Filter by category
- `min_auc` (float): Minimum AUC threshold
- `license` (string): Filter by license
- `page` (integer): Page number (default: 1)
- `per_page` (integer): Results per page (default: 20)
- `sort` (string): Sort field (`name`, `date`, `performance`)
- `order` (string): Sort order (`asc`, `desc`)

**Request:**
```bash
curl "https://v3.fairmodels.org/search?q=oncology&min_auc=0.80&page=1&per_page=10"
```

**Response:**
```json
{
  "total": 42,
  "page": 1,
  "per_page": 10,
  "results": [
    {
      "identifier": "uuid",
      "name": "Model Name",
      "description": "Description",
      "performance": { "auc": 0.85 }
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid parameters
- `500`: Server error

## 🐳 Model Execution API

Each containerized model implements a standardized REST API.

### Endpoints

#### GET /

Get model metadata.

**Request:**
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "model_uri": "https://v3.fairmodels.org/instance/uuid",
  "model_name": "Example Model",
  "version": "1.0.0",
  "input_parameters": ["feature1", "feature2"],
  "output_format": "probability"
}
```

---

#### POST /predict

Submit data for prediction.

**Request Body:**
```json
{
  "feature1": 10,
  "feature2": 20
}
```

Or batch prediction:
```json
[
  {"feature1": 10, "feature2": 20},
  {"feature1": 15, "feature2": 25}
]
```

**Request:**
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"feature1": 10, "feature2": 20}'
```

**Response:**
```json
{
  "job_id": "abc123",
  "status": "queued",
  "message": "Prediction request submitted"
}
```

**Status Codes:**
- `202`: Accepted (async processing)
- `400`: Invalid input
- `500`: Server error

---

#### GET /status

Check prediction job status.

**Request:**
```bash
curl http://localhost:8000/status
```

**Response:**
```json
{
  "job_id": "abc123",
  "status": 3,
  "status_name": "complete",
  "progress": 100
}
```

**Status Values:**
- `1`: Queued
- `2`: Processing
- `3`: Complete
- `4`: Error

---

#### GET /result

Retrieve prediction results.

**Request:**
```bash
curl http://localhost:8000/result
```

**Response (single prediction):**
```json
{
  "prediction": 0.75,
  "confidence": 0.92,
  "interpretation": "High risk"
}
```

**Response (batch prediction):**
```json
[
  {"prediction": 0.75, "confidence": 0.92},
  {"prediction": 0.45, "confidence": 0.88}
]
```

**Status Codes:**
- `200`: Success
- `404`: No result available
- `500`: Server error

---

#### GET /health

Health check endpoint.

**Request:**
```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-10T12:00:00Z"
}
```

## ✅ Validation API (FAIVOR)

### Endpoints

#### POST /validate

Submit a validation request.

**Request Body:**
```json
{
  "model_id": "uuid",
  "data": [
    {"feature1": 10, "feature2": 20, "outcome": 1},
    {"feature1": 15, "feature2": 25, "outcome": 0}
  ],
  "outcome_column": "outcome",
  "metrics": ["auc", "accuracy", "calibration", "fairness"],
  "subgroups": ["age_group", "gender"]
}
```

**Request:**
```bash
curl -X POST http://localhost:8000/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d @validation_request.json
```

**Response:**
```json
{
  "validation_id": "val-123",
  "status": "processing",
  "estimated_time": 120
}
```

---

#### GET /validation/{id}

Get validation results.

**Request:**
```bash
curl http://localhost:8000/validation/val-123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "validation_id": "val-123",
  "status": "complete",
  "model_id": "uuid",
  "results": {
    "overall": {
      "auc": 0.82,
      "accuracy": 0.78,
      "sensitivity": 0.75,
      "specificity": 0.80
    },
    "calibration": {
      "brier_score": 0.15,
      "ece": 0.08
    },
    "subgroups": {
      "age_group": {
        "young": {"auc": 0.84},
        "old": {"auc": 0.80}
      }
    }
  },
  "visualizations": {
    "roc_curve": "base64...",
    "calibration_plot": "base64..."
  }
}
```

---

#### GET /models

List models in validation system.

**Query Parameters:**
- `search` (string): Search term
- `page` (integer): Page number
- `per_page` (integer): Results per page

**Request:**
```bash
curl http://localhost:8000/models?search=oncology&page=1
```

**Response:**
```json
{
  "total": 15,
  "page": 1,
  "per_page": 20,
  "models": [
    {
      "id": "uuid",
      "name": "Model Name",
      "imported_at": "2026-02-10T10:00:00Z",
      "validations_count": 5
    }
  ]
}
```

---

#### POST /models/import

Import a model by URL.

**Request Body:**
```json
{
  "url": "https://v3.fairmodels.org/instance/uuid"
}
```

**Request:**
```bash
curl -X POST http://localhost:8000/models/import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"url": "https://v3.fairmodels.org/instance/uuid"}'
```

**Response:**
```json
{
  "model_id": "uuid",
  "status": "imported",
  "message": "Model successfully imported"
}
```

## 🔐 Authentication

### API Token

For write operations and private data:

**Obtain Token:**
```bash
curl -X POST http://localhost:8000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "pass"}'
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

**Use Token:**
```bash
curl http://localhost:8000/protected-endpoint \
  -H "Authorization: Bearer eyJ..."
```

## 📊 Rate Limiting

### Current Limits

- **Read Operations**: 100 requests/minute
- **Write Operations**: 20 requests/minute
- **Validation Requests**: 10 requests/hour

### Rate Limit Headers

Response includes rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1707566400
```

### Exceeding Limits

**Status Code**: `429 Too Many Requests`

**Response:**
```json
{
  "error": "Rate limit exceeded",
  "retry_after": 60
}
```

## 🔄 Webhooks

Subscribe to events (coming soon):

### Available Events

- `model.published`: New model added
- `model.updated`: Model metadata updated
- `model.validated`: Validation completed
- `model.deprecated`: Model marked as deprecated

### Register Webhook

```bash
curl -X POST http://localhost:8000/webhooks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhook",
    "events": ["model.published", "model.validated"]
  }'
```

## 📚 Client Libraries

### Python

```bash
pip install fairmodels-client
```

```python
from fairmodels import FAIRmodelsClient

client = FAIRmodelsClient()

# Get all models
models = client.get_models()

# Get specific model
model = client.get_model('uuid')

# Search models
results = client.search(category='oncology', min_auc=0.80)

# Execute prediction
prediction = client.predict('uuid', data={'feature1': 10})
```

### JavaScript/TypeScript

```bash
npm install @fairmodels/client
```

```javascript
import { FAIRmodelsClient } from '@fairmodels/client';

const client = new FAIRmodelsClient();

// Get all models
const models = await client.getModels();

// Get specific model
const model = await client.getModel('uuid');

// Search models
const results = await client.search({
  category: 'oncology',
  minAuc: 0.80
});

// Execute prediction
const prediction = await client.predict('uuid', {
  feature1: 10
});
```

### R

```r
install.packages("fairmodels")
```

```r
library(fairmodels)

# Initialize client
client <- fairmodels_client()

# Get all models
models <- get_models(client)

# Get specific model
model <- get_model(client, "uuid")

# Search models
results <- search_models(client, 
  category = "oncology", 
  min_auc = 0.80
)

# Execute prediction
prediction <- predict_model(client, "uuid", 
  data = list(feature1 = 10)
)
```

## 🐛 Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Feature 'age' is required",
    "details": {
      "missing_fields": ["age"],
      "provided_fields": ["gender", "weight"]
    }
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_INPUT` | Invalid request data | 400 |
| `UNAUTHORIZED` | Missing or invalid authentication | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `SERVER_ERROR` | Internal server error | 500 |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | 503 |

## 📖 OpenAPI Specification

Full API specification available in OpenAPI 3.0 format:

- [Metadata API Spec](https://v3.fairmodels.org/openapi.json)
- [Model Execution API Spec](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package/blob/main/docker_image/api-specification.yaml)

Use with tools like:
- Swagger UI
- Postman
- API code generators

## 🧪 Testing

### Sandbox Environment

Test API calls without affecting production:

**Base URL**: `https://sandbox.fairmodels.org`

- No authentication required
- Rate limits relaxed
- Test data available
- Reset daily

## 📞 Support

For API questions and issues:

- [GitHub Issues](https://github.com/MaastrichtU-BISS)
- [Documentation](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package)
- Email: support@fairmodels.org (check repository for current contact)

---

Ready to integrate? [Explore the API →](https://v3.fairmodels.org)
