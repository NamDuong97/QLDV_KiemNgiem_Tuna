import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class QuanlyPhieuDKYKNServices {
  static async quanLyPhieuDKKN(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHIEU_DKY_DVKM.QUAN_LY_PHIEU_DKY_DVKM,
        { params }
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

  static async uploadFile(params: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.PHIEU_DKY_DVKM.UPLOAD_FILE,
        params,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
  static async UndoDanhGiaBLD(params: any) {
    // Vừa chạy cho lý do từ chối vừa chạy cho duyệt phiếu đăng ký
    try {
      const response = await _APIInstance.put(
        API.ADMIN.PHIEU_DKY_DVKM.UNDO_DANH_GIA_BLD,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }

  static async ThongKePhieuDky() {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHIEU_DKY_DVKM.THONG_KE
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
