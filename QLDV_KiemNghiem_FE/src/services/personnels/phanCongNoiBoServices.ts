import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class phanCongNoiBoServices {
  static async getPhanCongNoiBoAll(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHAN_CONG_NOI_BO.GET_ALL,
        { params: params }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async getLichSuPhanCongAll(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHAN_CONG_NOI_BO.LICH_SU_PHAN_CONG,
        { params: params }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getPhanCongNoiBoByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.PHAN_CONG_NOI_BO.GET_BY_ID}?maPhanCongNoiBo=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async createPhanCongNoiBo(params: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.PHAN_CONG_NOI_BO.CREATE,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async updatePhanCongNoiBo(params: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_CONG_NOI_BO.UPDATE,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async phanCongLai(params: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_CONG_NOI_BO.PHAN_CONG_LAI,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async huyPhanCong(params: any) {
    try {
      const response = await _APIInstance.delete(
        API.ADMIN.PHAN_CONG_NOI_BO.HUY_PHAN_CONG,
        { params: params }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
