import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class phanCongKhoaServices {
  static async createPhieuPhanCongKhoa(params: any) {
    try {
      const response = await _APIInstance.post(
        API.ADMIN.PHIEU_PHIEU_DE_XUAT_PHONG_BAN
          .CREATE_PHIEU_PHIEU_DE_XUAT_PHONG_BAN,
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
  static async getPhanCongKhoaCMAll() {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHIEU_PHIEU_DE_XUAT_PHONG_BAN
          .GET_PHAN_CONG_KHOA_CHUYEN_MON_ALL
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
  static async getPhanCongKhoaCMByID(params: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.PHIEU_PHIEU_DE_XUAT_PHONG_BAN.GET_PHAN_CONG_KHOA_CHUYEN_MON_BY_ID}${params}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getAllDanhSachMau(params: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHIEU_PHIEU_DE_XUAT_PHONG_BAN.GET_DANH_SACH_MAU_All,
        {
          params,
        }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async truongPhongDuyet(params: any) {
    // Vừa chạy cho lý do vừa chạy cho duyệt
    try {
      const response = await _APIInstance.put(
        API.ADMIN.CHI_TIET_PHAN_CONG_KHOA.TRUONG_PHONG_DUYET_MAUS,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }

  static async BLDDuyet(params: any) {
    // Vừa chạy cho lý do vừa chạy cho duyệt
    try {
      const response = await _APIInstance.put(
        API.ADMIN.CHI_TIET_PHAN_CONG_KHOA.BLD_DUYET_MAUS,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response?.data;
    } catch (err: any) {
      return err;
    }
  }
}
