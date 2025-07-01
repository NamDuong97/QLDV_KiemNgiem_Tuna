import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class chucVuServices {
  static async getChucVuByID(param: any) {
    try {
      const response = await _APIInstance.get(
        `${API.ADMIN.CHUC_VU.GET_CHUC_VU_BY_ID}?maChucVu=${param}`
      );
      return response?.data;;
    } catch (err: any) {
      return err;
    }
  }
}
