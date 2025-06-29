import clsx from "clsx";
import classes from "./style.module.scss";

const Timeline = ({ events, handleShowTienDo }: any) => {
  return (
    <div
      className={clsx(
        "timeline-container pl-3 flex relative max-h-96 overflow-y-auto",
        classes.scrollbar_thin
      )}
    >
      <div className="w-full h-full  pl-4 border-l border-gray-300">
        {events.map((event: any, index: any) => (
          <div
            key={index}
            className={`mb-4 relative rounded-md hover:shadow-lg transition-all ease-in-out duration-300 cursor-pointer ${
              event.completed === false ? "opacity-50" : ""
            }`}
            onClick={() => handleShowTienDo(event?.title)}
          >
            <div className="timeline-dot absolute -left-6 mt-1.5">
              <div
                className={`w-4 h-4 ${
                  event.completed === false
                    ? "bg-gray-300"
                    : event.active
                    ? "bg-green-500"
                    : "bg-blue-500"
                } rounded-full`}
              ></div>
            </div>
            <div
              className={`bg-gray-50 p-3 rounded-lg ${
                event.active ? "border-l-4 border-green-400" : ""
              } ${
                event.completed === false
                  ? "border-dashed border border-gray-300"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-semibold text-gray-800">{event.title}</h5>
                <span className="text-xs text-gray-500">{event.time}</span>
              </div>
              {event.handler && (
                <div className="mt-1 text-sm text-gray-500">
                  Thực hiện bởi: {event.handler}
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Nội dung báo cáo:</p>
                <p className="text-sm text-gray-600"> {event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
