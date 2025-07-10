import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class phanTichKetQuaServices {
  static async getPhanTichKetQuaAll(param: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHAN_TICH_KET_QUA.GET_PHAN_TICH_KET_QUA_ALL,
        { params: param }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }
  static async getPhanTichKetQuaByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.PHAN_TICH_KET_QUA.GET_PHAN_TICH_KET_QUA_BY_ID}?maPhieuPhanTichKetQua=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async createPhanTichKetQua(param: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.PHAN_TICH_KET_QUA.CREATE_PHAN_TICH_KET_QUA,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async updatePhanTichKetQua(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_TICH_KET_QUA.UPDATE_PHAN_TICH_KET_QUA,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async duyetPhanTichKetQuaLDP(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_TICH_KET_QUA.REVIEW_PHAN_TICH_KET_QUA_LDP,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async duyetPhanTichKetQuaBLD(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_TICH_KET_QUA.REVIEW_PHAN_TICH_KET_QUA_BLD,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async duyetPhanTichKetQuaCUSTOMER(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHAN_TICH_KET_QUA.REVIEW_PHAN_TICH_KET_QUA_CUSTOMER,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async deletePhanTichKetQua(param: any) {
    try {
      const response = await _APIInstance.delete(
        API.ADMIN.PHAN_TICH_KET_QUA.DELETE_PHAN_TICH_KET_QUA,
        param
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
