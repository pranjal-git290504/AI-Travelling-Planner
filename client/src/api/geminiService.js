import axios from 'axios';

// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for AI operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const generateItinerary = async (tripPreferences) => {
  try {
    console.log("Sending trip preferences to backend for AI processing:", tripPreferences);
    
    const response = await api.post('/api/gemini/generate-itinerary', tripPreferences);
    
    // The backend will handle all AI processing and return the formatted itinerary
    return response.data;
  } catch (error) {
    console.error("Error generating itinerary via backend:", error);
    
    // Provide a meaningful error message
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(`Failed to generate itinerary: ${error.response.data.message}`);
    } else {
      throw new Error("Failed to generate itinerary. Please try again later.");
    }
  }
};

export { generateItinerary }; 