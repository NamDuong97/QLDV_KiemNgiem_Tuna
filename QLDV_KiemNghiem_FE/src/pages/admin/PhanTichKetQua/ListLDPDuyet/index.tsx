import { useState } from "react";
import { Search } from "react-feather";
import { queryPhanTichKetQuaAll } from "../../../../hooks/personnels/queryPTKQ";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { Pagination, Skeleton } from "@mui/material";
import SelectItemKhoa from "./SelectItemKhoa";
import { getRoleGroup } from "../../../../configs/Role";
import { role } from "../../../../configs/parseJwt";
import CardLDPDuyet from "../CardLDPDuyet";
import SelectItemTrangThai from "./SelectItemTrangThai";

const ListLDPDuyet = ({ onView, handleOpenModelNoiDungSoBo }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectKhoa, setSelectKhoa] = useState("");
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const { personnelInfo } = usePersonnel();

  const { data, isLoading } = queryPhanTichKetQuaAll({
    queryKey: "phanTichKetQuaChuaDuyet",
    params:
      getRoleGroup(role) === "BLD"
        ? {
            getAll: true,
          }
        : {
            getAll: true,
            maKhoa: personnelInfo?.maKhoa,
          },
  });
  console.log("dadatadatadatata", data);

  const filteredResults = data
    ?.filter((item: any) =>
      getRoleGroup(role) === "BLD"
        ? item.trangThai !== 2 && item.trangThai !== 3
        : item.trangThai === 2
    )
    ?.filter((result: any) => {
      const matchesSearch =
        result?.tenMau?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result?.maPhieuKetQua
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        result?.tennvKiemTra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result?.tennvLap.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        (!selectKhoa || result?.maKhoa === selectKhoa) &&
        (!selectTrangThai || result?.trangThai === Number(selectTrangThai));
      return matchesSearch && matchesStatus;
    });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    filteredResults && filteredResults?.length / itemsPerPage
  );
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách phiếu lãnh đạo phòng duyệt
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Tìm kiếm theo mã phiếu, tên mẫu, tên nhân viên kiểm tra, tên nhân viên lập..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-0 focus-within:outline-1 focus-within:border-blue-500 w-2xl"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />
            </div>

            {getRoleGroup(role) === "BLD" && (
              <>
                <SelectItemKhoa
                  title="Khoa"
                  setItem={setSelectKhoa}
                  item={selectKhoa}
                />
                <SelectItemTrangThai
                  title="trạng thái"
                  setItem={setSelectTrangThai}
                  item={selectTrangThai}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="grid gap-4">
            <Skeleton variant="rounded" width={1441} height={198} />
            <Skeleton variant="rounded" width={1441} height={198} />
            <Skeleton variant="rounded" width={1441} height={198} />
          </div>
        ) : currentItems?.length > 0 ? (
          <>
            <div className="grid gap-4">
              {currentItems.map((result: any, index: any) => (
                <CardLDPDuyet
                  key={index}
                  result={result}
                  onView={onView}
                  handleOpenModelNoiDungSoBo={handleOpenModelNoiDungSoBo}
                />
              ))}
            </div>
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
          </>
        ) : (
          <div className="p-8 text-center">
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
              Chưa có phiếu nào
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListLDPDuyet;
