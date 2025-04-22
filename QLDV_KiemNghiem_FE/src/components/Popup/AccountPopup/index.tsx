import { Box } from "@mui/material";

interface AccountPopupProps {
  openAccount: boolean;
}

const AccountPopup = (props: AccountPopupProps) => {
  const { openAccount } = props;

  return (
    <Box
      className={`${openAccount ? "block" : "hidden"}`}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      <Box className="bg-white border-[1px] absolute right-7 border-gray-100 shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25)] rounded-md p-2">
        <Box>
          <p className="text-black">Hồ Sơ</p>
        </Box>
        <Box>
          <p className="text-red-500">Đăng Xuất</p>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPopup;
