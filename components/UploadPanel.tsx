import React, { useRef, useState } from 'react';
import { Upload, Camera, FileText } from 'lucide-react';

interface UploadPanelProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: () => void;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onFileSelect, onSampleSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 transition-all duration-300 text-center ${
          isDragging
            ? 'border-[#2E7D32] bg-green-50 scale-[1.02]'
            : 'border-gray-300 hover:border-[#2E7D32] bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Upload className="w-8 h-8 text-[#2E7D32]" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Upload Prescription</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Drag & drop or tap to browse</p>
          </div>

          <div className="flex flex-wrap gap-3 w-full justify-center pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2.5 bg-white border-2 border-[#2E7D32] text-[#2E7D32] rounded-lg font-bold hover:bg-green-50 transition-colors focus:ring-4 focus:ring-green-100 focus:outline-none flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Select Image
            </button>
            
             <button
              onClick={() => cameraInputRef.current?.click()}
              className="px-6 py-2.5 bg-[#2E7D32] text-white border-2 border-[#2E7D32] rounded-lg font-bold hover:bg-[#256628] transition-colors focus:ring-4 focus:ring-green-100 focus:outline-none flex items-center gap-2 md:hidden shadow-sm"
            >
              <Camera className="w-4 h-4" />
              Capture
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <span className="text-gray-400 text-sm">Or try it out quickly</span>
        <button
          onClick={onSampleSelect}
          className="mt-2 text-[#2E7D32] font-medium text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          <FileText className="w-4 h-4" />
          Try with Sample Prescription
        </button>
      </div>
    </div>
  );
};