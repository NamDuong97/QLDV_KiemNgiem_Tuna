import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSearch2 from "../../../../components/InputSearch2";
import { useState } from "react";
import classes from "../PhanCong/style.module.scss";
import clsx from "clsx";
import {
  formatDate,
  formatDateNotTime,
  renderTrangThaiPhanCongNoiBo,
} from "../../../../configs/configAll";
import { Pagination, Skeleton } from "@mui/material";
import ModelXemChiTiet from "./ModelXemChiTiet";
import ModelSua from "./ModelSua";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../constants/typeConfirmation";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import {
  queryHuyPhanCong,
  queryPhanCongNoiBoAll,
} from "../../../../hooks/personnels/queryPhanCongNoiBo";
import SelectItemTrangThai from "./SelectItemTrangThai";
import ModelPhanCongLai from "./ModelPhanCongLai";
import { role } from "../../../../configs/parseJwt";
import { getRoleGroup } from "../../../../configs/Role";
import SelectItemKhoa from "./SelectItemKhoa";
import { ListColors } from "../../../../constants/colors";
import { queryClient } from "../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import ModelCreatePhieuDuTru from "./ModelCreatePhieuDuTru";
import ModelCreatePhieuPhanTichKetQua from "./ModelCreatePhieuPhanTichKetQua";
import { mutationCheckMau } from "../../../../hooks/personnels/queryMau";
import ConfirmationCanhBao from "./ConfirmationCanhBao";

interface Props {
  handleTaoPhanCong: () => void;
}

