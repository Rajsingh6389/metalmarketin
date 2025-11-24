import axios from "axios"

const API = axios.create({
  baseURL: "https://metalmarket-server-2.onrender.com/api",
  // baseURL: "https://metalmarketserver-production.up.railway.app/api",

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
