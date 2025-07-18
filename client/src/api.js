import axios from 'axios';

// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUserId'); // Also remove user ID
      localStorage.removeItem('currentUsername');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Real API Implementation --- //

// Trip Management Services
export const tripService = {
  // Get all trips
  getAllTrips: async () => {
    try {
      const response = await api.get('/api/trips');
      return response.data;
    } catch (error) {
      console.error('Error fetching all trips:', error);
      throw error;
    }
  },

  // Get trip by ID
  getTripById: async (id) => {
    try {
      const response = await api.get(`/api/trips/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching trip ${id}:`, error);
      throw error;
    }
  },

  // Create a new trip
  createTrip: async (tripData) => {
    try {
      const response = await api.post('/api/trips', tripData);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  // Update a trip by ID
  updateTrip: async (id, updatedData) => {
    try {
      const response = await api.put(`/api/trips/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating trip ${id}:`, error);
      throw error;
    }
  },

  // Delete a trip by ID
  deleteTrip: async (id) => {
    try {
      const response = await api.delete(`/api/trips/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting trip ${id}:`, error);
      throw error;
    }
  },
};

// Authentication Services
export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        // Store user information for the UI
        localStorage.setItem('currentUserId', response.data.user.id);
        localStorage.setItem('currentUsername', response.data.user.username);
       localStorage.setItem('currentUserIsAdmin', response.data.user.isAdmin ? 'true' : 'false');
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (username, email, password) => {
    try {
      const response = await api.post('/api/auth/register', { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUsername');
    console.log("User logged out. Local storage cleared.");
  },

  // Get current user
  getCurrentUser: () => {
    const userId = localStorage.getItem('currentUserId');
    const username = localStorage.getItem('currentUsername');
    const isAdmin = localStorage.getItem('currentUserIsAdmin') === 'true';
    return userId && username ? { id: userId, username, isAdmin } : null;
  }
};