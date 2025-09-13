import { API_BASE_URL } from "@/lib/config";
import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default apiClient;
