# API Documentation

This document provides detailed information about the Analytics Tracker API endpoints, request/response formats, and usage examples.

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://api.analytics-tracker.com` (when deployed)

## OpenAPI Specification

The complete API specification is available in:

- **YAML Format**: [`openapi.yaml`](./openapi.yaml)
- **JSON Format**: [`openapi.json`](./openapi.json)

You can view the interactive documentation by:

1. Using [Swagger Editor](https://editor.swagger.io/) - paste the YAML/JSON content
2. Using [Redoc](https://redocly.github.io/redoc/) - load the specification file
3. Running locally with tools like `swagger-ui-serve openapi.yaml`

## Authentication

Currently, the API does not require authentication. Future versions may implement JWT-based authentication.

## Endpoints

### Health Check

#### `GET /`

Simple health check endpoint to verify the API is running.

**Response:**

```
Status: 200 OK
Content-Type: text/plain

Hello, World!
```

---

### Create Event

#### `POST /api/events/createevent`

Track a new user event with optional custom properties.

**Request Body:**

```json
{
  "user_id": "string (required)",
  "event_name": "string (required)",
  "event_data": "object (optional)",
  "timestamp": "string (optional, ISO 8601 format)"
}
```

**Examples:**

1. **Button Click Event:**

```json
{
  "user_id": "user123",
  "event_name": "button_click",
  "event_data": {
    "button_name": "signup",
    "page": "homepage",
    "category": "conversion"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

2. **Page View Event:**

```json
{
  "user_id": "user456",
  "event_name": "page_view",
  "event_data": {
    "page": "/dashboard",
    "referrer": "google.com",
    "session_id": "abc123"
  }
}
```

3. **Minimal Event:**

```json
{
  "user_id": "user789",
  "event_name": "signup"
}
```

**Responses:**

**Success (200):**

```json
{
  "message": "Event created successfully"
}
```

**Validation Error (422):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "User ID is required",
      "path": "user_id",
      "location": "body"
    }
  ]
}
```

---

### Get Events

#### `GET /api/events/getevents`

Retrieve aggregated event data with optional filtering.

**Query Parameters:**

- `start` (optional): Start date for filtering (YYYY-MM-DD format)
- `end` (optional): End date for filtering (YYYY-MM-DD format)
- `event_name` (optional): Filter by specific event name

**Examples:**

1. **Get all events:**

```
GET /api/events/getevents
```

2. **Get events in date range:**

```
GET /api/events/getevents?start=2024-01-01&end=2024-01-31
```

3. **Get specific event type:**

```
GET /api/events/getevents?event_name=button_click
```

4. **Combined filters:**

```
GET /api/events/getevents?start=2024-01-01&end=2024-01-31&event_name=purchase
```

**Responses:**

**Success (200):**

```json
{
  "start": "2024-01-01",
  "end": "2024-01-31",
  "events": {
    "button_click": 45,
    "page_view": 123,
    "signup": 12,
    "purchase": 8
  }
}
```

**Empty Results:**

```json
{
  "start": "2024-01-01",
  "end": "2024-01-31",
  "events": {}
}
```

**Validation Error (422):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-date",
      "msg": "start must be a valid date",
      "path": "start",
      "location": "query"
    }
  ]
}
```

## Data Models

### Event Object (Internal)

```json
{
  "event_id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "user123",
  "event_name": "button_click",
  "event_data": {
    "button_name": "signup",
    "page": "homepage"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Field Descriptions:**

- `event_id`: Auto-generated UUID for the event
- `user_id`: Unique identifier for the user performing the action
- `event_name`: Descriptive name for the type of event
- `event_data`: Flexible object containing custom properties
- `timestamp`: When the event occurred (auto-generated if not provided)

## Error Handling

The API uses standard HTTP status codes:

- **200**: Success
- **422**: Validation Error - Invalid request data
- **500**: Internal Server Error

All error responses include a descriptive message to help with debugging.

## Usage Examples

### cURL Examples

**Create an event:**

```bash
curl -X POST http://localhost:5000/api/events/createevent \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "event_name": "button_click",
    "event_data": {
      "button_name": "signup",
      "page": "homepage"
    }
  }'
```

**Get events:**

```bash
curl "http://localhost:5000/api/events/getevents?start=2024-01-01&end=2024-01-31"
```

### JavaScript Examples

**Using fetch API:**

```javascript
// Create event
const createEvent = async () => {
  const response = await fetch("http://localhost:5000/api/events/createevent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: "user123",
      event_name: "button_click",
      event_data: {
        button_name: "signup",
        page: "homepage",
      },
    }),
  });

  const result = await response.json();
  console.log(result);
};

// Get events
const getEvents = async () => {
  const response = await fetch(
    "http://localhost:5000/api/events/getevents?start=2024-01-01&end=2024-01-31"
  );

  const result = await response.json();
  console.log(result);
};
```

### Python Examples

**Using requests library:**

```python
import requests
import json
from datetime import datetime

# Create event
def create_event():
    url = "http://localhost:5000/api/events/createevent"
    data = {
        "user_id": "user123",
        "event_name": "button_click",
        "event_data": {
            "button_name": "signup",
            "page": "homepage"
        }
    }

    response = requests.post(url, json=data)
    print(response.json())

# Get events
def get_events():
    url = "http://localhost:5000/api/events/getevents"
    params = {
        "start": "2024-01-01",
        "end": "2024-01-31"
    }

    response = requests.get(url, params=params)
    print(response.json())
```

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for production use.

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for all origins in development. Configure appropriately for production.

## Changelog

### Version 1.0.0

- Initial API release
- Event creation and retrieval endpoints
- Basic validation and error handling
- OpenAPI 3.1 specification
