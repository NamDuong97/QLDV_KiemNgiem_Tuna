import { getStatusClass } from "../../../configs/configAll";

const StatusBadge2 = ({ status }: any) => {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge2;
