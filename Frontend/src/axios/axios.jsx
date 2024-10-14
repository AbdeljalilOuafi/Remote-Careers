// src/axios/axios.js
import axios from 'axios';

// Create an instance of Axios with a custom configuration
const axiosInstance = axios.create({
    baseURL: 'https://www.remotecareers.tech/api', // Set to the root URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Add token if available
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);  // Handle the error
    }
  );


// Export the custom instance for use in other parts of your application
export default axiosInstance;