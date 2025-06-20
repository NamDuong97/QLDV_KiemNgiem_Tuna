import { AnimatePresence, motion } from "framer-motion";
import RegistrationDetails from "./RegistrationDetails";
import "./style.module.scss";
import { getPhanCongKhoaCMByID } from "../../../../hooks/personnels/phanCongKhoa";
import SampleList from "./SampleList";

const ChiTietPhanCongPhongCM = () => {
  const sessionId = sessionStorage.getItem("chi-tiet-phan-cong");
  const ID = sessionId ? JSON.parse(sessionId) : "";

  const { data, isLoading } = getPhanCongKhoaCMByID({
    queryKey: "ChitietPhieuDKKM",
    params: ID,
  });
  console.log("data", data);

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
          data={data?.chiTietPhieuDeXuatPhongBans}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChiTietPhanCongPhongCM;
