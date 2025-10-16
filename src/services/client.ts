import axios from "axios";

const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const URL = import.meta.env.VITE_API_URL;

const config = {
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(config);