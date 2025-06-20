import { Box, Skeleton } from "@mui/material";
import TableImages from "./TableImages";
import { Align } from "../../../../../../models/Table";
import {
  useGetLoaiDichVuAll,
  useGetTieuChuanAll,
} from "../../../../../../hooks/customers/usePhieuDKyDVKN";

interface MausProps {
  currentItems: any;
  isLoading: boolean;
}

const tableHeadImages = [
  {
    id: "image",
    sort: false,
    label: "Ảnh",
    align: Align.Center,
  },
];

const Maus = (props: MausProps) => {
  const { currentItems, isLoading } = props;

  const { data: dataTC } = useGetTieuChuanAll({
    queryKey: "GetTieuChuanAll",
  });
  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "GetLoaiDichVuAll",
  });
  const dataTieuChuan: any = dataTC;
  const dataLoaiDV: any = dataLDV;

  return isLoading ? (
    <Box className="p-5 space-y-4">
      <div className="space-y-2">
        <Skeleton width={150} height={24} />
        <div className="space-x-40 flex items-center">
          <div className="flex gap-2 items-center">
            <Skeleton width={60} height={24} />
            <Skeleton width={100} height={24} />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton width={90} height={24} />
            <Skeleton width={100} height={24} />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Skeleton width={200} height={24} />

        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          <div>
            <Skeleton width={80} height={24} />
            <Skeleton width={150} height={24} />
          </div>
        </div>
      </div>
    </Box>
  ) : (
    <div className="p-6 space-y-4">
      <Box className="space-y-4">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
            <div>
              <label className="text-sm/6 text-gray-500">Tên mẫu</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.tenMau}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Tiêu chuẩn</label>
              <p className="font-semibold text-gray-900">
                {
                  dataTieuChuan?.find(
                    (item: any) => item.maId === currentItems?.maTieuChuan
                  ).tenTieuChuan
                }
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Dịch vụ</label>
              <p className="font-semibold text-gray-900">
                {
                  dataLoaiDV?.find(
                    (item: any) => item.maLoaiDv === currentItems?.loaiDv
                  ).tenDichVu
                }
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Số lô</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.soLo}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Ngày sản xuất</label>
              <p className="font-semibold text-gray-900">
                {new Date(currentItems?.ngaySanXuat).toLocaleDateString(
                  "vi-VN"
                )}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Hạn sử dụng</label>
              <p className="font-semibold text-gray-900">
                {new Date(currentItems?.hanSuDung).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Số lượng</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.soLuong}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Đơn vị tính</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.donViTinh}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">
                Điều kiện bảo quản
              </label>
              <p className="font-semibold text-gray-900">
                {currentItems?.dieuKienBaoQuan}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Đơn vị sản xuất</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.donViSanXuat}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Tình trạng mẫu</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.tinhTrangMau}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Lưu mẫu</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.luuMau ? "Có lưu mẫu" : "Không lưu mẫu"}
              </p>
            </div>

            <div>
              <label className="text-sm/6 text-gray-500">Xuất kết quả</label>
              <p className="font-semibold text-gray-900">
                {currentItems?.xuatKetQua
                  ? "Có xuất kết quả"
                  : "Không xuất kết quả"}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm/6 text-gray-500">
                Yêu cầu kiểm nghiệm
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">
                  {currentItems?.yeuCauKiemNghiem}
                </p>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-sm/6 text-gray-500">Ghi chú</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">
                  {currentItems?.ghiChu}
                </p>
              </div>
            </div>
          </div>
        </div>

        <TableImages
          tableHead={tableHeadImages}
          dataImage={currentItems?.phieuDangKyMauHinhAnhs}
        />
      </Box>
    </div>
  );
};

export default Maus;
