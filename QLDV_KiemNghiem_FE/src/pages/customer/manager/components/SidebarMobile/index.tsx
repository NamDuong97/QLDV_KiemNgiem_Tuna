import { APP_ROUTES } from "../../../../../constants/routers";
import { Box, Drawer } from "@mui/material";
import { FaVoteYea } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

interface SidebarProps {
  open?: any;
  handleClose?: () => void;
}

const dataSideBar = [
  {
    name: "Trang Cá Nhân",
    url: "#",
    icon: <IoPersonSharp className="w-7 h-7 text-[#19a67c]" />,
    urlHienThi: "",
  },
  {
    name: "Quản Lý Phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm",
    url: `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`,
    icon: <FaVoteYea className="w-7 h-7 text-[#404dd2]" />,
    urlHienThi: "quan-ly-phieu-dang-ky-dich-vu-kiem-nghiem",
  },
  {
    name: "Quản Lý Hóa Đơn",
    url: APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to,
    icon: <RiBillLine className="w-7 h-7 text-[#2b89d1]" />,
    urlHienThi: "quan-ly-hoa-don",
  },
];

const SidebarMobile = (props: SidebarProps) => {
  const { handleClose, open } = props;
  const navigate = useNavigate();

  const urlPage = useLocation().pathname.split("/")[1];

  return (
    <div className="block lg:hidden">
      <Drawer open={open} onClose={handleClose} anchor="bottom">
        <div className="px-2 py-4 flex justify-start items-center sm:justify-center w-full">
          <div className="grid gap-1">
            {dataSideBar.map((item, index) => (
              <Box
                key={index}
                className="flex gap-2 justify-start sm:justify-center items-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1"
                onClick={() => {
                  navigate(item.url);
                }}
              >
                {item.icon}

                <p
                  className={`text-cyan-800 text-base/6 font-medium whitespace-normal ${
                    urlPage === item.urlHienThi && "text-orange-500"
                  }`}
                >
                  {item.name}
                </p>
              </Box>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SidebarMobile;
