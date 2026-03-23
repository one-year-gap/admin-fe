import axios from "axios";

export const api = axios.create({
  baseURL: "",
  timeout: 18000,
  withCredentials: true,
});
