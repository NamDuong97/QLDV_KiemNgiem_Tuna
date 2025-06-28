import { GiTestTubes } from "react-icons/gi";
import StatusBadge2 from "../../../../components/UI/StatusBadge2";
import { formatDate } from "../../../../configs/configAll";
import { Edit, Eye } from "react-feather";

const Card = ({ result, onView, onEdit }: any) => {
  const handleView = (e: any) => {
    e.stopPropagation();
    onView(result.code);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(result.code);
  };

  return (
    <div
      className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
      onClick={() => onView(result.code)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <GiTestTubes className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{result.code}</h3>
            <p className="text-sm text-gray-600">{result.sampleName}</p>
          </div>
        </div>
        <StatusBadge2 status={result.status} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Nhân viên lập</p>
          <p className="font-medium">{result.createdBy}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày nhận</p>
          <p className="font-medium">{formatDate(result.receivedDate)}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày trả KQ</p>
          <p className="font-medium">{formatDate(result.resultDate)}</p>
        </div>
        <div>
          <p className="text-gray-600">Khoa</p>
          <p className="font-medium">{result.department}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={handleView}
          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm flex items-center space-x-1"
        >
          <Eye size={14} />
          <span>Xem</span>
        </button>
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-amber-600 hover:bg-amber-50 rounded-md text-sm flex items-center space-x-1"
        >
          <Edit size={14} />
          <span>Sửa</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
