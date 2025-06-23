import { useState } from "react";
import StatusBadge from "../../../../../configs/StatusBadge";
import FormGhiChuTuChoi from "./FormGhiChuTuChoi";
import { role } from "../../../../../configs/parseJwt";

const SampleCard = ({ sample, onImageClick, isLoading, handleTuChoi }: any) => {
  const [isTuchoi, setisTuchoi] = useState(false);

  return (
    <div className="sample-card bg-white p-4 border border-gray-200 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900">{sample.name}</h4>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Mẫu #{sample.id}
          </span>
          <StatusBadge status={sample.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        <div>
          <p className="text-xs text-gray-500">Tiêu chuẩn</p>
          <p className="text-sm">{sample.standard}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Dịch vụ</p>
          <p className="text-sm">{sample.service}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Số lô</p>
          <p className="text-sm">{sample.batchNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ngày sản xuất</p>
          <p className="text-sm">{sample.productionDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Thời gian hoàn thành</p>
          <p className="text-sm">{sample.completionTime}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Ngày dự kiến trả kết quả</p>
          <p className="text-sm">{sample.expectedResultDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Hạn sử dụng</p>
          <p className="text-sm">{sample.expiryDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Số lượng</p>
          <p className="text-sm">
            {sample.quantity} {sample.unit}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Điều kiện bảo quản</p>
          <p className="text-sm">{sample.storageCondition}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Đơn vị sản xuất</p>
          <p className="text-sm">{sample.manufacturer}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tình trạng mẫu</p>
          <p className="text-sm">{sample.condition}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Yêu cầu kiểm nghiệm</p>
        <p className="text-sm">{sample.testingRequirements}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Ghi chú</p>
        <p className="text-sm">{sample.notes}</p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Ảnh mẫu</p>
        {/* <ImageModel images={sample.images} onImageClick={onImageClick} /> */}
      </div>

      {sample.status === "Từ chối" && sample.rejectionReason && (
        <div className="mt-4 flex justify-between bg-red-50 border-l-4 border-red-400 p-3">
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
                <span className="font-medium">Lý do từ chối:</span>{" "}
                {sample.rejectionReason}
              </p>
              {sample.rejectionNote && (
                <p className="text-sm text-red-700 mt-1">
                  <span className="font-medium">Ghi chú:</span>{" "}
                  {sample.rejectionNote}
                </p>
              )}
            </div>
          </div>
          {role === "BLD" && (
            <div className="mt-4 flex justify-end space-x-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                <i className="fas fa-check mr-1"></i> Chấp nhận
              </button>
              <button
                onClick={handleTuChoi}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer"
              >
                <i className="fas fa-times mr-1"></i> Từ chối
              </button>
            </div>
          )}
        </div>
      )}
      {role !== "BLD" &&
        role !== "KHTH" &&
        (isTuchoi ? (
          <FormGhiChuTuChoi handleHuyTuChoi={() => setisTuchoi(false)} />
        ) : (
          sample.status === "Chờ xử lý" && (
            <div className="mt-4 flex justify-end space-x-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
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
