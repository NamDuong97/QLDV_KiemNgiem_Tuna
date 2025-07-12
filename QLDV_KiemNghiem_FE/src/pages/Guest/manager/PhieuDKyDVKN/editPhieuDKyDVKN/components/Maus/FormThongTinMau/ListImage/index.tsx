import { Box } from "@mui/material";
import Tables from "./Table";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  errorsMessage?: any;
  setListImage: Dispatch<any>;
  listImage: any;
  dataMau: any;
}

const ListImage = (props: Props) => {
  const { errorsMessage, setListImage, listImage, dataMau } = props;
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const [ErrorisTrungLap, setErrorIsTrungLap] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const imgData = reader.result as string;
          const isDuplicate = listImage.some(
            (img: any) => img.base64 === imgData
          );

          if (!isDuplicate) {
            const newImage = {
              base64: imgData,
              ghiChu: "",
            };
            setListImage((prev: any[]) => [...prev, newImage]);
            setErrorIsTrungLap(false);
          } else {
            setErrorIsTrungLap(true);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [listImage]
  );

  const handleChangeNote = (name: string, noteValue: string) => {
    const updated = listImage.map((item: any) =>
      item.base64 === name ? { ...item, ghiChu: noteValue } : item
    );
    setListImage(updated);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handeleRemoveImage = () => {
    const existsInDataMau = dataMau.phieuDangKyMauHinhAnhs.some(
      (item: any) => item.pathImg === selectedRow
    );
    let updatedImages;
    if (existsInDataMau) {
      // Nếu tồn tại trong dataMau => thêm isDel: true
      updatedImages = listImage.map((item: any) =>
        item.base64 === selectedRow ? { ...item, isDel: true } : item
      );
    } else {
      // Nếu không tồn tại trong dataMau => xóa khỏi listImage
      updatedImages = listImage.filter(
        (item: any) => item.base64 !== selectedRow
      );
    }
    setListImage(updatedImages); // cập nhật state Ảnh
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
        {listImage?.filter((item: any) => !item.isDel)?.length < 5 && (
          <Box {...getRootProps()}>
            <p className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500">
              <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
                Thêm Ảnh
              </span>
            </p>
            <input {...getInputProps()} />
          </Box>
        )}
      </Box>

      <Tables
        setListImage={setListImage}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        listImage={listImage?.filter((img: any) => !img.isDel)}
        handleChangeNote={handleChangeNote}
      />
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
