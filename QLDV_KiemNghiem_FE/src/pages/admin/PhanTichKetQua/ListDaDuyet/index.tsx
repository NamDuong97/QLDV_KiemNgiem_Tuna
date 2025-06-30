import { useState } from "react";
import { Search } from "react-feather";
import Card from "../Card";
import { sampleData } from "..";
import { queryPhanTichKetQuaAll } from "../../../../hooks/personnels/queryPTKQ";
import { getRoleGroup } from "../../../../configs/Role";
import { role } from "../../../../configs/parseJwt";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";

const ListDaDuyet = ({ onView, onEdit }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { personnelInfo } = usePersonnel();

  const { data } = queryPhanTichKetQuaAll({
    queryKey: "PhanTichKetQuaAll",
    params:
      getRoleGroup(role) === "KN"
        ? role === "KN"
          ? {
              getAll: true,
              maKhoa: personnelInfo?.maKhoa,
              manvLap: personnelInfo?.maId,
            }
          : {
              getAll: true,
              maKhoa: personnelInfo?.maKhoa,
              manvLap: personnelInfo?.maId,
            }
        : {},
  });

  const filteredResults = Object.values(sampleData).filter((result: any) => {
    const matchesSearch =
      result.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.sampleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách phiếu phân tích
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã phiếu, tên mẫu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang kiểm tra">Đang kiểm tra</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {filteredResults.map((result: any) => (
            <Card
              key={result.code}
              result={result}
              onView={onView}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDaDuyet;
