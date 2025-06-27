import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class phanCongNoiBoServices {
  static async getPhanCongNoiBoAll() {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.PHAN_CONG_NOI_BO.GET_ALL
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getPhanCongNoiBoByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.PHAN_CONG_NOI_BO.GET_BY_ID}?maPhanCongNoiBo=${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
