import API from "./axios";

export const fetchProducts = () => API.get("/api/products").then(r => r.data);
export const fetchProduct = (id) => API.get(`/api/products/${id}`).then(r => r.data);
