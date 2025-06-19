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
}
