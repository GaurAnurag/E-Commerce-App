import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const API = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}
API.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err);
  }
);

export default API;
export const API_BASE = BASE;
