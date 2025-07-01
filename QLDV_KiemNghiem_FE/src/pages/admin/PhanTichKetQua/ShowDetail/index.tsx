import { ArrowLeft } from "react-feather";
import {
  formatDate,
  renderTrangThaiPhanTichKetQua,
} from "../../../../configs/configAll";
import Detail from "../Detail";
import { getPhanTichKetQuaByID } from "../../../../hooks/personnels/queryPTKQ";

const ShowDetail = ({ resultId, onEdit, onBack }: any) => {
  const { data } = getPhanTichKetQuaByID({
    queryKey: "PhanTichKetQuaByIDShowDetail",
    params: resultId,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Chi tiết phiếu phân tích
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center cursor-pointer space-x-2"
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
                  <span className="text-gray-600">Mã phiếu:</span>
                  <span className="font-medium text-lg">
                    {data?.maPhieuKetQua}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Khoa:</span>
                  <span className="font-medium">{data?.tenKhoa}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  {renderTrangThaiPhanTichKetQua(data?.trangThai)}
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
                    <div className="font-medium">{data?.tennvLap}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nhân viên kiểm tra:</span>
                  <div className="text-right">
                    <div className="font-medium">{data?.tennvKiemTra}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nhân viên tổng duyệt:</span>
                  <div className="text-right">
                    <div className="font-medium">{data?.tenbldDuyet}</div>
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
                  <span className="font-medium">
                    {formatDate(data?.ngayNhanMau)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày trả kết quả:</span>
                  <span className="font-medium">
                    {formatDate(data?.ngayTraKetQua)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày tạo:</span>
                  <span className="font-medium">
                    {formatDate(data?.ngayTao)}
                  </span>
                </div>
                {data?.ngaySua && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày sửa:</span>
                    <span className="font-medium">
                      {formatDate(data?.ngaySua)}
                    </span>
                  </div>
                )}
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
                  <span className="font-medium">{data?.sdkpt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Đơn vị gửi mẫu:</span>
                  <span className="font-medium">{data?.donViGuiMau}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tên mẫu:</span>
                  <span className="font-medium">{data?.tenMau}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số lô:</span>
                  <span className="font-medium">{data?.soLo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-medium">
                    {data?.soLuong} {data?.donViTinh}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tiêu chuẩn:</span>
                  <span className="font-medium">
                    {data?.soLuong} {data?.tenTieuChuan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Đơn vị sản xuất:</span>
                  <span className="font-medium">{data?.donViSanXuat}</span>
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
                      {data?.yeuCauKiemNghiem}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Ghi chú nhân viên({data?.tennvLap}):
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data?.ghiChu}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Ghi chú lãnh đạo phòng({data?.tennvKiemTra}):
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data?.noiDungDuyetSoBo}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Ghi chú ban lãnh đạo({data?.tenbldDuyet}):
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data?.noiDungDuyetTongBo}
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
              {data?.phieuPhanTichKetQuaChiTietDtos?.length || 0}
            </div>
          </div>

          {data?.phieuPhanTichKetQuaChiTietDtos &&
          data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 ? (
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

              {data?.phieuPhanTichKetQuaChiTietDtos?.map(
                (detail: any, index: any) => (
                  <Detail
                    key={index}
                    detail={detail}
                    index={index}
                    isEditable={false}
                  />
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
              <button
                onClick={() => onEdit(resultId)}
                className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Thêm kết quả kiểm nghiệm
              </button>
            </div>
          )}
        </div>

        {data?.phieuPhanTichKetQuaChiTietDtos &&
          data?.phieuPhanTichKetQuaChiTietDtos?.length > 0 && (
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
                <div className="text-red-800 text-sm font-medium">
                  Không đạt
                </div>
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
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-gray-800 text-sm font-medium">
                  Chưa xác định
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    data?.phieuPhanTichKetQuaChiTietDtoss?.filter(
                      (d: any) => d.trangThai === "Chưa xác định"
                    ).length
                  }
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ShowDetail;
