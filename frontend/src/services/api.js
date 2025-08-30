import axios from 'axios';
import { auth } from './firebase'; // Corrected path

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to add the Firebase auth token to every request
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;