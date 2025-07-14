import { Eye } from "react-feather";
import { MdReceiptLong } from "react-icons/md";
import {
  formatDateNotTime2,
  renderTrangThaiHoaDon,
} from "../../../../../configs/configAll";
import { useMemo } from "react";

const Card = ({ result, onView }: any) => {
  const handleView = (e: any) => {
    e.stopPropagation();
    onView(result?.maID);
  };
  const handleRenderTongTien = useMemo(() => {
    return (
      (result?.dsHoaDonThuBoSung?.reduce(
        (a: any, b: any) => a + b?.tongTien,
        0
      ) || 0) +
        (result?.dsChiTietHoaDonThu?.reduce(
          (a: any, b: any) => a + b?.thanhTien,
          0
        ) || 0) || 0
    );
  }, [result]);

  return (
    <div
      className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
      onClick={() => onView(result?.maID)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <MdReceiptLong className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{result?.maHD}</h3>
            <p className="text-sm text-gray-600">{result?.soDKPT}</p>
          </div>
        </div>
        {renderTrangThaiHoaDon(result?.trangThai)}
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Tên khách hàng</p>
          <p className="font-medium">{result?.tenKH}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày lập</p>
          <p className="font-medium">{formatDateNotTime2(result?.ngayLap)}</p>
        </div>
        <div>
          <p className="text-gray-600">Tổng tiền</p>
          <p className="font-semibold text-lg text-red-600">
            {handleRenderTongTien === 0 || !handleRenderTongTien
              ? "Đang chờ xử lý"
              : `${parseInt(handleRenderTongTien).toLocaleString()} VND`}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleView}
          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
        >
          <Eye size={14} />
          <span>Xem</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
