import React from 'react';
import { UploadCloud } from 'lucide-react';

interface DropzoneProps {
  title: string;
  description: string;
}

const ArtistFileDropzone: React.FC<DropzoneProps> = ({ title, description }) => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-lg 
      border-2 border-dashed border-gray-300 
      flex flex-col items-center justify-center text-center">
      <UploadCloud size={32} className="text-gray-400 mb-2" />
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default ArtistFileDropzone;