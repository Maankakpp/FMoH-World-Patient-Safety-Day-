# Health Day Server

A comprehensive backend server for the Health Day website, built with Express.js, TypeScript, and MongoDB.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 📧 **Email System**: Email verification, password reset, and event notifications
- 🎯 **Event Management**: CRUD operations for health events with registration system
- 👥 **User Management**: User profiles, registration, and admin controls
- 📊 **Health Monitoring**: Server and database health checks
- 🔒 **Security**: Rate limiting, CORS, helmet, and input validation
- 📝 **Logging**: Request logging with Morgan
- 🗄️ **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: bcryptjs, helmet, cors
- **Development**: tsx, ESLint

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/health-day-db
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get single event (public)
- `POST /api/events` - Create new event (admin/moderator)
- `PUT /api/events/:id` - Update event (admin/moderator)
- `DELETE /api/events/:id` - Delete event (admin/moderator)
- `GET /api/events/category/:category` - Get events by category (public)
- `GET /api/events/search` - Search events (public)

### Registrations
- `POST /api/registrations` - Register for an event (protected)
- `GET /api/registrations/my-registrations` - Get user's registrations (protected)
- `GET /api/registrations/:id` - Get single registration (protected)
- `PUT /api/registrations/:id/cancel` - Cancel registration (protected)
- `POST /api/registrations/:id/feedback` - Submit event feedback (protected)
- `GET /api/registrations/event/:eventId` - Get event registrations (admin/organizer)

### Users
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/change-password` - Change password (protected)
- `POST /api/users/profile-picture` - Upload profile picture (protected)
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `PUT /api/users/:id/role` - Update user role (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Health
- `GET /api/health` - Basic health check
- `GET /api/health/db` - Database health check
- `GET /api/health/detailed` - Detailed system health

## Database Models

### User
- Basic info (name, email, password)
- Role-based access (user, admin, moderator)
- Email verification system
- Profile information (organization, position, address)
- Preferences (notifications, newsletter)

### Event
- Event details (title, description, date, time)
- Location information (venue, address)
- Category classification (workshop, seminar, conference, etc.)
- Participant management (max/current participants)
- Virtual event support
- Speakers and sponsors

### Registration
- User-event relationship
- Registration status (pending, confirmed, cancelled, waitlist)
- Feedback system
- Special requirements and dietary restrictions
- Emergency contact information

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevent abuse with express-rate-limit
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for frontend integration
- **Helmet**: Security headers with helmet
- **Environment Variables**: Secure configuration management

## Email System

The server includes a comprehensive email system for:
- Email verification
- Password reset
- Event registration confirmations
- Event reminders
- Custom email templates with HTML formatting

## Error Handling

- Centralized error handling middleware
- Custom error classes
- Detailed error logging
- User-friendly error messages
- Development vs production error responses

## Monitoring

- Health check endpoints
- Database connection monitoring
- Memory usage tracking
- Server uptime monitoring
- Request logging with Morgan

## Development Tools

- **TypeScript**: Type-safe development
- **ESLint**: Code linting and formatting
- **tsx**: Fast TypeScript execution
- **Hot Reload**: Development server with file watching

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License. 