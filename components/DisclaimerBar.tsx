import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-2.5 shadow-lg z-50">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-gray-500 font-medium">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <p>
          <span className="font-bold text-gray-600">Disclaimer:</span> Aushadh-AI is an assistive tool. Outputs are AI-generated estimates. For medical decisions, <span className="underline decoration-gray-300 hover:text-gray-700 transition-colors">please consult a licensed pharmacist or physician.</span>
        </p>
      </div>
    </div>
  );
};