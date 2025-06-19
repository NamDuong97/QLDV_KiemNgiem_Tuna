import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class khoaServices {
  static async getKhoaAll() {
    try {
      const response = await _APIInstance.get(API.ADMIN.KHOA.GET_KHOA_ALL);
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
