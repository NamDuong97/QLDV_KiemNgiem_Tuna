import { Box, IconButton, Pagination } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";
import { MouseEvent, useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";
import PopoverBolocChoXetDuyet from "./StatusPhieu/ChoXetDuyet/PopoverBolocChoXetDuyet";
import TableChoXetDuyet from "./StatusPhieu/ChoXetDuyet/TableChoXetDuyet";
import { Align } from "../../../../models/Table";
import ChoXetDuyet from "./StatusPhieu/ChoXetDuyet";
import SidebarMobile from "../components/SidebarMobile";

interface PhieuDKyDVKNProps {}

const keyTag = {
  Cho_Xet_Duyet: "cho-xet-duyet",
  Da_Duyet: "da-duyet",
  Da_Huy: "da-huy",
};

const tableBody = [
  {
    SoDKPT: "SK 05454 FD",
    NguoiGuiMau: "Nguyen Van A",
    DonViGuiMau: "Công Ty ABC",
    NgayGiaoMau: "10/6/2021",
    KetQua: 1,
  },
  {
    SoDKPT: "SK 056765 FD",
    NguoiGuiMau: "Nguyen Van C",
    DonViGuiMau: "Công Ty ABC",
    NgayGiaoMau: "10/6/2021",
    KetQua: 0,
  },
  {
    SoDKPT: "SK 0544545 FD",
    NguoiGuiMau: "Nguyen Van D",
    DonViGuiMau: "Công Ty ABC",
    NgayGiaoMau: "10/6/2021",
    KetQua: 1,
  },
];

const dataTag = [
  {
    name: "Chờ xét duyệt",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Cho_Xet_Duyet}`,
    key: keyTag.Cho_Xet_Duyet,
  },
  {
    name: "Đã duyệt",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Da_Duyet}`,
    key: keyTag.Da_Duyet,
  },
  {
    name: "Đã hủy",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Da_Huy}`,
    key: keyTag.Da_Huy,
  },
];

const PhieuDKyDVKN = (props: PhieuDKyDVKNProps) => {
  const [isMenu, setIsMenu] = useState(true);
  const [isSidebarMobile, setIsSidebarMobile] = useState(false);

  const navigate = useNavigate();
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  const isTag = queryParams.get("tuna");
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);

  const handleIsOpenSidebarMobile = (newOpen: boolean) => () => {
    setOpenSidebarMobile(newOpen);
    setIsMenu(!isMenu);
  };

  // const handleClickMenu = () => {
  //   return isSidebarMobile
  //     ? handleIsOpenSidebarMobile(true)
  //     : setIsMenu(!isMenu);
  // };

  const handleTagStatus = () => {
    switch (isTag) {
      case "cho-xet-duyet":
        return <ChoXetDuyet />;
      case "da-duyet":
        return <div>Trang đã duyệt</div>;
      case "da-huy":
        return <div>Trang đã hủy</div>;
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
    <AnimatePresence mode="wait">
      <motion.div
        key="form-signup-dvkm"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box className="py-6 px-4 grid gap-4">
          <Box className="flex gap-4 items-center">
            <IconButton onClick={handleIsOpenSidebarMobile(true)}>
              {isMenu ? (
                <AiOutlineMenuUnfold className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
              ) : (
                <FiMenu className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
              )}
            </IconButton>
            <p className="text-sm/6 sm:text-[22px]/6 lg:text-[26px]/6 font-bold text-gray-800">
              Quản Lý Phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm
            </p>
          </Box>
          <Box className="flex gap-6">
            {isMenu && !isSidebarMobile && (
              <Box className="hidden lg:block">
                <Sidebar />
              </Box>
            )}

            <Box className="border border-solid border-gray-300 rounded-[10px] p-2 sm:px-6 sm:py-5 w-full grid gap-6">
              <Box className="border-b border-solid border-gray-300 flex overflow-x-auto whitespace-nowrap no-scrollbar">
                {dataTag.map((item) => (
                  <Box
                    key={item.key}
                    onClick={() => navigate(item.urlTag)}
                    className={`px-3 py-2 sm:px-6 sm:py-4 hover:bg-gray-100 hover:rounded-tl-md hover:rounded-tr-md cursor-pointer ${
                      isTag === item.key &&
                      "bg-[rgb(230,236,246)] border-b border-solid border-[rgb(39,114,255)] rounded-tl-md rounded-tr-md"
                    }`}
                  >
                    <p
                      className={`text-sm/6 sm:text-lg/6 font-semibold text-[#525252] ${
                        isTag === item.key && "!text-[rgb(39,114,255)]"
                      }`}
                    >
                      {item.name}
                    </p>
                  </Box>
                ))}
              </Box>

              {handleTagStatus()}
            </Box>
          </Box>
        </Box>
      </motion.div>
      {isSidebarMobile && (
        <SidebarMobile
          open={openSidebarMobile}
          handleClose={handleIsOpenSidebarMobile(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default PhieuDKyDVKN;
