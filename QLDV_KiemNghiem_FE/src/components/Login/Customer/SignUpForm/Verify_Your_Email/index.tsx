"use client";

import { Box, Button, Typography } from "@mui/material";
import { image } from "../../../../../constants/image";

interface VerifyYourEmailProps {
  handleRedirectLogin: () => void;
}

const VerifyYourEmail = (props: VerifyYourEmailProps) => {
  const { handleRedirectLogin } = props;
  return (
    <Box>
      <Box className="gap-7 grid">
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
          <h1 className="text-3xl font-bold">Xác thực email</h1>
          <Typography className="text-base/6 font-medium text-gray-400">
            Tạo tài khoản thành công. Chúng tôi đã gửi liên kết đến địa chỉ
            email của bạn
          </Typography>
          <Typography className="text-base/6 font-medium text-gray-400">
            Vui lòng truy cập vào email để xác thực tài khoản.
          </Typography>
        </Box>
        <Box className="flex justify-center">
          <Button variant="contained" onClick={handleRedirectLogin}>
            Quay lại Đăng Nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyYourEmail;
