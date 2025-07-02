import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class danhMucPLHCServices {
  static async getDMPLHCByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.DM_PLHC.GET_BY_ID}${param}`
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
