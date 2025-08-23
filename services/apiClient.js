import axios from 'axios';

// Create an Axios instance with a predefined configuration.
const apiClient = axios.create({
  // Set the base URL for all requests made with this instance.
  // This is read from the environment variable we just created.
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  ====================================================================================
  INTERCEPTOR (This is a powerful feature for later)
  ====================================================================================
  An interceptor lets us run code automatically on every request.
  Later, when a user is logged in, this code will automatically grab their
  JWT token from storage and add it to the request header. This is
  extremely useful and saves us from doing it manually on every API call.
*/
apiClient.interceptors.request.use(
  (config) => {
    // In future tasks, we'll get the token from localStorage here.
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the 'Authorization' header.
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;