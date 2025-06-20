import { ReactNode } from "react";
import { Navigate } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import Cookies from "js-cookie";
import { EKey } from "../constants/commons";

interface RedirectPersonnelProps {
  children: ReactNode;
  pathRedirect?: string;
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
  const guard = routeGuards[location.pathname];
  const login = Cookies.get(EKey.TOKEN);
  const passedSessionGuard = guard
    ? !!sessionStorage.getItem(guard.sessionKey)
    : true;

  if (!login || !passedSessionGuard) {
    return (
      <Navigate
        to={pathRedirect ? pathRedirect : APP_ROUTES.TUNA_ADMIN.LOGIN.to}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default RedirectPersonnel;
