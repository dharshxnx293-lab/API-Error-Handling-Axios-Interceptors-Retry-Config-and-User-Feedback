import axios from "axios";

// A single, shared Axios instance. Base URL comes from client/.env.development.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach the auth token to every request when one is available.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle app-wide errors in one place; leave component-specific 4xx errors alone.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.href = "/login";
    }

    if (status >= 500) {
      window.alert("Something went wrong. Please try again later.");
    }

    // Preserve the error for TanStack Query retries and component onError handlers.
    return Promise.reject(error);
  }
);

export default apiClient;
