import { motion } from "motion/react";
import List from "./List";
import { image } from "../../../../../../../constants/image";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../../../constants/routers";
import { ArrowLeft } from "react-feather";

const PhanTichKetQua = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="PhanTichKetQua"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4"
    >
      <Box className="flex items-center justify-between">
        <Box className="relative w-full h-[200px]">
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${image.imageBannerPage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(50%)",
              zIndex: 0,
            }}
          />
          <Box className="!absolute bottom-0 flex items-center gap-2 sm:gap-4 px-6 py-6">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to)
              }
            >
              <ArrowLeft className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
            </button>
            <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
              Danh sách phiếu phân tích kết quả
            </h1>
          </Box>
        </Box>
      </Box>
      <Box className="p-6">
        <List />
      </Box>
    </motion.div>
  );
};

export default PhanTichKetQua;
