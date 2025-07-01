import { motion } from "motion/react";
import { useState } from "react";
import ShowDetailChoDuyet from "./ShowDetailChoDuyet";
import EditChoDuyet from "./EditChoDuyet";
import List from "./List";

const DanhSachHoaDon = () => {
  const [activeView, setActiveView] = useState("list");
  const [selectedResultId, setSelectedResultId] = useState(null);
  const handleViewResultChoDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detailChoDuyet");
  };

  const handleEditResultChoDuyet = (id: any) => {
    setSelectedResultId(id);
    setActiveView("editChoDuyet");
  };

  const handleCancelChoDuyet = () => {
    setActiveView("list");
    setSelectedResultId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "detailChoDuyet":
        return (
          <ShowDetailChoDuyet
            resultId={selectedResultId}
            onBack={handleCancelChoDuyet}
          />
        );
      case "editChoDuyet":
        return (
          <EditChoDuyet
            resultId={selectedResultId}
            onCancel={() => setActiveView("list")}
          />
        );
      case "list":
        return (
          <List
            onView={handleViewResultChoDuyet}
            onEdit={handleEditResultChoDuyet}
          />
        );
      default:
        return (
          <List
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
            Danh sách hóa đơn
          </h1>
          <p className="text-sm/6 capitalize font-medium text-gray-600 flex gap-1 items-center">
            Quản lý các hóa đơn thanh toán
          </p>
        </div>
      </div>

      <div className="fade-in">{renderContent()}</div>
    </motion.div>
  );
};

export default DanhSachHoaDon;
