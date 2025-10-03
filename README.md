# Analytics Tracker API

A Node.js REST API for tracking and analyzing user events with MongoDB storage and Swagger documentation.

## Features

- Track user events with custom properties
- Retrieve aggregated event analytics
- Filter events by date range and event type
- Interactive API documentation with Swagger UI
- Docker support for easy deployment

## Setup Without Docker

### Prerequisites

- Node.js (v18+)
- MongoDB (v8.0+)

### Installation

```bash
# Clone repository
git clone https://github.com/Sumitmishra3008/Analytics_tracker.git
cd Analytics_tracker/src

# Install dependencies
npm install

# Set environment variables
cp .env.example .env

take note of .env.example in src folder and root folder
copy both as the project has some unconventional structure , package.json is in src folder instead of root folder
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

## Setup With Docker

```bash
# Clone repository
git clone https://github.com/Sumitmishra3008/Analytics_tracker.git
cd Analytics_tracker

# Start with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t analytics-tracker .
docker run -p 5000:5000 analytics-tracker
```

## API Endpoints

### Base URL

- Development: `http://localhost:5000`
- Documentation: `http://localhost:5000/api-docs`

### Create Event

```http
POST /api/events/createevent
Content-Type: application/json

{
  "user_id": "user123",
  "event_name": "button_click",
  "event_data": {
    "button_name": "signup",
    "page": "homepage"
  }
}
```

**Response:**

```json
{
  "message": "Event created successfully"
}
```

### Get Events Analytics

```http
GET /api/events/getevents?start=2024-01-01&end=2024-12-31&event_name=button_click
```

**Response:**

```json
{
  "start": "2024-01-01",
  "end": "2024-12-31",
  "events": {
    "button_click": 45,
    "page_view": 123,
    "signup": 12
  }
}
```

### Health Check

```http
GET /
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/analytics_tracker
```

## Testing

```bash
cd src
npm test
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Documentation:** Swagger UI
- **Testing:** Jest, Supertest
- **Containerization:** Docker

## License
