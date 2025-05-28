import { Box } from "@mui/material";
import ThemeRegistry from "../../configs/ThemeRegistry";
import { Outlet } from "react-router";
import HeaderCustomer from "../../components/HeaderCustomer";
import Footer from "../../components/Footer";

export default function LayoutCustomer() {
  return (
    <ThemeRegistry>
      <Box className="flex justify-center">
        <HeaderCustomer />
      </Box>
      <Box className="flex justify-center min-h-screen">
        <Box className={`max-w-[1440px] w-full Outlet`}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </ThemeRegistry>
  );
}
