import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class accessServices {
  static async loginKhachHang(params: any) {
    try {
      const response = await _APIInstance.post(API.CUSTOMER.DANG_NHAP, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (res) {
      return res;
    }
  }

  static async dangKyKhachHang(params: any) {
    try {
      const response = await _APIInstance.post(API.CUSTOMER.DANG_KY, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (res) {
      return res;
    }
  }

  static async getInforUser() {
    try {
      const response = await _APIInstance.get(API.CUSTOMER.USER_INFO);
      return response.data?.data;
    } catch (res: any) {
      return res.response.data;
    }
  }

  static async getRefreshToken(params: any) {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.REFRESH_TOKEN,
        params
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
