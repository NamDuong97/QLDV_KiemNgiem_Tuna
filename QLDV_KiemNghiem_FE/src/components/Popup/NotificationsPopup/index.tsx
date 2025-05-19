import { Avatar, Box, Button, Popover } from "@mui/material";
import { DataMessenger } from "../../../models/dataMessenger";
import { useState } from "react";
import RegisterTestingProfile from "../Notifications/RegisterTestingProfile";
import { ImHappy } from "react-icons/im";
import { GoDotFill } from "react-icons/go";

interface NotificationsPopupProps {
  dataMessages: DataMessenger[];
  openNotifications: boolean;
  anchorElNotifications?: HTMLButtonElement | null;
  handleCloseNotifications?: () => void;
  handleOpenLoginCustomer?: () => void;
}

const NotificationsPopup = (props: NotificationsPopupProps) => {
  const {
    dataMessages,
    openNotifications,
    handleCloseNotifications,
    anchorElNotifications,
    handleOpenLoginCustomer,
  } = props;

  const isLogin = false;

  const [openRegisterTestingProfile, setOpenRegisterTestingProfile] =
    useState(false);

  const handleOpenRegisterTestingProfile = () =>
    setOpenRegisterTestingProfile(true);
  const handleCloseRegisterTestingProfile = () =>
    setOpenRegisterTestingProfile(false);

  return (
    <Popover
      open={openNotifications}
      anchorEl={anchorElNotifications}
      onClose={handleCloseNotifications}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        {isLogin ? (
          <>
            <Box className="px-3 pt-2 pb-4 border-gray-300">
              <p className="text-2xl/8 font-semibold text-gray-700">
                Thông Báo
              </p>
            </Box>
            <Box className="flex gap-3 pl-3">
              <Box className="py-[6px] px-5 bg-blue-500 rounded-md text-white flex items-center cursor-pointer hover:bg-blue-600">
                <p className="font-semibold text-base">Tất cả</p>
              </Box>
              <Box className="py-[6px] px-5 border border-solid border-gray-300 rounded-md text-gray-600 flex items-center cursor-pointer hover:bg-gray-300">
                <p className="font-semibold text-base">Chưa đọc</p>
              </Box>
            </Box>
            <Box className="h-[310px] overflow-auto mt-2">
              {dataMessages.map((item, index) => (
                <Button
                  key={index}
                  className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full hover:!bg-gray-100`}
                  onClick={handleOpenRegisterTestingProfile}
                >
                  <Box className="px-2">
                    <Avatar />
                  </Box>
                  <Box className="flex-1 text-start">
                    <p
                      className={`font-semibold ${
                        item.status ? "text-gray-400" : "text-gray-600"
                      }  normal-case !text-base/6`}
                    >
                      {item.fullname}{" "}
                      <span className="font-normal">đã gửi thông báo</span>
                    </p>
                    <p
                      className={`${
                        !item.status ? "text-blue-500 " : "!text-gray-500"
                      } !font-bold !text-sm/6 normal-case`}
                    >
                      {item.time}
                    </p>
                  </Box>
                  {!item.status && (
                    <Box>
                      <GoDotFill className="text-blue-500 w-4 h-4" />
                    </Box>
                  )}
                </Button>
              ))}
            </Box>
            <Box className="mt-2 px-2">
              <button className="w-full bg-[#9e9a9a] text-white rounded-sm py-3 cursor-pointer hover:bg-[#777676] font-medium text-lg/4">
                Xem thêm
              </button>
            </Box>
          </>
        ) : (
          <Box className="flex items-center justify-center h-full py-5 px-6">
            <Box className="grid gap-6 w-full">
              <Box className="grid gap-3">
                <Box className="flex justify-center">
                  <ImHappy className="text-gray-500 text-8xl" />
                </Box>
                <Box className="text-center">
                  <p className="font-semibold text-xl/6 text-gray-600">
                    Đăng nhập để xem thông báo !
                  </p>
                </Box>
              </Box>
              <Box className="text-center">
                <button
                  className="w-full py-2 font-medium text-xl/6 bg-blue-500 text-amber-50 rounded cursor-pointer hover:bg-blue-600 inset-[0px_0px_10px_rgba(0,0,0,0.4)]"
                  onClick={() => {
                    handleOpenLoginCustomer?.();
                    handleCloseNotifications?.();
                  }}
                >
                  Đăng nhập
                </button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <RegisterTestingProfile
        openRegisterTestingProfile={openRegisterTestingProfile}
        handleCloseRegisterTestingProfile={handleCloseRegisterTestingProfile}
      />
    </Popover>
  );
};

export default NotificationsPopup;
