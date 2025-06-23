import { useState } from "react";
import InputSearch2 from "../../../../components/InputSearch2";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { formatDate } from "../../../../configs/configAll";
import classes from "./style.module.scss";
import clsx from "clsx";
import ModelPhanCong from "./ModelPhanCong";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";

export const dsMauPhanCong = [
  {
    maId: "M001",
    tenMau: "Paracetamol 500mg",
    tenTieuChuan: "Dược điển Việt Nam V",
    tenDichVu: "Kiểm nghiệm định tính",
    soLo: "LOP20240501",
    donViSanXuat: "CTCP Dược Hậu Giang",
    ngaySanXuat: "2024-05-01",
    hanSuDung: "2026-05-01",
    soLuong: 100,
    donViTinh: "viên",
    trangThaiPhanCong: "Chưa phân công",
    maPhieuDangKy: "PDK-202405-001",
  },
  {
    maId: "M002",
    tenMau: "Vitamin C 100mg",
    tenTieuChuan: "Dược điển Mỹ USP 43",
    tenDichVu: "Phân tích định lượng",
    soLo: "VTM20240320",
    donViSanXuat: "CT TNHH Dược Phẩm ABC",
    ngaySanXuat: "2024-03-20",
    hanSuDung: "2025-09-20",
    soLuong: 200,
    donViTinh: "viên nén",
    trangThaiPhanCong: "Chưa phân công",
    maPhieuDangKy: "PDK-202403-002",
  },
  {
    maId: "M003",
    tenMau: "Dung dịch NaCl 0.9%",
    tenTieuChuan: "Dược điển Châu Âu Ph.Eur",
    tenDichVu: "Kiểm tra độ vô trùng",
    soLo: "NACL20240610",
    donViSanXuat: "Xí nghiệp Dược phẩm TW25",
    ngaySanXuat: "2024-06-10",
    hanSuDung: "2026-06-10",
    soLuong: 50,
    donViTinh: "chai",
    trangThaiPhanCong: "Chưa phân công",
    maPhieuDangKy: "PDK-202406-003",
  },
];

const PhanCong = () => {
  const [isSortNew, setIsSortNew] = useState(false);
  const [openModelPhanCong, setOpenModelPhanCong] = useState(false);
  const [saveID, setSaveID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = dsMauPhanCong?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample.tenTieuChuan.toLowerCase()).includes(
        query
      ) ||
      removeVietnameseTones(sample.tenMau.toLowerCase()).includes(query) ||
      removeVietnameseTones(sample.tenDichVu.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm tên mẫu hoặc tiêu chuẩn hoặc dịch vụ..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setIsSortNew(!isSortNew)}
            type="button"
            className="btn btn-outline-primary border border-gray-300 py-[6px] px-2 rounded cursor-pointer hover:bg-blue-50"
          >
            {isSortNew ? (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountUp /> Cũ Nhất
              </span>
            ) : (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountDown /> Mới nhất
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {filteredSamples.map((sample: any, index: any) => (
          <div
            key={index}
            className={clsx(
              "rounded-xl overflow-hidden cursor-pointer",
              classes.sample_item,
              classes.glass_card
            )}
            // style={{ ".animation-delay": `${index * 0.05}s` }}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {sample.maId}
                  </span>
                  <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {sample.maPhieuDangKy}
                  </span>
                </div>
                <span
                  className={clsx(
                    "text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-full",
                    classes.status_badge
                  )}
                >
                  {sample.trangThaiPhanCong}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 text-lg mb-3">
                {sample.tenMau}
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Tiêu chuẩn áp dụng</p>
                  <p className="text-sm font-medium text-gray-700">
                    {sample.tenTieuChuan}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dịch vụ kiểm nghiệm</p>
                  <p className="text-sm font-medium text-gray-700">
                    {sample.tenDichVu}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Số lô</p>
                  <p className="text-sm font-medium text-gray-700">
                    {sample.soLo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Số lượng</p>
                  <p className="text-sm font-medium text-gray-700">
                    {sample.soLuong}
                    {sample.donViTinh}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center text-gray-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>HSD: {formatDate(sample.hanSuDung)}</span>
                </div>
                <button
                  onClick={() => {
                    setSaveID(sample?.maId);
                    setOpenModelPhanCong(true);
                  }}
                  className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer hover:underline"
                >
                  <span>Phân công</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {dsMauPhanCong.length === 0 ? (
          <div className="col-span-1 lg:col-span-2">
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                Tất cả mẫu đã được phân công
              </h3>
              <p className="mt-2 text-gray-500">
                Không còn mẫu nào chưa được phân công
              </p>
              <button
                // onclick="showAssignmentsList()"
                className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
              >
                Xem danh sách phân công
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ModelPhanCong
        open={openModelPhanCong}
        handleClose={() => setOpenModelPhanCong(false)}
        dataID={saveID}
      />
    </>
  );
};

export default PhanCong;
