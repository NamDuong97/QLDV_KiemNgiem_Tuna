import SampleCard from "../SampleCard";
import InputSearch2 from "../../../../../components/InputSearch2";

interface Props {
  data: any;
  isLoading: boolean;
}

const SampleList = (props: Props) => {
  const { data, isLoading } = props;

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Danh sách mẫu cần phân công
          </h2>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <InputSearch2
                placeholder="Tìm kiếm mẫu..."
                // value={searchQuery}
                // onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Sample List */}
        <div className="p-6">
          {data?.length === 0 ? (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-gray-500">Không tìm thấy mẫu</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((sample: any) => (
                <SampleCard
                  key={sample.maId}
                  sample={sample}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleList;
