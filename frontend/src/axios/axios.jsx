// src/axios/axios.js
import axios from 'axios';

// Create an instance of Axios with a custom configuration
const axiosInstance = axios.create({
  // this
    baseURL: 'https://linkedin-data-api.p.rapidapi.com', // Set to the root URL
    // baseURL: 'https://api.remotecareers.tech/api', // Set to the root URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '26c47ff7bbmsh20045f047178745p1f4642jsna6fcb588c3e8', // Move API key here
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com' // Move host here
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
