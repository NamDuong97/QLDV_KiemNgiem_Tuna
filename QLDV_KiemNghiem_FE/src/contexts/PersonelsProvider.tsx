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
import { jwtDecode } from "jwt-decode";

export const PersonnelContext = createContext<any>(null);

export const usePersonnel = () => useContext(PersonnelContext);

const isTokenValid = (token: string | undefined) => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp && decoded.exp > now;
  } catch {
    return false;
  }
};

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
    setToken(undefined);
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
    setToken,
    isLoadingAuth,
    setIsMaID,
    isMaID,
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!isTokenValid(token) || !isMaID) {
        logout();
        setIsLoadingAuth(false);
        return;
      } else {
        try {
          const res = await accessServices.getInforNhanVien(isMaID);
          setPersonnelInfo(res.data);
          setIsLoginPersonnel(true);
        } catch (err) {
          console.error("Token expired or invalid:", err);
          logout(); // quan trọng: gọi logout nếu fail
        } finally {
          setIsLoadingAuth(false);
        }
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
