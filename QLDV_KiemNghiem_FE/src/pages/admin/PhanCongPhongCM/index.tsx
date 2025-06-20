import { AnimatePresence, motion } from "framer-motion";
import RegistrationDetails from "./RegistrationDetails";
import SampleList from "./SampleList";
import "./style.module.scss";
import { xemChitietPhieuDKKM } from "../../../hooks/personnels/quanLyPhieuDKKM";
import { queryKhoaAll } from "../../../hooks/personnels/queryKhoa";
export interface Sample {
  id?: string;
  name?: string;
  type?: string;
  status?: string;
  priority?: string;
  receivedDate?: string;
  patientName?: string;
  patientId?: string;
  description?: string;
  assignedDepartment?: string | null;
}

const sampleData = [
  {
    id: "MAU-2023-001",
    name: "Mẫu máu xét nghiệm công thức máu",
    type: "Máu",
    status: "Chờ phân công",
    priority: "Cao",
    receivedDate: "2023-11-15T08:30",
    patientName: "Nguyễn Văn A",
    patientId: "BN-2023-1234",
    description: "Mẫu máu để xét nghiệm công thức máu toàn phần",
    assignedDepartment: null,
  },
  {
    id: "MAU-2023-002",
    name: "Mẫu máu xét nghiệm đường huyết",
    type: "Máu",
    status: "Chờ phân công",
    priority: "Cao",
    receivedDate: "2023-11-15T08:30",
    patientName: "Nguyễn Văn A",
    patientId: "BN-2023-1234",
    description: "Mẫu máu để xét nghiệm đường huyết",
    assignedDepartment: null,
  },
];

const colorPresets = [
  "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
  "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
  "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
];

const PhanCongPhongCM = () => {
  const sessionId = sessionStorage.getItem("phan-cong");
  const ID = sessionId ? JSON.parse(sessionId) : "";

  const { data, isLoading } = xemChitietPhieuDKKM({
    queryKey: "ChitietPhieuDKKM",
    params: ID,
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
        className="p-6 grid gap-4"
      >
        <RegistrationDetails data={data} isLoading={isLoading} />
        <SampleList
          initialSamples={sampleData}
          departments={departments}
          data={data}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PhanCongPhongCM;
