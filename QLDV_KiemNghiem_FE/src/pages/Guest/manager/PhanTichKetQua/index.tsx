import { motion } from "motion/react";
import List from "./List";

const PhanTichKetQua = () => {
  return (
    <motion.div
      key="PhanTichKetQua"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <List />
    </motion.div>
  );
};

export default PhanTichKetQua;
