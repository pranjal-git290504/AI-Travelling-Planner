# Travel Planner Backend

This is the backend server for the Travel Planner application, providing API endpoints for trip management, user authentication, and AI-powered itinerary generation.

## Features

- User authentication with JWT
- Trip creation, retrieval, updating, and deletion
- AI-powered trip itinerary generation using Google's Gemini API
- MongoDB database for data storage

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Google Gemini API key (for AI features)

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd server
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set a secure JWT secret
   - Add your Google Gemini API key

### Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Trips

- `GET /api/trips` - Get all trips for the logged-in user
- `GET /api/trips/:id` - Get a specific trip
- `POST /api/trips` - Create a new trip
- `PUT /api/trips/:id` - Update a trip
- `DELETE /api/trips/:id` - Delete a trip
- `PUT /api/trips/:id/checklist` - Update trip checklist

### Gemini AI

- `POST /api/gemini/generate-itinerary` - Generate a trip itinerary using AI

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Google Generative AI (Gemini API)

## Project Structure

```
server/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.js       # Main entry point
```
