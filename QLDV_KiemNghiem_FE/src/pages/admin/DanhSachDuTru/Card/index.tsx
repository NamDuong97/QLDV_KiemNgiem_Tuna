import {
  formatDate,
  renderTrangThaiDuTru,
} from "../../../../configs/configAll";
import { Edit, Eye, FileText } from "react-feather";
import { getInforNhanVien } from "../../../../hooks/personnels/access/useAccess";
import { getKhoaByID } from "../../../../hooks/personnels/queryKhoa";

const Card = ({ result, onView, onEdit }: any) => {
  const { data } = getInforNhanVien({
    queryKey: "InforNhanVien",
    params: result?.manvLapPhieu,
  });

  const { data: dataKhoa } = getKhoaByID({
    queryKey: "khoaByID",
    params: result?.maKhoa,
  });

  const handleView = (e: any) => {
    e.stopPropagation();
    onView(result.maID);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(result.maID);
  };

  return (
    <div
      className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
      onClick={() => onView(result?.maID)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {result?.maPhieuDuTru}
            </h3>
            <p className="text-sm text-gray-600">{result?.tenMau}</p>
          </div>
        </div>
        {renderTrangThaiDuTru(result.trangThai)}
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Nhân viên lập</p>
          <p className="font-medium">{data?.hoTen}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày lập</p>
          <p className="font-medium">{formatDate(result?.ngayLap)}</p>
        </div>
        <div>
          <p className="text-gray-600">Khoa</p>
          <p className="font-medium">{dataKhoa?.tenKhoa}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleView}
          className="px-3 py-1 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-md text-sm flex items-center space-x-1"
        >
          <Eye size={14} />
          <span>Xem</span>
        </button>
        <button
          onClick={handleEdit}
          className="px-3 py-1 cursor-pointer text-amber-600 hover:bg-amber-50 rounded-md text-sm flex items-center space-x-1"
        >
          <Edit size={14} />
          <span>Sửa</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
