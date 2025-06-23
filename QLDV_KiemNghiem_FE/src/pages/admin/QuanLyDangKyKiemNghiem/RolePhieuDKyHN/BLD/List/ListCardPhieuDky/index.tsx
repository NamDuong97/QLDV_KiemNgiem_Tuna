import {
  formatDate,
  formatDateNotTime,
  renderTrangThai,
} from "../../../../../../../configs/configAll";
import CardInfoItem from "./CardInfoItem";

const ListCardPhieuDky = ({ registration, onView }: any) => {
  const handleRedirectXemChiTiet = (id: any) => {
    onView();
    sessionStorage.setItem("phieu-DKKN-xem-chi-tiet", JSON.stringify(id));
  };
  return (
    <div className="card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-medium text-gray-500">Mã phiếu</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {registration.soDkpt}
            </h3>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <CardInfoItem
            icon="calendar"
            label="Ngày đăng ký"
            value={formatDate(registration?.ngayTao)}
          />
          <CardInfoItem
            icon="user"
            label="Người gửi mẫu"
            value={registration?.nguoiGuiMau}
          />
          <CardInfoItem
            icon="building"
            label="Đơn vị gửi mẫu"
            value={registration?.donViGuiMau}
          />
          <CardInfoItem
            icon="calendar"
            label="Ngày giao mẫu"
            value={formatDateNotTime(registration.ngayGiaoMau)}
          />
          <div className="text-start">
            {renderTrangThai(registration?.trangThaiId)}
          </div>
        </div>

        <div className="mt-2 flex justify-end space-x-2">
          <button
            onClick={() => handleRedirectXemChiTiet(registration.maId)}
            className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 cursor-pointer"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCardPhieuDky;
