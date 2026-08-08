import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("saarthi_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const submitApplication = async (serviceId) => {
  const response = await API.post(
    "/applications",
    {
      service_id: serviceId,
    }
  );

  return response.data;
};

export const getApplications = async () => {
  const response = await API.get(
    "/applications"
  );

  return response.data;
};

export default API;