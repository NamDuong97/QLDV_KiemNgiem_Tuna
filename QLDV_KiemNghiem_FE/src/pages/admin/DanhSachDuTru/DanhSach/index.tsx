import { useState } from "react";
import classes from "../../DanhSachPhanCongNoiBo/PhanCong/style.module.scss";
import clsx from "clsx";
import { formatDateNotTime } from "../../../../configs/configAll";
import { Tooltip } from "@mui/material";
import ModelXemChiTiet from "./ModelXemChiTiet";
import ModelSua from "./ModelSua";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import { PhieuDuTru } from "..";

interface Props {
  dataDuTru: PhieuDuTru[];
}

const DanhSach = (props: Props) => {
  const { dataDuTru } = props;

  const [openModelXemChiTiet, setOpenModelXemChiTiet] = useState(false);
  const [openModelSua, setOpenModelSua] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);
  const [saveID, setSaveID] = useState("");
  const handleOpenModelSua = (id: string) => {
    setSaveID(id);
    setOpenModelXemChiTiet(false);
    setOpenModelSua(true);
  };
  return (
    <>
      {dataDuTru.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {dataDuTru.map((item: any, index: any) => (
            <div
              key={index}
              className={clsx(
                "rounded-xl overflow-hidden cursor-pointer",
                classes.sample_item,
                classes.glass_card
              )}
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 text-lg mb-3">
                    {item.MaPDK_Mau}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {item.MaPhieuDuTru}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`avatar w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium`}
                  >
                    C
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      Nguyễn Văn Cao
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Khoa lưu mẫu</p>
                    <p className="text-sm font-medium text-gray-700">
                      {item.MaKhoa}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ngày lập</p>
                    <p className="text-sm font-medium text-gray-700">
                      {formatDateNotTime(item.NgayLap)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm">
                    <span
                      className={clsx(
                        "text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full",
                        classes.status_badge
                      )}
                    >
                      Đã duyệt
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Tooltip
                      title="Xem chi tiết"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          // setSaveID(assignment.maId);
                          setOpenModelXemChiTiet(true);
                        }}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 "
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Sửa"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          // setSaveID(assignment.maId);
                          setOpenModelSua(true);
                        }}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Xóa"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => {
                          // setSaveID(assignment.maId);
                          setOpenModelXoa(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <p>Không có dữ liệu</p>
        </div>
      )}
      <ModelXemChiTiet
        open={openModelXemChiTiet}
        handleClose={() => setOpenModelXemChiTiet(false)}
        dataID={saveID}
        handleOpenModelSua={handleOpenModelSua}
      />
      <ModelSua
        open={openModelSua}
        handleClose={() => setOpenModelSua(false)}
        dataID={saveID}
      />
      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        onConfirm={() => setOpenModelXoa(false)}
        title={"Xác nhận xóa?"}
        message={"Bạn có chắc chắn muốn xóa?"}
        type={TypeConformation.Error}
      />
    </>
  );
};

export default DanhSach;
