import { Trash2 } from "react-feather";

const Detail = ({
  detail,
  index,
  onChange,
  onRemove,
  isEditable = true,
}: any) => {
  const handleChange = (field: any, value: any) => {
    if (onChange) {
      onChange(index, { ...detail, [field]: value });
    }
  };

  if (!isEditable) {
    return (
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 last:border-b-0">
        <div className="font-medium">{detail?.tenChiTieu}</div>
        <div>{detail?.ketQua}</div>
        <div>{detail?.donVi}</div>
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              detail?.trangThai === "Đạt"
                ? "bg-green-100 text-green-800"
                : detail.quality === "Không đạt"
                ? "bg-red-100 text-red-800"
                : detail.quality === "Cần kiểm tra lại"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {detail?.mucChatLuong}
          </span>
        </div>
        <div className="text-sm text-gray-600">{detail?.ghiChu}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên chỉ tiêu
        </label>
        <input
          type="text"
          value={detail?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tên chỉ tiêu"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kết quả
        </label>
        <input
          type="text"
          value={detail?.result || ""}
          onChange={(e) => handleChange("result", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Kết quả"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Đơn vị
        </label>
        <input
          type="text"
          value={detail?.unit || ""}
          onChange={(e) => handleChange("unit", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Đơn vị"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mức chất lượng
        </label>
        <select
          value={detail?.quality || "Đạt"}
          onChange={(e) => handleChange("quality", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Đạt">Đạt</option>
          <option value="Không đạt">Không đạt</option>
          <option value="Cần kiểm tra lại">Cần kiểm tra lại</option>
          <option value="Chưa xác định">Chưa xác định</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ghi chú
        </label>
        <input
          type="text"
          value={detail?.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ghi chú"
        />
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => onRemove && onRemove(index)}
          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Detail;
