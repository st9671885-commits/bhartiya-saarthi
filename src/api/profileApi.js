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

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put(
    "/profile",
    profileData
  );

  return response.data;
};

export const getEligibility = async () => {
  const response = await API.get("/eligibility");
  return response.data;
};

export default API;