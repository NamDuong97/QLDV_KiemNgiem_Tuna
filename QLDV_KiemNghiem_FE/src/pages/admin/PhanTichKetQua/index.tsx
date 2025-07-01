import { motion } from "motion/react";
import { useState } from "react";
import Tag from "./Tag";
import ShowDetail from "./ShowDetail";
import ShowDetailChoDuyet from "./ShowDetailChoDuyet";
import ModelSuaNoiDungSoBo from "./ModelSuaNoiDungSoBo";
import ModelSuaNoiDungTongBo from "./ModelSuaNoiDungTongBo";
import ListChoDuyet from "./ListChoDuyet";
import ListBLDDuyet from "./ListBLDDuyet";
import ListLDPDuyet from "./ListLDPDuyet";
import EditChoDuyet from "./EditChoDuyet";
import ShowDetailLDPDuyet from "./ShowDetailLDPDuyet";

export const sampleData: any = {
  KQ001: {
    code: "KQ001",
    sampleName: "Paracetamol 500mg",
    createdBy: "NV001",
    checkedBy: "NV004",
    receivedDate: "2024-12-15",
    testDate: "2024-12-16",
    resultDate: "2024-12-18",
    storage: "Có",
    department: "K001",
    notes: "Mẫu đạt tiêu chuẩn chất lượng",
    status: "Hoàn thành",
    requirements: "Kiểm tra hàm lượng hoạt chất, độ hòa tan",
    details: [
      {
        name: "Hàm lượng hoạt chất",
        result: "98.5",
        unit: "%",
        quality: "Đạt",
        notes: "Trong giới hạn cho phép",
      },
      {
        name: "Độ hòa tan",
        result: "95.2",
        unit: "%",
        quality: "Đạt",
        notes: "Đạt yêu cầu USP",
      },
    ],
  },
  KQ002: {
    code: "KQ002",
    sampleName: "Amoxicillin 250mg",
    createdBy: "NV002",
    checkedBy: "NV005",
    receivedDate: "2024-12-16",
    testDate: "2024-12-17",
    resultDate: "2024-12-19",
    storage: "Có",
    department: "K002",
    notes: "Đang trong quá trình kiểm tra vi sinh",
    status: "Đang kiểm tra",
    requirements: "Kiểm tra hoạt tính kháng khuẩn, độ tinh khiết",
    details: [
      {
        name: "Hoạt tính kháng khuẩn",
        result: "Đang xử lý",
        unit: "IU/mg",
        quality: "Chưa xác định",
        notes: "Đang nuôi cấy",
      },
    ],
  },
  KQ003: {
    code: "KQ003",
    sampleName: "Ibuprofen 400mg",
    createdBy: "NV003",
    checkedBy: "NV004",
    receivedDate: "2024-12-17",
    testDate: "2024-12-18",
    resultDate: "2024-12-20",
    storage: "Không",
    department: "K001",
    notes: "Mẫu mới nhận, chuẩn bị tiến hành kiểm nghiệm",
    status: "Đang xử lý",
    requirements: "Kiểm tra hàm lượng, tạp chất liên quan",
    details: [
      {
        name: "Hàm lượng hoạt chất",
        result: "Đang xử lý",
        unit: "%",
        quality: "Chưa xác định",
        notes: "Chuẩn bị mẫu",
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

const PhanTichKetQua = () => {
  const [activeView, setActiveView] = useState("listChoDuyet");
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [openModelNoiDungDuyetSoBo, setOpenModelNoiDungDuyetSoBo] =
    useState(false);
  const [openModelNoiDungDuyetTongBo, setOpenModelNoiDungDuyetTongBo] =
    useState(false);

  const handleTabChange = (tab: any) => {
    setActiveView(tab);
    setSelectedResultId(null);
  };

  const handleViewResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detail");
  };

  const handleViewResultLDPDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detailLDPDuyet");
  };

  const handleViewResultChoDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detailChoDuyet");
  };

  const handleEditResultChoDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("editChoDuyet");
  };

  const handleOpenModelNoiDungSoBo = (id: any) => {
    setSelectedResultId(id);
    setOpenModelNoiDungDuyetSoBo(true);
  };

  const handleOpenModelNoiDungTongBo = (id: any) => {
    setSelectedResultId(id);
    setOpenModelNoiDungDuyetTongBo(true);
  };

  const handleCancel = () => {
    setActiveView("listBLDDuyet");
    setSelectedResultId(null);
  };

  const handleCancelChoDuyet = () => {
    setActiveView("listChoDuyet");
    setSelectedResultId(null);
  };

  const handleCancelChoLDPDuyet = () => {
    setActiveView("listLDPDuyet");
    setSelectedResultId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "listBLDDuyet":
        return (
          <ListBLDDuyet
            onView={handleViewResult}
            handleOpenModelNoiDungSoBo={handleOpenModelNoiDungSoBo}
            handleOpenModelNoiDungTongBo={handleOpenModelNoiDungTongBo}
          />
        );

      case "listLDPDuyet":
        return (
          <ListLDPDuyet
            onView={handleViewResultLDPDuyet}
            handleOpenModelNoiDungSoBo={handleOpenModelNoiDungSoBo}
          />
        );
      case "detail":
        return <ShowDetail resultId={selectedResultId} onBack={handleCancel} />;
      case "detailChoDuyet":
        return (
          <ShowDetailChoDuyet
            resultId={selectedResultId}
            onBack={handleCancelChoDuyet}
          />
        );
      case "detailLDPDuyet":
        return (
          <ShowDetailLDPDuyet
            resultId={selectedResultId}
            onBack={handleCancelChoLDPDuyet}
          />
        );
      case "editChoDuyet":
        return (
          <EditChoDuyet
            resultId={selectedResultId}
            onCancel={() => setActiveView("listChoDuyet")}
          />
        );
      case "listChoDuyet":
        return (
          <ListChoDuyet
            onView={handleViewResultChoDuyet}
            onEdit={handleEditResultChoDuyet}
          />
        );
      default:
        return (
          <ListChoDuyet
            onView={handleViewResultChoDuyet}
            onEdit={handleEditResultChoDuyet}
          />
        );
    }
  };

  return (
    <motion.div
      key="PhanTichKetQua"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-10 space-y-6 bg-blue-50 p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl capitalize font-semibold text-gray-800 flex gap-1 items-center">
            Danh sách Phiếu phân tích kết quả
          </h1>
          <p className="text-sm/6 capitalize font-medium text-gray-600 flex gap-1 items-center">
            Quản lý các phiếu phân tích kết quả
          </p>
        </div>
      </div>
      {(activeView === "listChoDuyet" ||
        activeView === "listBLDDuyet" ||
        activeView === "listLDPDuyet") && (
        <Tag activeTab={activeView} onTabChange={handleTabChange} />
      )}
      <div className="fade-in">{renderContent()}</div>
      <ModelSuaNoiDungSoBo
        open={openModelNoiDungDuyetSoBo}
        handleClose={() => setOpenModelNoiDungDuyetSoBo(false)}
        dataID={selectedResultId}
      />
      <ModelSuaNoiDungTongBo
        open={openModelNoiDungDuyetTongBo}
        handleClose={() => setOpenModelNoiDungDuyetTongBo(false)}
        dataID={selectedResultId}
      />
    </motion.div>
  );
};

export default PhanTichKetQua;
