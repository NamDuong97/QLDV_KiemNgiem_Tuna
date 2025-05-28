import { APP_ROUTES } from "../../../../../constants/routers";
import { Box } from "@mui/material";
import { FaVoteYea } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";


const dataSideBar = [
  {
    name: "Trang Cá Nhân",
    url: "#",
    icon: <IoPersonSharp className="w-7 h-7 text-[#19a67c]" />,
    urlHienThi: "",
  },
  {
    name: "Quản Lý Phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm",
    url: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=cho-xet-duyet`,
    icon: <FaVoteYea className="w-[42px] h-[42px] text-[#404dd2]" />,
    urlHienThi: "quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem",
  },
  {
    name: "Quản Lý Hóa Đơn",
    url: APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to,
    icon: <RiBillLine className="w-7 h-7 text-[#2b89d1]" />,
    urlHienThi: "quan-ly-hoa-don",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const urlPage = useLocation().pathname.split("/")[1];

  return (
    <motion.div
      key="sidebar"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="border border-solid border-gray-300 rounded-[10px] px-4 py-2 w-[300px] grid gap-1"
    >
      {dataSideBar.map((item, index) => (
        <Box
          key={index}
          className="flex gap-2 items-start hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1"
          onClick={() => {
            navigate(item.url);
          }}
        >
          {item.icon}
          <p
            className={`text-[#525252] text-base/6 font-medium ${
              urlPage === item.urlHienThi && "!text-blue-600"
            }`}
          >
            {item.name}
          </p>
        </Box>
      ))}
    </motion.div>
  );
};

export default Sidebar;
