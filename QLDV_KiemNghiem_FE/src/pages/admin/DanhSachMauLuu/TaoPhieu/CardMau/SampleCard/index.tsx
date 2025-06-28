import { Skeleton } from "@mui/material";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../../hooks/customers/usePhieuDKyDVKN";

const SampleCard = ({
  sample,
  isSelected,
  onSelect,
  isLoading,
  handleOpenChiTiet,
}: any) => {
  // const { data: dataTC } = useGetTieuChuanAll({
  //   queryKey: "TieuChuanAll",
  // });
  // const { data: dataLDV } = useGetLoaiDichVuAll({
  //   queryKey: "LoaiDichVuAll",
  // });
  // const dataTieuChuan: any = dataTC;
  // const dataLoaiDV: any = dataLDV;

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
    // sessionStorage.setItem("chi-tiet-mau", JSON.stringify(id));
    handleOpenChiTiet();
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden sample-card transition-all cursor-pointer ${
        isSelected === sample.id
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
              <h3 className="font-medium text-gray-900 mb-1">{sample.name}</h3>
              <p className="text-sm text-gray-500">{sample.id}</p>
            </div>
          )}

          <input
            type="checkbox"
            checked={isSelected === sample.id}
            onChange={() => {}}
            onClick={() => onSelect(sample.id)}
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
            <p>Tiêu chuẩn: {sample.type}</p>
            <p>Dịch vụ: {sample.priority}</p>
            <div className="flex justify-between items-center">
              <p>Số lượng: {formatDate(sample.receivedDate)}</p>
              <p>hạn sử dụng: {formatDate(sample.receivedDate)}</p>
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
            <p>Ngày sản xuất: {formatDate(sample.ngaySanXuat)}</p>
            <p>Loại mẫu: Dược Phẩm</p>
          </div>
        )}
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          <p
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              sample.status === "Chờ phân công"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {sample.status}
          </p>
          <p
            onClick={() => handleXemChiTiet(sample.maPhieuDangKy)}
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
