import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class phieuTienDoServices {
  static async getAll(params: any) {
    try {
      const response = await _APIInstance.get(API.ADMIN.TIEN_DO.GET_ALL, {
        params: params,
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getByID(maPhieuTienDoLamViec: string) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.TIEN_DO.GET_BY_ID}${maPhieuTienDoLamViec}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async create(data: any) {
    try {
      const response = await _APIInstance.post(API.ADMIN.TIEN_DO.CREATE, data);
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async nhanXet(data: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.TIEN_DO.NHAN_XET,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async delete(maPhieuTienDoLamViec: string) {
    try {
      const response = await _APIInstance.delete(
        `${API.ADMIN.TIEN_DO.DELETE}${maPhieuTienDoLamViec}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
