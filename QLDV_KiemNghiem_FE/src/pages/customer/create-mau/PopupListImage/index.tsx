import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
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

const listErrorImage = [
  {
    length: 4,
    isTrungLap: false,
    content: "Ảnh đã được upload tối đa là 5 hình",
  },
  {
    length: 4,
    isTrungLap: true,
    content: "Ảnh không được trùng lặp",
  },
  ,
];

const PopupListImage = (props: Props) => {
  const { open, handleClose } = props;

  const [listCheckBox, setListCheckBox] = useState<any>([]);

  const [ErrorisTrungLap, setErrorIsTrungLap] = useState(false);

  const [listImage, setListImage] = useState(() => {
    const dataImageTemp = sessionStorage.getItem("ImageTemp");
    return dataImageTemp ? JSON.parse(dataImageTemp) : [];
  });

  const handleTrungLap = (img: any) => {};

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const img = reader.result as string;
        listImage.map((item: any) => {
          if (item && item.image === img) {
            // setErrorIsTrungLap(false);
            // listImage.length <= 4 &&
            //   listImage.push({
            //     image: img,
            //   });
            // setListImage([...listImage]);
            console.log("ko tìm thấy");
          }
          console.log("tìm thấy");
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    sessionStorage.setItem("ImageTemp", JSON.stringify(listImage));
    setListCheckBox(listImage);
  }, [listImage]);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box className="grid gap-6">
              <Box className="py-2">
                <h1 className="font-bold text-3xl">Danh Sách Ảnh</h1>
              </Box>
              <Box className="grid gap-4">
                <Box className="flex justify-between">
                  <button
                    onClick={() => setListCheckBox([])}
                    className="font-bold text-center bg-gray-500 py-2 px-4 text-white rounded-md hover:bg-gray-400 cursor-pointer shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                  >
                    Xóa Ảnh
                    <input {...getInputProps()} />
                  </button>
                  <button
                    {...getRootProps()}
                    className="font-bold text-center bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-400 cursor-pointer shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                  >
                    Thêm Ảnh
                    <input {...getInputProps()} />
                  </button>
                </Box>

                <Tables
                  tableHead={tableHead}
                  setListCheckBox={setListCheckBox}
                  listCheckBox={listCheckBox}
                />
                {listErrorImage.map(
                  (item: any) =>
                    item?.length <= listImage.length &&
                    item?.errorImage === ErrorisTrungLap && (
                      <p className="text-red-500 text-lg/6">{item.content}</p>
                    )
                )}
              </Box>
              <Box className="flex gap-12 md:px-32">
                <button
                  className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer"
                  onClick={handleClose}
                >
                  Hủy
                </button>
                <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                  Lưu
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupListImage;
