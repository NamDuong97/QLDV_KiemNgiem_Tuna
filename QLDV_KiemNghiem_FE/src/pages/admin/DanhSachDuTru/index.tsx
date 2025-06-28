import { motion } from "motion/react";
import { Clipboard, FilePlus } from "react-feather";
import Card from "./Card";
import InputSearch2 from "../../../components/InputSearch2";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import SelectItemTrangThai from "./SelectItemTrangThai";
import { getRoleGroup } from "../../../configs/Role";
import { role } from "../../../configs/parseJwt";
import SelectItemKhoa from "./SelectItemKhoa";
import DanhSach from "./DanhSach";
import removeVietnameseTones from "../../../configs/removeVietnameseTones";

interface ChiTietDuTru {
  DonViTinh: string;
  SoLuong: number;
  GhiChu: string;
  TrangThai: string;
  MaDM_PLHC: string;
}

export interface PhieuDuTru {
  MaPhieuDuTru: string;
  ManvLapPhieu: string;
  MaPDK_Mau: string;
  NgayLap: string;
  MaKhoa: string;
  TrangThai: string;
  NguoiSua: string;
  NgaySua: string;
  ChiTietDuTru: ChiTietDuTru[];
}

const dataDuTru = [
  {
    MaPhieuDuTru: "PDT001",
    ManvLapPhieu: "NV001",
    MaPDK_Mau: "PDKM001",
    NgayLap: "2025-06-25",
    MaKhoa: "KH01",
    TrangThai: "Chờ duyệt",
    NguoiSua: "NV002",
    NgaySua: "2025-06-26",
    ChiTietDuTru: [
      {
        DonViTinh: "Hộp",
        SoLuong: 10,
        GhiChu: "Dùng cho xét nghiệm máu",
        TrangThai: "Chờ duyệt",
        MaDM_PLHC: "DMHC001",
      },
      {
        DonViTinh: "Chai",
        SoLuong: 5,
        GhiChu: "Dùng cho mẫu nước tiểu",
        TrangThai: "Chờ duyệt",
        MaDM_PLHC: "DMHC002",
      },
    ],
  },
  {
    MaPhieuDuTru: "PDT002",
    ManvLapPhieu: "NV003",
    MaPDK_Mau: "PDKM002",
    NgayLap: "2025-06-24",
    MaKhoa: "KH02",
    TrangThai: "Đã duyệt",
    NguoiSua: "NV001",
    NgaySua: "2025-06-25",
    ChiTietDuTru: [
      {
        DonViTinh: "Túi",
        SoLuong: 20,
        GhiChu: "Bao bì đóng gói mẫu",
        TrangThai: "Đã duyệt",
        MaDM_PLHC: "DMHC005",
      },
    ],
  },
  {
    MaPhieuDuTru: "PDT003",
    ManvLapPhieu: "NV002",
    MaPDK_Mau: "PDKM003",
    NgayLap: "2025-06-23",
    MaKhoa: "KH01",
    TrangThai: "Đã hủy",
    NguoiSua: "NV003",
    NgaySua: "2025-06-24",
    ChiTietDuTru: [
      {
        DonViTinh: "Ống",
        SoLuong: 15,
        GhiChu: "Không đạt yêu cầu chất lượng",
        TrangThai: "Đã hủy",
        MaDM_PLHC: "DMHC003",
      },
    ],
  },
];

const DanhSachDuTru = () => {
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const [selectKhoa, setSelectKhoa] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = dataDuTru?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample.MaPhieuDuTru.toLowerCase()).includes(
        query
      ) ||
      removeVietnameseTones(sample.MaPDK_Mau.toLowerCase()).includes(query);
    return matchesSearch;
  });
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.div
      key="DanhSachMauLuu"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl capitalize font-semibold text-gray-800 flex gap-1 items-center">
            Danh sách phiếu Dự trù
          </h1>
          <p className="text-sm/6 capitalize font-medium text-gray-600 flex gap-1 items-center">
            Quản lý các phiếu dự trù phụ liệu hóa chất
          </p>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-4">
        <Card
          title="Tổng phiếu dự trù"
          value="2"
          icon={<Clipboard className="w-6 h-6" />}
          // isLoading={isLoading}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 w-md">
            <InputSearch2
              placeholder="Tìm kiếm mã phiếu hoặc mẫu kiểm nghiệm..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            {(getRoleGroup(role) === "BLD" ||
              getRoleGroup(role) === "KHTH") && (
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
            <button
              // onClick={() => setIsSortNew(!isSortNew)}
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
            <button
              // onClick={() =>
              //   navigate(
              //     APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.create_mau_luu
              //   )
              // }
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-all gap-1 cursor-pointer"
            >
              <FilePlus className="w-5 h-5" /> Tạo phiếu
            </button>
          </div>
        </div>
      </div>
      <DanhSach dataDuTru={filteredSamples} />
    </motion.div>
  );
};

export default DanhSachDuTru;
