import { Box } from "@mui/material";
import { useState } from "react";
import { motion } from "motion/react";
import ChoXuLy from "./statusPhanCong/ChoXuLy";
import DaDuyet from "./statusPhanCong/DaDuyet";

const dataTag = [
  {
    name: "Chờ Xử Lý",
    maID: 1,
  },
  {
    name: "Đã Duyệt",
    maID: 2,
  },
];

const DanhSachPhanCong = () => {
  const [isTag, setisTag] = useState(1);

  const handleTagStatus = () => {
    switch (isTag as number) {
      case 2:
        return <DaDuyet />;
      default:
        return <ChoXuLy />;
    }
  };

  return (
    <motion.div
      key="DanhSachPhanCong"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 w-full grid gap-6"
    >
      <div className="text-center bg-cyan-800 px-6 py-6 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <p className="text-3xl/6 uppercase font-bold text-white">
          Danh sách phân công
        </p>
      </div>
      <Box className="p-6 w-full grid gap-6 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl">
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
                className={`text-sm/6 capitalize sm:text-lg/6 font-semibold text-cyan-900 ${
                  isTag === item.maID && "!text-[rgb(39,114,255)]"
                }`}
              >
                {item.name}
              </p>
            </Box>
          ))}
        </Box>
        {handleTagStatus()}
      </Box>
    </motion.div>
  );
};

export default DanhSachPhanCong;
