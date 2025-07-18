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
      throw res.response.data;
    }
  }
  static async doiMatKhau(params: any) {
    try {
      const reponse = _APIInstance.put(API.CUSTOMER.DOI_MAT_KHAU, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return reponse;
    } catch (res: any) {
      throw res.response.data;
    }
  }
}
