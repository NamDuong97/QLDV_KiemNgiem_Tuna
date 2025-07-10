import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../Table";
import { Pagination } from "@mui/material";
import { Clipboard, FilePlus } from "react-feather";
import Card from "./Card";
import InputSearch2 from "../../../../components/InputSearch2";
import SelectItemTrangThai from "./SelectItemTrangThai";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";
import ChiTietMauLuu from "../ChiTietMauLuu";
import SuaMauLuu from "../SuaMauLuu";
import { queryMauLuuAll } from "../../../../hooks/personnels/queryMauLuu";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { role } from "../../../../configs/parseJwt";
import ConfirmationModal from "./ConfirmationModal";

interface Props {
  tableHead: any;
}

const DanhSach = (props: Props) => {
  const { tableHead } = props;
  const navigate = useNavigate();
  const { personnelInfo } = usePersonnel();
  const [openModelXoa, setOpenModelXoa] = useState(false);
  const { data, isLoading } = queryMauLuuAll({
    queryKey: "queryMauLuuAll",
  });
  const [saveID, setSaveID] = useState(null);
  const [trangThai, setTrangThai] = useState(null);
  const [isSortNew, setIsSortNew] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const filteredSamples: any = data
    ?.filter((item: any) =>
      role === "KN_L" || role === "KN_P"
        ? item.manvLuu.toLowerCase() === personnelInfo?.maId.toLowerCase()
        : item
    )
    ?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch =
        sample?.maPhieuLuu?.toLowerCase().includes(query) ||
        removeVietnameseTones(sample?.tenMau?.toLowerCase()).includes(query);
      return matchesSearch;
    });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSamples
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.hanSuDung).getTime() - new Date(b.hanSuDung).getTime()
        : new Date(b.hanSuDung).getTime() - new Date(a.hanSuDung).getTime()
    )
    ?.filter((item: any) =>
      selectTrangThai
        ? item.trangThai === selectTrangThai
        : selectTrangThai === ""
        ? item
        : null
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    filteredSamples && filteredSamples?.length / itemsPerPage
  );
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);
  const [openSuaMauLuu, setOpenSuaMauLuu] = useState(false);

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
  const handleOpenXoa = (id: any, trangThai: any) => {
    setSaveID(id);
    setTrangThai(trangThai);
    setOpenModelXoa(true);
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-4">
        <Card
          title="Tổng mẫu kiểm nghiệm"
          value={filteredSamples?.length || 0}
          icon={<Clipboard className="w-6 h-6" />}
          isLoading={isLoading}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm mã phiếu lưu hoặc mẫu kiểm nghiệm..."
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
              {isSortNew ? (
                <>
                  <FaSortAmountUp /> Cũ nhất
                </>
              ) : (
                <>
                  <FaSortAmountDown />
                  Mới nhất
                </>
              )}
            </span>
          </button>
          <SelectItemTrangThai
            title="Trạng thái"
            setItem={setSelectTrangThai}
            item={selectTrangThai}
          />
          {(role === "KN_L" || role === "KN_P") && (
            <button
              onClick={() =>
                navigate(
                  APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.create_mau_luu
                )
              }
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-all gap-1 cursor-pointer"
            >
              <FilePlus className="w-5 h-5" /> Tạo phiếu
            </button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TableQuanLyPhieuDKyDVHN
          tableHead={tableHead}
          tableBody={currentItems}
          isLoading={isLoading}
          handleOpenChiTiet={() => setOpenXemChiTiet(true)}
          handleOpenSuaMauLuu={() => setOpenSuaMauLuu(true)}
          handleOpenXoa={handleOpenXoa}
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
      <ChiTietMauLuu
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
      />
      <SuaMauLuu
        isOpen={openSuaMauLuu}
        onClose={() => setOpenSuaMauLuu(false)}
      />
      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        dataId={saveID}
        trangThai={trangThai}
      />
    </>
  );
};

export default DanhSach;
