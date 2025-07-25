import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class accessServices {
  static async loginKhachHang(params: any) {
    try {
      const response = await _APIInstance.post(API.CUSTOMER.DANG_NHAP, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async dangKyKhachHang(params: any) {
    try {
      const response = await _APIInstance.post(API.CUSTOMER.DANG_KY, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getInforUser() {
    try {
      const response = await _APIInstance.get(API.CUSTOMER.USER_INFO);
      return response;
    } catch (res: any) {
      return res;
    }
  }

  static async getRefreshTokenKhachHang(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.REFRESH_TOKEN_KHACH_HANG,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data?.data;
    } catch (res: any) {
      return res.response.data;
    }
  }

  static async getRefreshTokenNhanVien(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.REFRESH_TOKEN_TRUNG_TAM,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data?.data;
    } catch (res: any) {
      return res.response.data;
    }
  }

  static async postQuenMatKhau(params: any) {
    try {
      const reponse = _APIInstance.post(
        `${API.CUSTOMER.QUEN_MAT_KHAU}?email=${params}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return reponse;
    } catch (res: any) {
      return res.response.data;
    }
  }
}
