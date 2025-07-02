import { Eye } from "react-feather";
import { MdReceiptLong } from "react-icons/md";

const Card = ({ result, onView }: any) => {
  const handleView = (e: any) => {
    e.stopPropagation();
    onView("HD002");
  };

  return (
    <div
      className="result-card bg-white border border-gray-200 rounded-lg p-6 card-hover cursor-pointer"
      onClick={() => onView("HD002")}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <MdReceiptLong className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              HD202561601111348_SDKPT202561601111281
            </h3>
            <p className="text-sm text-gray-600">SDKPT20256160749594</p>
          </div>
        </div>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}
        >
          Đã thanh toán
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 text-sm">
        {result?.trangThai >= 2 && (
          <div>
            <p className="text-gray-600">Nhân viên xử lý</p>
            <p className="font-medium">{result?.tennvKiemTra}</p>
          </div>
        )}
        <div>
          <p className="text-gray-600">Ngày lập</p>
          <p className="font-medium">2/2/2025</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">Ghi chú</p>
          <p className="font-medium">
            Tao hoa don thanh toan cho phieu dang kySDKPT2025615211551887
          </p>
        </div>
        <div>
          <p className="text-gray-600">Tổng tiền</p>
          <p className="font-semibold text-lg text-red-600">2600000.00</p>
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
