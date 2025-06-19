import { AnimatePresence, motion } from "framer-motion";
import RegistrationDetails from "./RegistrationDetails";
import SampleList from "./SampleList";
import "./style.module.scss";
interface Props {}

export interface samples {
  id: string;
  name: string;
  type: string;
  status: string;
  priority: string;
  receivedDate: string;
  patientName: string;
  patientId: string;
  description: string;
  assignedDepartment: null;
}

const registrationForm = {
  id: "PDK-2023-0125",
  title: "Phiếu đăng ký xét nghiệm tổng hợp",
  status: "Chờ phân công",
  createdDate: "2023-11-15T08:30",
  dueDate: "2023-11-18T17:00",
  priority: "Cao",
  customer: {
    name: "Bệnh viện Đa khoa Trung ương",
    address: "16 Sư Vạn Hạnh, Phường 9, Quận 5, TP.HCM",
    phone: "028 3855 4137",
  },
};

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

const departments = [
  {
    id: "PB001",
    name: "Phòng Xét Nghiệm Huyết Học",
    description: "Xét nghiệm liên quan đến máu và các thành phần của máu",
    color: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  },
  {
    id: "PB002",
    name: "Phòng Xét Nghiệm Sinh Hóa",
    description: "Xét nghiệm các chỉ số sinh hóa trong cơ thể",
    color: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  },
];

const PhanCongPhongCM = (props: Props) => {
  const {} = props;
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
        <RegistrationDetails registrationForm={registrationForm} />
        <SampleList initialSamples={sampleData} departments={departments} />
      </motion.div>
    </AnimatePresence>
  );
};

export default PhanCongPhongCM;
