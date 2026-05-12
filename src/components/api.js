import axios from "axios";

const API = axios.create({
  // Ensure karein ki baseURL ke aakhri mein slash ho agar Django use kar rahe hain
  baseURL: "https://leave-management-backend-jydj.onrender.com/",
});

// --- Request Interceptor ---
// Har request ke saath token attach karne ke liye
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// --- Response Interceptor ---
// Agar token expire ho jaye (401 error), toh logout ya refresh handle karne ke liye
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Agar Backend 401 Unauthorized error bhejta hai
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or invalid. Logging out...");

      // LocalStorage saaf karein
      localStorage.clear();

      // User ko login page par redirect karein
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default API;
