import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// AUTH TOKEN
// ============================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("saarthi_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
// DASHBOARD
// ============================================================

export const getDashboardData = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

// ============================================================
// ELIGIBILITY
// ============================================================

export const getEligibilityData = async () => {
  const response = await API.get("/eligibility");
  return response.data;
};

// ============================================================
// DOCUMENTS
// ============================================================

export const getDocuments = async () => {
  const response = await API.get("/documents");
  return response.data;
};

// ============================================================
// UPLOAD DOCUMENT
// ============================================================

export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default API;