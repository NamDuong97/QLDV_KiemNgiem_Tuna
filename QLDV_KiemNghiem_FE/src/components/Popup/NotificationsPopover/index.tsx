import { Avatar, Box, Dialog } from "@mui/material";
import { DataMessenger } from "../../../models/dataMessenger";
import { ImHappy } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";

interface NotificationsPopoverProps {
  dataMessages: DataMessenger[];
  openNotifications: boolean;
  handleCloseNotifications?: () => void;
  handleOpenLoginCustomer?: () => void;
}

const NotificationsPopover = (props: NotificationsPopoverProps) => {
  const {
    dataMessages,
    openNotifications,
    handleCloseNotifications,
<<<<<<< HEAD
    // anchorElNotifications,
=======
>>>>>>> 6d72c3716ae543b5d4fde44664beb5062f4e8eac
    handleOpenLoginCustomer,
  } = props;

  const isLogin = true;

  const name = "";

  const handleThongBaoByName = () => {
    switch (name as string) {
      case "Phòng Kế Hoạch và Đầu Tư": {
        return (
          <>
            <Box className="px-3 pt-2 pb-4 border-gray-300 w-[305px]">
              <p className="text-2xl/8 font-semibold text-gray-700">
                Thông Báo
              </p>
            </Box>
            <Box className="flex gap-3 pl-3">
              <Box className="py-[6px] px-5 bg-blue-500 rounded-md text-white flex items-center cursor-pointer hover:bg-blue-600">
                <p className="font-semibold text-base">Khách hàng</p>
              </Box>
              <Box className="py-[6px] px-5 border border-solid border-gray-300 rounded-md text-gray-600 flex items-center cursor-pointer hover:bg-gray-300">
                <p className="font-semibold text-base">Nội bộ</p>
              </Box>
            </Box>
            <Box className="h-[310px] overflow-auto mt-2">
              <p className="px-2 text-lg/6 font-semibold text-gray-800">
                Chưa xem
              </p>
              {dataMessages.map((item, index) => (
                <p
                  key={index}
                  className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full hover:!bg-gray-100`}
                  // onClick={handleOpenRegisterTestingProfile}
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
                </p>
              ))}
              <p className="px-2 text-lg/6 font-semibold text-gray-800 pt-2">
                Đã xem
              </p>
              {dataMessages.map((item, index) => (
                <p
                  key={index}
                  className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full hover:!bg-gray-100`}
                  // onClick={handleOpenRegisterTestingProfile}
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
                </p>
              ))}
              <Box className="px-2 py-2">
                <button className="w-full bg-[#9e9a9a] text-white rounded-sm py-3 cursor-pointer hover:bg-[#777676] font-medium text-lg/4">
                  Xem thêm
                </button>
              </Box>
            </Box>
          </>
        );
      }
      default: {
        return (
          <>
            <Box className="px-3 py-3 relative text-center border-gray-300 sm:w-[550px] bg-cyan-800">
              <p className="text-2xl/8 font-semibold text-white">Thông Báo</p>
              <button
                className="absolute top-3 right-2 group cursor-pointer"
                onClick={handleCloseNotifications}
              >
                <IoCloseCircle className="w-8 h-8 text-white group-hover:text-yellow-300" />
              </button>
            </Box>
            <Box className="h-[410px] overflow-auto">
              <p className="px-2 text-lg/6 font-semibold text-gray-800">
                Chưa xem
              </p>
              {dataMessages.map((item, index) => (
                <p
                  key={index}
                  className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full hover:!bg-gray-100`}
                  // onClick={handleOpenRegisterTestingProfile}
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
                </p>
              ))}
              <p className="px-2 text-lg/6 font-semibold text-gray-800 pt-2">
                Đã xem
              </p>
              {dataMessages.map((item, index) => (
                <p
                  key={index}
                  className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full hover:!bg-gray-100`}
                  // onClick={handleOpenRegisterTestingProfile}
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
                </p>
              ))}
              <Box className="px-2 py-2">
                <button className="w-full bg-[#9e9a9a] text-white rounded-sm py-3 cursor-pointer hover:bg-[#777676] font-medium text-lg/4">
                  Xem thêm
                </button>
              </Box>
            </Box>
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open={openNotifications}
      onClose={handleCloseNotifications}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <Box>
        {isLogin ? (
          handleThongBaoByName()
        ) : (
          <Box className="flex items-center justify-center py-5 px-6">
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
    </Dialog>
  );
};

export default NotificationsPopover;
