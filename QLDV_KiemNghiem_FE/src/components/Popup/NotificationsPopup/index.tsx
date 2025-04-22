import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Avatar, Box, Button, Tab } from "@mui/material";
import { DataMessenger } from "../../../models/dataMessenger";
import { useState } from "react";
import RegisterTestingProfile from "../Notifications/RegisterTestingProfile";

interface NotificationsPopupProps {
  dataMessages: DataMessenger[];
  openNotifications: boolean;
}

const NotificationsPopup = (props: NotificationsPopupProps) => {
  const { dataMessages, openNotifications } = props;

  const [value, setValue] = useState("1");
  const [openRegisterTestingProfile, setOpenRegisterTestingProfile] =
    useState(false);

  const handleOpenRegisterTestingProfile = () =>
    setOpenRegisterTestingProfile(true);
  const handleCloseRegisterTestingProfile = () =>
    setOpenRegisterTestingProfile(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      className={`${openNotifications ? "block" : "hidden"}`}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      <Box className="w-[400px] h-[480px] absolute z-99 right-24 bg-white border-[2px] border-gray-100 shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25)] rounded-md py-2 px-1">
        <Box className="px-6 pt-2 pb-4 border-gray-300">
          <p className="text-2xl/8 font-semibold text-black">Thông Báo</p>
        </Box>
        <Box className="h-[410px] overflow-auto">
          {dataMessages.map((item, index) => (
            <Button
              key={index}
              className={`flex gap-2 items-center py-3 cursor-pointer rounded w-full  ${
                !item.status && "!bg-blue-100 !rounded"
              } hover:!bg-blue-200`}
              onClick={handleOpenRegisterTestingProfile}
            >
              <Box className="px-2">
                <Avatar />
              </Box>
              <Box className="flex-1 text-start">
                <h5 className="font-semibold text-black">
                  {item.fullname}{" "}
                  <span className="font-normal">đã gửi thông báo</span>
                </h5>
                <p className="text-gray-400 !font-bold !text-sm/6">
                  {item.time}
                </p>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
      <RegisterTestingProfile
        openRegisterTestingProfile={openRegisterTestingProfile}
        handleCloseRegisterTestingProfile={handleCloseRegisterTestingProfile}
      />
    </Box>
  );
};

export default NotificationsPopup;
