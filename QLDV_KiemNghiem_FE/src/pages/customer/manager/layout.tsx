import { Box, IconButton } from "@mui/material";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import SidebarMobile from "./components/SidebarMobile";

export default function LayoutCustomerManager() {
  const [isMenu, setIsMenu] = useState(true);
  const [isSidebarMobile, setIsSidebarMobile] = useState(false);
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);

  const handleIsOpenSidebarMobile = (newOpen: boolean) => () => {
    setOpenSidebarMobile(newOpen);
    setIsMenu(!isMenu);
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
      <Box className="py-6 px-4 grid gap-4">
        <Box className="flex gap-4 items-center">
          <IconButton onClick={handleIsOpenSidebarMobile(true)}>
            {isMenu ? (
              <AiOutlineMenuUnfold className="w-6 h-6 sm:w-[26px] sm:h-[26px] text-cyan-800" />
            ) : (
              <FiMenu className="w-6 h-6 sm:w-[26px] sm:h-[26px] text-cyan-800" />
            )}
          </IconButton>
          <p className="text-sm/6 sm:text-[22px]/6 lg:text-[26px]/6 font-bold text-cyan-800">
            Quản Lý Phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm
          </p>
        </Box>
        <Box className="flex gap-6">
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
