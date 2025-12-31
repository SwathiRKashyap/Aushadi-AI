import React from 'react';
import { RotateCw, X, Check } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  rotation: number;
  onRotate: () => void;
  onClear: () => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  rotation, 
  onRotate, 
  onClear, 
  onProcess,
  isProcessing 
}) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-700">Preview</h3>
        <button 
          onClick={onClear}
          disabled={isProcessing}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative bg-gray-900 h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Prescription Preview" 
          className="max-w-full max-h-full object-contain transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>

      <div className="p-4 flex gap-3">
        <button 
          onClick={onRotate}
          disabled={isProcessing}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 focus:ring-4 focus:ring-gray-100"
        >
          <RotateCw className="w-5 h-5" />
          Rotate
        </button>
        <button 
          onClick={onProcess}
          disabled={isProcessing}
          className="flex-[2] py-3 px-4 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#256628] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 focus:ring-4 focus:ring-green-100 shadow-lg shadow-green-900/10"
        >
          {isProcessing ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Analyzing...
             </>
          ) : (
             <>
               <Check className="w-5 h-5" />
               Analyze Prescription
             </>
          )}
        </button>
      </div>
    </div>
  );
};
