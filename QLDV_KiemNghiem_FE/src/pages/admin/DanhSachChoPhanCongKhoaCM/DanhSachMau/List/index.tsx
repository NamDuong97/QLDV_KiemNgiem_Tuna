import { useMemo, useState } from "react";
import { FaMicroscope, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../Table";
import { Pagination } from "@mui/material";
import { CheckCircle, Clock, User } from "react-feather";
import Card from "./Card";
import InputSearch2 from "../../../../../components/InputSearch2";
import SelectItemTrangThai from "./SelectItemTrangThai";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";
import { ImWarning } from "react-icons/im";
import ChiTietPhieuDKyDVKN from "../ChiTietPhieuDKyDVKN";
import SelectItemLoaiMau from "./SelectItemLoaiMau";
import { queryThongKe } from "../../../../../hooks/personnels/queryMau";
import { useQuery } from "@tanstack/react-query";
import phanCongKhoaServices from "../../../../../services/personnels/phanCongKhoa";
import { IParamDangKyMau } from "../../../../../type/params";
import useDebounce from "../../../../../hooks/personnels/useDebounce";

interface Props {
  tableHead: any;
}

const DanhSach = (props: Props) => {
  const { tableHead } = props;
  const [selectLoaiMau, setSelectLoaiMau] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);
  const searchHook = useDebounce(searchQuery);
  const { data: dataMau, isLoading } = useQuery({
    queryKey: [
      "AllDanhSachMau",
      currentPage,
      selectTrangThai,
      selectLoaiMau,
      searchHook,
      isSortNew,
    ],
    queryFn: async () => {
      let params: IParamDangKyMau = {
        PageSize: 10,
        PageNumber: currentPage,
        search: searchHook,
        sort: isSortNew,
      };
      if (selectLoaiMau) {
        params = {
          ...params,
          MaLoaiMau: selectLoaiMau,
        };
      }
      if (selectTrangThai) {
        params = {
          ...params,
          trangThaiPhanCong: selectTrangThai,
        };
      }
      const response = await phanCongKhoaServices.getAllDanhSachMau(params);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 7 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const { data: dataThongKe, isLoading: isLoadingThongKe } = queryThongKe({
    queryKey: "queryThongKe",
  });

  const data = useMemo(() => {
    return dataMau?.data?.filter((item: any) =>
      selectLoaiMau !== "" ? item.maLoaiMau === selectLoaiMau : item
    );
  }, [dataMau]);

  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      sample?.soLo?.toLowerCase().includes(query) ||
      removeVietnameseTones(sample?.mau?.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };
  const handlePageChange = (_: any, value: number) => {
    console.log("Value ", value);
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-3">
        <Card
          title="Số mẫu chưa được phân công"
          value={dataThongKe?.mauChoPhanCong}
          icon={<ImWarning className="w-6 h-6" />}
          isLoading={isLoadingThongKe}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
        <Card
          title="Số mẫu đã hoàn thành"
          value={dataThongKe?.mauHoanThanh}
          icon={<CheckCircle className="w-6 h-6" />}
          isLoading={isLoadingThongKe}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <Card
          title="Số mẫu đang kiểm nghiệm"
          value={dataThongKe?.mauDangKiemNghiem}
          icon={<Clock className="w-6 h-6" />}
          isLoading={isLoadingThongKe}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />

        <Card
          title="Số mẫu hủy bởi khách hàng"
          value={dataThongKe?.mauHuyBoiKhach}
          icon={<User className="w-6 h-6" />}
          isLoading={isLoadingThongKe}
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />
        <Card
          title="Số mẫu hủy bởi phòng khoa"
          value={dataThongKe?.mauHuyBoiPhongKhoa}
          icon={<FaMicroscope className="w-6 h-6" />}
          isLoading={isLoadingThongKe}
          bgColor="bg-[#FFECCC]"
          textColor="text-[#FF9587]"
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 grid gap-4">
        <div className="flex gap-4 ">
          <InputSearch2
            placeholder="Tìm kiếm số đăng ký phân tích hoặc người gửi mẫu..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1">
            <button
              onClick={() => setIsSortNew(!isSortNew)}
              type="button"
              className="btn btn-outline-primary border border-gray-300 py-[6px] px-2 rounded cursor-pointer hover:bg-blue-50"
            >
              {isSortNew ? (
                <span className="flex items-center gap-2 text-gray-800">
                  <FaSortAmountDown /> Tăng dần
                </span>
              ) : (
                <span className="flex items-center gap-2 text-gray-800">
                  <FaSortAmountUp />
                  Giảm dần
                </span>
              )}
            </button>
          </div>
          <div className="col-span-3">
            <SelectItemLoaiMau
              title="loại mẫu"
              setItem={setSelectLoaiMau}
              item={selectLoaiMau}
            />
          </div>
          <div className="col-span-3">
            <SelectItemTrangThai
              title="Trạng thái"
              setItem={setSelectTrangThai}
              item={selectTrangThai}
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TableQuanLyPhieuDKyDVHN
          tableHead={tableHead}
          tableBody={filteredSamples}
          isLoading={isLoading}
          handleOpenChiTiet={() => setOpenXemChiTiet(true)}
        />
        {filteredSamples?.length > 0 && (
          <div className="p-4 flex justify-center border-t border-gray-300">
            <Pagination
              count={dataMau?.pagination?.TotalPages}
              page={dataMau?.pagination.CurrentPage}
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
