import API from "./axios";

export const userSignup = (payload) =>
  API.post("/api/user/signup", payload).then(r => r.data);

export const login = (email, password) =>
  API.post("/api/auth/login", { email, password }).then(r => r.data);
