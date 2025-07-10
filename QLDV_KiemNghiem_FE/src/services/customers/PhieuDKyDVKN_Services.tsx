import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";
import {
  ParamsPhieuDangKyByTrangThai,
  ThoiGianTieuChuanParams,
} from "../../models/PhieuDangKy";

export default class PhieuDKyDVKN_Services {
  static async getPhieuDangKyKiemNghiemByTrangThai(
    params: ParamsPhieuDangKyByTrangThai
  ) {
    try {
      const response = await _APIInstance.get(
        `${API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_ALL_PHIEU_DANG_KY_BY_TRANG_THAI}?maKH=${params.maKH}&maTrangThaiPhieuDangKy=${params.maTrangThaiPhieuDangKy}`
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async createPhieuDKyDVKN(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.CREATE_PHIEU_DANG_KY,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (res: any) {
      throw res.response?.data;
    }
  }

  static async createDmMau(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.CREATE_DANH_MUC_MAU,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (res) {
      return res;
    }
  }

  static async createTieuChuan(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.CREATE_TRANG_THAI,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (res) {
      return res;
    }
  }

  static async createDmPhuLieuHoaChat(params: any) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.CREATE_DANH_MUC_PLHC,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (res) {
      return res;
    }
  }

  static async getDmMauAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_DANH_MUC_MAU_ALL
      );
      return response?.data;
    } catch (res) {
      console.log("res", res);

      return res;
    }
  }

  static async getLoaiDichVuAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_LOAI_DICH_VU_ALL
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getTrangThaiPhieuDkAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_TRANG_THAI_DKY_ALL
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getTieuChuanAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_TIEU_CHUAN_ALL
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getLoaiMauAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_LOAI_MAU_ALL
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getDmPhuLieuHoaChatAll() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_DANH_MUC_PLHC
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getThoiGianTieuChuan(params: ThoiGianTieuChuanParams) {
    try {
      const response = await _APIInstance.get(
        `${API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_THOI_GIAN_TIEU_CHUAN}?maDmMau=${params.maDmMau}&maTieuChuan=${params.maTieuChuan}`
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async updatePhieuDangKy(params: any) {
    try {
      const response = await _APIInstance.put(
        API.CUSTOMER.UPDATE_PHIEU_DANG_KY,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }
  static async HuyPhieuDangKy(params: any) {
    try {
      const response = await _APIInstance.delete(
        `${API.CUSTOMER.HUY_PHIEU_DANG_KY}?maPhieuDangKy=${params}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async getLocPhieuDky(params: any) {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM
          .GET_LOC_PHIEU_DANG_KY_BY_TRANG_THAI,
        { params: params }
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }
}
