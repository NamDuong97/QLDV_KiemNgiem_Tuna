import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";
import { usePersonnel } from "../contexts/PersonelsProvider";

interface RedirectPersonnelProps {
  children: ReactNode;
  pathRedirect: string;
}

const routeGuards: Record<string, { sessionKey: string }> = {
  // [APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to]: {
  //   sessionKey: "sua-phieuDky",
  // },
};

const RedirectPersonnel = ({
  children,
  pathRedirect,
}: RedirectPersonnelProps) => {
  const location = useLocation();
  const guard = routeGuards[location.pathname];
  const { isLoginPersonnel, isLoadingAuth } = usePersonnel();
  console.log("isLoginPersonnel", isLoginPersonnel);
  console.log("isLoadingAuth", isLoadingAuth);

  const passedSessionGuard = guard
    ? !!sessionStorage.getItem(guard.sessionKey)
    : true;
  if (isLoadingAuth) {
    return null;
  }
  if (!isLoginPersonnel || !passedSessionGuard) {
    return <Navigate to={pathRedirect} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RedirectPersonnel;
