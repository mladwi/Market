import axios, { AxiosResponse } from "axios";

export const API = "https://dummyjson.com";

export const http = axios.create({
  baseURL: API,
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);
