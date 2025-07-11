import { PenTool, Trash2 } from "react-feather";
import { queryMauByID } from "../../../../../hooks/personnels/queryMau";
import { MdReceipt } from "react-icons/md";

interface Props {
  setSaveID: any;
  setOpenModelEditDetailHDThu: any;
  setOpenModelXoa: any;
  detail: any;
}

const ChiTietHoaDonThu = (props: Props) => {
  const { detail, setSaveID, setOpenModelEditDetailHDThu, setOpenModelXoa } =
    props;
  const { data } = queryMauByID({
    queryKey: "queryMauByID",
    params: detail?.maMau,
  });

  return (
    <div className="result-card bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <MdReceipt className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{data?.tenMau}</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div className="col-span-3">
          <p className="text-gray-600">Ghi chú</p>
          <p className="font-medium">{detail?.ghiChu}</p>
        </div>
        <div>
          <p className="text-gray-600">Thành tiền</p>
          <p className="font-semibold text-lg text-red-600">
            {parseInt(detail?.thanhTien).toLocaleString()} VND
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            setSaveID(detail?.maId);
            setOpenModelEditDetailHDThu(true);
          }}
          className="px-3 py-1 text-yellow-600 hover:bg-yellow-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
        >
          <PenTool size={14} />
          <span>Sửa</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSaveID(detail?.maId);
            setOpenModelXoa(true);
          }}
          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm flex items-center space-x-1 cursor-pointer"
        >
          <Trash2 size={14} />
          <span>Xóa</span>
        </button>
      </div>
    </div>
  );
};

export default ChiTietHoaDonThu;
