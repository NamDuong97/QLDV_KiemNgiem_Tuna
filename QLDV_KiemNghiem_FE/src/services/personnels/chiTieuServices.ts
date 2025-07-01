import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class chiTieuServices {
  static async getChiTieuAll() {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.CHI_TIEU.GET_CHI_TIEU_ALL
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
