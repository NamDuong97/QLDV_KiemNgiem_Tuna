import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class mauServices {
  static async getDanhSachMauAll(param: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.MAUS.GET_MAU_ALL,
        param
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }
  static async getMauByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.MAUS.GET_MAU_BY_ID}?maMau=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async getLoaiMauAll() {
    try {
      const response = await _APIInstance.get(API.ADMIN.MAUS.GET_LOAI_MAU_ALL);
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async getLoaiMauByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.MAUS.GET_LOAI_MAU_BY_ID}?maLoaiMau=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async HuyMau(param: any) {
    try {
      const response = await _APIInstance.put(API.ADMIN.MAUS.HUY_MAU, param, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getThongKe() {
    try {
      const response = await _APIInstance.get(API.ADMIN.MAUS.THONG_KE_MAUS);
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
