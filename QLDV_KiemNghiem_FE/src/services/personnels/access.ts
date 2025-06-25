import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class accessServices {
  static async loginPersonnel(params: any) {
    const response = await _APIInstance.post(API.ADMIN.DANG_NHAP, params, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }
  static async getInforNhanVien(params: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.NHAN_VIEN.GET_INFOR_NHAN_VIEN}?maNhanVien=${params}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
