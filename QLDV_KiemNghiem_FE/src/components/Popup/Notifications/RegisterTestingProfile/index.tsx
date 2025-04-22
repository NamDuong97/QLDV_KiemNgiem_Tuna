import { Box, Button, Dialog, Grid2, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";

interface RegisterTestingProfileProps {
  openRegisterTestingProfile: boolean;
  handleCloseRegisterTestingProfile: () => void;
}

const RegisterTestingProfile = (props: RegisterTestingProfileProps) => {
  const { openRegisterTestingProfile, handleCloseRegisterTestingProfile } =
    props;

  const router = useNavigate();

  const handleRedirectProfileRegisterManager = () => {
    handleCloseRegisterTestingProfile();
    router(APP_ROUTES.CUSTOMER_PROFILE_MANAGER.to);
  };

  const handleConform = () => {
    handleCloseRegisterTestingProfile();
  };
  return (
    <Dialog
      open={openRegisterTestingProfile}
      onClose={handleCloseRegisterTestingProfile}
      maxWidth="xl"
      aria-labelledby="alert-dialog-title-RegisterTestingProfile"
      aria-describedby="alert-dialog-description-RegisterTestingProfile"
    >
      <Box className="w-3xl p-9 gap-6 grid">
        <Box className="flex justify-between items-center">
          <Box>
            <p className="font-bold text-3xl/6">Hồ Sơ Đăng Ký Kiểm Nghiệm</p>
          </Box>
          <Box>
            <IconButton
              className="!bg-gray-200 hover:!bg-gray-300"
              onClick={handleCloseRegisterTestingProfile}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="grid gap-8">
          <Box className="gap-4 grid">
            <p className="text-[22px]/6 font-semibold">
              Phần 1 - Thông Tin Khách Hàng:
            </p>
            <Grid2 container spacing={1}>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Họ Tên Khách Hàng:{" "}
                  <span className="font-medium">Nguyễn Văn A</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Số Điện Thoại: <span className="font-medium">0398742964</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Email: <span className="font-medium">vana@gmail.com</span>
                </p>
              </Grid2>
              <Grid2 size={12}>
                <p className="text-lg/6 font-semibold">
                  Địa Chỉ:{" "}
                  <span className="font-medium">
                    604 Tân An, Phường 2, Bính Chánh, TPHCM
                  </span>
                </p>
              </Grid2>
            </Grid2>
          </Box>
          <Box className="gap-4 grid">
            <p className="text-[22px]/6 font-semibold">
              Phần 2 - Thông Tin Mẫu:
            </p>
            <Grid2 container spacing={1}>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Tên Mẫu: <span className="font-medium">Hạt Thủ Ô</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Số Lô: <span className="font-medium">076947</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Ngày Sản Xuất: <span className="font-medium">14/01/2024</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Hạn Dùng: <span className="font-medium">14/01/2027</span>
                </p>
              </Grid2>
              <Grid2 size={6}>
                <p className="text-lg/6 font-semibold">
                  Hình Thức Gửi Mẫu:{" "}
                  <span className="font-medium">Trực Tiếp</span>
                </p>
              </Grid2>
              <Grid2 size={12}>
                <p className="text-lg/6 font-semibold">
                  Yêu Cầu Kiểm Nghiệm:{" "}
                  <span className="font-medium">Thẩm Định Tiêu Chuẩn</span>
                </p>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
        <Box className="gap-4 flex justify-end">
          <Button
            variant="contained"
            onClick={handleRedirectProfileRegisterManager}
          >
            Quay Về Danh Sách Hồ Sơ
          </Button>
          <Button
            variant="text"
            className="!px-6 !text-white !font-semibold !normal-case !bg-green-500 hover:!bg-green-600 !shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
            onClick={handleConform}
          >
            Duyệt
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RegisterTestingProfile;
