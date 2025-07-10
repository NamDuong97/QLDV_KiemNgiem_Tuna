import { Skeleton } from "@mui/material";

const SampleCard = ({
  sample,
  isSelected,
  onSelect,
  isLoading,
  handleOpenChiTiet,
  setSaveID,
  dataLDV,
}: any) => {
  const dataLoaiDV: any = dataLDV;

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const handleXemChiTiet = (id: any) => {
    setSaveID(id);
    handleOpenChiTiet();
  };

  return (
    <div
      onClick={() => onSelect(sample?.maId)}
      className={`border rounded-lg overflow-hidden sample-card transition-all cursor-pointer ${
        isSelected === sample.maId
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          {isLoading ? (
            <div>
              <Skeleton variant="text" width={200} height={20} />
              <Skeleton variant="text" width={60} height={20} />
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-blue-600 mb-1">
                {sample?.tenMau}
              </h3>
            </div>
          )}

          <input
            type="checkbox"
            checked={isSelected === sample?.maId}
            onChange={() => {}}
            onClick={() => onSelect(sample?.maId)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
        </div>

        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 space-y-2">
            <Skeleton variant="text" width={123} height={20} />
            <Skeleton variant="text" width={200} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 space-y-2">
            <p>Tiêu chuẩn: {sample?.tenTieuChuan}</p>
            <p>
              Dịch vụ:{" "}
              {
                dataLoaiDV?.find(
                  (item: any) => item.maLoaiDv === sample?.loaiDv
                )?.tenDichVu
              }
            </p>
            <div className="flex justify-between items-center">
              <p>Số lượng: {`${sample?.soLuong} ${sample?.donViTinh}`}</p>
              <p>hạn sử dụng: {formatDate(sample?.hanSuDung)}</p>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <Skeleton variant="text" width={200} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <p>Ngày sản xuất: {formatDate(sample?.ngaySanXuat)}</p>
            <p>Loại mẫu: {sample?.tenLoaiMau}</p>
          </div>
        )}
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          <p
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              sample.status === "Chờ lưu mẫu"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            Chờ lưu mẫu
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleXemChiTiet(sample.maId);
            }}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium hover:underline text-blue-600`}
          >
            Xem chi tiết
          </p>
        </div>
      </div>
    </div>
  );
};

export default SampleCard;
