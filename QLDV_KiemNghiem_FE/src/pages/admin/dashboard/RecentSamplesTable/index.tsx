import StatusBadge from "../../../../components/UI/StatusBadge";
import { Sample } from "../../../../models/dashboard";

const RecentSamplesTable = () => {
  const samples: Sample[] = [
    {
      id: "MS-2023-0128",
      type: "Thực phẩm",
      customer: "Công ty TNHH ABC",
      date: "15/09/2023",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "MS-2023-0127",
      type: "Nước",
      customer: "Công ty CP XYZ",
      date: "14/09/2023",
      status: "processing",
      statusText: "Đang xử lý",
    },
    {
      id: "MS-2023-0126",
      type: "Dược phẩm",
      customer: "Công ty Dược DEF",
      date: "13/09/2023",
      status: "failed",
      statusText: "Không đạt",
    },
    {
      id: "MS-2023-0125",
      type: "Mỹ phẩm",
      customer: "Công ty TNHH GHI",
      date: "12/09/2023",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "MS-2023-0124",
      type: "Thực phẩm",
      customer: "Công ty CP JKL",
      date: "11/09/2023",
      status: "pending",
      statusText: "Chờ duyệt",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">
          Mẫu kiểm nghiệm gần đây
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Xem tất cả
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mã mẫu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Loại mẫu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Khách hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày nhận
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {samples.map((sample) => (
              <tr key={sample.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {sample.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sample.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sample.customer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sample.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge
                    status={sample.status}
                    text={sample.statusText}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Xem
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Xuất PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến{" "}
          <span className="font-medium">5</span> của{" "}
          <span className="font-medium">42</span> kết quả
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 text-sm text-white bg-indigo-600 border border-indigo-600 rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSamplesTable;
