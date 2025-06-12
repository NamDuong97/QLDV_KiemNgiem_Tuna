import { Box } from "@mui/material";
import { APP_ROUTES } from "../../../../constants/routers";
import { motion } from "motion/react";
import { keyTag } from "../../../../models/Account-Customer";
import { useState } from "react";
import DaDuyet from "./StatusPhieu/DaDuyet";
import DangKiemNghiem from "./StatusPhieu/DangKiemNghiem";
import HoanThanh from "./StatusPhieu/HoanThanh";
import DaHuy from "./StatusPhieu/DaHuy";
import ChoXuLy from "./StatusPhieu/ChoXuLy";

const dataTag = [
  {
    name: "Chờ Xử Lý",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    key: keyTag.Cho_Xu_Ly,
    maID: 1,
  },
  {
    name: "Đã Duyệt",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    key: keyTag.Da_Duyet,
    maID: 2,
  },
  {
    name: "Đang Kiểm Nghiệm",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    key: keyTag.Dang_Kiem_Nghiem,
    maID: 3,
  },
  {
    name: "Hoàn Thành",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    key: keyTag.Hoan_Thanh,
    maID: 4,
  },
  {
    name: "Đã Hủy",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    key: keyTag.Da_Huy,
    maID: 5,
  },
];

const PhieuDKyDVKN = () => {
  // const navigate = useNavigate();
  const [isTag, setisTag] = useState(1);

  const handleTagStatus = () => {
    switch (isTag as number) {
      case 2:
        return <DaDuyet />;
      case 3:
        return <DangKiemNghiem />;
      case 4:
        return <HoanThanh />;
      case 5:
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
            key={item.key}
            onClick={() => setisTag(item.maID)}
            className={`px-3 py-2 sm:px-6 sm:py-4 w-full text-center hover:bg-gray-100 hover:rounded-tl-md hover:rounded-tr-md cursor-pointer ${
              isTag === item.maID &&
              "bg-[rgb(230,236,246)] border-b border-solid border-[rgb(39,114,255)] rounded-tl-md rounded-tr-md"
            }`}
          >
            <p
              className={`text-sm/6 sm:text-lg/6 font-semibold text-[#525252] ${
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

export default PhieuDKyDVKN;
