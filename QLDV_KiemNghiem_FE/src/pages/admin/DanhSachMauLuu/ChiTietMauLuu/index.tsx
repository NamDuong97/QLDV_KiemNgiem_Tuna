import { Dialog, Skeleton } from "@mui/material";
import { getMauLuuByID } from "../../../../hooks/personnels/queryMauLuu";
import { formatDate } from "../../../../configs/configAll";
import { getInforNhanVien } from "../../../../hooks/personnels/access/useAccess";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ChiTietMauLuu = (props: Props) => {
  const { open, handleClose } = props;
  const dataSession = sessionStorage.getItem("chi-tiet-mau-luu");
  const id = dataSession ? JSON.parse(dataSession) : "";

  const { data, isLoading } = getMauLuuByID({
    queryKey: "getMauLuuByID",
    params: id,
  });

  const { data: dataNhanVien } = getInforNhanVien({
    queryKey: "getInforNhanVien",
    params: data?.manvLuu,
  });

  const handleClosePopup = () => {
    sessionStorage.removeItem("chi-tiet-mau-luu");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 2,
        },
      }}
    >
      <div className="bg-white w-2xl">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Chi tiết mẫu lưu
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Tên mẫu
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {data?.tenMau}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Mã phiếu lưu
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {data?.maPhieuLuu}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Khối lượng mẫu lưu
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {`${data?.soLuong} ${data?.donViTinh}`}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Thời gian lưu
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {formatDate(data?.thoiGianLuu)} -{" "}
                  {formatDate(data?.luuDenNgay)}
                </p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Hạn sử dụng
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {formatDate(data?.hanSuDung)}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Tên người lưu mẫu
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : (
                <p id="viewSampleName" className="text-sm text-gray-900">
                  {dataNhanVien?.hoTen}
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Trạng thái
              </h4>
              {isLoading ? (
                <Skeleton variant="rounded" width={100} height={20} />
              ) : data?.trangThai === "1" ? (
                <p
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}
                >
                  Đã lưu
                </p>
              ) : (
                <p
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800`}
                >
                  Đã hủy
                </p>
              )}
            </div>
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

export default ChiTietMauLuu;
