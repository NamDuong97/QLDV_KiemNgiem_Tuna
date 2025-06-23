import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../Table";
import { Pagination } from "@mui/material";
import { CheckCircle, Clipboard, Clock } from "react-feather";
import Card from "./Card";
import InputSearch2 from "../../../../components/InputSearch2";
// import { getPhanCongKhoaCMAll } from "../../../../hooks/personnels/phanCongKhoa";
import SelectItemTrangThai from "./SelectItemTrangThai";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import { ImWarning } from "react-icons/im";
import ChiTietPhieuDKyDVKN from "../ChiTietPhieuDKyDVKN";

interface Props {
  tableHead: any;
}

const data: any = [
  {
    soLo: "LO-12345",
    mau: "Viên nang cứng màu trắng",
    tenDVKN: "Kiểm nghiệm vi sinh",
    TCAD: "TCVN 6096:2004",
    soLuong: "5 chai",
    ngaySanXuat: "10/05/2023",
    hanSD: "10/05/2024",
    trangThai: 1,
  },
  {
    soLo: "LO-12346",
    mau: "Dung dịch màu vàng nhạt",
    tenDVKN: "Kiểm nghiệm kim loại nặng",
    TCAD: "TCVN 7054:2002",
    soLuong: "3 chai",
    ngaySanXuat: "01/06/2023",
    hanSD: "01/06/2025",
    trangThai: 2,
  },
  {
    soLo: "LO-12347",
    mau: "Bột mịn màu trắng",
    tenDVKN: "Kiểm nghiệm độ ẩm và vi sinh",
    TCAD: "ISO 7218:2007",
    soLuong: "10 gói",
    ngaySanXuat: "15/03/2023",
    hanSD: "15/03/2024",
    trangThai: 3,
  },
];

const DanhSach = (props: Props) => {
  const { tableHead } = props;
  // const { data, isLoading } = getPhanCongKhoaCMAll({
  //   queryKey: "getPhanCongKhoaCMAll",
  // });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      sample?.soLo?.toLowerCase().includes(query) ||
      removeVietnameseTones(sample?.mau?.toLowerCase()).includes(query);
    return matchesSearch;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSamples?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(data && data?.length / itemsPerPage);
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-4">
        <Card
          title="Tổng mẫu kiểm nghiệm"
          value={data?.length || 0}
          icon={<Clipboard className="w-6 h-6" />}
          // isLoading={isLoading}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />

        <Card
          title="Số mẫu đã hoàn thành"
          value="876"
          icon={<CheckCircle className="w-6 h-6" />}
          // isLoading={isLoading}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <Card
          title="Số mẫu đang xử lý"
          value="328"
          icon={<Clock className="w-6 h-6" />}
          // isLoading={isLoading}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <Card
          title="Số mẫu chưa được phân công"
          value="80"
          icon={<ImWarning className="w-6 h-6" />}
          // isLoading={isLoading}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
      </div>
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
          // isLoading={isLoading}
          handleOpenChiTiet={() => setOpenXemChiTiet(true)}
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
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
      />
    </>
  );
};

export default DanhSach;
