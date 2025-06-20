import Cookies from "js-cookie";
import { EKey } from "../constants/commons";

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const token = Cookies.get(EKey.TOKEN);
const payload = token ? parseJwt(token) : null;
export const maNhanVien = payload?.sub;

export const role =
  payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

export default parseJwt;
