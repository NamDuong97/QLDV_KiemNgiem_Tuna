import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import accessServices from "../services/customers/accessService";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";

export const StoreContext = createContext<any>(null);
export const GuestInfor = () => useContext(StoreContext);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [openLoginCustomer, setOpenLoginCustomer] = useState(false);
  const [token, setToken] = useState(Cookies.get(EKey.TOKEN));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const refreshToken = Cookies.get(EKey.REFRESH_TOKEN);

  const logout = () => {
    Cookies.remove(EKey.TOKEN);
    Cookies.remove(EKey.REFRESH_TOKEN);
    setIsLogin(false);
    setUserInfo(null);
    window.location.reload();
  };

  const value = {
    userInfo,
    setUserInfo,
    setIsLogin,
    isLogin,
    logout,
    setOpenLoginCustomer,
    openLoginCustomer,
    setToken,
    isLoadingAuth,
  };
  useEffect(() => {
    const checkLogin = async () => {
      if (!token && !refreshToken) {
        setIsLogin(false);
        setIsLoadingAuth(false);
        return;
      }
      try {
        const res = await accessServices.getInforUser();
        if (res.status === 200) {
          sessionStorage.setItem("id", JSON.stringify(res?.data?.data?.maId));
        }
        setUserInfo(res?.data?.data);
        setIsLogin(true);
      } catch (err) {
        console.log("err", err);
        setIsLogin(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkLogin();
  }, [token, refreshToken]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
