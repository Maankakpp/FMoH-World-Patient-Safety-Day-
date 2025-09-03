# Health Day Server API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:
```json
{
  "success": true/false,
  "data": {...} // or "error": "error message"
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "organization": "Healthcare Inc",
  "position": "Doctor",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": true
  }
}
```

### Verify Email
**GET** `/auth/verify-email/:token`

Verify user's email address using verification token.

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Forgot Password
**POST** `/auth/forgot-password`

Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### Reset Password
**POST** `/auth/reset-password/:token`

Reset password using reset token.

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Get Current User
**GET** `/auth/me` *(Protected)*

Get current user's profile information.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "organization": "Healthcare Inc",
    "position": "Doctor",
    "isEmailVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Events Endpoints

### Get All Events
**GET** `/events`

Get paginated list of all active events.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 10
    }
  },
  "data": [
    {
      "id": "event-id",
      "title": "World Patient Safety Day Conference",
      "description": "Join us for the annual conference...",
      "date": "2024-09-17T00:00:00.000Z",
      "startTime": "09:00",
      "endTime": "17:00",
      "location": {
        "venue": "Grand Conference Center",
        "address": "123 Health Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "category": "conference",
      "maxParticipants": 500,
      "currentParticipants": 0,
      "isActive": true,
      "isVirtual": false,
      "tags": ["patient safety", "healthcare"],
      "organizer": {
        "id": "organizer-id",
        "name": "Admin User",
        "email": "admin@healthday.com"
      }
    }
  ]
}
```

### Get Single Event
**GET** `/events/:id`

Get detailed information about a specific event.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "event-id",
    "title": "World Patient Safety Day Conference",
    "description": "Join us for the annual conference...",
    "date": "2024-09-17T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "17:00",
    "location": {
      "venue": "Grand Conference Center",
      "address": "123 Health Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "category": "conference",
    "maxParticipants": 500,
    "currentParticipants": 0,
    "isActive": true,
    "isVirtual": false,
    "virtualMeetingLink": null,
    "tags": ["patient safety", "healthcare"],
    "requirements": "Healthcare professionals, students...",
    "agenda": "9:00 AM - Opening Ceremony...",
    "speakers": [
      {
        "name": "Dr. Sarah Johnson",
        "title": "Chief Medical Officer",
        "organization": "Global Health Institute",
        "bio": "Leading expert in patient safety..."
      }
    ],
    "sponsors": [
      {
        "name": "World Health Organization",
        "logo": "/sponsors/who-logo.png",
        "website": "https://www.who.int"
      }
    ],
    "organizer": {
      "id": "organizer-id",
      "name": "Admin User",
      "email": "admin@healthday.com",
      "organization": "Health Day Organization"
    }
  }
}
```

### Create Event
**POST** `/events` *(Protected - Admin/Moderator)*

Create a new event.

**Request Body:**
```json
{
  "title": "New Health Workshop",
  "description": "Interactive workshop on health topics",
  "date": "2024-10-15",
  "startTime": "14:00",
  "endTime": "16:00",
  "location": {
    "venue": "Community Center",
    "address": "456 Main Street",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90210",
    "country": "USA"
  },
  "category": "workshop",
  "maxParticipants": 50,
  "isVirtual": false,
  "tags": ["workshop", "health"],
  "requirements": "Open to all healthcare professionals",
  "agenda": "2:00 PM - Introduction\n2:15 PM - Workshop\n3:45 PM - Q&A"
}
```

### Update Event
**PUT** `/events/:id` *(Protected - Admin/Moderator/Organizer)*

Update an existing event.

**Request Body:** (same as create, all fields optional)

### Delete Event
**DELETE** `/events/:id` *(Protected - Admin/Moderator/Organizer)*

Delete an event.

### Get Events by Category
**GET** `/events/category/:category`

Get all events in a specific category.

**Categories:** workshop, seminar, conference, exhibition, other

### Search Events
**GET** `/events/search`

Search events with filters.

**Query Parameters:**
- `q` (optional): Search query
- `category` (optional): Event category
- `date` (optional): Specific date (YYYY-MM-DD)

---

## Registration Endpoints

### Register for Event
**POST** `/registrations` *(Protected)*

Register for an event.

