import axios from "axios";

const _APIInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL_SERVER}`,
  baseURL: `http://103.90.226.217:8080`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default _APIInstance;

export const APIInstance = _APIInstance;
