import { Dialog } from "@mui/material";
import { typeConformationColor } from "../../../../../constants/typeConfirmation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: any;
  message: any;
  type: any;
}

const ConfirmationCanhBao = (props: Props) => {
  const { isOpen, onClose, title, message, type } = props;

  const tyleConfirmationModal = typeConformationColor[type];
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
      fullWidth
    >
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-12 h-12 rounded-full ${tyleConfirmationModal.bgIconColor} flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${tyleConfirmationModal.textIconColor}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h4 className="text-center text-lg font-medium text-gray-800 mb-2">
            {message}
          </h4>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationCanhBao;
