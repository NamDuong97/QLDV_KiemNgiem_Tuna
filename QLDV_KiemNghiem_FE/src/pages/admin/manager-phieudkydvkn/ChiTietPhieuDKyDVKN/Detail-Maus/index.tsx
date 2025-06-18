import { Box, Pagination } from "@mui/material";
import { motion } from "motion/react";
import Maus from "./Maus";
import { useState } from "react";

interface Props {
  dataMaus: any;
  isLoading: boolean;
}

const DetailMaus = (props: Props) => {
  const { dataMaus } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataMaus?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataMaus && dataMaus?.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <motion.div
      key="tag2"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-solid border-gray-300 rounded-[10px] grid gap-2"
    >
      <Maus currentItems={currentItems[0]} />
      <hr className="text-gray-300" />
      <Box className="px-4 pb-4 pt-2 flex justify-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{
            '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
              {
                backgroundColor: "#1976d21f",
                border: "1px solid #1976d280",
                color: "#1976d2",
              },
          }}
        />
      </Box>
    </motion.div>
  );
};

export default DetailMaus;
