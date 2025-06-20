import { Skeleton } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { formatDate, renderTrangThai } from "../../../../configs/configAll";

interface Props {
  data: any;
  isLoading: boolean;
}

const RegistrationDetails = (props: Props) => {
  const { data, isLoading } = props;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 space-x-2 flex items-center">
        <div className="flex items-center">
          <button
            onClick={() => history.back()}
            className="cursor-pointer hover:bg-gray-100 p-1"
          >
            <IoIosArrowBack className="w-5 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-gray-900">
            Số đăng ký phân tích:{" "}
            {isLoading ? (
              <Skeleton variant="rounded" width={130} height={20} />
            ) : (
              data?.soDkpt
            )}
          </h2>
          {isLoading ? (
            <Skeleton variant="rounded" width={100} height={20} />
          ) : (
            renderTrangThai(data?.trangThaiId)
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base/6 font-medium text-gray-500 mb-4">
              Thông tin phiếu đăng ký
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500">
                  Ngày đăng ký
                </label>
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={20} />
                ) : (
                  <p className="font-medium text-gray-900">
                    {formatDate(data?.ngayTao)}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">
                    Hình thức trả kết quả
                  </label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {data?.hinhThucTraKq}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Hình thức gửi mẫu
                  </label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {data?.hinhThucGuiMau}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">Kết quả</label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {data?.ketQua ? "Tiếng Anh" : "Tiếng Việt"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Ngày giao mẫu
                  </label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {formatDate(data?.ngayGiaoMau)}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Địa chỉ giao mẫu
                </label>
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={20} />
                ) : (
                  <p className="font-medium text-gray-900">
                    {data?.diaChiGiaoMau}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-base/6 font-medium text-gray-500 mb-4">
              Thông tin khách hàng
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">
                    Người gửi mẫu
                  </label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {data?.nguoiGuiMau}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Đơn vị gửi mẫu
                  </label>
                  {isLoading ? (
                    <Skeleton variant="rounded" width={100} height={20} />
                  ) : (
                    <p className="font-medium text-gray-900">
                      {data?.donViGuiMau}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Số điện thoại
                </label>
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={20} />
                ) : (
                  <p className="font-medium text-gray-900">
                    {data?.soDienThoai}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-500">Email</label>
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={20} />
                ) : (
                  <p className="font-medium text-gray-900">{data?.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Địa chỉ liên hệ
                </label>
                {isLoading ? (
                  <Skeleton variant="rounded" width={100} height={20} />
                ) : (
                  <p className="font-medium text-gray-900">
                    {data?.diaChiLienHe}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
