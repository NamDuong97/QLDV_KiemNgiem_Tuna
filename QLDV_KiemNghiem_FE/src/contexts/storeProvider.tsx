import { createContext, useState, useEffect, PropsWithChildren } from "react";
import accessServices from "../services/customers/accessService";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";

export const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [openLoginCustomer, setOpenLoginCustomer] = useState(false);
  const [token, setToken] = useState(Cookies.get(EKey.TOKEN_GUEST));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const refreshToken = Cookies.get(EKey.REFRESH_TOKEN_GUEST);

  const logout = () => {
    Cookies.remove(EKey.TOKEN_GUEST);
    Cookies.remove(EKey.REFRESH_TOKEN_GUEST);
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
        setUserInfo(res.data.data);
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
