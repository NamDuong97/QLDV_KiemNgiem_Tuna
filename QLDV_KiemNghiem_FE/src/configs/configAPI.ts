import axios from "axios";

const _APIInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL_SERVER}`,
});

export default _APIInstance;

export const APIInstance = _APIInstance;
