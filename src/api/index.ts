import axios from "axios";

export const api = axios.create({
  baseURL: "https://68466fef7dbda7ee7aaf060c.mockapi.io/",
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((config) => {
  return config;
});
