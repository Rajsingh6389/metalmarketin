import axios from "axios";

const API = axios.create({
  baseURL: "https://metalmarket-server-jeha.onrender.com/api",
  withCredentials: true, // 🔥 REQUIRED FOR AUTH HEADERS + CORS
});

// Add JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN in LS:", token);     // 🔥 Debug  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("TOKEN SENT:", config.headers.Authorization); // 🔥 Debug
  } else {
    console.log("NO TOKEN FOUND"); // 🔥 Debug
  }

  return config;
});

export default API;
