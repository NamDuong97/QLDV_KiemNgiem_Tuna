import { MouseEvent, useEffect, useState } from "react";
import PopupBoloc from "../../PopupBoloc";
import {
  listPhieuDKKM_KHTH,
  listPhieuDKKNAll,
} from "../../../../../hooks/personnels/quanLyPhieuDKKM";
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../../Table";
import { Button, Pagination } from "@mui/material";
import { keyTag } from "../../../../../models/Account-Customer";
import InputSearch2 from "../../../../../components/InputSearch2";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clipboard,
  Clock,
} from "react-feather";
import Card from "./Card";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";
import SelectItemTrangThai from "./SelectItemTrangThai";

interface Props {
  setOpenXemChiTiet: React.Dispatch<React.SetStateAction<boolean>>;
  tableHead: any;
  activeFilter: string;
}

const KHTH = (props: Props) => {
  const { setOpenXemChiTiet, tableHead, activeFilter } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const { data, isLoading } = listPhieuDKKM_KHTH({
    queryKey: "listPhieuDKKM_KHTH",
    params: activeFilter ? "TT01" : undefined,
  });

  const { data: dataAll, isLoading: isLoadingAll } = listPhieuDKKNAll({
    queryKey: "listPhieuDKKNAllKHTH",
  });

  const dataShow: any = {
    [keyTag.Cho_Xu_Ly]: data?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch =
        removeVietnameseTones(sample.soDkpt.toLowerCase()).includes(query) ||
        removeVietnameseTones(sample.nguoiGuiMau.toLowerCase()).includes(query);
      return matchesSearch;
    }),
    [keyTag.Ban_Lanh_Dao_Duyet]: dataAll?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch =
        removeVietnameseTones(sample.soDkpt.toLowerCase()).includes(query) ||
        removeVietnameseTones(sample.nguoiGuiMau.toLowerCase()).includes(query);
      return matchesSearch;
    }),
    [keyTag.Tat_Ca]: dataAll?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch =
        removeVietnameseTones(sample.soDkpt.toLowerCase()).includes(query) ||
        removeVietnameseTones(sample.nguoiGuiMau.toLowerCase()).includes(query);
      return matchesSearch;
    }),
  };

  const filteredSamples: any = dataShow[activeFilter];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSamples
    ?.filter((item: any) =>
      selectTrangThai ? item.trangThaiId === selectTrangThai : item.trangThaiId
    )
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.ngayTao).getTime() - new Date(b.ngayTao).getTime()
        : new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime()
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    filteredSamples?.filter((item: any) =>
      selectTrangThai ? item.trangThaiId === selectTrangThai : item.trangThaiId
    ) &&
      filteredSamples?.filter((item: any) =>
        selectTrangThai
          ? item.trangThaiId === selectTrangThai
          : item.trangThaiId
      )?.length / itemsPerPage
  );

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleClickXemChiTiet = () => {
    setOpenXemChiTiet(true);
  };

  const handleThongKe = () => {
    switch (activeFilter) {
      case keyTag.Cho_Xu_Ly:
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Tổng phiếu đang chờ xử lý"
              value={data?.length}
              icon={<Clipboard className="w-6 h-6" />}
              bgColor="bg-indigo-100"
              textColor="text-indigo-600"
              isLoading={isLoading}
            />
          </div>
        );
      case keyTag.Nhan_Vien_Duỵet:
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Tổng phiếu đã duyệt"
              value={
                dataAll?.filter((item: any) => item.trangThaiId === "TT02")
                  ?.length
              }
              icon={<Clipboard className="w-6 h-6" />}
              bgColor="bg-indigo-100"
              textColor="text-indigo-600"
              isLoading={isLoading}
            />
          </div>
        );
      case keyTag.Tat_Ca:
        return (
          <div className="grid grid-cols-5 space-x-4">
            <Card
              title="Tổng phiếu"
              value={dataAll?.length}
              icon={<Clipboard className="w-6 h-6" />}
              bgColor="bg-indigo-100"
              textColor="text-indigo-600"
            />
            <Card
              title="Đã hoàn thành"
              value={
                dataAll?.filter((item: any) => item.trangThaiId === "TT09")
                  ?.length
              }
              icon={<CheckCircle className="w-6 h-6" />}
              bgColor="bg-green-100"
              textColor="text-green-600"
            />
            <Card
              title="Đang kiểm nghiệm"
              value={
                dataAll?.filter((item: any) => item.trangThaiId === "TT07")
                  ?.length
              }
              icon={<Clock className="w-6 h-6" />}
              bgColor="bg-yellow-100"
              textColor="text-yellow-600"
            />
            <Card
              title="Từ chối"
              value={
                dataAll?.filter((item: any) => item.trangThaiId === "TT04")
                  ?.length
              }
              icon={<AlertTriangle className="w-6 h-6" />}
              bgColor="bg-red-100"
              textColor="text-red-600"
            />
            <Card
              title="Đã hủy kiểm nghiệm"
              value={
                dataAll?.filter((item: any) => item.trangThaiId === "TT10")
                  ?.length
              }
              icon={<AlertCircle className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-600"
            />
          </div>
        );
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectTrangThai("");
    setIsSortNew(false);
  }, [activeFilter]);

  return (
    <>
      {handleThongKe()}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm số đăng ký phân tích hoặc người gửi mẫu..."
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
          {activeFilter === keyTag.Tat_Ca && (
            <SelectItemTrangThai
              title="Trạng thái"
              setItem={setSelectTrangThai}
              item={selectTrangThai}
            />
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TableQuanLyPhieuDKyDVHN
          tableHead={tableHead}
          tableBody={currentItems}
          isLoading={
            activeFilter === keyTag.Cho_Xu_Ly ? isLoading : isLoadingAll
          }
          handleClickXemChiTiet={handleClickXemChiTiet}
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

export default KHTH;
