import { AnimatePresence, motion } from "framer-motion";
import SampleList from "./SampleList";
import "./style.module.scss";
import { queryKhoaAll } from "../../../../hooks/personnels/queryKhoa";
import Card from "./Card";
import { AlertTriangle, Clipboard, Info } from "react-feather";
import { getAllDanhSachMau } from "../../../../hooks/personnels/phanCongKhoa";
import { FaMicroscope } from "react-icons/fa";

const colorPresets = [
  "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
  "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
  "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
];

const CardMau = () => {
  const { data, isLoading } = getAllDanhSachMau({
    queryKey: "AllDanhSachMau",
    params: {},
  });

  const { data: dataKhoaAll } = queryKhoaAll({
    queryKey: "queryKhoaAll",
  });
  const departments =
    dataKhoaAll
      ?.filter((khoa: any) => khoa.maId !== "K06")
      ?.map((khoa: any, index: number) => ({
        id: khoa.maId,
        name: khoa.tenKhoa,
        description: khoa.ghiChu,
        color: colorPresets[index % colorPresets.length],
      })) || [];

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
        <div className="grid gap-6 grid-cols-4">
          <Card
            title="Mẫu đang chờ phân công"
            value={data?.maus?.length || 0}
            icon={<Clipboard className="w-6 h-6" />}
            isLoading={isLoading}
            bgColor="bg-indigo-100"
            textColor="text-indigo-600"
          />
          <Card
            title="Mẫu đã bị từ chối bỏi phòng ban"
            value={data?.length || 0}
            isLoading={isLoading}
            icon={<AlertTriangle className="w-6 h-6" />}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
          <Card
            title="Mẫu đang kiểm nghiệm"
            value={data?.length || 0}
            isLoading={isLoading}
            icon={<FaMicroscope className="w-6 h-6" />}
            bgColor="bg-yellow-100"
            textColor="text-yellow-600"
          />
          <Card
            title="Mẫu đã hoàn thành"
            value={data?.length || 0}
            isLoading={isLoading}
            icon={<Info className="w-6 h-6" />}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
        </div>
        <SampleList
          departments={departments}
          data={data}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default CardMau;
