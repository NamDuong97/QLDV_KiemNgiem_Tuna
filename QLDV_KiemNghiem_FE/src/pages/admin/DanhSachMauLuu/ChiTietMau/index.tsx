import { Dialog } from "@mui/material";
import ImageGallery from "../../../../components/ImageGallery";
import { formatDateNotTime } from "../../../../configs/configAll";

interface Props {
  open: boolean;
  handleClose: () => void;
  saveID: any;
  dataMau: any;
  dataLDV: any;
}

const ChiTietMau = (props: Props) => {
  const { open, handleClose, saveID, dataMau, dataLDV } = props;
  const dataLoaiDV: any = dataLDV;
  const data: any = dataMau?.find((item: any) => item.maId === saveID);
  console.log("datadatadata", data);

  const handleClosePopup = () => {
    sessionStorage.removeItem("chi-tiet-mau");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 2,
        },
      }}
      fullWidth
    >
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Chi tiết mẫu({data?.tenMau})
          </h3>
          <button
            id="closeViewModal"
            onClick={handleClosePopup}
            className="text-gray-400 hover:text-gray-500 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4 mt-3">
            <div>
              <p className="text-xs text-gray-500">Tiêu chuẩn</p>
              <p className="text-sm">{data?.tenTieuChuan}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Dịch vụ</p>
              <p className="text-sm">
                {
                  dataLoaiDV?.find(
                    (item: any) => item.maLoaiDv === data?.loaiDv
                  )?.tenDichVu
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lô</p>
              <p className="text-sm">{data?.soLo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày sản xuất</p>
              <p className="text-sm">{formatDateNotTime(data?.ngaySanXuat)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Thời gian hoàn thành</p>
              <p className="text-sm">{data?.thoiGianTieuChuan} ngày</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày dự kiến trả kết quả</p>
              <p className="text-sm">
                {formatDateNotTime(data?.ngayTraKetQua)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hạn sử dụng</p>
              <p className="text-sm"> {formatDateNotTime(data?.hanSuDung)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Số lượng</p>
              <p className="text-sm">{`${data?.soLuong} ${data?.donViTinh}`}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
              <p className="text-sm">{data?.dieuKienBaoQuan}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
              <p className="text-sm">{data?.donViSanXuat}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tình trạng mẫu</p>
              <p className="text-sm">{data?.tinhTrangMau}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lưu mẫu</p>
              <p className="text-sm">
                {data?.luuMau ? "Có lưu mẫu" : "Không lưu mẫu"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Xuất kết quả</p>
              <p className="text-sm">
                {data?.xuatKetQua
                  ? "Xuất kết quả kiểm nghiệm"
                  : "Không xuất kết quả kiểm nghiệm"}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
            <p className="text-sm p-2 bg-blue-50 rounded">
              {data?.yeuCauKiemNghiem}
            </p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Ghi chú khách hàng</p>
            <p className="text-sm p-2 bg-blue-50 rounded">
              {data?.ghiChu ? data?.ghiChu : "Không có ghi chú"}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500">Ảnh mẫu</p>
            <ImageGallery images={data?.phieuDangKyMauHinhAnhs} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleClosePopup}
            className="cursor-pointer px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Đóng
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChiTietMau;
