import { Box } from "@mui/material";
import ThemeRegistry from "../../configs/ThemeRegistry";
import { Outlet, useLocation } from "react-router";
import HeaderCustomer from "../../components/HeaderCustomer";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/routers";
import { getInfoUser } from "../../hooks/access/useAccess";
import { useAuth } from "../../configs/stores/auth";

export default function LayoutCustomer() {
  const pathname = useLocation().pathname;
  const { data, isSuccess } = getInfoUser({
    queryKey: "getInfoUser",
  });
  const { setUser, setLogin } = useAuth();

  useEffect(() => {
    if (pathname !== APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to)
      sessionStorage.removeItem("sua-phieuDky");
    if (pathname !== APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to)
      sessionStorage.removeItem("xem-phieuDky");
  }, [pathname]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      setLogin(true);
    }
  }, [isSuccess, data]);

  return (
    <ThemeRegistry>
      <Box className="flex justify-center">
        <HeaderCustomer />
      </Box>
      <Box className="flex justify-center min-h-screen">
        <Box className={`w-full`}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </ThemeRegistry>
  );
}
