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
