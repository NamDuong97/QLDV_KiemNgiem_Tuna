import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class mauServices {
  static async getKhoaByID(param: any) {
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
}
