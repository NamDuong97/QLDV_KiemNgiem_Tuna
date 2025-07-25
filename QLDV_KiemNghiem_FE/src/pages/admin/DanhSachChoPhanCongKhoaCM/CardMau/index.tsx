import { AnimatePresence, motion } from "framer-motion";
import SampleList from "./SampleList";
import "./style.module.scss";
import { queryKhoaAll } from "../../../../hooks/personnels/queryKhoa";
// import Card from "./Card";
// import { AlertTriangle, Clipboard } from "react-feather";
// import { queryThongKe } from "../../../../hooks/personnels/queryMau";
import TagPhanCong from "../TagPhanCong";
import { useState } from "react";
import DanhSachMau from "../DanhSachMau";
import ListMauHoanTra from "./ListMauHoanTra";

export const colorPresets = [
  "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
  "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
  "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
];

export const tagDanhSachPhieuChoPhanCongKhoaCM = {
  phancong: "Mẫu chờ phân công khoa chuyên môn",
  duyetmautuchoi: "Mẫu hoàn trả",
  tatca: "Mẫu kiểm nghiệm",
};

const CardMau = () => {
  const { data: dataKhoaAll } = queryKhoaAll({
    queryKey: "queryKhoaAll",
  });

  const [isTag, setIsTag] = useState(
    tagDanhSachPhieuChoPhanCongKhoaCM.phancong
  );

  const departments =
    dataKhoaAll
      ?.filter((khoa: any) => khoa.maId !== "K06")
      ?.map((khoa: any, index: number) => ({
        id: khoa.maId,
        name: khoa.tenKhoa,
        description: khoa.ghiChu,
        color: colorPresets[index % colorPresets.length],
      })) || [];

  // const { data: dataThongKe, isLoading: isLoadingThongKe } = queryThongKe({
  //   queryKey: "queryThongKe",
  // });

  const handleTag = () => {
    switch (isTag) {
      case tagDanhSachPhieuChoPhanCongKhoaCM.phancong:
        return <SampleList departments={departments} />;
      case tagDanhSachPhieuChoPhanCongKhoaCM.duyetmautuchoi:
        return <ListMauHoanTra />;
      case tagDanhSachPhieuChoPhanCongKhoaCM.tatca:
        return <DanhSachMau />;
      default:
        return <SampleList departments={departments} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PhanCongPhongCM"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4"
      >
        {/* <div className="grid gap-6 grid-cols-4">
          <Card
            title="Mẫu đang chờ phân công"
            value={dataThongKe?.mauChoPhanCong}
            icon={<Clipboard className="w-6 h-6" />}
            isLoading={isLoadingThongKe}
            bgColor="bg-indigo-100"
            textColor="text-indigo-600"
          />
          <Card
            title="Mẫu đã bị từ chối bỏi phòng ban"
            value={dataThongKe?.mauHuyBoiPhongKhoa}
            isLoading={isLoadingThongKe}
            icon={<AlertTriangle className="w-6 h-6" />}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
          <TagPhanCong setIsTag={setIsTag} isTag={isTag} />
        </div>
        {handleTag()}
      </motion.div>
    </AnimatePresence>
  );
};

export default CardMau;
