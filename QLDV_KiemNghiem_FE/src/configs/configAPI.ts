import axios from "axios";
import { EKey } from "../constants/commons";

const _APIInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL_SERVER}`,
  headers: {
    "Content-Type": "application/json",
  },
});

_APIInstance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem(EKey.TOKEN_GUEST);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default _APIInstance;

export const APIInstance = _APIInstance;
