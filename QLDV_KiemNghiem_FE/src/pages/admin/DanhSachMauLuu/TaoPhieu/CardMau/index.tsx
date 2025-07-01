import { AnimatePresence, motion } from "framer-motion";
import SampleList from "./SampleList";
import "./style.module.scss";
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

const CardMau = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="CardMau"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4"
      >
        <SampleList />
      </motion.div>
    </AnimatePresence>
  );
};

export default CardMau;
