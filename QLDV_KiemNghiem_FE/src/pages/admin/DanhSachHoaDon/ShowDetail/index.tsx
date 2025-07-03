import { ArrowLeft, Eye, PenTool, Plus, Trash2 } from "react-feather";
import { renderTrangThaiPhanTichKetQua } from "../../../../configs/configAll";
import { getPhanTichKetQuaByID } from "../../../../hooks/personnels/queryPTKQ";
import { useState } from "react";
import { MdReceipt } from "react-icons/md";
import ShowDetailHDBS from "./ShowDetailHDBS";
import ModelCreateHDBS from "./ModelCreateHDBS";
import ModelEditHDBS from "./ModelEditHDBS";
import { useQueryHoaDonThuByID } from "../../../../hooks/personnels/queryHoaDonThu";

export const typeConfirmation = {
  TuChoi: "tuchoi",
  DuyetPhieu: "DuyetPhieu",
};

const ShowDetail = ({ resultId, onBack, handleOpenPhieuDKy }: any) => {
  const [isCTHD, setisCTHD] = useState(true);
  const [openModelHDBS, setOpenModelHDBS] = useState(false);
  const [openCreateModelHDBS, setOpenCreateModelHDBS] = useState(false);
  const [openEditModelHDBS, setOpenEditModelHDBS] = useState(false);
  const [saveID, setSaveID] = useState(false);
  const { data } = useQueryHoaDonThuByID({
    queryKey: "useQueryHoaDonThuByID",
    maHoaDonThu: resultId,
  });

  const handleOpenPhieuDKyKM = () => {
    handleOpenPhieuDKy("5760378b-0aa1-4ba4-96fa-4a30989a57d3");
  };

  const handleOpenHDBS = (id: any) => {
    setSaveID(id);
    setOpenModelHDBS(true);
  };

  const handleOpenCreateHDBS = (id: any) => {
    setSaveID(id);
    setOpenCreateModelHDBS(true);
  };

  const handleOpenEditHDBS = (id: any) => {
    setSaveID(id);
    setOpenEditModelHDBS(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Chi tiết phiếu phân tích đang chờ duyệt
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleOpenCreateHDBS("HD002")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Tạo hóa đơn bổ sung</span>
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
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
                  <span className="text-gray-600">Mã hóa đơn:</span>
                  <span className="font-medium text-lg">
                    HD20256160749914_SDKPT20256160749594
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    Số DKPT{" "}
                    <span
                      className="font-medium text-sm/4 hover:underline text-blue-500 cursor-pointer"
                      onClick={handleOpenPhieuDKyKM}
                    >
                      (Xem phiếu)
                    </span>
                    :
                  </p>
                  <p className="font-medium">
                    <span>SDKPT20256160749594</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái hóa đơn:</span>
                  {renderTrangThaiPhanTichKetQua(data?.trangThai)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-800 font-semibold">Tổng tiền:</span>
                  <span className="text-2xl font-bold text-red-900">
                    2000000.00
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
                  <span className="font-medium">admin</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày lập:</span>
                  <span className="font-medium">2025-06-16 00:07:49.913</span>
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
                {data?.phieuPhanTichKetQuaChiTietDtos?.length || 0}
              </div>
            ) : (
              <div
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-800`}
              >
                Tổng số hóa đơn bổ sung:
                {data?.phieuPhanTichKetQuaChiTietDtos?.length || 0}
              </div>
            )}
          </div>

          {isCTHD ? (
            data?.phieuPhanTichKetQuaChiTietDtos &&
            data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 ? (
              <div className="space-y-4 overflow-hidden rounded-lg">
                {data?.phieuPhanTichKetQuaChiTietDtos?.map(
                  (detail: any, index: any) => (
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
                              Mẫu A
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
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
                            2600000.00
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
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
          ) : data?.phieuPhanTichKetQuaChiTietDtos &&
            data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 ? (
            <div className="space-y-4 overflow-hidden rounded-lg">
              {data?.phieuPhanTichKetQuaChiTietDtos?.map(
                (detail: any, index: any) => (
                  <div
                    key={index}
                    onClick={() => handleOpenHDBS(index)}
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
                        <p className="font-medium">2025-07-01 21:16:33.827</p>
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
                          2600000.00
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => handleOpenHDBS(index)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>Xem chi tiết</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditHDBS(index);
                        }}
                        className="px-3 py-1 text-yellow-600 hover:bg-yellow-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
                      >
                        <PenTool size={14} />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                )
              )}
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
              <p className="text-gray-500">
                Chưa có chi tiết kết quả kiểm nghiệm
              </p>
            </div>
          )}
        </div>
      </div>
      <ShowDetailHDBS
        open={openModelHDBS}
        handleClose={() => setOpenModelHDBS(false)}
        dataID={saveID}
      />
      <ModelCreateHDBS
        open={openCreateModelHDBS}
        handleClose={() => setOpenCreateModelHDBS(false)}
        dataID={saveID}
      />
      <ModelEditHDBS
        open={openEditModelHDBS}
        handleClose={() => setOpenEditModelHDBS(false)}
        dataID={saveID}
      />
    </div>
  );
};

export default ShowDetail;
