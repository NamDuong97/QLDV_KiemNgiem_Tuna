import { ArrowLeft, Check, Slash } from "react-feather";
import Detail from "./Detail";
import FormLyDoTuChoi from "./formLyDoTuChoi";
import { motion } from "motion/react";
import { image } from "../../../../../constants/image";
import { APP_ROUTES } from "../../../../../constants/routers";
import { LuDoorOpen } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { useState } from "react";
import { TypeConformation } from "../../../../../constants/typeConfirmation";

export const typeConfirmation = {
  TuChoi: "tuchoi",
  DuyetPhieu: "DuyetPhieu",
};

const ShowDetail = () => {
  // const { data } = getPhanTichKetQuaByID({
  //   queryKey: "PhanTichKetQuaByID",
  //   params: resultId,
  // });

  // const [open, setOpen] = useState(false);
  // const [isTypeConform, setIsTypeConform] = useState<string>("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isTypeConform, setIsTypeConform] = useState<string>("");

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
              navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.to)
            }
          >
            <ArrowLeft className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
          </button>
          <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
            Chi tiết phiếu phân tích PTKQ008:
          </h1>
        </Box>
      </Box>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-end items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setOpen(true);
                setIsTypeConform(typeConfirmation.TuChoi);
              }}
              className="px-4 py-2 bg-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-300 cursor-pointer transition-colors flex items-center space-x-2"
            >
              <Slash size={16} />
              <span>Từ chối</span>
            </button>
            <button
              onClick={() => {
                setOpen(true);
                setIsTypeConform(typeConfirmation.DuyetPhieu);
              }}
              className="px-4 py-2 bg-green-200 text-green-700 rounded-lg hover:bg-green-300 cursor-pointer transition-colors flex items-center space-x-2"
            >
              <Check size={16} />
              <span>Duyệt phiếu</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin cơ bản
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã phiếu:</span>
                    <span className="font-medium text-lg">PTKQ008</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khoa:</span>
                    <span className="font-medium">
                      Khoa Kiểm Nghiệm Hóa Chất
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạng thái:</span>
                    {/* {renderTrangThaiPhanTichKetQua(data?.trangThai)} */}
                    Chờ lãnh đạo phòng duyệt
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin nhân viên
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nhân viên lập:</span>
                    <div className="text-right">
                      <div className="font-medium">Trần Văn C</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày nhận mẫu:</span>
                    <div className="text-right">
                      <div className="font-medium">00:00 01/01/1900</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin thời gian
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày nhận mẫu:</span>
                    <span className="font-medium">00:00 01/01/1900</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày trả kết quả:</span>
                    <span className="font-medium">00:00 01/01/1900</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày tạo:</span>
                    <span className="font-medium">02:04 23/06/2025</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin mẫu
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số DKPT:</span>
                    <span className="font-medium">SDKPT20256160749594</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Đơn vị gửi mẫu:</span>
                    <span className="font-medium">Công ty ABC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tên mẫu:</span>
                    <span className="font-medium">Cay sen</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lô:</span>
                    <span className="font-medium">LOT002</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-medium">200 Gói</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tiêu chuẩn:</span>
                    <span className="font-medium">Trung Quốc 2020</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Đơn vị sản xuất:</span>
                    <span className="font-medium">Công ty Dược B</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Yêu cầu & Ghi chú
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 block mb-2 font-medium">
                      Yêu cầu kiểm nghiệm:
                    </span>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Kiểm nghiệm tạp chất
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Chi tiết kết quả kiểm nghiệm
              </h3>
              <div className="text-sm text-gray-500">
                Tổng số chỉ tiêu:
                {0}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-medium text-sm text-gray-700 border-b border-gray-200">
                <div className="flex items-center">
                  <span>Tên chỉ tiêu</span>
                </div>
                <div className="flex items-center">
                  <span>Kết quả</span>
                </div>
                <div className="flex items-center">
                  <span>Đơn vị</span>
                </div>
                <div className="flex items-center">
                  <span>Mức chất lượng</span>
                </div>
                <div className="flex items-center">
                  <span>Ghi chú</span>
                </div>
              </div>

              {/* {data?.phieuPhanTichKetQuaChiTietDtos?.map(
                (detail: any, index: any) => ( */}
              <Detail
              // key={index}
              // detail={detail}
              // index={index}
              />
              {/* )
              )} */}
            </div>
            {/* {data?.phieuPhanTichKetQuaChiTietDtos &&
            data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 ? (
              
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
                <p className="text-gray-500">
                  Chưa có chi tiết kết quả kiểm nghiệm
                </p>
                <button
                  onClick={() => onEdit(resultId)}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Thêm kết quả kiểm nghiệm
                </button>
              </div>
            )} */}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-800 text-sm font-medium">
                Đạt tiêu chuẩn
              </div>
              <div className="text-2xl font-bold text-green-900">
                {/* {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Đạt"
                  ).length
                } */}
                2
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-red-800 text-sm font-medium">Không đạt</div>
              <div className="text-2xl font-bold text-red-900">
                {/* {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Không đạt"
                  ).length
                } */}
                0
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-yellow-800 text-sm font-medium">
                Cần kiểm tra lại
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {/* {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Cần kiểm tra lại"
                  ).length
                }  */}
                0
              </div>
            </div>
          </div>

          {/* {data?.phieuPhanTichKetQuaChiTietDtos &&
            data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 && (
              
            )} */}
        </div>
      </div>
      <FormLyDoTuChoi
        isOpen={open}
        onClose={() => setOpen(false)}
        type={TypeConformation.Info}
        title={`Xác nhận ${
          isTypeConform === typeConfirmation.TuChoi ? "từ chối" : `duyệt phiếu`
        }`}
        dataID={"data?.maID"}
        typeConform={isTypeConform}
      />
    </motion.div>
  );
};

export default ShowDetail;
