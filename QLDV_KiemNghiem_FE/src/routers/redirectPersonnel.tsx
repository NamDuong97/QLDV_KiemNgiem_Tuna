import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { usePersonnel } from "../contexts/PersonelsProvider";
import { APP_ROUTES } from "../constants/routers";

interface RedirectPersonnelProps {
  children: ReactNode;
  pathRedirect: string;
}

const routeGuards: Record<string, { sessionKey: string }> = {
  [APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.xem_chi_tiet]: {
    sessionKey: "chi-tiet-phan-cong",
  },
};

const RedirectPersonnel = ({
  children,
  pathRedirect,
}: RedirectPersonnelProps) => {
  const location = useLocation();
  const guard = routeGuards[location.pathname];
  const { isLoginPersonnel, isLoadingAuth } = usePersonnel();

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
