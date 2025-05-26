import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PopupNofitication from "./components/PopupNofitication";
import PhieuDKyDVKNForm from "./components/PhieuDKyDVKNForm";
import ListMau from "./components/ListMau";
import ListPLHC from "./components/ListPLHC";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";

const FormSignUpDVKN = () => {
  const [openPopupNofitication, setOpenPopupNofitication] = useState(false);

  const navigate = useNavigate();
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  const isTag = queryParams.get("tuna");

  const handleClickOpenPopupNofitication = () => {
    setOpenPopupNofitication(true);
  };

  const handleClosePopupNofitication = () => {
    setOpenPopupNofitication(false);
  };

  const handleSwitchTagTitle = () => {
    switch (isTag as string) {
      case "danh-sach-mau":
        return (
          <>
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={clsx("w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg", {
                "hidden lg:block": isTag !== "thong-tin-chung",
              })}
            />
            <Box className="flex items-center gap-3">
              <motion.p
                initial={{ backgroundColor: "#99a1af" }}
                animate={{ backgroundColor: "#2b7fff" }}
                exit={{ backgroundColor: "#99a1af" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="p-2 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xl/6">2</span>
              </motion.p>
              <motion.p
                initial={{ color: "#4a5565" }}
                animate={{ color: "#2b7fff" }}
                exit={{ color: "#4a5565" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-xl/6"
              >
                Danh sách mẫu
              </motion.p>
            </Box>
            <hr className="text-gray-300 w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg hidden md:block" />
            <Box className="items-center gap-3 hidden md:flex">
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">3</span>
              </p>
              <p className="text-gray-600 text-xl/6">
                Danh sách phù liệu hóa chất
              </p>
            </Box>
          </>
        );
      case "danh-sach-phu-lieu-hoa-chat":
        return (
          <>
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={clsx("w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg", {
                "hidden lg:block": isTag !== "thong-tin-chung",
              })}
            />
            <Box className="items-center gap-3 hidden md:flex">
              <motion.p
                initial={{ backgroundColor: "#99a1af" }}
                animate={{ backgroundColor: "#2b7fff" }}
                exit={{ backgroundColor: "#99a1af" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="p-2 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xl/6">2</span>
              </motion.p>
              <motion.p
                initial={{ color: "#4a5565" }}
                animate={{ color: "#2b7fff" }}
                exit={{ color: "#4a5565" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-xl/6"
              >
                Danh sách mẫu
              </motion.p>
            </Box>
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg hidden md:block"
            />
            <Box className="flex items-center gap-3">
              <motion.p
                initial={{ backgroundColor: "#99a1af" }}
                animate={{ backgroundColor: "#2b7fff" }}
                exit={{ backgroundColor: "#99a1af" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="p-2 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xl/6">3</span>
              </motion.p>
              <motion.p
                initial={{ color: "#4a5565" }}
                animate={{ color: "#2b7fff" }}
                exit={{ color: "#4a5565" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-xl/6"
              >
                Danh sách phù liệu hóa chất
              </motion.p>
            </Box>
          </>
        );
      default:
        return (
          <>
            <hr className="text-gray-300 w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg hidden md:block" />
            <Box className="items-center gap-3 hidden md:flex">
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">2</span>
              </p>
              <p className="text-gray-600 text-xl/6">Danh sách mẫu</p>
            </Box>
            <hr
              className={`text-gray-300 w-52 lg:w-32 xl:w-52 border-[1px] rounded-lg ${
                isTag !== "danh-sach-phu-lieu-hoa-chat" && "hidden lg:block"
              }`}
            />
            <Box
              className={`items-center gap-3 ${
                isTag !== "danh-sach-phu-lieu-hoa-chat" && "hidden lg:flex"
              }`}
            >
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">3</span>
              </p>
              <p className="text-gray-600 text-xl/6">
                Danh sách phù liệu hóa chất
              </p>
            </Box>
          </>
        );
    }
  };

  const handleSwitchTagItem = () => {
    switch (isTag) {
      case "thong-tin-chung":
        return (
          <PhieuDKyDVKNForm
            handleRedirectTag2={() =>
              navigate(
                `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}?tuna=danh-sach-mau`
              )
            }
          />
        );
      case "danh-sach-mau":
        return (
          <ListMau
            handleRedirectTag1={() =>
              navigate(
                `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}?tuna=thong-tin-chung`
              )
            }
            handleRedirectTag3={() =>
              navigate(
                `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}?tuna=danh-sach-phu-lieu-hoa-chat`
              )
            }
          />
        );
      case "danh-sach-phu-lieu-hoa-chat":
        return (
          <ListPLHC
            handleClickOpenPopupNofitication={handleClickOpenPopupNofitication}
            handleRedirectTag2={() =>
              navigate(
                `${APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}?tuna=danh-sach-mau`
              )
            }
          />
        );
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="form-signup-dvkm"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box className="grid gap-6 py-6 sm:py-16 sm:px-6">
          <Box className="flex items-center gap-6 lg:gap-4 xl:gap-6 justify-center">
            <Box
              className={`${isTag !== "thong-tin-chung" && "hidden lg:block"}`}
            >
              <Box className={`flex items-center gap-3`}>
                <p className="p-2 w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xl/6">1</span>
                </p>
                <p className="text-blue-500 text-xl/6">Thông tin chung</p>
              </Box>
            </Box>

            {handleSwitchTagTitle()}
          </Box>
          <Box className="sm:border sm:border-solid sm:border-gray-300 sm:rounded-[10px] overflow-x-auto whitespace-nowrap">
            {handleSwitchTagItem()}
          </Box>
        </Box>
      </motion.div>
      <PopupNofitication
        openPopupNofitication={openPopupNofitication}
        handleClosePopupNofitication={handleClosePopupNofitication}
      />
    </AnimatePresence>
  );
};

export default FormSignUpDVKN;
