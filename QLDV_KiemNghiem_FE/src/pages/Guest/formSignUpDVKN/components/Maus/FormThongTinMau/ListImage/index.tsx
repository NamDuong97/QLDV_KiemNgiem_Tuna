import { Box } from "@mui/material";
import Tables from "./Table";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  errorsMessage?: any;
  setListImage: Dispatch<any>;
  listImage: any;
}

const ListImage = (props: Props) => {
  const { errorsMessage, setListImage, listImage } = props;
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const [ErrorisTrungLap, setErrorIsTrungLap] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log("acceptedFiles");
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
              ten: file.name,
              size: file.size,
              lastModified: file.lastModified,
              base64: imgData,
              ghiChu: "",
              image: file,
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

  const handleChangeNote = (name: string, noteValue: string) => {
    const updated = listImage.map((item: any) =>
      item.ten === name ? { ...item, ghiChu: noteValue } : item
    );
    setListImage(updated);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handeleRemoveImage = () => {
    const temp = listImage.filter((item: any) => item.base64 === selectedRow);
    const updatedImages = listImage.filter((item: any) => {
      return !temp.some(
        (subitem: any) =>
          subitem.base64 === item.base64
      );
    });
    setListImage(updatedImages);
    setSelectedRow(null);
  };

  useEffect(() => {
    sessionStorage.setItem("ImageTemp", JSON.stringify(listImage));
    setListImage(listImage);
  }, [listImage]);

  return (
    <Box className="grid gap-4 pt-6">
      <Box className={`flex justify-end gap-6`}>
        {selectedRow && (
          <p
            onClick={handeleRemoveImage}
            className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-red-500 text-red-500 group hover:bg-red-500"
          >
            <span className="text-base/6 md:text-lg/6 font-bold text-red-500 group-hover:text-white">
              Xóa Ảnh
            </span>
          </p>
        )}

        <Box {...getRootProps()}>
          <p className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500">
            <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
              Thêm Ảnh
            </span>
          </p>
          <input {...getInputProps()} />
        </Box>
      </Box>

      <Tables
        setListImage={setListImage}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        listImage={listImage}
        handleChangeNote={handleChangeNote}
      />
      {listImage?.length >= 5 && (
        <p className="text-[#af1c10] text-lg/6">
          Ảnh đã được upload tối đa 5 hình
        </p>
      )}
      {ErrorisTrungLap && (
        <p className="text-[#af1c10] text-lg/6">Ảnh không được trùng lặp</p>
      )}
      {errorsMessage && (
        <p className="text-[#af1c10] text-lg/6">{errorsMessage}</p>
      )}
    </Box>
  );
};

export default ListImage;