**Request Body:**
```json
{
  "eventId": "event-id",
  "dietaryRestrictions": "Vegetarian",
  "specialRequirements": "Wheelchair accessible seating",
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+1234567890",
    "relationship": "Spouse"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "registration-id",
    "user": "user-id",
    "event": "event-id",
    "status": "pending",
    "registrationDate": "2024-01-01T00:00:00.000Z",
    "dietaryRestrictions": "Vegetarian",
    "specialRequirements": "Wheelchair accessible seating",
    "emergencyContact": {
      "name": "Jane Doe",
      "phone": "+1234567890",
      "relationship": "Spouse"
    }
  }
}
```

### Get User's Registrations
**GET** `/registrations/my-registrations` *(Protected)*

Get all registrations for the current user.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "registration-id",
      "status": "confirmed",
      "registrationDate": "2024-01-01T00:00:00.000Z",
      "event": {
        "id": "event-id",
        "title": "World Patient Safety Day Conference",
        "date": "2024-09-17T00:00:00.000Z",
        "startTime": "09:00",
        "endTime": "17:00",
        "location": {
          "venue": "Grand Conference Center",
          "city": "New York"
        },
        "category": "conference"
      }
    }
  ]
}
```

### Get Single Registration
**GET** `/registrations/:id` *(Protected)*

Get detailed information about a specific registration.

### Cancel Registration
**PUT** `/registrations/:id/cancel` *(Protected)*

Cancel a registration.

### Submit Event Feedback
**POST** `/registrations/:id/feedback` *(Protected)*

Submit feedback for an attended event.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent event with great speakers and valuable insights."
}
```

### Get Event Registrations (Admin/Organizer)
**GET** `/registrations/event/:eventId` *(Protected)*

Get all registrations for a specific event (admin or event organizer only).

---

## User Endpoints

### Get User Profile
**GET** `/users/profile` *(Protected)*

Get current user's profile.

### Update User Profile
**PUT** `/users/profile` *(Protected)*

Update user profile information.

**Request Body:**
```json
{
  "name": "Updated Name",
  "organization": "New Organization",
  "position": "New Position",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "preferences": {
    "notifications": true,
    "newsletter": false
  }
}
```

### Change Password
**PUT** `/users/change-password` *(Protected)*

Change user password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Upload Profile Picture
**POST** `/users/profile-picture` *(Protected)*

Upload or update profile picture.

**Request Body:**
```json
{
  "profilePicture": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

### Get All Users (Admin Only)
**GET** `/users` *(Protected - Admin)*

Get paginated list of all users.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

### Get User by ID (Admin Only)
**GET** `/users/:id` *(Protected - Admin)*

Get user information by ID.

### Update User Role (Admin Only)
**PUT** `/users/:id/role` *(Protected - Admin)*

Update user's role.

**Request Body:**
```json
{
  "role": "moderator"
}
```

**Available Roles:** user, moderator, admin

### Delete User (Admin Only)
**DELETE** `/users/:id` *(Protected - Admin)*

Delete a user account.

---

## Health Endpoints

### Basic Health Check
**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

### Database Health Check
**GET** `/health/db`

Check database connection status.

**Response:**
```json
{
  "success": true,
  "database": {
    "status": "connected",
    "readyState": 1,
    "host": "localhost",
    "name": "health-day-db"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Detailed Health Check
**GET** `/health/detailed`

Get detailed system health information.

**Response:**
```json
{
  "success": true,
  "server": {
    "uptime": 3600,
    "environment": "development",
    "nodeVersion": "v18.0.0",
    "platform": "linux",
    "memory": {
      "rss": 45.2,
      "heapTotal": 20.1,
      "heapUsed": 15.3,
      "external": 2.1
    }
  },
  "database": {
    "status": "connected",
    "readyState": 1,
    "host": "localhost",
    "name": "health-day-db"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "error": "User role user is not authorized to access this route"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": "Event not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Server error"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 requests per window per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## CORS Configuration

The API is configured to accept requests from:
- Development: `http://localhost:3000`
- Production: Configure via `CORS_ORIGIN` environment variable

---

## File Upload

For file uploads (profile pictures, event images), the API accepts:
- **Content-Type**: `multipart/form-data`
- **Max File Size**: 5MB
- **Supported Formats**: JPEG, PNG, GIF, WebP

---

## WebSocket Support (Future)

Planned features include real-time notifications for:
- Event updates
- Registration confirmations
- Chat functionality during virtual events

---

## Testing

Run tests with:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
``` 