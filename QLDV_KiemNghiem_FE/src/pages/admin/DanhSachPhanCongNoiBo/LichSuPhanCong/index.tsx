import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSearch2 from "../../../../components/InputSearch2";
import { useState } from "react";
import classes from "../PhanCong/style.module.scss";
import clsx from "clsx";
import { formatDateNotTime } from "../../../../configs/configAll";
import { Pagination, Skeleton } from "@mui/material";
import ModelSua from "./ModelSua";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import { queryLichSuPhanCongAll } from "../../../../hooks/personnels/queryPhanCongNoiBo";
// import { role } from "../../../../configs/parseJwt";
// import { getRoleGroup } from "../../../../configs/Role";
// import SelectItemKhoa from "./SelectItemKhoa";
import { queryNhanVienALL } from "../../../../hooks/personnels/queryNhanVien";
import { ListColors } from "../../../../constants/colors";

const LichSuPhanCong = () => {
  const { data, isLoading } = queryLichSuPhanCongAll({
    queryKey: "queryLichSuPhanCongAll",
    params: {
      getAll: true,
    },
  });
  const { data: employees } = queryNhanVienALL({
    queryKey: "NhanVienAll",
    params: { getAll: true },
  });

  const [isSortNew, setIsSortNew] = useState(false);
  // const [selectKhoa, setSelectKhoa] = useState("");
  const [openModelSua, setOpenModelSua] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch = removeVietnameseTones(
      sample.maPhanCongNoiBo.toLowerCase()
    ).includes(query);
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredSamples
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.ngayTao).getTime() - new Date(b.ngayTao).getTime()
        : new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime()
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data && data?.length / itemsPerPage);
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-lg">
          <InputSearch2
            placeholder="Tìm kiếm mã phân công nội bộ..."
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
                <FaSortAmountUp /> Cũ nhất
              </span>
            ) : (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountDown />
                Mới nhất
              </span>
            )}
          </button>
          {/* {getRoleGroup(role) === "BLD" && (
            <SelectItemKhoa
              title="Khoa"
              setItem={setSelectKhoa}
              item={selectKhoa}
            />
          )} */}
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
            currentItems?.map((assignment: any, index: any) => {
              const avatarColor = ListColors[index % ListColors.length];
              return (
                <div
                  key={index}
                  className={clsx(
                    "rounded-xl overflow-hidden self-start",
                    classes.sample_item,
                    classes.glass_card
                  )}
                >
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">
                      {assignment?.maPhanCongNoiBo}
                    </h3>

                    {assignment?.manvCu && assignment?.manvMoi ? (
                      <div className="mb-6 space-y-4">
                        <div className="bg-blue-50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-2">
                            Nhân viên cũ
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center w-full">
                              <div
                                className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                              >
                                {employees
                                  .find(
                                    (item: any) =>
                                      item.maId === assignment?.manvCu
                                  )
                                  ?.hoTen.trim()
                                  .split(" ")
                                  .pop()}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {
                                    employees.find(
                                      (item: any) =>
                                        item.maId === assignment?.manvCu
                                    )?.hoTen
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 mb-6">
                          <p className="text-xs text-gray-500 mb-2">
                            Nhân viên mới
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center w-full">
                              <div
                                className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                              >
                                {employees
                                  .find(
                                    (item: any) =>
                                      item.maId === assignment?.manvMoi
                                  )
                                  ?.hoTen.trim()
                                  .split(" ")
                                  .pop()}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {
                                    employees.find(
                                      (item: any) =>
                                        item.maId === assignment?.manvMoi
                                    )?.hoTen
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="w-full text-right">
                              <p className="text-xs text-gray-500">
                                Thời gian thực hiện
                              </p>
                              <p className="text-sm font-medium text-gray-700">
                                {formatDateNotTime(assignment?.lamTu)} -{" "}
                                {formatDateNotTime(assignment?.lamToi)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <p className="text-xs text-gray-500 mb-2">
                          Nhân viên mới
                        </p>
                        <div className="flex items-center">
                          <div className="flex items-center w-full">
                            <div
                              className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                            >
                              {employees
                                .find(
                                  (item: any) =>
                                    item.maId === assignment?.manvMoi
                                )
                                ?.hoTen.trim()
                                .split(" ")
                                .pop()}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">
                                {
                                  employees.find(
                                    (item: any) =>
                                      item.maId === assignment?.manvMoi
                                  )?.hoTen
                                }
                              </p>
                            </div>
                          </div>
                          <div className="w-full text-right">
                            <p className="text-xs text-gray-500">
                              Thời gian thực hiện
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              {formatDateNotTime(assignment?.lamTu)} -{" "}
                              {formatDateNotTime(assignment?.lamToi)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-2">
                        Nhân viên phân công
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                        >
                          {assignment?.tennvPhanCong.trim().split(" ").pop()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {assignment?.tennvPhanCong}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500">Ngày tạo</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDateNotTime(assignment?.ngayTao)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Người tạo</p>
                        <p className="text-sm font-medium text-gray-700">
                          {assignment?.nguoiTao}
                        </p>
                      </div>
                      {assignment?.nguoiSua && (
                        <div>
                          <p className="text-xs text-gray-500">Người sứa</p>
                          <p className="text-sm font-medium text-gray-700">
                            {assignment?.nguoiSua} -{" "}
                            {formatDateNotTime(assignment?.ngaySua)}
                          </p>
                        </div>
                      )}
                    </div>
                    {assignment?.manvCu && assignment?.manvMoi && (
                      <div>
                        <p className="text-xs text-gray-500">
                          Lý do phân công lại
                        </p>
                        <p className="text-sm font-medium text-gray-700 p-1 bg-blue-50 rounded-lg">
                          {assignment?.lyDoPhanCongLai
                            ? assignment?.lyDoPhanCongLai
                            : "Không có lý do"}
                        </p>
                      </div>
                    )}
                    {/* <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                      <div className="flex space-x-1">
                        {(role === "KN_L" || role === "KN_P") && (
                          <>
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
                          </>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })
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
        </div>
      )}
      {currentItems?.length > 0 && (
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
      )}

      <ModelSua
        open={openModelSua}
        handleClose={() => setOpenModelSua(false)}
        // dataID={saveID}
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

export default LichSuPhanCong;
