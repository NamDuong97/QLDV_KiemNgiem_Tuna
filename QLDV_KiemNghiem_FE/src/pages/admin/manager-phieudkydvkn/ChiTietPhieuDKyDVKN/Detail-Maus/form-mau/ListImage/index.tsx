import { Box } from "@mui/material";
import Tables from "./Table";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Align } from "../../../../../../../models/Table";

interface Props {
  listImage?: any;
}

const tableHead = [
  {
    id: "image",
    sort: false,
    label: "Ảnh",
    align: Align.Center,
  },
];

const ListImage = (props: Props) => {
  const { listImage } = props;

  return (
    <Box className="grid gap-4 px-4 py-6 sm:px-6 lg:px-10 lg:py-7">
      <Tables tableHead={tableHead} listImage={listImage} />
    </Box>
  );
};

export default ListImage;
