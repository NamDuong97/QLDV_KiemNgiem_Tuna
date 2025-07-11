import { renderTrangThaiMau } from "../../../../../../configs/configAll";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { queryLoaiMauByID } from "../../../../../../hooks/personnels/queryMau";
import { typeConfirmation } from "../../../../PhanTichKetQua/ShowDetailChoDuyet";

const SampleCardTuChoiMau = ({
  sample,
  handleOpenChiTiet,
  setIsTypeConform,
  setSave,
  setIsOpen,
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

  const handleClickDuyetHoanTra = (isTypeConform: any, isData: any) => {
    setIsTypeConform(isTypeConform);
    setSave(isData);
    setIsOpen();
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden sample-card transition-all border-gray-200`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-blue-600 mb-1">{sample.tenMau}</h3>
          </div>
          <p className="text-sm text-white px-2 py-1 rounded-full bg-rose-500">
            {sample.soLo}
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-3 space-y-2">
          <p>
            {`Khoa:
              ${sample?.tenKhoa}`}
          </p>
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
          <p>Hạn sử dụng: {formatDate(sample.hanSuDung)}</p>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          <p>Ngày sản xuất: {formatDate(sample.ngaySanXuat)}</p>
          <p>Loại mẫu: {dataLoaiMau?.tenLoaiMau}</p>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex justify-between items-center">
          {renderTrangThaiMau(sample.trangThaiPhanCong)}
          <p
            onClick={() => handleXemChiTiet(sample.maPhieuDangKy)}
            className={`inline-flex items-center px-2.5 py-0.5 cursor-pointer rounded-full text-sm font-medium hover:underline text-blue-600`}
          >
            Xem chi tiết
          </p>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex justify-end gap-4 items-center">
          <button
            onClick={() =>
              handleClickDuyetHoanTra(typeConfirmation.TuChoi, {
                maMau: sample?.maId,
                maKhoa: sample?.maKhoa,
              })
            }
            className={`inline-flex items-center px-2.5 py-0.5 cursor-pointer rounded text-sm font-medium text-white bg-yellow-500`}
          >
            Từ chối
          </button>
          <button
            onClick={() =>
              handleClickDuyetHoanTra(typeConfirmation.DuyetPhieu, {
                maMau: sample?.maId,
                maKhoa: sample?.maKhoa,
              })
            }
            className={`inline-flex items-center px-2.5 py-0.5 cursor-pointer rounded text-sm font-medium text-white bg-green-500`}
          >
            Duyệt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleCardTuChoiMau;
