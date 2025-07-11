import { renderTrangThaiMau } from "../../../../../../configs/configAll";
import { role } from "../../../../../../configs/parseJwt";
import { getRoleGroup } from "../../../../../../configs/Role";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { queryLoaiMauByID } from "../../../../../../hooks/personnels/queryMau";

const SampleCardTuChoiMau = ({
  sample,
  isSelected,
  onSelect,
  handleOpenChiTiet,
}: any) => {
  const { data: dataTC } = useGetTieuChuanAll({
    queryKey: "TieuChuanAll",
  });
  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAll",
  });
  const { data: dataLoaiMau } = queryLoaiMauByID({
    queryKey: "LoaiMauByID",
    params: sample.maLoaiMau,
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
  const handleXemChiTiet = (id: any) => {
    sessionStorage.setItem("phieu-xem-chi-tiet", JSON.stringify(id));
    handleOpenChiTiet();
  };

  return (
    <div
      onClick={
        getRoleGroup(role) === "BLD"
          ? () => onSelect(sample.maId, sample.tenMau)
          : undefined
      }
      className={`border rounded-lg overflow-hidden sample-card transition-all${
        getRoleGroup(role) === "BLD" && "cursor-pointer"
      } ${
        isSelected === sample.maId
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{sample.tenMau}</h3>
            <p className="text-sm text-gray-500">{sample.soLo}</p>
          </div>

          {getRoleGroup(role) === "BLD" && (
            <input
              type="checkbox"
              checked={isSelected === sample.maId}
              onChange={() => {}}
              onClick={() => onSelect(sample.maId, sample.tenMau)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
          )}
        </div>

        <div className="text-sm text-gray-600 mb-3 space-y-2">
          <p>
            {`Tiêu Chuẩn:
              ${
                dataTieuChuan?.find(
                  (item: any) => item.maId === sample?.tenTieuChuan
                )?.tenTieuChuan
              }`}
          </p>
          <p>
            {`Dịch vụ:
              ${
                dataLoaiDV?.find(
                  (item: any) =>
                    sample?.tenDichVu && item.maLoaiDv === sample?.tenDichVu
                )?.tenDichVu
              }`}
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          <p>Số lượng: {`${sample.soLuong} ${sample.donViTinh}`}</p>
          <p>hạn sử dụng: {formatDate(sample.hanSuDung)}</p>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          <p>Ngày sản xuất: {formatDate(sample.ngaySanXuat)}</p>
          <p>Loại mẫu: {dataLoaiMau?.tenLoaiMau}</p>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          {renderTrangThaiMau(sample.trangThaiPhanCong)}
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleXemChiTiet(sample.maPhieuDangKy);
            }}
            className={`inline-flex items-center px-2.5 py-0.5 cursor-pointer rounded-full text-sm font-medium hover:underline text-blue-600`}
          >
            Xem chi tiết
          </p>
        </div>
      </div>
    </div>
  );
};

export default SampleCardTuChoiMau;
