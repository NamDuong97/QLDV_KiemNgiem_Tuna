import { Skeleton } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import {
  formatDate,
  renderTrangThaiPhieuDeXuatPhongBan,
} from "../../../../../configs/configAll";
import { queryKhoaAll } from "../../../../../hooks/personnels/queryKhoa";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";
import { getInforNhanVien } from "../../../../../hooks/personnels/access/useAccess";

interface Props {
  data: any;
  isLoading: boolean;
}

const RegistrationDetails = (props: Props) => {
  const { data, isLoading } = props;
  const { data: dataKhoaAll } = queryKhoaAll({
    queryKey: "queryKhoaAll",
  });
  const { data: dataNhanVien } = getInforNhanVien({
    queryKey: "getInforNhanVien",
    params: data?.manvDeXuat,
  });

  const navigate = useNavigate();
  const datadataKhoa: any = dataKhoaAll;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 space-x-2 flex items-center">
        <div className="flex items-center">
          <button
            onClick={() =>
              navigate(APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to)
            }
            className="cursor-pointer hover:bg-gray-100 p-1"
          >
            <IoIosArrowBack className="w-5 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-xl capitalize font-semibold text-gray-700">
            Chi tiết phiếu phân công:
          </h2>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2">
        <div className="">
          <h3 className="text-lg/6 font-bold text-violet-500 mb-4">
            Thông tin phiếu phân công
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-base/6 text-gray-500">
                Mã phiếu đề xuất
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p className="font-bold text-gray-900">{data?.maPhieuDeXuat}</p>
              )}
            </div>
            <div>
              <label className="block text-base/6 text-gray-500">
                Khoa tiếp nhận
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p className="font-bold text-gray-900">
                  {
                    datadataKhoa?.find(
                      (item: any) => item?.maId === data?.maKhoaTiepNhan
                    )?.tenKhoa
                  }
                </p>
              )}
            </div>
            <div>
              <label className="block text-base/6 text-gray-500">
                Nhân viên đề xuất
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p className="font-bold text-gray-900">{dataNhanVien?.hoTen}</p>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-lg/6 font-bold text-violet-500 mb-4">
            Thông tin thời gian
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-base/6 text-gray-500">
                Thời gian giao mẫu
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p className="font-bold text-gray-900">
                  {formatDate(data?.thoiGianGiaoMau)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-base/6 text-gray-500">
                Ngày tạo
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p className="font-bold text-gray-900">
                  {formatDate(data?.ngayTao)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-base/6 text-gray-500">
                Trạng thái
              </label>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                renderTrangThaiPhieuDeXuatPhongBan(data?.trangThai)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
