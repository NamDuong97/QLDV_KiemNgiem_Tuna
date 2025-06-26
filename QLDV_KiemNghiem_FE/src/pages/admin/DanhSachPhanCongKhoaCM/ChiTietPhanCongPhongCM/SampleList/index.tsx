import { useState } from "react";
import SampleCard from "../SampleCard";
import ImageModal from "../ImageModal";
import ConfirmationModal from "../../../../../components/ConfirmationModal";
import { TypeConformation } from "../../../../../constants/typeConfirmation";

interface Props {
  data: any;
  isLoading: boolean;
}

const SampleList = (props: Props) => {
  const { data, isLoading } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenConfirmation, setisOpenConfirmation] = useState(false);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Danh sách mẫu cần phân công
          </h2>
        </div>
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
            <div className="grid grid-cols-1 gap-4">
              {data?.map((sample: any, index: any) => (
                <SampleCard
                  key={index}
                  index={index}
                  sample={sample}
                  onImageClick={handleImageClick}
                  handleTuChoi={() => setisOpenConfirmation(true)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageModal={selectedImage}
      />
      <ConfirmationModal
        isOpen={isOpenConfirmation}
        onClose={() => setisOpenConfirmation(false)}
        title="Thông báo"
        message="Bạn có chắc chắn từ chối không?"
        onConfirm={() => setisOpenConfirmation(false)}
        type={TypeConformation.Error}
      />
    </div>
  );
};

export default SampleList;
