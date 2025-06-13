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
}
