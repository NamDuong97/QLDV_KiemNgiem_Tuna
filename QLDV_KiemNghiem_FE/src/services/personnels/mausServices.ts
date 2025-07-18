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
  static async getLyDoHuyMayByMau_Khoa(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.MAUS.LY_DO_HUY_MAU}?maMau=${param?.maMau}&maKhoa=${param?.maKhoa}`
      );
      return response;
    } catch (err: any) {
      throw err;
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

  static async LDPHoanTraMau(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.MAUS.LDP_HOAN_TRA_MAU,
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

  static async BLDPheDuyetHoanTraMau(param: any) {
    try {
      const response = await _APIInstance.put(
        API.ADMIN.MAUS.BLD_PHE_DUYET_HOAN_TRA_MAU,
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

  static async getCheckMau(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.MAUS.KIEM_TRA_MAU}?maMau=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
