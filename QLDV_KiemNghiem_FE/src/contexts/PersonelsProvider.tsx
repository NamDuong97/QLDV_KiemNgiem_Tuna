import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";
import accessServices from "../services/personnels/access";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../constants/routers";

export const PersonnelContext = createContext<any>(null);

export const usePersonnel = () => useContext(PersonnelContext);

export const PersonnelProvider = ({ children }: PropsWithChildren) => {
  const [personnelInfo, setPersonnelInfo] = useState(null);
  const [isLoginPersonnel, setIsLoginPersonnel] = useState(false);
  const [isMaID, setIsMaID] = useState(Cookies.get(EKey.ID));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get(EKey.TOKEN);

  useEffect(() => {
    const cookie = Cookies.get(EKey.ID);
    if (cookie) {
      setIsMaID(cookie);
    }
  }, []);

  const logout = () => {
    console.log("Đã vào log out");
    Cookies.remove(EKey.TOKEN);
    Cookies.remove(EKey.REFRESH_TOKEN);
    Cookies.remove(EKey.ID);
    setIsMaID(undefined);
    setIsLoginPersonnel(false);
    setPersonnelInfo(null);
    navigate(APP_ROUTES.TUNA_ADMIN.LOGIN.to, { replace: true });
  };
  const value = {
    personnelInfo,
    setPersonnelInfo,
    setIsLoginPersonnel,
    isLoginPersonnel,
    logout,
    isLoadingAuth,
    setIsMaID,
    isMaID,
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (token) {
          const res = await accessServices.getInforNhanVien(isMaID);
          setPersonnelInfo(res.data);
          setIsLoginPersonnel(true);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Token expired or invalid:", err);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <PersonnelContext.Provider value={value}>
      {children}
    </PersonnelContext.Provider>
  );
};
