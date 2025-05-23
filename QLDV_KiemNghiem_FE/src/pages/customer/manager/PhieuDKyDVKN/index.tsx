import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";
import ChoXetDuyet from "./StatusPhieu/ChoXetDuyet";
import { motion } from "motion/react";

const keyTag = {
  Cho_Xet_Duyet: "cho-xet-duyet",
  Da_Duyet: "da-duyet",
  Da_Huy: "da-huy",
};

const dataTag = [
  {
    name: "Chờ xét duyệt",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Cho_Xet_Duyet}`,
    key: keyTag.Cho_Xet_Duyet,
  },
  {
    name: "Đã duyệt",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Da_Duyet}`,
    key: keyTag.Da_Duyet,
  },
  {
    name: "Đã hủy",
    urlTag: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=${keyTag.Da_Huy}`,
    key: keyTag.Da_Huy,
  },
];

const PhieuDKyDVKN = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const queryParams = new URLSearchParams(url.search);
  const isTag = queryParams.get("tuna");

  // const handleClickMenu = () => {
  //   return isSidebarMobile
  //     ? handleIsOpenSidebarMobile(true)
  //     : setIsMenu(!isMenu);
  // };

  const handleTagStatus = () => {
    switch (isTag) {
      case "cho-xet-duyet":
        return <ChoXetDuyet />;
      case "da-duyet":
        return <div>Trang đã duyệt</div>;
      case "da-huy":
        return <div>Trang đã hủy</div>;
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
      <Box className="border-b border-solid border-gray-300 flex overflow-x-auto whitespace-nowrap no-scrollbar">
        {dataTag.map((item) => (
          <Box
            key={item.key}
            onClick={() => navigate(item.urlTag)}
            className={`px-3 py-2 sm:px-6 sm:py-4 hover:bg-gray-100 hover:rounded-tl-md hover:rounded-tr-md cursor-pointer ${
              isTag === item.key &&
              "bg-[rgb(230,236,246)] border-b border-solid border-[rgb(39,114,255)] rounded-tl-md rounded-tr-md"
            }`}
          >
            <p
              className={`text-sm/6 sm:text-lg/6 font-semibold text-[#525252] ${
                isTag === item.key && "!text-[rgb(39,114,255)]"
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
