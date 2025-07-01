import { Dialog } from "@mui/material";
import { image } from "../../../../../constants/image";

const ImageModal = ({ isOpen, imageModal, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onClick={onClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Xem ảnh mẫu</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-300 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src={imageModal?.url || image.imageTunaLogo}
            alt="Ảnh mẫu"
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ImageModal;
