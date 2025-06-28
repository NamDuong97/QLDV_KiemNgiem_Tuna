import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSearch2 from "../../../../components/InputSearch2";
import { useState } from "react";
import classes from "../PhanCong/style.module.scss";
import clsx from "clsx";
import {
  formatDate,
  formatDateNotTime,
  renderTrangThaiPhanCongNoiBo,
} from "../../../../configs/configAll";
import { Pagination, Skeleton, Tooltip } from "@mui/material";
import ModelXemChiTiet from "./ModelXemChiTiet";
import ModelSua from "./ModelSua";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import { queryPhanCongNoiBoAll } from "../../../../hooks/personnels/queryPhanCongNoiBo";
import SelectItemTrangThai from "./SelectItemTrangThai";
import { MdSwapHoriz } from "react-icons/md";
import ModelPhanCongLai from "./ModelPhanCongLai";

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

interface Props {
  handleTaoPhanCong: () => void;
}

const DanhSach = (props: Props) => {
  const { handleTaoPhanCong } = props;
  const { data, isLoading } = queryPhanCongNoiBoAll({
    queryKey: "queryPhanCongNoiBoAll",
  });
  console.log("dataALL", data);
  const [isSortNew, setIsSortNew] = useState(false);
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [openModelXemChiTiet, setOpenModelXemChiTiet] = useState(false);
  const [openModelSua, setOpenModelSua] = useState(false);
  const [openModelPhanCongLai, setOpenModelPhanCongLai] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);
  const [saveID, setSaveID] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample.maPdkMau.toLowerCase()).includes(query) ||
      removeVietnameseTones(sample.manvXyLy.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredSamples
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.ngayPhanCong).getTime() -
          new Date(b.ngayPhanCong).getTime()
        : new Date(b.ngayPhanCong).getTime() -
          new Date(a.ngayPhanCong).getTime()
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data && data?.length / itemsPerPage);
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

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
            placeholder="Tìm kiếm tên mẫu hoặc tên nhân viên xử lý..."
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
            <span className="flex items-center gap-2 text-gray-800">
              {isSortNew ? <FaSortAmountUp /> : <FaSortAmountDown />}Ngày phân
              công
            </span>
          </button>
          <SelectItemTrangThai
            title="Trạng thái"
            setItem={setSelectTrangThai}
            item={selectTrangThai}
          />
        </div>
      </div>
      {currentItems?.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <Skeleton variant="rounded" width={479} height={357} />
              <Skeleton variant="rounded" width={479} height={357} />
              <Skeleton variant="rounded" width={479} height={357} />
            </>
          ) : (
            currentItems?.map((assignment: any, index: any) => (
              <div
                key={index}
                className={clsx(
                  "rounded-xl overflow-hidden cursor-pointer",
                  classes.sample_item,
                  classes.glass_card
                )}
              >
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800 text-lg mb-3">
                    {assignment.maPdkMau}
                  </h3>

                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-xs text-gray-500 mb-2">Phân công cho</p>
                    <div className="flex items-center">
                      <div
                        className={`avatar w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium`}
                      >
                        C
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          Nguyễn C
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Ngày phân công</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDateNotTime(assignment.thoiGianPhanCong)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Người phân công</p>
                      <p className="text-sm font-medium text-gray-700">
                        Nguyễn Văn A
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-x-4 gap-y-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Thời gian làm</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDate(assignment.lamTu)} -{" "}
                        {formatDate(assignment.lamToi)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      {renderTrangThaiPhanCongNoiBo(assignment?.trangThai)}
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
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
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
                        title="Hủy"
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
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </Tooltip>
                      <Tooltip
                        title="Phân công lại"
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
                            setOpenModelPhanCongLai(true);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <MdSwapHoriz className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
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
      <div className="p-4 flex justify-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{
            '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
              {
                backgroundColor: "#1976d21f",
                border: "1px solid #1976d280",
                color: "#1976d2",
              },
            ".MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
        />
      </div>
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
      <ModelPhanCongLai
        open={openModelPhanCongLai}
        handleClose={() => setOpenModelPhanCongLai(false)}
        dataID={saveID}
      />
      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        onConfirm={() => setOpenModelXoa(false)}
        title={"Xác nhận hủy?"}
        message={"Bạn có chắc chắn muốn hủy?"}
        type={TypeConformation.Error}
      />
    </>
  );
};

export default DanhSach;
