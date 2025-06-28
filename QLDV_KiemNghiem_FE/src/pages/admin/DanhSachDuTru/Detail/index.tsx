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
        <div className="font-medium col-span-1">{detail?.Ten_PLHC}</div>
        <div className="col-span-1">
          {detail?.SoLuong} {detail?.DonViTinh}
        </div>
        <div className="col-span-3">{detail?.GhiChu}</div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên Phù liệu hóa chất
        </label>
        <input
          type="text"
          defaultValue={detail?.Ten_PLHC || ""}
          onChange={(e) => handleChange("Ten_PLHC", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tên chỉ tiêu"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số lượng
        </label>
        <input
          type="text"
          defaultValue={detail?.SoLuong || ""}
          onChange={(e) => handleChange("SoLuong", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Kết quả"
        />
      </div>

      <div className="w-4xl">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ghi chú
        </label>
        <input
          type="text"
          defaultValue={detail?.GhiChu || ""}
          onChange={(e) => handleChange("GhiChu", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ghi chú"
        />
      </div>
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => onRemove && onRemove(index)}
          className="px-3 py-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Detail;
