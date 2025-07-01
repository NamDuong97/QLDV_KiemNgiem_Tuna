import { GiTestTubes } from "react-icons/gi";
import {
  formatDate,
  renderTrangThaiPhanTichKetQua,
} from "../../../../configs/configAll";
import { Edit, Eye } from "react-feather";
import { getRoleGroup } from "../../../../configs/Role";
import { role } from "../../../../configs/parseJwt";

const CardLDPDuyet = ({ result, onView, handleOpenModelNoiDungSoBo }: any) => {
  const handleView = (e: any) => {
    e.stopPropagation();
    onView(result?.maID);
  };

  const handleOpenNoiDungSoBo = (e: any) => {
    e.stopPropagation();
    handleOpenModelNoiDungSoBo(result?.maID);
  };

  return (
    <div
      className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
      onClick={() => onView(result?.maID)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <GiTestTubes className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {result?.maPhieuKetQua}
            </h3>
            <p className="text-sm text-gray-600">{result?.tenMau}</p>
          </div>
        </div>
        {renderTrangThaiPhanTichKetQua(result?.trangThai)}
      </div>

      <div className="grid grid-cols-6 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Nhân viên lập</p>
          <p className="font-medium">{result?.tennvLap}</p>
        </div>
        <div>
          <p className="text-gray-600">Nhân viên kiểm tra</p>
          <p className="font-medium">{result?.tennvKiemTra}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày trả KQ</p>
          <p className="font-medium">{formatDate(result?.ngayTraKetQua)}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày tạo</p>
          <p className="font-medium">{formatDate(result?.ngayTao)}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày sửa</p>
          <p className="font-medium">{formatDate(result?.ngayTao)}</p>
        </div>
        <div>
          <p className="text-gray-600">Khoa</p>
          <p className="font-medium">{result?.tenKhoa}</p>
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
        {getRoleGroup(role) === "KN" &&
          role !== "KN" &&
          result?.trangThai === 2 && (
            <button
              onClick={handleOpenNoiDungSoBo}
              className="px-3 py-1 text-yellow-600 hover:bg-yellow-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
            >
              <Edit size={14} />
              <span>Sửa nội dung sơ bộ</span>
            </button>
          )}
      </div>
    </div>
  );
};

export default CardLDPDuyet;
