import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class mauLuuServices {
  static async getMauLuuAll() {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.MAUS_LUU.GET_MAUS_LUU_ALL
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async createMauLuu(params: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.MAUS_LUU.CREATE_MAUS_LUU,
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

  static async getMauLuuByID(params: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.MAUS_LUU.GET_MAUS_LUU_BY_ID}?maPhieuLuuMau=${params}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async updateMauLuu(params: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.MAUS_LUU.UPDATE_MAUS_LUU,
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

  static async deleteMauLuu(params: any) {
    try {
      const response = await _APIInstance.delete(
        API.ADMIN.MAUS_LUU.DELETE_MAUS_LUU,
        { params: params }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
