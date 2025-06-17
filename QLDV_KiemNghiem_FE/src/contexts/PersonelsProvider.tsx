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
  const [token, setToken] = useState(Cookies.get(EKey.TOKEN));
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove(EKey.TOKEN);
    Cookies.remove(EKey.REFRESH_TOKEN);
    Cookies.remove(EKey.ID);
    setIsLoginPersonnel(false);
    setPersonnelInfo(null);
    navigate(APP_ROUTES.TUNA_ADMIN.LOGIN.to);
    window.location.reload();
  };
  const value = {
    personnelInfo,
    setPersonnelInfo,
    setIsLoginPersonnel,
    isLoginPersonnel,
    logout,
    setToken,
    isLoadingAuth,
    setIsMaID,
    isMaID,
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!token && !isMaID) {
        setIsLoginPersonnel(false);
        setIsLoadingAuth(false);
        return;
      }
      try {
        const res = await accessServices.getInforNhanVien(isMaID);
        setPersonnelInfo(res.data);
        setIsLoginPersonnel(true);
      } catch (err) {
        console.log("err", err);
        setIsLoginPersonnel(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkLogin();
  }, [token, isMaID]);

  return (
    <PersonnelContext.Provider value={value}>
      {children}
    </PersonnelContext.Provider>
  );
};
