import clsx from "clsx";
import classes from "./style.module.scss";
import { Skeleton } from "@mui/material";
import { formatDate } from "../../../../../configs/configAll";

const Timeline = ({ events, handleShowTienDo, isLoading }: any) => {
  return (
    <div
      className={clsx(
        "timeline-container pl-3 flex relative max-h-96 overflow-y-auto",
        classes.scrollbar_thin
      )}
    >
      <div className="w-full h-full  pl-4 border-l border-gray-300">
        {isLoading ? (
          <div>
            <Skeleton variant="rounded" className="w-full" height={112} />
            <Skeleton variant="rounded" className="w-full" height={112} />
            <Skeleton variant="rounded" className="w-full" height={112} />
          </div>
        ) : (
          events?.map((event: any, index: any) => (
            <div
              key={index}
              className={`mb-4 relative rounded-md hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] transition-all ease-in-out duration-300 cursor-pointer border border-gray-200`}
              onClick={() => handleShowTienDo(event?.maID)}
            >
              <div className="timeline-dot absolute -left-6 mt-1.5">
                <div
                  className={`w-4 h-4 ${
                    events?.length === index + 1
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } rounded-full`}
                ></div>
              </div>
              <div
                className={`bg-gray-50 p-3 rounded-lg ${
                  events?.length === index ? "border-l-4 border-green-400" : ""
                } ${
                  event.completed === false
                    ? "border-dashed border border-gray-300"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-semibold text-gray-800">
                    {event?.tenGiaiDoanThucHien}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {formatDate(event?.thoiGianTu)} -{" "}
                    {formatDate(event?.thoiGianDen)}
                  </span>
                </div>
                {event?.tennvKiemTra && (
                  <div className="mt-1 text-sm text-gray-500">
                    Thực hiện bởi: {event?.tennvKiemTra}
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Nội dung báo cáo:</p>
                  <p className="text-sm text-gray-800 font-semibold">
                    {event?.noiDungBaoCao}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;
