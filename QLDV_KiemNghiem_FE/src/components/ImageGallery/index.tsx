import { image } from "../../constants/image";

const ImageGallery = ({ images, onImageClick }: any) => {

  return (
    <div className="grid grid-cols-5 gap-2">
      {images && images?.length > 0 ? (
        images.map((item: any, index: any) => (
          <div
            key={index}
            className="w-36 h-36 bg-gray-100 rounded flex items-center justify-center cursor-pointer"
            onClick={() => onImageClick(item)}
          >
            {item.url ? (
              <img
                src={image.imageTunaLogo}
                alt={`Ảnh mẫu ${index + 1}`}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <img
                src={image.imageTunaLogo}
                alt={`imageTunaLogo ${index + 1}`}
                className="h-full w-full object-cover rounded"
              />
            )}
          </div>
        ))
      ) : (
        <div className="w-36 h-36 bg-gray-100 rounded flex items-center justify-center">
          <img
            src={image.imageTunaLogo}
            alt={`imageTunaLogo`}
            className="h-full w-full object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
