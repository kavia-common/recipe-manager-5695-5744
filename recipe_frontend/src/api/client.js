import axios from "axios";

/**
 * Axios API client configured with base URL and auth header injection.
 * Base URL is read from REACT_APP_API_BASE_URL environment variable.
 */
const baseURL = process.env.REACT_APP_API_BASE_URL || "/api";

const client = axios.create({
  baseURL,
  timeout: 15000,
});

// Attach Authorization header if token exists in localStorage
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic response interceptor to unwrap data and propagate errors.
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // You could add global handling for 401 to force logout, etc.
    return Promise.reject(error);
  }
);

export default client;
