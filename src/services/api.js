/**
 * API Service Layer
 * Centralized Axios configuration and API calls
 * Place in: frontend/src/services/api.js
 */

import axios from "axios";

// Create Axios instance with base URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// ─── Request Interceptor ──────────────────────────────────────
// Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("resolvex_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────
// Handle 401 (auto logout) globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("resolvex_token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

// ============================================================
// AUTH API
// ============================================================
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// ============================================================
// COMPLAINTS API
// ============================================================
export const complaintsAPI = {
  getAll: (params) => api.get("/complaints", { params }),
  getOne: (id) => api.get(`/complaints/${id}`),
  create: (data) => api.post("/complaints", data),
  update: (id, data) => api.put(`/complaints/${id}`, data),
  delete: (id) => api.delete(`/complaints/${id}`),
  rate: (id, rating) => api.put(`/complaints/${id}/rate`, { rating }),
  getAnalytics: () => api.get("/complaints/analytics"),
};

// ============================================================
// USER API
// ============================================================
export const userAPI = {
  updateProfile: (data) => api.put("/users/profile", data),
  getAllUsers: () => api.get("/users"),
};

// ============================================================
// UPLOAD API
// ============================================================
export const uploadAPI = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;
