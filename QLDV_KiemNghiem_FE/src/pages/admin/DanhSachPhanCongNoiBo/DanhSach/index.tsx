import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSearch2 from "../../../../components/InputSearch2";
import { useState } from "react";
import classes from "../PhanCong/style.module.scss";
import clsx from "clsx";
import { formatDateNotTime } from "../../../../configs/configAll";
import { Tooltip } from "@mui/material";
import ModelXemChiTiet from "./ModelXemChiTiet";
import ModelSua from "./ModelSua";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";

interface NhanVienThucHien {
  name: string;
  avatar: string;
  color: string;
}
interface MauPhanCong {
  maId: string;
  tenMau: string;
  tenTieuChuan: string;
  tenDichVu: string;
  soLo: string;
  donViSanXuat: string;
  ngaySanXuat: string;
  hanSuDung: string;
  soLuong: number;
  donViTinh: string;
  trangThaiPhanCong: string;
  maPhieuDangKy: string;
  ngayPhanCong?: string;
  nhanVienThucHien?: NhanVienThucHien;
}

export const dsMauDaPhanCong = [
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
    ngayPhanCong: "2026-05-01",
    nhanVienThucHien: {
      name: "Nguyễn Văn A",
      avatar: "A",
      color: "bg-blue-500",
    },
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
    ngayPhanCong: "2026-05-01",
    nhanVienThucHien: {
      name: "Trần Thị B",
      avatar: "B",
      color: "bg-green-500",
    },
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
    ngayPhanCong: "2026-05-01",
    nhanVienThucHien: {
      name: "Lê Văn C",
      avatar: "C",
      color: "bg-yellow-500",
    },
  },
];

interface Props {
  handleTaoPhanCong: () => void;
}

const DanhSach = (props: Props) => {
  const { handleTaoPhanCong } = props;

  const [data, setdata] = useState<MauPhanCong[]>(dsMauDaPhanCong);
  const [isSortNew, setIsSortNew] = useState(false);
  const [openModelXemChiTiet, setOpenModelXemChiTiet] = useState(false);
  const [openModelSua, setOpenModelSua] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);
  const [saveID, setSaveID] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample.tenMau.toLowerCase()).includes(query) ||
      removeVietnameseTones(sample.tenDichVu.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModelSua = (id: string) => {
    setSaveID(id);
    setOpenModelXemChiTiet(false);
    setOpenModelSua(true);
  };
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm tên mẫu hoặc dịch vụ..."
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
      {filteredSamples.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredSamples.map((assignment: any, index: any) => (
            <div
              key={index}
              className={clsx(
                "rounded-xl overflow-hidden cursor-pointer",
                classes.sample_item,
                classes.glass_card
              )}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {assignment.maId}
                    </span>
                    <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {assignment.maPhieuDangKy}
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full",
                      classes.status_badge
                    )}
                  >
                    Đã phân công
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 text-lg mb-3">
                  {assignment.tenMau}
                </h3>

                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`avatar w-10 h-10 rounded-full ${assignment.nhanVienThucHien.color} flex items-center justify-center text-white font-medium`}
                  >
                    {assignment.nhanVienThucHien.avatar}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {assignment.nhanVienThucHien.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Dịch vụ kiểm nghiệm</p>
                    <p className="text-sm font-medium text-gray-700">
                      {assignment.tenDichVu}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày phân công</p>
                    <p className="text-sm font-medium text-gray-700">
                      {formatDateNotTime(assignment.ngayPhanCong)}
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>HSD: {formatDateNotTime(assignment.hanSuDung)}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Tooltip
                      title="Xem chi tiết"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          setSaveID(assignment.maId);
                          setOpenModelXemChiTiet(true);
                        }}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Sửa"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          setSaveID(assignment.maId);
                          setOpenModelSua(true);
                        }}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Xóa"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          setSaveID(assignment.maId);
                          setOpenModelXoa(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-800">
            Chưa có phân công nào
          </h3>
          <p className="mt-2 text-gray-500">
            Bắt đầu phân công mẫu cho nhân viên
          </p>
          <button
            onClick={handleTaoPhanCong}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
          >
            Tạo phân công mới
          </button>
        </div>
      )}
      <ModelXemChiTiet
        open={openModelXemChiTiet}
        handleClose={() => setOpenModelXemChiTiet(false)}
        dataID={saveID}
        handleOpenModelSua={handleOpenModelSua}
      />
      <ModelSua
        open={openModelSua}
        handleClose={() => setOpenModelSua(false)}
        dataID={saveID}
      />
      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        onConfirm={() => setOpenModelXoa(false)}
        title={"Xác nhận xóa?"}
        message={"Bạn có chắc chắn muốn xóa?"}
        type={TypeConformation.Error}
      />
    </>
  );
};

export default DanhSach;
