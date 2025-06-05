import { Box } from "@mui/material";
import ThemeRegistry from "../../configs/ThemeRegistry";
import { Outlet, useLocation } from "react-router";
import HeaderCustomer from "../../components/HeaderCustomer";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/routers";

export default function LayoutCustomer() {
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname !== APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to)
      sessionStorage.removeItem("sua-phieuDky");
    if (pathname !== APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to)
      sessionStorage.removeItem("xem-phieuDky");
  }, [pathname]);

  return (
    <ThemeRegistry>
      <Box className="flex justify-center">
        <HeaderCustomer />
      </Box>
      <Box className="flex justify-center min-h-screen">
        <Box className={`w-full Outlet`}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </ThemeRegistry>
  );
}
