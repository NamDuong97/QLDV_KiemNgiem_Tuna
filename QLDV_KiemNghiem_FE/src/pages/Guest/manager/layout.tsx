import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router";
import { image } from "../../../constants/image";
import { APP_ROUTES } from "../../../constants/routers";
import { MdVerified } from "react-icons/md";
import clsx from "clsx";
import { useContext } from "react";
import { StoreContext } from "../../../contexts/storeProvider";

export default function LayoutCustomerManager() {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const { userInfo } = useContext(StoreContext);

  return (
    <div className="flex flex-col items-center w-full">
      <Box className="relative w-full h-72">
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${image.imageBannerPage2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(50%)",
            zIndex: 0,
          }}
        />
        <div className="absolute bottom-0 mb-[-3.5rem] flex justify-center w-full z-10">
          <div className="relative">
            <img
              src={image.imageBanner}
              alt="Avatar"
              className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </Box>
      <div className="mt-16 grid gap-6 w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-cyan-900">
            {userInfo?.tenNguoiDaiDien}
            <MdVerified className="text-blue-500 w-6 h-6" />
          </h1>
        </div>
        <div className="mx-5 lg:mx-0 lg:px-10 overflow-x-auto whitespace-nowrap">
          <div>
            <div className="flex border-b-[2px] border-gray-300 ">
              <button
                onClick={() => navigate(APP_ROUTES.TUNA_CUSTOMER.PROFILE.to)}
                className={clsx(
                  "py-4 px-10 capitalize cursor-pointer text-cyan-900 hover:text-orange-400",
                  {
                    "border-b-[2px] border-orange-400 font-bold text-orange-400":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.PROFILE.to,
                    "font-medium border-gray-300":
                      pathName !== APP_ROUTES.TUNA_CUSTOMER.PROFILE.to,
                  }
                )}
              >
                Trang cá nhân
              </button>
              <button
                onClick={() =>
                  navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to)
                }
                className={clsx(
                  "py-4 px-10 capitalize cursor-pointer hover:text-orange-400",
                  {
                    "border-b-[2px] border-orange-400 font-bold text-orange-400":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to,
                    "font-medium border-gray-300 text-cyan-900 ":
                      pathName !== APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to,
                  }
                )}
              >
                Quản lý phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm
              </button>
              <button
                onClick={() =>
                  navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to)
                }
                className={clsx(
                  "py-4 px-10 capitalize cursor-pointer text-cyan-900 hover:text-orange-400",
                  {
                    "border-b-[2px] border-orange-400 font-bold text-orange-400":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to,
                    "font-medium border-gray-300":
                      pathName !== APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to,
                  }
                )}
              >
                Quản lý hóa đơn
              </button>
              <button
                onClick={() =>
                  navigate(
                    APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.to
                  )
                }
                className={clsx(
                  "py-4 px-10 capitalize cursor-pointer text-cyan-900 hover:text-orange-400",
                  {
                    "border-b-[2px] border-orange-400 font-bold text-orange-400":
                      pathName ===
                      APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.to,
                    "font-medium border-gray-300":
                      pathName !==
                      APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.to,
                  }
                )}
              >
                Quản lý phiếu phân tích kết quả
              </button>
            </div>
          </div>
        </div>
        <div className="px-2 pb-10 sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
