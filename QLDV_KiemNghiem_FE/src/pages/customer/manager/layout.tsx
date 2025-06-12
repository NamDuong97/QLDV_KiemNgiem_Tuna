import { Box, IconButton } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import SidebarMobile from "./components/SidebarMobile";
import { image } from "../../../constants/image";
import { APP_ROUTES } from "../../../constants/routers";

export default function LayoutCustomerManager() {
  const [isMenu, setIsMenu] = useState(true);
  const [isSidebarMobile, setIsSidebarMobile] = useState(false);
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);
  const pathName = useLocation().pathname;
  console.log("path", pathName);

  const handleIsOpenSidebarMobile = (newOpen: boolean) => () => {
    setOpenSidebarMobile(newOpen);
    setIsMenu(!isMenu);
  };

  const handleTitle = () => {
    switch (pathName) {
      case APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to:
        return APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.title;
      case APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to:
        return APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.title;
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMenu(false);
      setIsSidebarMobile(true);
    } else {
      setIsMenu(true);
      setIsSidebarMobile(false);
    }
  }, []);

  return (
    <>
      <Box className="grid gap-4">
        <Box className="relative w-full h-[200px]">
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${image.imageBannerPage2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(50%)",
              zIndex: 0,
            }}
          />
          <Box className="!absolute bottom-0 w-full flex gap-4 items-center px-4 py-6">
            <IconButton
              onClick={handleIsOpenSidebarMobile(true)}
              className="p-1 sm:p-2 rounded-full !bg-gray-200 hover:!bg-blue-200 transition-colors group cursor-pointer"
            >
              {isMenu ? (
                <AiOutlineMenuUnfold className="w-4 h-4 sm:w-[26px] sm:h-[26px] text-cyan-900" />
              ) : (
                <FiMenu className="w-4 h-4 sm:w-[26px] sm:h-[26px] text-cyan-900" />
              )}
            </IconButton>
            <p className="text-base/6 uppercase sm:text-[22px]/6 lg:text-[26px]/6 font-bold text-white">
              {handleTitle()}
            </p>
          </Box>
        </Box>
        <Box className="flex gap-6 py-6 px-4">
          {isMenu && !isSidebarMobile && (
            <Box className="hidden lg:block">
              <Sidebar />
            </Box>
          )}

          <Outlet />
        </Box>
      </Box>
      {isSidebarMobile && (
        <SidebarMobile
          open={openSidebarMobile}
          handleClose={handleIsOpenSidebarMobile(false)}
        />
      )}
    </>
  );
}
