# Scoreboard API Module Specification

## Overview

This module handles score updates for users on a website that features a real-time scoreboard. The scoreboard displays the top 10 users based on their scores. The module is responsible for:

- Receiving score update requests from clients.
- Validating requests to ensure they are from authorized users.
- Updating user scores in the database.
- Broadcasting changes to the scoreboard in real time.

---

## API Endpoint

### `POST /api/score/update`

#### Request Headers
| Key            | Value                        |
|----------------|------------------------------|
| `Authorization`| `Bearer <JWT access token>`   |
| `Content-Type` | `application/json`           |

#### Request Body

```json
{
  "user_id": "string",
  "score_delta": 10
}
```

- `user_id`: Unique identifier for the user.
- `score_delta`: The number of points to add to the user's score.

#### Response

`200 OK`
```json
{
  "status": "success",
  "new_score": 120
}
```

`401 Unauthorized`
```json
{
  "status": "error",
  "message": "Invalid or expired token."
}
```

`400 Bad Request`
```json
{
  "status": "error",
  "message": "Invalid request format."
}
```

### `GET /api/score/top`
#### Response
`200 OK`
```json
[
  {
    "userId": "string",
    "score": number
  },
  ...
]

```

---

### Scoreboard Update Strategy

To support live scoreboard updates, the module integrates with a WebSocket or Server-Sent Events (SSE) service to broadcast changes to all connected clients when:
- A user's score increases.
- The top 10 list changes.

This ensures the scoreboard reflects real-time updates without page reloads.

### Authentication & Security
- All requests must include a valid JWT token.
- Token must be verified against a trusted auth service.
- Rate limiting (e.g., max 5 updates/min/user) should be applied to prevent abuse.
- Score updates should be idempotent where possible.
- Only authenticated users can update their own scores.

---

### Flow Diagram
```psql
[User completes action]
        |
        v
[Client dispatches POST /api/score/update]
        |
        v
[API server validates token + scoreDelta]
        |
        v
[Score updated in database]
        |
        v
[Publish update to real-time scoreboard service]
        |
        v
[Client queries GET /api/score/top for live data]
```

---

### Assumptions & Limitations
- Only increasing score actions are supported.
- The front-end handles retry logic in case of network failure.
- There’s an existing auth service to validate JWT tokens.
- The scoreboard is maintained in-memory or via cache for fast read performance.

### Suggestions for Improvement
- Rate Limiting: Implement middleware to throttle repeated requests.
- Score Replay Protection: Use request IDs to ensure one-time updates.
- Monitoring: Log and monitor all score changes for audit.
- Caching: Use Redis or similar for real-time scoreboard management.
- Unit Tests: Cover update logic and edge cases thoroughly.

### Future Enhancements

- Support decrementing scores for penalties.
- Leaderboard pagination (top 50, 100, etc.).
- Achievement system integration (e.g., badges, milestones).