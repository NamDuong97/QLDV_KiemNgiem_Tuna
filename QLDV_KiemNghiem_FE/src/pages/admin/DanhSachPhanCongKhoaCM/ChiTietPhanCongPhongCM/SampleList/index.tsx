import { useState } from "react";
import SampleCard from "../SampleCard";
import ImageModal from "../ImageModal";
import ConfirmationModal from "../../../../../components/ConfirmationModal";

interface Props {
  data: any;
  isLoading: boolean;
}

const assignments = [
  {
    id: 1,
    code: "PĐX001",
    registrationCode: "PĐK001",
    customerName: "Công ty TNHH ABC",
    proposedBy: "Nguyễn Văn A",
    sampleDeliveryTime: "15/05/2023 10:30",
    assignmentDate: "16/05/2023",
    status: "Chờ xử lý",
    samples: [
      {
        id: 1,
        name: "Mẫu nước uống đóng chai",
        standard: "TCVN 6096:2004",
        service: "Kiểm nghiệm vi sinh",
        batchNumber: "LO-12345",
        productionDate: "10/05/2023",
        completionTime: "20/05/2023",
        expectedResultDate: "22/05/2023",
        expiryDate: "10/05/2024",
        quantity: "5",
        unit: "Chai",
        storageCondition: "Nhiệt độ phòng, tránh ánh nắng trực tiếp",
        manufacturer: "Công ty TNHH ABC",
        condition: "Còn nguyên vẹn",
        testingRequirements:
          "Kiểm tra các chỉ tiêu vi sinh, kim loại nặng theo TCVN 6096:2004",
        notes: "Mẫu được lấy trực tiếp tại nhà máy sản xuất",
        status: "Chờ xử lý",
        images: [
          { id: 1, url: "/placeholder-image.png" },
          { id: 2, url: "/placeholder-image.png" },
          { id: 3, url: "/placeholder-image.png" },
        ],
      },
      {
        id: 2,
        name: "Mẫu nước khoáng",
        standard: "TCVN 6096:2004",
        service: "Kiểm nghiệm hóa học",
        batchNumber: "LO-67890",
        productionDate: "12/05/2023",
        completionTime: "21/05/2023",
        expectedResultDate: "23/05/2023",
        expiryDate: "12/05/2024",
        quantity: "3",
        unit: "Chai",
        storageCondition: "Nhiệt độ phòng, tránh ánh nắng trực tiếp",
        manufacturer: "Công ty TNHH ABC",
        condition: "Còn nguyên vẹn",
        testingRequirements:
          "Kiểm tra các chỉ tiêu hóa học theo TCVN 6096:2004",
        notes: "Mẫu được lấy từ lô hàng mới nhập",
        status: "Từ chối",
        rejectionReason: "Mẫu không đủ số lượng để kiểm nghiệm",
        rejectionNote:
          "Cần bổ sung thêm ít nhất 2 chai mẫu để đảm bảo đủ số lượng cho các phép thử",
        images: [
          { id: 1, url: "/placeholder-image.png" },
          { id: 2, url: "/placeholder-image.png" },
        ],
      },
      {
        id: 3,
        name: "Mẫu nước tinh khiết",
        standard: "TCVN 6096:2004",
        service: "Kiểm nghiệm vi sinh và hóa học",
        batchNumber: "LO-24680",
        productionDate: "14/05/2023",
        completionTime: "24/05/2023",
        expectedResultDate: "26/05/2023",
        expiryDate: "14/05/2024",
        quantity: "10",
        unit: "Chai",
        storageCondition: "Nhiệt độ phòng, tránh ánh nắng trực tiếp",
        manufacturer: "Công ty TNHH ABC",
        condition: "Còn nguyên vẹn",
        testingRequirements:
          "Kiểm tra đầy đủ các chỉ tiêu vi sinh và hóa học theo TCVN 6096:2004",
        notes: "Mẫu được lấy từ dây chuyền sản xuất mới",
        status: "Chờ xử lý",
        images: [
          { id: 1, url: "/placeholder-image.png" },
          { id: 2, url: "/placeholder-image.png" },
          { id: 3, url: "/placeholder-image.png" },
          { id: 4, url: "/placeholder-image.png" },
        ],
      },
    ],
    history: [
      {
        action: "Tạo phiếu đề xuất",
        description: "Phiếu đề xuất được tạo bởi Nguyễn Văn A",
        date: "15/05/2023 09:30",
        user: "Nguyễn Văn A",
      },
      {
        action: "Giao mẫu",
        description: "Mẫu được giao đến trung tâm kiểm nghiệm",
        date: "15/05/2023 10:30",
        user: "Trần Thị B",
      },
      {
        action: "Phân công",
        description: "Phân công kiểm nghiệm cho nhóm A",
        date: "16/05/2023 08:45",
        user: "Lê Văn C",
      },
    ],
  },
  {
    id: 2,
    code: "PĐX002",
    registrationCode: "PĐK002",
    customerName: "Công ty CP XYZ",
    proposedBy: "Trần Thị B",
    sampleDeliveryTime: "14/05/2023 14:15",
    assignmentDate: "15/05/2023",
    status: "Đã duyệt",
    samples: [],
    history: [],
  },
  {
    id: 3,
    code: "PĐX003",
    registrationCode: "PĐK003",
    customerName: "Công ty TNHH DEF",
    proposedBy: "Lê Văn C",
    sampleDeliveryTime: "13/05/2023 09:00",
    assignmentDate: "14/05/2023",
    status: "Từ chối",
    samples: [],
    history: [],
  },
  {
    id: 4,
    code: "PĐX004",
    registrationCode: "PĐK004",
    customerName: "Công ty TNHH GHI",
    proposedBy: "Phạm Thị D",
    sampleDeliveryTime: "16/05/2023 11:45",
    assignmentDate: "17/05/2023",
    status: "Đang xử lý",
    samples: [],
    history: [],
  },
  {
    id: 5,
    code: "PĐX005",
    registrationCode: "PĐK005",
    customerName: "Công ty TNHH JKL",
    proposedBy: "Hoàng Văn E",
    sampleDeliveryTime: "17/05/2023 08:30",
    assignmentDate: "18/05/2023",
    status: "Hoàn thành",
    samples: [],
    history: [],
  },
];

const SampleList = (props: Props) => {
  const { data, isLoading } = props;
  const assignment = assignments.find((a) => a.id === 1);
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
          {assignment?.samples?.length === 0 ? (
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
              {assignment?.samples?.map((sample: any) => (
                <SampleCard
                  key={sample.maId}
                  sample={sample}
                  isLoading={isLoading}
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
        image={selectedImage}
      />
      <ConfirmationModal
        isOpen={isOpenConfirmation}
        onClose={() => setisOpenConfirmation(false)}
        title="Thông báo"
        message="Bạn có chắc chắn từ chối không?"
        onConfirm={() => setisOpenConfirmation(false)}
      />
    </div>
  );
};

export default SampleList;
