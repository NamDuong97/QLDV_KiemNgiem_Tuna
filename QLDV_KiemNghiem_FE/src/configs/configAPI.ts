import axios from "axios";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";
import accessServices from "../services/customers/accessService";
import { isProd } from "../utils/env";

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
    const tokenGuest = Cookies.get(EKey.TOKEN_GUEST);
    const currentUrl = window.location.href;

    const isTunaRoute = currentUrl.startsWith("http://localhost:5175/tuna");

    if (isTunaRoute) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      if (tokenGuest) {
        config.headers.Authorization = `Bearer ${tokenGuest}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Hàm dùng chung để refresh token và retry request
const refreshAndRetry = async (
  originalRequest: any,
  isGuest: boolean,
  accessToken: string,
  refreshToken: string
) => {
  try {
    const res = isGuest
      ? await accessServices.getRefreshTokenKhachHang({
          accessToken,
          refreshToken,
        })
      : await accessServices.getRefreshTokenNhanVien({
          accessToken,
          refreshToken,
        });
    const newAccessToken = res.accessToken || "";
    const newRefreshToken = isGuest ? res.refreshTokenGuest : res.refreshToken;

    Cookies.set(isGuest ? EKey.TOKEN_GUEST : EKey.TOKEN, newAccessToken, {
      expires: 2,
      sameSite: "Strict",
      secure: isProd(),
    });
    Cookies.set(
      isGuest ? EKey.REFRESH_TOKEN_GUEST : EKey.REFRESH_TOKEN,
      newRefreshToken,
      {
        expires: 2,
        sameSite: "Strict",
        secure: isProd(),
      }
    );

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
    console.log("err.response?.status", err.response?.status);

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = Cookies.get(EKey.TOKEN);
      const refreshToken = Cookies.get(EKey.REFRESH_TOKEN);
      const tokenGuest = Cookies.get(EKey.TOKEN_GUEST);
      const refreshTokenGuest = Cookies.get(EKey.REFRESH_TOKEN_GUEST);

      // Ưu tiên refresh token nhân viên nếu có
      if (token && refreshToken) {
        return refreshAndRetry(originalRequest, false, token, refreshToken);
      }
      // Nếu token khách
      if (tokenGuest && refreshTokenGuest) {
        return refreshAndRetry(
          originalRequest,
          true,
          tokenGuest,
          refreshTokenGuest
        );
      }
      if (!token || !refreshToken) {
        Cookies.remove(EKey.TOKEN);
        Cookies.remove(EKey.REFRESH_TOKEN);
        Cookies.remove(EKey.ID);
      }
      if (!tokenGuest || !refreshTokenGuest) {
        Cookies.remove(EKey.TOKEN_GUEST);
        Cookies.remove(EKey.REFRESH_TOKEN_GUEST);
      }
    }

    return Promise.reject(err);
  }
);

export default _APIInstance;
export const APIInstance = _APIInstance;
