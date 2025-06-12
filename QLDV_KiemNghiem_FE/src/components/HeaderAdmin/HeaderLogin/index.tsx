import { Box } from "@mui/material";
import { image } from "../../../constants/image";

const HeaderLoginForgot = () => {
  return (
    <div className="bg-white px-6 flex py-2 fixed z-50 w-full border-b-[1px] border-solid border-gray-300">
      <Box className="flex items-center gap-2 cursor-pointer">
        <img
          src={image.imageTunaLogo}
          alt="imageLogo"
          className="h-16"
        />
      </Box>
    </div>
  );
};

export default HeaderLoginForgot;
