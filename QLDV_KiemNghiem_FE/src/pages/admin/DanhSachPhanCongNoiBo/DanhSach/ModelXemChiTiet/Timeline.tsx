import "./style.module.scss";

const Timeline = ({ events }: any) => {
  return (
    <div className="timeline-container pl-10">
      {events.map((event: any, index: any) => (
        <div
          key={index}
          className={`mb-4 relative ${
            event.completed === false ? "opacity-50" : ""
          }`}
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
              <h5 className="font-medium text-gray-800">{event.title}</h5>
              <span className="text-xs text-gray-500">{event.time}</span>
            </div>
            <p className="text-sm text-gray-600">{event.description}</p>
            {event.handler && (
              <div className="mt-1 text-xs text-gray-500">
                Thực hiện bởi: {event.handler}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
