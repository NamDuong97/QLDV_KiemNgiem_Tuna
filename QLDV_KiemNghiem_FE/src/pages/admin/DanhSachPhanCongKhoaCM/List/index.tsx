import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../Table";
import { Pagination } from "@mui/material";
import { Clipboard, TrendingUp } from "react-feather";
import Card from "./Card";
import InputSearch2 from "../../../../components/InputSearch2";
import { getPhanCongKhoaCMAll } from "../../../../hooks/personnels/phanCongKhoa";
import SelectItemTrangThai from "./SelectItemTrangThai";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import SelectItemKhoa from "./SelectItemKhoa";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { role } from "../../../../configs/parseJwt";
import { getRoleGroup } from "../../../../configs/Role";

interface Props {
  tableHead: any;
}

const DanhSach = (props: Props) => {
  const { tableHead } = props;
  const { personnelInfo } = usePersonnel();
  const { data, isLoading } = getPhanCongKhoaCMAll({
    queryKey: "getPhanCongKhoaCMAll",
    params: true,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [selectKhoa, setSelectKhoa] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const filteredSamples: any = data
    ?.filter((item: any) =>
      getRoleGroup(role) === "KN"
        ? item.maKhoaTiepNhan === personnelInfo?.maKhoa
        : item
    )
    ?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch =
        sample?.maPhieuDeXuat?.toLowerCase().includes(query) ||
        removeVietnameseTones(sample?.maPhieuDeXuat?.toLowerCase()).includes(
          query
        );
      return matchesSearch;
    });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSamples
    ?.filter((item: any) =>
      selectTrangThai
        ? item.trangThai === selectTrangThai
        : selectTrangThai === ""
        ? item
        : null
    )
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.ngayTao).getTime() - new Date(b.ngayTao).getTime()
        : new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime()
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentItems && currentItems?.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
console.log('currentItems',currentItems);

  return (
    <>
      <div className="grid gap-6 grid-cols-4">
        <Card
          title="Tổng phiếu phân công"
          value={filteredSamples?.length || 0}
          icon={<Clipboard className="w-6 h-6" />}
          trend="up"
          trendValue="12%"
          isLoading={isLoading}
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm mã phiếu đề xuất..."
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
          {(getRoleGroup(role) === "BLD" || getRoleGroup(role) === "KHTH") && (
            <SelectItemKhoa
              title="Khoa"
              setItem={setSelectKhoa}
              item={selectKhoa}
            />
          )}
          <SelectItemTrangThai
            title="Trạng thái"
            setItem={setSelectTrangThai}
            item={selectTrangThai}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TableQuanLyPhieuDKyDVHN
          tableHead={tableHead}
          tableBody={currentItems}
          isLoading={isLoading}
        />
        {currentItems?.length > 0 && (
          <div className="p-4 flex justify-center border-t border-gray-300">
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
      </div>
    </>
  );
};

export default DanhSach;
