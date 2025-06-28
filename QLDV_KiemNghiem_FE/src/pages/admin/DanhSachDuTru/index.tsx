import { motion } from "motion/react";
import ShowDetail from "./ShowDetail";
import Create from "./Create";
import List from "./List";
import Edit from "./Edit";
import { useState } from "react";
import Tag from "./Tag";

interface ChiTietDuTru {
  DonViTinh: string;
  SoLuong: number;
  GhiChu: string;
  TrangThai: string;
  Ten_PLHC: string;
}

export interface PhieuDuTru {
  MaPhieuDuTru: string;
  ManvLapPhieu: string;
  Ten_Mau: string;
  NgayLap: string;
  MaKhoa: string;
  TrangThai: string;
  NguoiSua: string;
  NgaySua: string;
  ChiTietDuTru: ChiTietDuTru[];
}

export const sampleData: any = {
  PDT001: {
    MaPhieuDuTru: "PDT001",
    ManvLapPhieu: "NV123",
    Ten_Mau: "PDK456",
    NgayLap: "2025-06-27",
    MaKhoa: "KHOA01",
    TrangThai: "Đang xử lý",
    ChiTietPhieuDuTru: [
      {
        DonViTinh: "Chai",
        SoLuong: 10,
        GhiChu: "Sử dụng cho xét nghiệm X",
        Ten_PLHC: "HC001",
      },
      {
        DonViTinh: "Hộp",
        SoLuong: 5,
        GhiChu: "Dùng cho kiểm nghiệm Y",
        Ten_PLHC: "HC002",
      },
    ],
  },
  PDT002: {
    MaPhieuDuTru: "PDT002",
    ManvLapPhieu: "NV123",
    Ten_Mau: "PDK456",
    NgayLap: "2025-06-27",
    MaKhoa: "KHOA01",
    TrangThai: "Đang xử lý",
    ChiTietPhieuDuTru: [
      {
        DonViTinh: "Chai",
        SoLuong: 10,
        GhiChu: "Sử dụng cho xét nghiệm X ",
        Ten_PLHC: "HC001",
      },
      {
        DonViTinh: "Hộp",
        SoLuong: 5,
        GhiChu: "Dùng cho kiểm nghiệm Y",
        Ten_PLHC: "HC002",
      },
    ],
  },
  PDT003: {
    MaPhieuDuTru: "PDT003",
    ManvLapPhieu: "NV123",
    Ten_Mau: "PDK456",
    NgayLap: "2025-06-27",
    MaKhoa: "KHOA01",
    TrangThai: "Đang xử lý",
    ChiTietPhieuDuTru: [
      {
        DonViTinh: "Chai",
        SoLuong: 10,
        GhiChu: "Sử dụng cho xét nghiệm X",
        Ten_PLHC: "HC001",
      },
      {
        DonViTinh: "Hộp",
        SoLuong: 5,
        GhiChu: "Dùng cho kiểm nghiệm Y",
        Ten_PLHC: "HC002",
      },
    ],
  },
};

export const employees = [
  { id: "NV001", name: "Nguyễn Văn A" },
  { id: "NV002", name: "Trần Thị B" },
  { id: "NV003", name: "Lê Văn C" },
  { id: "NV004", name: "Phạm Văn D" },
  { id: "NV005", name: "Hoàng Thị E" },
];

export const departments = [
  { id: "K001", name: "Khoa Hóa học" },
  { id: "K002", name: "Khoa Vi sinh" },
  { id: "K003", name: "Khoa Sinh học phân tử" },
];

const DanhSachDuTru = () => {
  const [activeView, setActiveView] = useState("list");
  const [selectedResultId, setSelectedResultId] = useState(null);

  const handleTabChange = (tab: any) => {
    setActiveView(tab);
    setSelectedResultId(null);
  };

  const handleViewResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detail");
  };

  const handleEditResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("edit");
  };

  const handleSaveResult = (result: any) => {
    console.log("Saving result:", result);
    alert("Đã lưu phiếu phân tích thành công!");
    setActiveView("list");
  };

  const handleCancel = () => {
    setActiveView("list");
    setSelectedResultId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "list":
        return (
          <List
            onView={handleViewResult}
            onEdit={handleEditResult}
            handleTag={() => setActiveView("create")}
          />
        );
      case "create":
        return <Create onCancel={handleCancel} onSave={handleSaveResult} />;
      case "detail":
        return (
          <ShowDetail
            resultId={selectedResultId}
            onEdit={handleEditResult}
            onBack={handleCancel}
          />
        );
      case "edit":
        return (
          <Edit
            resultId={selectedResultId}
            onSave={handleSaveResult}
            onCancel={handleCancel}
          />
        );
      default:
        return (
          <List
            onView={handleViewResult}
            onEdit={handleEditResult}
            handleTag={() => setActiveView("create")}
          />
        );
    }
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
      {(activeView === "list" || activeView === "create") && (
        <Tag activeTab={activeView} onTabChange={handleTabChange} />
      )}
      <div className="fade-in">{renderContent()}</div>
    </motion.div>
  );
};

export default DanhSachDuTru;
