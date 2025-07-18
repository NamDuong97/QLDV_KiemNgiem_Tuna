import { Box, Dialog, Skeleton } from "@mui/material";
import {
  queryGetLyDoHuyMayByMau_Khoa,
  queryMauByID,
} from "../../../../../../hooks/personnels/queryMau";
import { getKhoaByID } from "../../../../../../hooks/personnels/queryKhoa";
import { getInforNhanVien } from "../../../../../../hooks/personnels/access/useAccess";
import { formatDateNotTime } from "../../../../../../configs/configAll";

interface Props {
  isOpen: any;
  handleClose: () => void;
  dataModelLyDoTra: any;
}

const ModelLyDoTra = (props: Props) => {
  const { isOpen, handleClose, dataModelLyDoTra } = props;

  const { data, isLoading } = queryGetLyDoHuyMayByMau_Khoa({
    queryKey: "queryGetLyDoHuyMayByMau_Khoa",
    params: {
      maMau: dataModelLyDoTra?.maMau,
      maKhoa: dataModelLyDoTra?.maKhoa,
    },
  });
  const { data: dataKhoa } = getKhoaByID({
    queryKey: "getKhoaByIDModelLyDoTra",
    params: dataModelLyDoTra?.maKhoa,
  });
  const { data: nhanVienHuyMau } = getInforNhanVien({
    queryKey: "getInforNhanVienManvHuyMau",
    params: data?.manvHuyMau,
  });
  const { data: nhanVienPhanCong } = getInforNhanVien({
    queryKey: "getInforNhanVienManvPhanCong",
    params: data?.manvPhanCong,
  });
  const { data: mauData } = queryMauByID({
    queryKey: "queryMauByIDModelLyDoTra",
    params: dataModelLyDoTra?.maMau,
  });

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      sx={{ ".MuiPaper-root": { borderRadius: 4 } }}
      fullWidth
    >
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Lý do trả mẫu <span className="text-blue-500">{mauData?.tenMau}</span>
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          {isLoading ? (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg/6 font-bold text-violet-500 mb-4">
                  Thông tin phân công khoa
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-base/6 text-gray-500">
                      Khoa
                    </label>
                    {isLoading ? (
                      <Skeleton variant="rounded" width={100} height={20} />
                    ) : (
                      <p className="font-bold text-gray-900">
                        {dataKhoa?.tenKhoa}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base/6 text-gray-500">
                        Nhân viên hủy mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-bold text-gray-900">
                          {nhanVienHuyMau?.hoTen}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base/6 text-gray-500">
                        Nhân viên phân công
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-bold text-gray-900">
                          {nhanVienPhanCong?.hoTen}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg/6 font-bold text-violet-500 mb-4">
                  Thông tin hủy mẫu
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-base/6 text-gray-500">
                        Ngày khoa yêu cầu hoàn trả
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-bold text-gray-900">
                          {formatDateNotTime(data?.thoiGianHuyMau)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base/6 text-gray-500">
                        Nội dung hủy mẫu
                      </label>
                      {isLoading ? (
                        <Skeleton variant="rounded" width={100} height={20} />
                      ) : (
                        <p className="font-bold text-gray-900 p-1 bg-blue-100 rounded">
                          {data?.noiDungHuyMau}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModelLyDoTra;
