# AI-Travelling-Planner

## 🌟Overview
AI Travelling Planner is a web application that helps users plan their trips efficiently using AI-powered recommendations. Users can register, log in, create travel itineraries, and receive personalized suggestions for destinations, activities, and accommodations.

## ✨Features

- **✈️ AI-Powered Itinerary Generation**: Dynamically plan trips with smart, AI-generated itineraries tailored to user preferences.

- **🗺️ Trip Management**: Easily browse, create, edit, and manage all your travel plans in one intuitive interface.

- **🔒 Secure User Authentication**: Robust user registration and login system ensuring data privacy.

- **🛡️ Admin Dashboard**: A dedicated interface for administrators to manage users and trips effectively.

- **🤖 Google Gemini AI Integration**: Seamless integration with Google Gemini API for highly relevant and intelligent travel recommendations.




## 🚀Tech Stack
This project is built using a modern full-stack architecture:
- **Frontend**:
    - **React**: A declarative, component-based JavaScript library for building user interfaces.
    - **Vite**: A fast, opinionated build tool for modern web projects.
    - **Axios**: A promise-based HTTP client for making API requests.
- **Backend**:
    - **Node.js**: A JavaScript runtime for building scalable server-side applications.
    - **Express**: A minimalist web framework for Node.js, used for building robust APIs.
    - **MongoDB**: A NoSQL document database for flexible data storage.
    - **JWT (JSON Web Tokens)**: For secure and stateless authentication.
- **AI Integration**:
    - **Google Gemini API**: The powerful AI model providing intelligent recommendations.

## 🛠️ Installation & Setup

Follow these steps to get AI-Travelling-Planner up and running on your local machine.

**Prerequisites**
- Node.js and npm installed
- MongoDB Atlas account (or a local MongoDB instance)
    - You can create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
    - After creating your account, set up a cluster and obtain your connection string
 
- **Node.js and npm**: Ensure you have Node.js (which includes npm) installed. You can download it from nodejs.org.
- **MongoDB Instance**: You'll need access to a MongoDB database.
    - **Recommended**: Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas. After creating your account, set up a cluster and obtain your connection string.
    - **Alternatively**: You can run a local MongoDB instance.
- **Google AI Studio API Key**: Obtain your API key from Google AI Studio.

**Steps**
1. **Clone the repository**:

    ```bash
   -git clone https://github.com/pranjal-git290504/ai-travelling-planner.git
   -cd ai-travelling-planner

2. **Navigate to the `server` directory and install backend dependencies**:

   ```bash
   cd server
   npm install
   
3. **Set up Backend Environment Variables**:

    Create a `.env` file (not `.env.local` for the server, as `.env` is standard for server-side configurations) in the `server` directory with the following variables:
    ```env
    # Server Configuration
    PORT=5000
    NODE_ENV=development
    
    # MongoDB Connection
    MONGO_URI=your_mongodb_connection_string
    
    # JWT Authentication
    JWT_SECRET=your_jwt_secret
    
    # Google Gemini AI API Key
    GEMINI_API_KEY=your_gemini_api_key 
   
- **Important**: Make sure to replace the placeholder values with your actual MongoDB connection string, a strong JWT secret (e.g., a long random string), and your Google Gemini API key.

4. **Navigate to the `client` directory and install frontend dependencies**:

   ```bash
   cd ../client
   npm install
   
5. **Set up Frontend Environment Variables (for Vite)**:

   ```bash
   VITE_API_URL=http://localhost:5000
   VITE_GEMINI_API_KEY=your_gemini_api_key

6. **Run the application**:
   After completing the installation and setup:

   i. **Start the Backend Server**:

      Open a terminal, navigate to the `server` directory, and run:
   
       cd server
       npm run dev    
      The backend server should start on http://localhost:5000.

   ii. **Start the Frontend Development Server**:
   
      Open a new terminal, navigate to the `client` directory, and run:
      
       cd server
       npm run dev
      The frontend application will typically open in your browser at http://localhost:5173.

# 💡 Usage

Once the application is running:

1. **Register/Login**: Navigate to http://localhost:5173 and create a new account or log in if you already have one.
2. **Create a New Trip**: Use the intuitive interface to start planning your next journey. Provide your preferences, and let the AI generate a personalized itinerary.
3. **Explore & Manage**: Browse your saved trips, modify existing plans, and discover new suggestions.

# 📄 License
Distributed under the MIT License. See `LICENSE` file for more information.
