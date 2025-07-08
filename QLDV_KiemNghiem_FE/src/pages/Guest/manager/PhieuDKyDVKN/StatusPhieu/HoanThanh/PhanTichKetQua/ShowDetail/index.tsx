import { ArrowLeft, Check, Slash } from "react-feather";
import Detail from "./Detail";
import FormLyDoTuChoi from "./formLyDoTuChoi";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { image } from "../../../../../../../../constants/image";
import { APP_ROUTES } from "../../../../../../../../constants/routers";
import { TypeConformation } from "../../../../../../../../constants/typeConfirmation";
import {
  duyetPhanTichKetQuaCUSTOMER,
  getPhanTichKetQuaByID,
} from "../../../../../../../../hooks/personnels/queryPTKQ";
import {
  formatDateNotTime,
  renderTrangThaiPhanTichKetQua,
} from "../../../../../../../../configs/configAll";
import { useStoreNotification } from "../../../../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../../../../lib/reactQuery";

export const typeConfirmation = {
  TuChoi: "tuchoi",
  DuyetPhieu: "DuyetPhieu",
};

const ShowDetail = () => {
  const session = sessionStorage.getItem("chi-tiet-phan-tich-ket-qua");
  const id = session ? JSON.parse(session) : "";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = getPhanTichKetQuaByID({
    queryKey: "getPhanTichKetQuaByIDKhachHang",
    params: id,
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getPhanTichKetQuaByIDKhachHang"],
        }),
      ]);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = duyetPhanTichKetQuaCUSTOMER({
    queryKey: "duyetPhanTichKetQuaLDP",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: `Duyệt phiếu thành công`,
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: `Duyệt phiếu thất bại`,
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);
      showNotification({
        message: `$Duyệt phiếu thất bại`,
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleDuyet = () => {
    const param = {
      maPhieuPhanTichKetQua: data?.maID,
      message: "",
      action: true,
    };
    mutate(param);
  };

  return (
    <motion.div
      key="XemChiTiet"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Box className="relative w-full h-[250px]">
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
          <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
            Chi tiết phiếu phân tích PTKQ008:
          </h1>
        </Box>
      </Box>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <button
            className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
            onClick={() =>
              navigate(
                APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN
                  .QUAN_LY_PHAN_TICH_KET_QUA.to
              )
            }
          >
            <ArrowLeft className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
          </button>
          {data?.trangThai === 3 && (
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-base bg-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-300 cursor-pointer transition-colors flex items-center space-x-2"
              >
                <Slash size={16} />
                <span>Yêu cầu kiểm tra lại</span>
              </button>
              <button
                onClick={handleDuyet}
                className="px-1 py-2 lg:px-4 lg:py-2 text-xs lg:text-base bg-green-200 text-green-700 rounded-lg hover:bg-green-300 cursor-pointer transition-colors flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Hoàn thành</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin cơ bản
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã phiếu:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium text-lg">
                        {data?.maPhieuKetQua}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khoa:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.tenKhoa}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạng thái:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      renderTrangThaiPhanTichKetQua(data?.trangThai)
                    )}
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
                      {isLoading ? (
                        <Skeleton variant="rounded" width={171} height={20} />
                      ) : (
                        <span className="font-medium">{data?.tennvLap}</span>
                      )}
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
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">
                        {formatDateNotTime(data?.ngayNhanMau)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày trả kết quả:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">
                        {formatDateNotTime(data?.ngayTraKetQua)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày tạo:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">
                        {formatDateNotTime(data?.ngayTao)}
                      </span>
                    )}
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
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.sdkpt}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Đơn vị gửi mẫu:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.donViGuiMau}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tên mẫu:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.tenMau}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lô:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.soLo}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lượng:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{`${data?.soLuong} ${data?.donViTinh}`}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tiêu chuẩn:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.tenTieuChuan}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Đơn vị sản xuất:</span>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={171} height={20} />
                    ) : (
                      <span className="font-medium">{data?.donViSanXuat}</span>
                    )}
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
                      {isLoading ? (
                        <Skeleton variant="rounded" width={171} height={20} />
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {data?.yeuCauKiemNghiem}
                        </p>
                      )}
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
                {data?.phieuPhanTichKetQuaChiTietDtos?.length || 0}
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
            </div>
            {data?.phieuPhanTichKetQuaChiTietDtos &&
            data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 ? (
              data?.phieuPhanTichKetQuaChiTietDtos.map(
                (detail: any, index: any) => (
                  <Detail key={index} detail={detail} />
                )
              )
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
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-800 text-sm font-medium">
                Đạt tiêu chuẩn
              </div>
              <div className="text-2xl font-bold text-green-900">
                {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Đạt"
                  ).length
                }
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-red-800 text-sm font-medium">Không đạt</div>
              <div className="text-2xl font-bold text-red-900">
                {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Không đạt"
                  ).length
                }
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-yellow-800 text-sm font-medium">
                Cần kiểm tra lại
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {
                  data?.phieuPhanTichKetQuaChiTietDtos?.filter(
                    (d: any) => d.trangThai === "Cần kiểm tra lại"
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormLyDoTuChoi
        isOpen={open}
        onClose={() => setOpen(false)}
        type={TypeConformation.Info}
        title={`Xác nhận từ chối?`}
        dataID={data?.maID}
      />
    </motion.div>
  );
};

export default ShowDetail;
