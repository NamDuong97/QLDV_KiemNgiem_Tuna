import { ArrowLeft, Check, Edit, Slash } from "react-feather";
import {
  formatDate,
  renderTrangThaiDuTru,
} from "../../../../configs/configAll";
import Detail from "../Detail";
import { getDuTruByID } from "../../../../hooks/personnels/queryDuTru";
import { queryMauByID } from "../../../../hooks/personnels/queryMau";
import { getKhoaByID } from "../../../../hooks/personnels/queryKhoa";
import { getInforNhanVien } from "../../../../hooks/personnels/access/useAccess";
import { role } from "../../../../configs/parseJwt";
import { getRoleGroup } from "../../../../configs/Role";
import FormLyDoTuChoi from "./formLyDoTuChoi";
import { useState } from "react";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import { typeConfirmation } from "../../PhanTichKetQua/ShowDetailChoDuyet";
import { useGetDmPhuLieuHoaChatAll } from "../../../../hooks/customers/usePhieuDKyDVKN";

const ShowDetail = ({ resultId, onEdit, onBack }: any) => {
  const { data } = getDuTruByID({
    queryKey: "DuTruByID",
    params: resultId,
  });
  console.log("datadatadata", data?.trangThai);

  const { data: dataMauID } = queryMauByID({
    queryKey: "MauByID",
    params: data?.maPdkMau,
  });

  const { data: dataKhoa } = getKhoaByID({
    queryKey: "khoaByID",
    params: data?.maKhoa,
  });

  const [open, setOpen] = useState(false);
  const [isTypeConform, setIsTypeConform] = useState<string>("");

  const { data: dataNhanVien } = getInforNhanVien({
    queryKey: "InforNhanVien",
    params: data?.manvLapPhieu,
  });

  const { data: dataNhanVienDuyet } = getInforNhanVien({
    queryKey: "InforNhanVienDuyet",
    params: data?.manvDuyet,
  });

  const { data: dataDMPLHC } = useGetDmPhuLieuHoaChatAll({
    queryKey: "useGetDmPhuLieuHoaChatAll",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Chi tiết phiếu dự trù
        </h2>
        <div className="flex space-x-2">
          {getRoleGroup(role) === "KN" &&
            role !== "KN" &&
            data?.trangThai == 1  && (
              <>
                <button
                  onClick={() => {
                    setOpen(true);
                    setIsTypeConform(typeConfirmation.TuChoi);
                  }}
                  className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Slash size={16} />
                  <span>Từ chối</span>
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                    setIsTypeConform(typeConfirmation.DuyetPhieu);
                  }}
                  className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Check size={16} />
                  <span>Duyệt phiếu</span>
                </button>
              </>
            )}
          {data?.trangThai !== 0 && data?.trangThai !== 2 && (
            <button
              onClick={() => onEdit(resultId)}
              className="px-4 py-2 cursor-pointer bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Chỉnh sửa</span>
            </button>
          )}
          <button
            onClick={onBack}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mã phiếu:</span>
                  <span className="font-medium text-lg">
                    {data?.maPhieuDuTru}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tên mẫu:</span>
                  <span className="font-medium">{dataMauID?.tenMau}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  {renderTrangThaiDuTru(data?.trangThai)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Khoa:</span>
                  <span className="font-medium">{dataKhoa?.tenKhoa}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ghi chú:</span>
                  <span className="font-medium">bla blas</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin thời gian
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày lập:</span>
                  <span className="font-medium">
                    {formatDate(data?.ngayLap)}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin nhân viên
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nhân viên lập:</span>
                  <div className="text-right">
                    <div className="font-medium"> {dataNhanVien?.hoTen}</div>
                  </div>
                </div>
                {data?.manvDuyet && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nhân viên duyệt:</span>
                    <div className="text-right">
                      <div className="font-medium">
                        {dataNhanVienDuyet?.hoTen}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Chi tiết kết quả kiểm nghiệm
            </h3>
            <div className="text-sm text-gray-500">
              Tổng số chỉ tiêu: {data?.chiTietPhieuDuTruDtos?.length || 0}
            </div>
          </div>

          {data?.chiTietPhieuDuTruDtos &&
          data?.chiTietPhieuDuTruDtos?.length > 0 ? (
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-medium text-sm text-gray-700 border-b border-gray-200">
                <div className="flex items-center col-span-1">
                  <span>Tên phụ liệu hóa chất</span>
                </div>
                <div className="flex items-center col-span-1">
                  <span>Số lượng</span>
                </div>
                <div className="flex items-center col-span-3">
                  <span>Ghi chú</span>
                </div>
              </div>

              {data?.chiTietPhieuDuTruDtos?.map((detail: any, index: any) => (
                <Detail
                  key={index}
                  detail={detail}
                  index={index}
                  isEditable={false}
                  dataDMPLHC={dataDMPLHC}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                Chưa có chi tiết kết quả kiểm nghiệm
              </p>
              <button
                onClick={() => onEdit(resultId)}
                className="mt-3 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded text-sm font-medium cursor-pointer"
              >
                Thêm kết quả kiểm nghiệm
              </button>
            </div>
          )}
        </div>
      </div>
      <FormLyDoTuChoi
        isOpen={open}
        onClose={() => setOpen(false)}
        type={TypeConformation.Info}
        title={`Xác nhận ${
          isTypeConform === typeConfirmation.TuChoi
            ? `lãnh đạo phòng từ chối`
            : `lãnh đạo phòng duyệt phiếu`
        }`}
        dataID={data?.maID}
        typeConform={isTypeConform}
      />
    </div>
  );
};

export default ShowDetail;
