import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import { GuestInfor } from "../contexts/storeProvider";

interface RedirectCustomerProps {
  children: ReactNode;
  pathRedirect: string;
}

const routeGuards: Record<string, { sessionKey: string }> = {
  [APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to]: {
    sessionKey: "sua-phieuDky",
  },
  [APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to]: {
    sessionKey: "xem-phieuDky",
  },
  [APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_THANH_TOAN_HOA_DON.to]: {
    sessionKey: "show-hoadon",
  },
  [APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_HOA_DON.to]: {
    sessionKey: "show-hoadon",
  },
};

const RedirectCustomer = ({
  children,
  pathRedirect,
}: RedirectCustomerProps) => {
  const { isLogin, isLoadingAuth } = GuestInfor();
  const location = useLocation();
  const guard = routeGuards[location.pathname];
  const passedSessionGuard = guard
    ? !!sessionStorage.getItem(guard.sessionKey)
    : true;

  if (isLoadingAuth) {
    return null;
  }

  if (!isLogin || !passedSessionGuard) {
    return <Navigate to={pathRedirect} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RedirectCustomer;
