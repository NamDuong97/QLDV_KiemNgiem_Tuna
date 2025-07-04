import { Box, Skeleton } from "@mui/material";
import { APP_ROUTES } from "../../../../../../constants/routers";
import { motion } from "motion/react";
import { MdReceipt } from "react-icons/md";
import { useNavigate } from "react-router";
import { image } from "../../../../../../constants/image";
import { ArrowLeft, Eye } from "react-feather";
import { useState } from "react";
import ShowDetailHDBS from "../ShowDetailHDBS";
import { useQueryHoaDonThuByID } from "../../../../../../hooks/personnels/queryHoaDonThu";
import {
  formatDate,
  formatDateNotTime,
  renderTrangThaiHoaDon,
} from "../../../../../../configs/configAll";

const XemChiTiet = () => {
  const navigate = useNavigate();
  const [isCTHD, setisCTHD] = useState(true);
  const [openModelHDBS, setOpenModelHDBS] = useState(false);
  const [saveID, setSaveID] = useState(false);
  const session = sessionStorage.getItem("chi-tiet-hoa-don");
  const id = session ? JSON.parse(session) : "";

  const { data, isLoading } = useQueryHoaDonThuByID({
    queryKey: "queryHoaDonBoSungByID",
    maHoaDonThu: id,
  });
  console.log("datadata", data);

  const handleOpenHDBS = (id: any) => {
    setSaveID(id);
    setOpenModelHDBS(true);
  };

  return (
    <motion.div
      key="XemChiTiet"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
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
        <Box className="!absolute py-6 px-6 2xl:px-20 sm:py-8 bottom-0 w-full flex items-center gap-2 sm:gap-4">
          <button
            className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
            onClick={() =>
              navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to)
            }
          >
            <ArrowLeft className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
          </button>
          <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
            Hóa Đơn {data?.maHD}:
          </h1>
        </Box>
      </Box>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mã hóa đơn:</span>
                  <span className="font-medium text-lg">{data?.maHD}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Số DKPT :</p>
                  <p className="font-medium">
                    <span>{data?.soDKPT}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái hóa đơn:</span>
                  {renderTrangThaiHoaDon(data?.trangThai)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-semibold">Tổng tiền:</span>
                  <span className="text-2xl font-bold text-red-900">
                    {parseInt(data?.tongTien).toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin hóa đơn
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Người lập:</span>
                  <span className="font-medium">
                    {data?.tenNvXuLy
                      ? data?.tenNvXuLy
                      : "Trung tâm kiểm nghiệm Tuna"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày lập:</span>
                  <span className="font-medium">
                    {formatDate(data?.ngayLap)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Ghi chú:
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data?.ghiChu}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3
                onClick={() => setisCTHD(true)}
                className={`text-lg font-semibold rounded-lg ${
                  isCTHD
                    ? "text-green-800 bg-green-50 border border-green-200"
                    : "hover:bg-green-50 text-gray-900"
                }  px-4 py-2 cursor-pointer`}
              >
                Chi tiết hóa đơn
              </h3>
              <h3
                onClick={() => setisCTHD(false)}
                className={`text-lg font-semibold rounded-lg ${
                  isCTHD
                    ? "hover:bg-green-50 text-gray-900"
                    : "text-green-800 bg-green-50 border border-green-200"
                }  px-4 py-2 cursor-pointer`}
              >
                Hóa đơn bổ sung
              </h3>
            </div>
            {isCTHD ? (
              <div
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800`}
              >
                Tổng số chi tiết hóa đơn:
                {data?.dsChiTietHoaDonThu.length || 0}
              </div>
            ) : (
              <div
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800`}
              >
                Tổng số hóa đơn bổ sung:
                {data?.dsHoaDonThuBoSung.length || 0}
              </div>
            )}
          </div>

          {isCTHD ? (
            data?.dsChiTietHoaDonThu && data?.dsChiTietHoaDonThu?.length > 0 ? (
              <div className="space-y-4 overflow-hidden rounded-lg">
                {data?.dsChiTietHoaDonThu?.map((detail: any, index: any) => (
                  <div
                    key={index}
                    className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <MdReceipt className="text-green-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {detail?.maMau}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="col-span-3">
                        <p className="text-gray-600">Ghi chú</p>
                        <p className="font-medium">{detail?.ghiChu}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Thành tiền</p>
                        <p className="font-semibold text-lg text-red-600">
                          {parseInt(detail?.thanhTien).toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">Chưa có chi tiết hóa đơn</p>
              </div>
            )
          ) : data?.dsHoaDonThuBoSung && data?.dsHoaDonThuBoSung?.length > 0 ? (
            <div className="space-y-4 overflow-hidden rounded-lg">
              {data?.dsHoaDonThuBoSung?.map((detail: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handleOpenHDBS(detail?.maId)}
                  className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MdReceipt className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Hóa đơn bổ sung #{index}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}
                      >
                        Đã thanh toán
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Nhân viên lập</p>
                      <p className="font-medium">Nguyễn Văn A</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ngày tạo</p>
                      <p className="font-medium">
                        {formatDateNotTime(detail?.ngayTao)}
                      </p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-gray-600">Ghi chú</p>
                      <p className="font-medium">
                        Tao hoa don thanh toan cho phieu dang
                        kySDKPT2025615211551887
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tổng tiền</p>
                      <p className="font-semibold text-lg text-red-600">
                        {parseInt(detail?.tongTien).toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleOpenHDBS(detail?.maId)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">Chưa có hóa đơn bổ sung</p>
            </div>
          )}
        </div>
      </div>
      <ShowDetailHDBS
        open={openModelHDBS}
        handleClose={() => setOpenModelHDBS(false)}
        dataID={saveID}
      />
    </motion.div>
  );
};

export default XemChiTiet;
