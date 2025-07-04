import axios from "axios";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";
import accessServices from "../services/customers/accessService";
import { isProd } from "../utils/env";
const expires = 1 / 24;
const _APIInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

// Đính kèm Authorization từ cookies
_APIInstance.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get(EKey.TOKEN);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm dùng chung để refresh token và retry request
const refreshAndRetry = async (
  originalRequest: any,
  accessToken?: string,
  refreshToken?: string
) => {
  try {
    const resNhanVien = await accessServices.getRefreshTokenNhanVien({
      accessToken,
      refreshToken,
    });
    const resTokenKhachHang = await accessServices.getRefreshTokenKhachHang({
      accessToken,
      refreshToken,
    });
    const newAccessToken =
      resNhanVien.accessToken || resTokenKhachHang.accessToken;
    const newRefreshToken =
      resNhanVien.refreshToken || resTokenKhachHang.refreshToken;
    Cookies.set(EKey.TOKEN, newAccessToken, {
      expires: expires,
      sameSite: "Strict",
      secure: isProd(),
    });
    Cookies.set(EKey.REFRESH_TOKEN, newRefreshToken, {
      expires: 7,
      sameSite: "Strict",
      secure: isProd(),
    });

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return _APIInstance(originalRequest);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Xử lý 401 Unauthorized
_APIInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const token = Cookies.get(EKey.TOKEN);
    const refreshToken = Cookies.get(EKey.REFRESH_TOKEN);
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (refreshToken) {
        return refreshAndRetry(originalRequest, token, refreshToken);
      }
    }
    if (token === "undefined" || refreshToken === "undefined") {
      Cookies.remove(EKey.REFRESH_TOKEN);
      Cookies.remove(EKey.ID);
      Cookies.remove(EKey.TOKEN);
    }
    return Promise.reject(err);
  }
);

export default _APIInstance;
export const APIInstance = _APIInstance;