const DanhSach = (props: Props) => {
  const { handleTaoPhanCong } = props;
  const { personnelInfo } = usePersonnel();
  const [selectTrangThai, setSelectTrangThai] = useState("");
  const [isSortNew, setIsSortNew] = useState(false);
  const [selectKhoa, setSelectKhoa] = useState("");
  const [openModelXemChiTiet, setOpenModelXemChiTiet] = useState(false);
  const [openModelSua, setOpenModelSua] = useState(false);
  const [openModelPhanCongLai, setOpenModelPhanCongLai] = useState(false);
  const [openModelCreate, setOpenModelCreate] = useState(false);
  const [openModelPTKG, setOpenModelPTKG] = useState(false);
  const [openModelXoa, setOpenModelXoa] = useState(false);
  const [openModelCanhBao, setOpenModelCanhBao] = useState(false);
  const [saveID, setSaveID] = useState("");
  const [isThem, setIsThem] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  let params: any = { getAll: true };
  const roleGroup = getRoleGroup(role);

  if (roleGroup === "KN" && role === "KN") {
    params = {
      ...params,
      maKhoa: personnelInfo?.maKhoa,
      manvXuLy: personnelInfo?.maId,
    };
  } else if (roleGroup === "KN") {
    params = {
      ...params,
      maKhoa: personnelInfo?.maKhoa,
      manvPhanCong: personnelInfo?.maId,
    };
  } else {
    params =
      selectKhoa !== "" ? { ...params, maKhoa: selectKhoa } : { ...params };
  }
  if (selectTrangThai) {
    params.TrangThai = selectTrangThai;
  }
  const { data, isLoading } = queryPhanCongNoiBoAll({
    queryKey: [
      "queryPhanCongNoiBoAll",
      role,
      selectTrangThai,
      personnelInfo?.maId,
      personnelInfo?.maKhoa,
      selectKhoa,
    ],
    params,
  });

  const { mutateAsync: mutateCheckMau } = mutationCheckMau({
    queryKey: "mutationCheckMau",
  });

  const filteredSamples: any = data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample?.tenMau?.toLowerCase()).includes(query) ||
      removeVietnameseTones(sample?.tennvXuly?.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredSamples
    ?.sort((a: any, b: any) =>
      isSortNew
        ? new Date(a.ngayTao).getTime() - new Date(b.ngayTao).getTime()
        : new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime()
    )
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    filteredSamples && filteredSamples?.length / itemsPerPage
  );
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModelSua = (id: string) => {
    setSaveID(id);
    setOpenModelXemChiTiet(false);
    setOpenModelSua(true);
  };

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["queryPhanCongNoiBoAll"],
      });
      setOpenModelXoa(false);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = queryHuyPhanCong({
    queryKey: "queryHuyPhanCong",
    onSuccess: (data: any) => {
      console.log("Hủy thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Hủy thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Hủy thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Hủy thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handeHuyPhanCong = () => {
    const params = {
      maPhanCongNoiBo: saveID,
    };
    mutate(params);
  };

  const handleTaoPhieuTienDo = async (assignment: any) => {
    setSaveID(assignment.maId);
    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setIsThem(true);
      setOpenModelXemChiTiet(true);
    }
  };

  const handleModelPTKG = async (assignment: any) => {
    setSaveID(assignment.maId);

    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setOpenModelPTKG(true);
    }
  };

  const handleModelDuTru = async (assignment: any) => {
    setSaveID(assignment.maId);
    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setOpenModelCreate(true);
    }
  };

  const handleModelUpdatePCNB = async (assignment: any) => {
    setSaveID(assignment.maId);
    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setOpenModelSua(true);
    }
  };

  const handleModelPhanCongLaiPCNB = async (assignment: any) => {
    setSaveID(assignment.maId);
    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setOpenModelPhanCongLai(true);
    }
  };

  const handleModelHuyPhieu = async (assignment: any) => {
    setSaveID(assignment.maId);
    const data = await mutateCheckMau(assignment.maPdkMau);
    if (data?.complete > 0) {
      setOpenModelCanhBao(true);
    } else {
      setOpenModelXoa(true);
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-lg">
          <InputSearch2
            placeholder="Tìm kiếm tên mẫu hoặc tên nhân viên xử lý..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setIsSortNew(!isSortNew)}
            type="button"
            className="btn btn-outline-primary border border-gray-300 py-[6px] px-2 rounded cursor-pointer hover:bg-blue-50"
          >
            {isSortNew ? (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountUp /> Cũ nhất
              </span>
            ) : (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountDown />
                Mới nhất
              </span>
            )}
          </button>
          {getRoleGroup(role) === "BLD" && (
            <SelectItemKhoa
              title="Khoa"
              setItem={setSelectKhoa}
              item={selectKhoa}
            />
          )}
          <SelectItemTrangThai
            title="Trạng thái"
            setItem={setSelectTrangThai}
            item={selectTrangThai}
          />
        </div>
      </div>
      {currentItems?.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <Skeleton variant="rounded" width={479} height={357} />
              <Skeleton variant="rounded" width={479} height={357} />
              <Skeleton variant="rounded" width={479} height={357} />
            </>
          ) : (
            currentItems?.map((assignment: any, index: any) => {
              const avatarColor = ListColors[index % ListColors.length];
              return (
                <div
                  key={index}
                  className={clsx(
                    "rounded-xl overflow-hidden self-start",
                    classes.sample_item,
                    classes.glass_card
                  )}
                  onClick={() => {
                    setSaveID(assignment.maId);
                    setOpenModelXemChiTiet(true);
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-800 text-lg mb-3">
                        {assignment?.tenMau}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        {renderTrangThaiPhanCongNoiBo(assignment?.trangThai)}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-2">
                        Phân công cho
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                        >
                          {assignment?.tennvXuly.trim().split(" ").pop()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {assignment?.tennvXuly}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Ngày phân công</p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDateNotTime(assignment.ngayTao)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Người phân công</p>
                        <p className="text-sm font-medium text-gray-700">
                          {assignment?.tennvPhanCong}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Thời gian làm</p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(assignment.lamTu)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Thời gian trả kết quả
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(assignment.ngayTraKetQua)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100 justify-center items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSaveID(assignment.maId);
                          setOpenModelXemChiTiet(true);
                        }}
                        className="px-2 py-1 text-xs font-medium cursor-pointer text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors"
                      >
                        Xem chi tiết
                      </button>
                      {getRoleGroup(role) === "KN" &&
                        assignment?.trangThai === true && (
                          <>
                            {[
                              {
                                label: "Tạo phiếu tiến độ",
                                color: "pink",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  handleTaoPhieuTienDo(assignment);
                                },
                              },
                              {
                                label: "Tạo phiếu phân tích",
                                color: "violet",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  handleModelPTKG(assignment);
                                },
                              },
                              {
                                label: "Tạo phiếu dự trù",
                                color: "green",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  handleModelDuTru(assignment);
                                },
                              },
                            ].map((btn, idx) => (
                              <button
                                key={idx}
                                onClick={btn.onClick}
                                className={`px-2 py-1 text-xs font-medium cursor-pointer text-white bg-${btn.color}-500 hover:bg-${btn.color}-600 rounded-md transition-colors`}
                              >
                                {btn.label}
                              </button>
                            ))}
                          </>
                        )}

                      {getRoleGroup(role) === "KN" &&
                        role !== "KN" &&
                        assignment?.trangThai === true && (
                          <>
                            {[
                              {
                                label: "Cập nhật",
                                color: "yellow",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  handleModelUpdatePCNB(assignment);
                                },
                              },
                              {
                                label: "Hủy phiếu",
                                color: "rose",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  handleModelHuyPhieu(assignment);
                                },
                              },
                              {
                                label: "Phân công lại",
                                color: "cyan",
                                onClick: (e: any) => {
                                  e.stopPropagation();
                                  setSaveID(assignment.maId);
                                  handleModelPhanCongLaiPCNB(assignment);
                                },
                              },
                            ].map((btn, idx) => (
                              <button
                                key={idx}
                                onClick={btn.onClick}
                                className={`px-2 py-1 text-xs font-medium cursor-pointer text-white bg-${btn.color}-500 hover:bg-${btn.color}-600 rounded-md transition-colors`}
                              >
                                {btn.label}
                              </button>
                            ))}
                          </>
                        )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-800">
            Chưa có phân công nào
          </h3>
          <p className="mt-2 text-gray-500">
            Bắt đầu phân công mẫu cho nhân viên
          </p>
          <button
            onClick={handleTaoPhanCong}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
          >
            Tạo phân công mới
          </button>
        </div>
      )}
      {currentItems?.length > 0 && (
        <div className="p-4 flex justify-center">
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
              ".MuiPagination-ul": {
                justifyContent: "center",
              },
            }}
          />
        </div>
      )}

      <ModelXemChiTiet
        open={openModelXemChiTiet}
        handleClose={() => setOpenModelXemChiTiet(false)}
        dataID={saveID}
        handleOpenModelSua={handleOpenModelSua}
        setIsThem={setIsThem}
        isThem={isThem}
      />

      <ModelSua
        open={openModelSua}
        handleClose={() => setOpenModelSua(false)}
        dataID={saveID}
      />

      <ModelPhanCongLai
        open={openModelPhanCongLai}
        handleClose={() => setOpenModelPhanCongLai(false)}
        dataID={saveID}
      />

      <ModelCreatePhieuDuTru
        open={openModelCreate}
        handleClose={() => setOpenModelCreate(false)}
        dataID={saveID}
      />

      <ModelCreatePhieuPhanTichKetQua
        open={openModelPTKG}
        onClose={() => setOpenModelPTKG(false)}
        dataID={saveID}
      />

      <ConfirmationModal
        isOpen={openModelXoa}
        onClose={() => setOpenModelXoa(false)}
        onConfirm={handeHuyPhanCong}
        title={"Xác nhận hủy?"}
        message={"Bạn có chắc chắn muốn hủy?"}
        type={TypeConformation.Error}
      />
      <ConfirmationCanhBao
        isOpen={openModelCanhBao}
        onClose={() => setOpenModelCanhBao(false)}
        title={"Cảnh cáo"}
        message={"Phiếu phân tích kết quả đã tạo không thể tạo phiếu"}
        type={TypeConformation.Error}
      />
    </>
  );
};

export default DanhSach;
