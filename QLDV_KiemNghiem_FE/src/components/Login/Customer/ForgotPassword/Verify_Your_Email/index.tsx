"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { image } from "../../../../../constants/image";

interface VerifyYourEmailProps {
  tabPage: boolean;
  dataEmail: any;
  handleRedirectLogin: () => void;
}

const VerifyYourEmail = (props: VerifyYourEmailProps) => {
  const { tabPage, dataEmail, handleRedirectLogin } = props;
  return (
    <Box>
      <Box className="flex gap-10 mb-10 px-6">
        <Box
          className={`${
            tabPage ? "bg-cyan-700" : "bg-gray-400"
          } h-1 w-full rounded-r-full`}
        ></Box>
        <Box
          className={`${
            !tabPage ? "bg-cyan-700" : "bg-gray-400"
          } h-1 w-full rounded-l-full`}
        ></Box>
      </Box>
      <Box className="gap-7 grid pb-10">
        <Box className="flex justify-center">
          <img
            src={image.imageClick}
            alt="imageClick"
            width={168}
            height={126}
            className=""
          />
        </Box>
        <Box className="text-center gap-2 grid">
          <h1 className="text-3xl font-bold">Thông báo</h1>
          <Typography className="text-base/6 font-medium text-gray-400">
            Chúng tôi đã gửi mật khẩu mới đến địa chỉ email của bạn:
          </Typography>
          <p className="text-base/6 font-bold text-black">{dataEmail.email}</p>
          <Typography className="text-base/6 font-medium text-gray-400">
            Vui lòng truy cập vào email của bạn để lấy mật khẩu
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyYourEmail;
