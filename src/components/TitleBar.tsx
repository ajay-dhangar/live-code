import React from 'react';
import { Circle } from 'lucide-react';

export const TitleBar: React.FC = () => {
  return (
    <div className="bg-gray-800 h-10 flex items-center px-4 select-none">
      <div className="flex items-center gap-2">
        <Circle className="w-3 h-3 text-red-500 fill-current" />
        <Circle className="w-3 h-3 text-yellow-500 fill-current" />
        <Circle className="w-3 h-3 text-green-500 fill-current" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-700 rounded-lg px-4 py-1 flex items-center gap-2 max-w-2xl w-full">
          <div className="flex-1 text-sm text-gray-400 truncate">
            https://code-editor.dev/playground
          </div>
        </div>
      </div>
    </div>
  );
};