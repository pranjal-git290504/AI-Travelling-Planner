# AI-Travelling-Planner
AI Travelling Planner is a web application that helps users plan their trips efficiently using AI-powered recommendations. Users can register, log in, create travel itineraries, and receive personalized suggestions for destinations, activities, and accommodations.

# Features
- **✈️ Plan trips with AI-generated itineraries**
- **🗺️ Browse and manage your trips**
- **🔒 User authentication and registration**
- **🛡️ Admin dashboard for user and trip management**
- **🤖 Google Gemini AI integration for smart suggestions**

# Tech Stack
- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **AI Integration**: Google Gemini API

# Environment Variables
Create a `.env.local` file in the `server` directory with the following variables:

MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
GEMINI_API_KEY=your-gemini-api-key

# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret

# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key


# Installation

**Prerequisites**
- Node.js and npm installed
- MongoDB Atlas account (or a local MongoDB instance)
    - You can create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
    - After creating your account, set up a cluster and obtain your connection string

**Steps**
1. Clone the repository:

   ```bash
   -git clone https://github.com/your-username/ai-travelling-planner.git
   -cd ai-travelling-planner

2. Install server dependencies:

   ```bash
   cd server
   npm install
   
3. Install client dependencies:

   ```bash
   cd client
   npm install

4. Set up environment variables:

   - Create a .env file in the server directory with your MongoDB URI and any API keys needed.

5. Run the app
   
  - Start backend: npm run dev (in server)
  - Start frontend: npm run dev (in client)

6. Open your browser and visit <http://localhost:5173> to see the results.
