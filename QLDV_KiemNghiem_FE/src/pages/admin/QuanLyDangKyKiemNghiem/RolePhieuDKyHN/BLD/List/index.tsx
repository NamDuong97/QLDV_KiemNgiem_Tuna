import ListCardPhieuDky from "./ListCardPhieuDky";
import { Skeleton } from "@mui/material";

interface Props {
  data: any;
  isLoading: boolean;
  onView: () => void;
}

const List = (props: Props) => {
  const { data, isLoading, onView } = props;
  return isLoading ? (
    <div className="grid grid-cols-4 gap-4">
      <Skeleton variant="rounded" width={360} height={390} />
      <Skeleton variant="rounded" width={360} height={390} />
      <Skeleton variant="rounded" width={360} height={390} />
      <Skeleton variant="rounded" width={360} height={390} />
    </div>
  ) : data?.length > 0 ? (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((item: any, index: any) => (
        <div key={index} className="col-span-1">
          <ListCardPhieuDky registration={item} onView={onView} />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
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
      <p className="mt-2 text-gray-500">Không tìm thấy </p>
    </div>
  );
};

export default List;
