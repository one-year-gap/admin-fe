import axios from "axios";

const BASE_URL = "https://api.admin.holliverse.site";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
