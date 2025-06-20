import axios from "axios";
import { EKey } from "../constants/commons";
import Cookies from "js-cookie";
import accessServices from "../services/customers/accessService";
import { isProd } from "../utils/env";

const _APIInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL_SERVER}`,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

_APIInstance.interceptors.request.use(
  async (config: any) => {
    const token_guest = Cookies.get(EKey.TOKEN_GUEST);
    const token = Cookies.get(EKey.TOKEN);
    if (token_guest || token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

_APIInstance.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (err: any) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenGuest = Cookies.get(EKey.REFRESH_TOKEN_GUEST);
      const tokenGuest = Cookies.get(EKey.TOKEN_GUEST);

      const refreshToken = Cookies.get(EKey.REFRESH_TOKEN);
      const token = Cookies.get(EKey.TOKEN);

      //Token Khách hàng
      if (!refreshTokenGuest) return Promise.reject(err);
      try {
        const params: any = {
          accessToken: tokenGuest,
          refreshToken: refreshTokenGuest,
        };
        const res = await accessServices.getRefreshTokenKhachHang(params);
        const newToken = res.accessToken || "";
        const newRefreshToken = res.refreshTokenGuest || "";
        Cookies.set(EKey.TOKEN_GUEST, newToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        Cookies.set(EKey.REFRESH_TOKEN_GUEST, newRefreshToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return _APIInstance(originalRequest);
      } catch (err) {
        if (err) {
          return Promise.reject(err);
        }
      }

      //Token trung tâm
      if (!refreshToken) return Promise.reject(err);
      try {
        const params: any = {
          accessToken: token,
          refreshToken: refreshToken,
        };
        const res = await accessServices.getRefreshTokenNhanVien(params);
        const newToken = res.accessToken || "";
        const newRefreshToken = res.refreshToken || "";
        Cookies.set(EKey.TOKEN, newToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        Cookies.set(EKey.REFRESH_TOKEN, newRefreshToken, {
          expires: 2,
          sameSite: "Strict",
          secure: isProd(),
        });
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return _APIInstance(originalRequest);
      } catch (err) {
        if (err) {
          return Promise.reject(err);
        }
      }
    }
    return err;
  }
);

export default _APIInstance;

export const APIInstance = _APIInstance;
