interface StatusBadgeProps {
  status: "completed" | "processing" | "failed" | "pending";
  text: string;
}

const StatusBadge = ({ status, text }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
        };
      case "processing":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          dot: "bg-yellow-500",
        };
      case "failed":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-500",
        };
      case "pending":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles.bg} ${styles.text}`}
    >
      <span className={`status-badge ${styles.dot}`}></span>
      {text}
    </span>
  );
};

export default StatusBadge;
