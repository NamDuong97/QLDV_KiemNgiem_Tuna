import { motion } from "motion/react";
import { useState } from "react";
import Create from "./Create";
import Tag from "./Tag";
import ShowDetail from "./ShowDetail";
import Edit from "./Edit";
import ListDaDuyet from "./ListDaDuyet";
import ListChuaDuyet from "./ListChuaDuyet";
import ShowDetailChoDuyet from "./ShowDetailChoDuyet";
import { role } from "../../../configs/parseJwt";

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
  const [activeView, setActiveView] = useState(
    role === "KN" ? "list" : "listChuaDuyet"
  );
  const [selectedResultId, setSelectedResultId] = useState(null);

  const handleTabChange = (tab: any) => {
    setActiveView(tab);
    setSelectedResultId(null);
  };

  const handleViewResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detail");
  };

  const handleViewResultChoDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detailChoDuyet");
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

  const handleCancelChoDuyet = () => {
    setActiveView("listChuaDuyet");
    setSelectedResultId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "list":
        return (
          <ListDaDuyet onView={handleViewResult} onEdit={handleEditResult} />
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
      case "detailChoDuyet":
        return (
          <ShowDetailChoDuyet
            resultId={selectedResultId}
            onBack={handleCancelChoDuyet}
          />
        );
      case "edit":
        return (
          <Edit
            resultId={selectedResultId}
            onSave={handleSaveResult}
            onCancel={() => handleViewResult(selectedResultId)}
          />
        );
      case "listChuaDuyet":
        return <ListChuaDuyet onView={handleViewResultChoDuyet} />;
      default:
        return <ListChuaDuyet onView={handleViewResultChoDuyet} />;
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
      {(activeView === "listChuaDuyet" || activeView === "list") && (
        <Tag activeTab={activeView} onTabChange={handleTabChange} />
      )}
      <div className="fade-in">{renderContent()}</div>
    </motion.div>
  );
};

export default PhanTichKetQua;
