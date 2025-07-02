import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class hoaDonThuServices {
  static async getAll(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.HOA_DON_THU.GET_ALL,
        params
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getByGuest(maKH: string) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.HOA_DON_THU.GET_BY_GUEST}${maKH}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getByID(maHoaDonThu: string) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.HOA_DON_THU.GET_BY_ID}${maHoaDonThu}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async delete(maHoaDonThu: string) {
    try {
      const response = await _APIInstance.delete(
        `${API.ADMIN.HOA_DON_THU.DELETE}${maHoaDonThu}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getHoaDonBoSungAll(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.HOA_DON_THU.HOA_DON_BO_SUNG.GET_ALL,
        params
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getHoaDonBoSungByID(maHoaDonThuBoSung: string) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.HOA_DON_THU.HOA_DON_BO_SUNG.GET_BY_ID}${maHoaDonThuBoSung}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async deleteHoaDonBoSung(maHoaDonThuBoSung: string) {
    try {
      const response = await _APIInstance.delete(
        `${API.ADMIN.HOA_DON_THU.HOA_DON_BO_SUNG.DELETE}${maHoaDonThuBoSung}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async createHoaDonBoSung(data: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.HOA_DON_THU.HOA_DON_BO_SUNG.CREATE,
        data
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async updateHoaDonBoSung(data: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.HOA_DON_THU.HOA_DON_BO_SUNG.UPDATE,
        data
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
