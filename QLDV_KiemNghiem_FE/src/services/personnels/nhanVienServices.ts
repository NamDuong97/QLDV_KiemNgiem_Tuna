import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class nhanVienServices {
  static async getNhanVienAll(param: any) {
    try {
      const response = await _APIInstance.get(
        API.ADMIN.NHAN_VIEN.GET_NHAN_VIEN_ALL,
        { params: param }
      );
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
