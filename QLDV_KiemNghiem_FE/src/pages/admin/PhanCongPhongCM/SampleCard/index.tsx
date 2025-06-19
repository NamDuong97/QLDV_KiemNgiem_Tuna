import { Skeleton } from "@mui/material";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../hooks/customers/usePhieuDKyDVKN";

const SampleCard = ({ sample, isSelected, onSelect, isLoading }: any) => {
  const { data: dataTC } = useGetTieuChuanAll({
    queryKey: "TieuChuanAll",
  });
  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAll",
  });
  const dataTieuChuan: any = dataTC;
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

  return (
    <div
      className={`border rounded-lg overflow-hidden sample-card transition-all cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      onClick={() => onSelect(sample.maId)}
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
              <h3 className="font-medium text-gray-900 mb-1">
                {sample.tenMau}
              </h3>
              <p className="text-sm text-gray-500">{sample.soLo}</p>
            </div>
          )}

          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            onClick={() => onSelect(sample.maId)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 space-y-2">
            <Skeleton variant="text" width={123} height={20} />
            <Skeleton variant="text" width={200} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 space-y-2">
            <p>
              {`Tiêu Chuẩn:
              ${
                dataTieuChuan?.find(
                  (item: any) => item.maId === sample.tenTieuChuan
                ).tenTieuChuan
              }`}
            </p>
            <p>
              {`Dịch vụ:
              ${
                dataLoaiDV?.find(
                  (item: any) => item.maLoaiDv === sample.tenDichVu
                ).tenDichVu
              }`}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <Skeleton variant="text" width={123} height={20} />
            <Skeleton variant="text" width={200} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <p>Số lượng: {`${sample.soLuong} ${sample.donViTinh}`}</p>
            <p>hạn sử dụng: {formatDate(sample.hanSuDung)}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <Skeleton variant="text" width={200} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center"></div>
        )}

        {isLoading ? (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <Skeleton variant="text" width={200} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </div>
        ) : (
          <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
            <p>Ngày sản xuất: {formatDate(sample.ngaySanXuat)}</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}
            >
              Chờ phân công
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleCard;
