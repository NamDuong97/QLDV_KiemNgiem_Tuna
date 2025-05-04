import { Box, Dialog } from "@mui/material";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Tables from "./Table";
import { Align } from "../../../../models/Table";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const tableHead = [
  {
    id: "image",
    sort: false,
    label: "Ảnh",
    align: Align.Center,
  },
];

const PopupListImage = (props: Props) => {
  const { open, handleClose } = props;

  const [listCheckBox, setListCheckBox] = useState<any>([]);

  const [ErrorisTrungLap, setErrorIsTrungLap] = useState(false);

  const [listImage, setListImage] = useState(() => {
    const dataImageTemp = sessionStorage.getItem("ImageTemp");
    return dataImageTemp ? JSON.parse(dataImageTemp) : [];
  });

  var lengthCheckbox = listCheckBox.filter(
    (item: any) => item.isChecked
  ).length;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        const isDuplicate = listImage.some(
          (img: any) =>
            img.name === file.name &&
            img.size === file.size &&
            img.lastModified === file.lastModified
        );

        if (!isDuplicate) {
          const reader = new FileReader();
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            const imgData = reader.result as string;
            const newImage = {
              name: file.name,
              size: file.size,
              lastModified: file.lastModified,
              base64: imgData,
            };
            setListImage((prev: any[]) => [...prev, newImage]);
            setErrorIsTrungLap(false);
          };
          reader.readAsDataURL(file);
        } else {
          setErrorIsTrungLap(true);
        }
      });
    },
    [listImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handeleRemoveImage = () => {
    const temp = listCheckBox.filter((item: any) => item.isChecked);
    const updatedImages = listImage.filter((item: any) => {
      return !temp.some(
        (subitem: any) =>
          subitem.base64 === item.base64 &&
          subitem.name === item.name &&
          subitem.size === item.size &&
          subitem.lastModified === item.lastModified
      );
    });
    setListImage(updatedImages);
    setListCheckBox([]);
  };

  console.log("listCheckBox", listCheckBox);
  console.log("listImage", listImage);

  useEffect(() => {
    sessionStorage.setItem("ImageTemp", JSON.stringify(listImage));
    setListCheckBox(listImage);
  }, [listImage]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      key="popupListImage"
      onClose={handleClose}
    >
      <Box className="relative px-7 py-6 w-[320px] sm:w-[550px] md:w-[620px]">
        <Box className="absolute top-2 right-5">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={handleClose}
          >
            <IoMdClose className="w-6 h-6 text-gray-300" />
          </button>
        </Box>
        <Box>
          <motion.div
            key="listImage"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box className="grid gap-6">
              <Box className="py-2">
                <h1 className="font-bold text-3xl">Danh Sách Ảnh</h1>
              </Box>
              <Box className="grid gap-4">
                <Box
                  className={`flex ${
                    lengthCheckbox ? "justify-between" : "justify-end"
                  }`}
                >
                  {lengthCheckbox > 0 && (
                    <button
                      onClick={handeleRemoveImage}
                      className="font-bold text-center bg-gray-500 py-2 px-4 text-white rounded-md hover:bg-gray-400 cursor-pointer shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                    >
                      Xóa Ảnh
                    </button>
                  )}

                  <Box {...getRootProps()}>
                    <button className="font-bold text-center bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-400 cursor-pointer shadow-[3px_3px_2px_rgba(0,0,0,0.4)]">
                      Thêm Ảnh
                    </button>
                    <input {...getInputProps()} />
                  </Box>
                </Box>

                <Tables
                  tableHead={tableHead}
                  setListCheckBox={setListCheckBox}
                  listCheckBox={listCheckBox}
                />
                {listImage.length >= 5 && (
                  <p className="text-red-500 text-lg/6">
                    Ảnh đã được upload tối đa là 5 hình
                  </p>
                )}
                {ErrorisTrungLap && (
                  <p className="text-red-500 text-lg/6">
                    Ảnh không được trùng lặp
                  </p>
                )}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupListImage;
