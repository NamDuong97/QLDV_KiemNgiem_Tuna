import { useState } from "react";
import FormGhiChuTuChoi from "./FormGhiChuTuChoi";
import { role } from "../../../../../configs/parseJwt";
import { queryMauByID } from "../../../../../hooks/personnels/queryMau";
import {
  formatDateNotTime,
  renderTrangThaiChiTietPhieuDeXuatPhongBan,
} from "../../../../../configs/configAll";
import ImageGallery from "../../../../../components/ImageGallery";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import {
  useBLDDuyet,
  useTruongPhongDuyet,
} from "../../../../../hooks/personnels/phanCongKhoa";
import { usePersonnel } from "../../../../../contexts/PersonelsProvider";
import { getRoleGroup } from "../../../../../configs/Role";
import { useGetTieuChuanAll } from "../../../../../hooks/customers/usePhieuDKyDVKN";

const SampleCard = ({ sample, onImageClick, index }: any) => {
  const [isTuchoi, setisTuchoi] = useState(false);
  const { data: dataMau } = queryMauByID({
    queryKey: "queryMauByID",
    params: sample?.maPdkMau,
  });
  const { personnelInfo } = usePersonnel();

  const { data: dataTieuChuan } = useGetTieuChuanAll({
    queryKey: "TieuChuanAll",
  });
  const { data: dataLoaiDV } = useGetTieuChuanAll({
    queryKey: "LoaiDichVuAll",
  });
  const dataTC: any = dataTieuChuan;
  const dataLDV: any = dataLoaiDV;

  const handleOnSettled = async (response: any) => {
    if (response.ketQua === true) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["ChitietPhieuDKKM"],
        }),
        queryClient.refetchQueries({
          queryKey: ["getPhanCongKhoaCMAll"],
        }),
      ]);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate: mutate } = useTruongPhongDuyet({
    queryKey: "useTruongPhongDuyet",
    onSettled: handleOnSettled,
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Thao tác thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Thao tác thành công", status: 200 });
    },
  });

  const { mutate: mutateBLD } = useBLDDuyet({
    queryKey: "useBLDDuyet",
    onSettled: handleOnSettled,
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Thao tác thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Thao tác thành công", status: 200 });
    },
  });

  const handleDuyet = () => {
    const params = {
      action: true,
      maId: sample?.maId,
      maKhoa: personnelInfo?.maKhoa,
    };
    mutate(params);
  };

  const handleBLDDuyet = () => {
    const params = {
      action: true,
      maId: sample?.maId,
    };
    mutateBLD(params);
  };

  return (
    <div className="sample-card bg-white p-4 border border-gray-200 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900">{dataMau?.tenMau}</h4>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Mẫu #{index + 1}
          </span>
          {renderTrangThaiChiTietPhieuDeXuatPhongBan(sample?.trangThai)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        <div>
          <p className="text-xs text-gray-500">Tiêu chuẩn</p>
          <p className="text-sm">
            {
              dataTC?.find((item: any) => item.maId === dataMau?.maTieuChuan)
                ?.tenTieuChuan
            }
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Dịch vụ</p>
          <p className="text-sm">
            {
              dataLDV?.find((item: any) => item.maLoaiDv === dataMau?.loaiDv)
                ?.tenDichVu
            }
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Số lô</p>
          <p className="text-sm">{dataMau?.soLo}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ngày sản xuất</p>
          <p className="text-sm">{dataMau?.ngaySanXuat?.slice(0, 10)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Thời gian hoàn thành</p>
          <p className="text-sm">{dataMau?.thoiGianTieuChuan} ngày</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ngày dự kiến trả kết quả</p>
          <p className="text-sm">{formatDateNotTime(dataMau?.ngaySanXuat)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Hạn sử dụng</p>
          <p className="text-sm">{formatDateNotTime(dataMau?.hanSuDung)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Số lượng</p>
          <p className="text-sm">
            {dataMau?.soLuong} {dataMau?.donViTinh}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
          <p className="text-sm">{dataMau?.dieuKienBaoQuan}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
          <p className="text-sm">{dataMau?.donViSanXuat}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tình trạng mẫu</p>
          <p className="text-sm">{dataMau?.tinhTrangMau}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Lưu mẫu</p>
          <p className="text-sm">
            {dataMau?.luuMau ? "Có lưu lại mẫu" : "Mẫu không lưu lại"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Xuất kết quả</p>
          <p className="text-sm">
            {dataMau?.xuatKetQua ? "Xuất ra kết quả" : "Không xuất kết quả"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
        <p className="text-sm p-2 bg-blue-50 rounded">
          {dataMau?.yeuCauKiemNghiem}
        </p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Ghi chú khách hàng</p>
        <p className="text-sm p-2 bg-blue-50 rounded">{dataMau?.ghiChu}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Ghi chú</p>
        <p className="text-sm p-2 bg-blue-50 rounded">{sample?.ghiChu}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Ảnh mẫu</p>
        <ImageGallery
          images={dataMau?.phieuDangKyMauHinhAnhs}
          onImageClick={onImageClick}
        />
      </div>

      {sample.trangThai === 1 && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-medium">Lý do từ chối:</span>
                {sample.lyDoTuChoi}
              </p>
            </div>
          </div>
          {getRoleGroup(role) === "BLD" &&
            (isTuchoi ? (
              <FormGhiChuTuChoi
                handleCloseTuChoi={() => setisTuchoi(false)}
                ChiTietID={sample?.maId}
              />
            ) : (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleBLDDuyet}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
                >
                  <i className="fas fa-check mr-1"></i> Chấp nhận
                </button>
                <button
                  onClick={() => setisTuchoi(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
                >
                  <i className="fas fa-times mr-1"></i> Từ chối
                </button>
              </div>
            ))}
        </div>
      )}
      {getRoleGroup(role) !== "BLD" &&
        getRoleGroup(role) !== "KHTH" &&
        (isTuchoi ? (
          <FormGhiChuTuChoi
            handleCloseTuChoi={() => setisTuchoi(false)}
            ChiTietID={sample?.maId}
          />
        ) : (
          sample.trangThai === 2 && (
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleDuyet}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
              >
                <i className="fas fa-check mr-1"></i> Nhận mẫu
              </button>
              <button
                onClick={() => setisTuchoi(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
              >
                <i className="fas fa-times mr-1"></i> Từ chối
              </button>
            </div>
          )
        ))}
    </div>
  );
};

export default SampleCard;
