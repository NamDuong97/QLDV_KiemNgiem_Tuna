import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class QuanlyPhieuDKYKNServices {
  static async quanLyPhieuDKKN(params?: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHIEU_DKY_DVKM.QUAN_LY_PHIEU_DKY_DVKM,
        { params: params }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async xemChitietPhieuDKKM(params: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.PHIEU_DKY_DVKM.XEM_CHI_TIET}${params}`
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }

  static async DanhGiaNhanVien(params: any) {
    // Vừa chạy cho lý do vừa chạy cho duyệt
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHIEU_DKY_DVKM.DANH_GIA_NHANVIEN,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }

  static async DanhGiaBLD(params: any) {
    // Vừa chạy cho lý do từ chối vừa chạy cho duyệt phiếu đăng ký
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHIEU_DKY_DVKM.DANH_GIA_BLD,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }
}
