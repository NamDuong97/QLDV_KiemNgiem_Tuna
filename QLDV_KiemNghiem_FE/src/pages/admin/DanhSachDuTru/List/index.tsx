import { useState } from "react";
import Card from "../Card";
import { sampleData } from "..";
import InputSearch2 from "../../../../components/InputSearch2";
import SelectItemTrangThai from "./SelectItemTrangThai";

const List = ({ onView, onEdit, handleTag }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredResults = Object.values(sampleData).filter((result: any) => {
    const matchesSearch =
      result.Ten_Mau.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.MaPhieuDuTru.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách phiếu
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex gap-4 w-lg">
              <InputSearch2
                placeholder="Tìm kiếm ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <SelectItemTrangThai
              title="Trạng thái"
              setItem={setStatusFilter}
              item={statusFilter}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {filteredResults?.length > 0 ? (
            filteredResults.map((result: any, index: any) => (
              <Card
                key={index}
                result={result}
                onView={onView}
                onEdit={onEdit}
              />
            ))
          ) : (
            <div className="p-8 text-center">
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
                Chưa có phiếu nào
              </h3>
              <p className="mt-2 text-gray-500">Bắt đầu tạo phiếu dự trù</p>
              <button
                onClick={handleTag}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
              >
                Tạo phiếu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
