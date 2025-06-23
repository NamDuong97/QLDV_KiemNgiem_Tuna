import { Box, Dialog, Skeleton } from "@mui/material";
import { useState } from "react";
import DetailMaus from "./Detail-Maus";
import DetailPLHCs from "./Detail-PLHC";
import { xemChitietPhieuDKKM } from "../../../../hooks/personnels/quanLyPhieuDKKM";
import { IoMdClose } from "react-icons/io";
import { formatDate, renderTrangThai } from "../../../../configs/configAll";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ChiTietPhieuDKyDVKN = (props: Props) => {
  const { open, handleClose } = props;
  const [isTag, setIsTag] = useState(1);
  const dataSession = sessionStorage.getItem("phieu-xem-chi-tiet");
  const id = dataSession ? JSON.parse(dataSession) : "";

  const { data, isLoading } = xemChitietPhieuDKKM({
    queryKey: "xemChitietPhieuDKKM",
    params: id,
  });

  const handleClosePopup = async () => {
    await handleClose();
    await setIsTag(1);
  };

  const handleShowByTag = () => {
    switch (isTag) {
      case 2: {
        return (
          <Box className="overflow-y-auto h-[579px]">
            <DetailMaus dataMaus={data?.maus} isLoading={isLoading} />;
          </Box>
        );
      }
      case 3: {
        return (
          <DetailPLHCs
            dataPLHC={data?.phieuDangKyPhuLieuHoaChats}
            isLoading={isLoading}
          />
        );
      }
      default: {
        return isLoading ? (
          <Box className="p-5 space-y-4">
            <div className="space-y-2">
              <Skeleton width={150} height={24} />
              <div className="space-x-40 flex items-center">
                <div className="flex gap-2 items-center">
                  <Skeleton width={60} height={24} />
                  <Skeleton width={100} height={24} />
                </div>
                <div className="flex gap-2 items-center">
                  <Skeleton width={90} height={24} />
                  <Skeleton width={100} height={24} />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Skeleton width={200} height={24} />

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>
                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>
                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>

                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>

                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>

                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>
                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>
                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>

                <div>
                  <Skeleton width={80} height={24} />
                  <Skeleton width={150} height={24} />
                </div>
              </div>
            </div>
          </Box>
        ) : (
          <Box className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base/6 font-medium text-gray-500 mb-4">
                  Thông tin phiếu đăng ký
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <label className="block text-xs text-gray-500">
                      Trạng thái phiếu
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      renderTrangThai(data?.trangThaiId)
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">
                      Ngày đăng ký
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-medium text-gray-900">
                        {formatDate(data?.ngayTao)}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">
                        Hình thức trả kết quả
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {data?.hinhThucTraKq}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">
                        Hình thức gửi mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {data?.hinhThucGuiMau}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">
                        Kết quả
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {data?.ketQua ? "Tiếng Anh" : "Tiếng Việt"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">
                        Ngày giao mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {formatDate(data?.ngayGiaoMau)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">
                      Địa chỉ giao mẫu
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-medium text-gray-900">
                        {data?.diaChiGiaoMau}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-base/6 font-medium text-gray-500 mb-4">
                  Thông tin khách hàng
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">
                        Người gửi mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {data?.nguoiGuiMau}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">
                        Đơn vị gửi mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-medium text-gray-900">
                          {data?.donViGuiMau}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">
                      Số điện thoại
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-medium text-gray-900">
                        {data?.soDienThoai}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Email</label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-medium text-gray-900">{data?.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">
                      Địa chỉ liên hệ
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-medium text-gray-900">
                        {data?.diaChiLienHe}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        );
      }
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <div className="w-4xl">
        <div className="px-6 pt-6 pb-4 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Chi tiết phiếu đăng ký - {data?.soDkpt}
          </h1>
          <button
            onClick={handleClosePopup}
            className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-600 cursor-pointer"
          >
            <IoMdClose className="w-6 h-6 " />
          </button>
        </div>
        <div className="grid gap-2">
          <div className="flex gap-4 justify-between border-b border-gray-300">
            <div
              className={`px-6 w-full text-center cursor-pointer py-4 text-base font-[550] relative ${
                isTag === 1 ? "text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsTag(1)}
            >
              Thông tin chung
              {isTag === 1 && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
              )}
            </div>
            <div
              className={`px-6 py-4 w-full text-center cursor-pointer text-base font-[550] relative ${
                isTag === 2 ? "text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsTag(2)}
            >
              Mẫu
              {isTag === 2 && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
              )}
            </div>
            <div
              className={`px-6 py-4 w-full text-center cursor-pointer text-base font-[550] relative ${
                isTag === 3 ? "text-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsTag(3)}
            >
              Phụ liệu hóa chất
              {isTag === 3 && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
              )}
            </div>
          </div>
          {handleShowByTag()}
        </div>
      </div>
    </Dialog>
  );
};

export default ChiTietPhieuDKyDVKN;
