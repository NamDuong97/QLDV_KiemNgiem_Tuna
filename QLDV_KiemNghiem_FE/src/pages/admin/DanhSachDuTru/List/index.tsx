import { useState } from "react";
import Card from "../Card";
import InputSearch2 from "../../../../components/InputSearch2";
import SelectItemTrangThai from "./SelectItemTrangThai";
import { queryDuTruAll } from "../../../../hooks/personnels/queryDuTru";
import { Pagination, Skeleton } from "@mui/material";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { getRoleGroup } from "../../../../configs/Role";
import { role } from "../../../../configs/parseJwt";

const List = ({ onView, onEdit }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(1);
  const { personnelInfo } = usePersonnel();

  //khởi tạo param mặc định
  let params: any = {
    getAll: true,
  };

  // Thêm theo role
  if (getRoleGroup(role) !== "BLD") {
    params.maKhoa = personnelInfo?.maKhoa;
  }

  if (role === "KN") {
    params.ManvLap = personnelInfo?.maId;
  }

  // Thêm trạng thái nếu có chọn
  if (statusFilter !== null && statusFilter !== undefined) {
    params.trangThai = statusFilter;
  }

  const { data, isLoading } = queryDuTruAll({
    queryKeyList: ["queryDuTruAll", role, personnelInfo?.maKhoa, statusFilter],
    params,
  });
  console.log("data", data);

  const filteredResults = data
    ?.filter((item: any) => item?.active)
    ?.filter((result: any) => {
      const matchesSearch =
        result?.maPhieuDuTru
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        result?.tenMau?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    ?.sort((a: any, b: any) => {
      return new Date(b.ngayLap).getTime() - new Date(a.ngayLap).getTime();
    });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
        <div className="flex items-center justify-between space-x-4">
          <div className="flex gap-4 w-lg">
            <InputSearch2
              placeholder="Tìm kiếm tên mẫu hoặc mã dự trù..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <SelectItemTrangThai
            title="Trạng thái"
            setItem={setStatusFilter}
            item={statusFilter}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {isLoading ? (
            <div className="grid gap-4">
              <Skeleton variant="rounded" width={1441} height={198} />
              <Skeleton variant="rounded" width={1441} height={198} />
              <Skeleton variant="rounded" width={1441} height={198} />
            </div>
          ) : filteredResults?.length > 0 ? (
            <>
              {currentItems.map((result: any, index: any) => (
                <Card
                  key={index}
                  result={result}
                  onView={onView}
                  onEdit={onEdit}
                />
              ))}
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
    </div>
  );
};

export default List;
