import { Box, Pagination } from "@mui/material";
import Maus from "./Maus";
import { useState } from "react";

interface Props {
  dataMaus: any;
  isLoading: boolean;
}

const DetailMaus = (props: Props) => {
  const { dataMaus, isLoading } = props;

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
    <div>
      <Maus currentItems={currentItems?.[0]} isLoading={isLoading} />
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
    </div>
  );
};

export default DetailMaus;
