import { useState } from "react";
import InputSearch2 from "../../../../components/InputSearch2";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { formatDate } from "../../../../configs/configAll";
import classes from "./style.module.scss";
import clsx from "clsx";
import ModelPhanCong from "./ModelPhanCong";
import removeVietnameseTones from "../../../../configs/removeVietnameseTones";
import { getAllDanhSachMau } from "../../../../hooks/personnels/phanCongKhoa";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { useGetLoaiDichVuAll } from "../../../../hooks/customers/usePhieuDKyDVKN";
import { Skeleton } from "@mui/material";
import { getRoleGroup } from "../../../../configs/Role";
import { role } from "../../../../configs/parseJwt";
import FormHuyMau from "./FormHuyMau";

const PhanCong = ({ handleDanhSachPhanCong }: any) => {
  const [isSortNew, setIsSortNew] = useState(false);
  const [openModelPhanCong, setOpenModelPhanCong] = useState(false);
  const [openModelHuyMau, setOpenModelHuyMau] = useState(false);
  const { personnelInfo } = usePersonnel();
  const { data, isLoading } = getAllDanhSachMau({
    queryKey: "DanhSachMau",
    params:
      getRoleGroup(role) === "BLD"
        ? {
            getAll: true,
            trangThaiPhanCong: 2,
          }
        : {
            getAll: true,
            maKhoa: personnelInfo?.maKhoa,
            trangThaiPhanCong: 2,
          },
  });
  const { data: dataLoaiDV } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAll",
  });
  const dataLDV: any = dataLoaiDV;
  console.log("data", data);

  const [saveID, setSaveID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = data?.data?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch =
      removeVietnameseTones(sample.tenTieuChuan.toLowerCase()).includes(
        query
      ) ||
      removeVietnameseTones(sample.tenMau.toLowerCase()).includes(query) ||
      removeVietnameseTones(sample.tenLoaiMau.toLowerCase()).includes(query);
    return matchesSearch;
  });

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-2xl">
          <InputSearch2
            placeholder="Tìm kiếm tên mẫu hoặc tiêu chuẩn hoặc dịch vụ..."
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
                <FaSortAmountUp /> Cũ Nhất
              </span>
            ) : (
              <span className="flex items-center gap-2 text-gray-800">
                <FaSortAmountDown /> Mới nhất
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <div>
              <Skeleton variant="rounded" height={286} width={478} />
            </div>
            <div>
              <Skeleton variant="rounded" height={286} width={478} />
            </div>
            <div>
              <Skeleton variant="rounded" height={286} width={478} />
            </div>
          </>
        ) : (
          filteredSamples?.map((sample: any, index: any) => (
            <div
              key={index}
              className={clsx(
                "rounded-xl overflow-hidden",
                classes.sample_item,
                classes.glass_card
              )}
            >
              <div className="p-5">
                <h3 className="font-semibold text-blue-700 text-xl mb-3">
                  {sample.tenMau}
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tiêu chuẩn áp dụng</p>
                    <p className="text-base/6 font-medium text-gray-700">
                      {sample.tenTieuChuan}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Dịch vụ kiểm nghiệm</p>
                    <p className="text-base/6 font-medium text-gray-700">
                      {
                        dataLDV?.find(
                          (item: any) => item.maLoaiDv === "DVG03-90"
                        )?.tenDichVu
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số lô</p>
                    <p className="text-base/6 font-medium text-gray-700">
                      {sample.soLo}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số lượng</p>
                    <p className="text-base/6 font-medium text-gray-700">
                      {sample.soLuong}
                      {sample.donViTinh}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>HSD: {formatDate(sample.hanSuDung)}</span>
                  </div>
                  {getRoleGroup(role) === "KN" && (
                    <div className="flex items-center gap-2">
                      {[
                        {
                          label: "Hủy mẫu",
                          color: "rose",
                          onClick: () => {
                            setSaveID(sample.maId);
                            setOpenModelHuyMau(true);
                          },
                        },
                        {
                          label: "Phân công nhân viên",
                          color: "green",
                          onClick: () => {
                            setSaveID(sample?.maId);
                            setOpenModelPhanCong(true);
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredSamples?.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-800">
            Tất cả mẫu đã được phân công
          </h3>
          <p className="mt-2 text-gray-500">
            Không còn mẫu nào chưa được phân công
          </p>
          <button
            onClick={handleDanhSachPhanCong}
            className="cursor-pointer mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all"
          >
            Xem danh sách phân công
          </button>
        </div>
      ) : null}

      <ModelPhanCong
        open={openModelPhanCong}
        handleClose={() => setOpenModelPhanCong(false)}
        dataID={saveID}
        maKhoa={personnelInfo?.maKhoa}
        manv={personnelInfo?.maId}
        hoTenNVPC={personnelInfo?.hoTen}
      />
      <FormHuyMau
        open={openModelHuyMau}
        handleClose={() => setOpenModelHuyMau(false)}
        dataID={saveID}
      />
    </>
  );
};

export default PhanCong;
