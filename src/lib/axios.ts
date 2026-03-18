import axios from "axios";

const BASE_URL = "http://admin-api.holliverse.internal:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
