import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class duTruServices {
  static async getDuTruAll() {
    try {
      const response = await _APIInstance.get(API.ADMIN.DU_TRU.GET_DU_TRU_ALL);
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async createDuTru(params: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.DU_TRU.CREATE_DU_TRU,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getDuTruByID(params: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.DU_TRU.GET_DU_TRU_BY_ID}?maPhieuDuTru=${params}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async updateDuTru(params: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.DU_TRU.UPDATE_DU_TRU,
        { params: params },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async duyetDuTru(params: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.DU_TRU.DUYET_DU_TRU,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async deleteDuTru(params: any) {
    try {
      const response = await _APIInstance.delete(
        API.ADMIN.DU_TRU.DELETE_DU_TRU,
        {
          params: params,
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
