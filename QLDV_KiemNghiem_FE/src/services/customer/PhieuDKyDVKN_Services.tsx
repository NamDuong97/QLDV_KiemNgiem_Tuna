import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";
import { PhieuDangKy } from "../../models/PhieuDangKy";

export default class PhieuDKyDVKN_Services {
  static async getAllPhieuDKyDVKN() {
    try {
      const response = await _APIInstance.get(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.GET_ALL_PHIEU_DANG_KY
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }

  static async createPhieuDKyDVKN(params: PhieuDangKy) {
    try {
      const response = await _APIInstance.post(
        API.CUSTOMER.PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.CREATE_PHIEU_DANG_KY,
        {
          params: params,
        }
      );
      return response?.data;
    } catch (res) {
      return res;
    }
  }
}
