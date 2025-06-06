import { Box } from "@mui/material";
import { useState } from "react";
import { motion } from "motion/react";
import ChoXuLy from "./statusHoaDon/ChoXuLy";
import ThanhToan from "./statusHoaDon/ThanhToan";
import HoanThanh from "./statusHoaDon/HoanThanh";
import DaHuy from "./statusHoaDon/DaHuy";

const dataTag = [
  {
    name: "Chờ Xử Lý",
    maID: 1,
  },
  {
    name: "Thanh Toán",
    maID: 2,
  },
  {
    name: "Hoàn Thành",
    maID: 3,
  },
  {
    name: "Đã hủy",
    maID: 4,
  },
];

const QuanLyHoaDon = () => {
  const [isTag, setisTag] = useState(1);

  const handleTagStatus = () => {
    switch (isTag as number) {
      case 2:
        return <ThanhToan />;
      case 3:
        return <HoanThanh />;
      case 4:
        return <DaHuy />;
      default:
        return <ChoXuLy />;
    }
  };

  return (
    <motion.div
      key="QuanLyHoaDon"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="border border-solid border-gray-300 rounded-[10px] p-2 sm:px-6 sm:py-5 w-full grid gap-6"
    >
      <Box className="border-b border-solid border-gray-300 flex justify-between overflow-x-auto whitespace-nowrap">
        {dataTag.map((item) => (
          <Box
            key={item.maID}
            onClick={() => setisTag(item.maID)}
            className={`px-3 py-2 sm:px-6 sm:py-4 w-full text-center hover:bg-gray-100 hover:rounded-tl-md hover:rounded-tr-md cursor-pointer ${
              isTag === item.maID &&
              "bg-[rgb(230,236,246)] border-b border-solid border-[rgb(39,114,255)] rounded-tl-md rounded-tr-md"
            }`}
          >
            <p
              className={`text-sm/6 sm:text-lg/6 font-semibold text-cyan-900 ${
                isTag === item.maID && "!text-[rgb(39,114,255)]"
              }`}
            >
              {item.name}
            </p>
          </Box>
        ))}
      </Box>
      {handleTagStatus()}
    </motion.div>
  );
};

export default QuanLyHoaDon;
