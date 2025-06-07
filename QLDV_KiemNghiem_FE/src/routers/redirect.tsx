import { Navigate, useLocation } from "react-router";
import { APP_ROUTES } from "../constants/routers";

interface RouterPrivateProps {
  path?: any;
  children: React.ReactNode;
}

const Redirect = (props: RouterPrivateProps) => {
  const { path, children } = props;
  const pathname = useLocation().pathname;

  switch (pathname) {
    case APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to: {
      const isCheck = sessionStorage.getItem("sua-phieuDky");
      if (!isCheck) return <Navigate to={path} replace />;
      return <>{children}</>;
    }
    case APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to: {
      const isCheck = sessionStorage.getItem("xem-phieuDky");
      if (!isCheck) return <Navigate to={path} replace />;
      return <>{children}</>;
    }
    case APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_THANH_TOAN_HOA_DON.to: {
      const isCheck = sessionStorage.getItem("show-hoadon");
      if (!isCheck) return <Navigate to={path} replace />;
      return <>{children}</>;
    }
    case APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_HOA_DON.to: {
      const isCheck = sessionStorage.getItem("show-hoadon");
      if (!isCheck) return <Navigate to={path} replace />;
      return <>{children}</>;
    }
  }
};

export default Redirect;
