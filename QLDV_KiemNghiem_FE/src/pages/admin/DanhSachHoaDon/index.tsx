import { motion } from "motion/react";
import { useState } from "react";
import List from "./List";
import ShowDetail from "./ShowDetail";
import Edit from "./Edit";
import ChiTietPhieuDKyDVKN from "./ChiTietPhieuDKyDVKN";

const DanhSachHoaDon = () => {
  const [activeView, setActiveView] = useState("list");
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);
  const [isSaveIdPDKy, setIsSaveIdPDKy] = useState(false);
  const handleViewResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("detail");
  };

  const handleEditResult = (id: any) => {
    setSelectedResultId(id);
    setActiveView("edit");
  };

  const handleOpenPhieuDKy = (id: any) => {
    setIsSaveIdPDKy(id);
    setOpenXemChiTiet(true);
  };

  const handleCancel = () => {
    setActiveView("list");
    setSelectedResultId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "detail":
        return (
          <ShowDetail
            resultId={selectedResultId}
            onBack={handleCancel}
            handleOpenPhieuDKy={handleOpenPhieuDKy}
          />
        );
      case "edit":
        return (
          <Edit
            resultId={selectedResultId}
            onCancel={() => setActiveView("list")}
          />
        );
      case "list":
        return <List onView={handleViewResult} onEdit={handleEditResult} />;
      default:
        return <List onView={handleViewResult} onEdit={handleEditResult} />;
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
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={() => setOpenXemChiTiet(false)}
        isSaveIdPDKy={isSaveIdPDKy}
      />
    </motion.div>
  );
};

export default DanhSachHoaDon;
