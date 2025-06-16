import _APIInstance from "../../configs/configAPI";
import { API } from "../../constants/commons";

export default class profileServices {
  static async updateInfor(params: any) {
    try {
      const reponse = _APIInstance.put(API.CUSTOMER.UPDATE_INFOR, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return reponse;
    } catch (res: any) {
      return res.response.data;
    }
  }
  static async doiMatKhau(params: any) {
    try {
      const reponse = _APIInstance.put(API.CUSTOMER.UPDATE_INFOR, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return reponse;
    } catch (res: any) {
      return res.response.data;
    }
  }
}
