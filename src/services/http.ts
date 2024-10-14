import axios from "axios";

export const API = "https://dummyjson.com";

export const http = axios.create({
  baseURL: "https://dummyjson.com",
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
