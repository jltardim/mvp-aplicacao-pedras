import React, { useRef } from 'react';
import { UploadedImage } from '../types';
import { UploadIcon, XCircleIcon } from './icons';

interface ImageUploaderProps {
  image: UploadedImage | null;
  onImageChange: (image: UploadedImage | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageChange({
          base64: base64String.split(',')[1],
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset file input value to allow re-uploading the same file
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageChange({
          base64: base64String.split(',')[1],
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {image ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden group">
          <img
            src={`data:${image.mimeType};base64,${image.base64}`}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onImageChange(null)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Remove image"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        >
          <UploadIcon className="h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">
            <span className="font-semibold text-indigo-600">Clique para enviar</span> ou arraste e solte
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP (max. 10MB)</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;