# Expense Tracker API

A simple backend API for tracking expenses with validation, idempotent creates, and filterable queries.

## Features
- Create expenses with `POST /expenses`
- Idempotency via `Idempotency-Key` header
- Input validation for amount, category, and date
- Fetch expenses with filters using `GET /expenses`
- Standard API response format
- Consistent error handling

## Tech Stack
- Node.js
- Express
- SQLite

## API Endpoints

### POST /expenses
Create a new expense.

**Example request**
```http
POST /expenses
Content-Type: application/json
Idempotency-Key: your-unique-key
```

```json
{
  "amount": 24.5,
  "category": "Food",
  "date": "2026-05-01",
  "note": "Lunch"
}
```

**Example response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "amount": 24.5,
    "category": "Food",
    "date": "2026-05-01",
    "note": "Lunch"
  }
}
```

### GET /expenses
Fetch expenses with optional filters.

**Example request**
```http
GET /expenses?category=Food&startDate=2026-05-01&endDate=2026-05-31
```

**Example response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "amount": 24.5,
      "category": "Food",
      "date": "2026-05-01",
      "note": "Lunch"
    }
  ]
}
```

## Request & Response Format

**Standard success response**
```json
{
  "success": true,
  "data": {}
}
```

**Standard error response**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Amount must be a positive number"
  }
}
```

## Idempotency
Send the same `Idempotency-Key` with repeated `POST /expenses` requests. The server returns the original response for duplicate requests instead of creating a new record.

## Project Structure
```
backend/
  src/
    controllers/
    services/
    routes/
    db/
    utils/
    app.js
    server.js
```

## Setup (Local)
```bash
git clone <your-repo-url>
cd backend
npm install
npm start
```

## Deployment
- Live API URL: <YOUR_API_URL>
- Live Frontend URL: <YOUR_FRONTEND_URL>

## Testing
- Postman collection included
- Idempotency testing covered
- Edge case testing (invalid input, duplicate requests)

## Future Improvements
- Authentication and user accounts
- Pagination and sorting
- Export to CSV
