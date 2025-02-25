import { FC } from 'react';
import { FileCode, Folder } from 'lucide-react';
import { EditorFile } from '../types';

interface FileExplorerProps {
  files: EditorFile[];
  activeFile: string;
  onFileSelect: (fileName: string) => void;
}

export const FileExplorer: FC<FileExplorerProps> = ({
  files,
  activeFile,
  onFileSelect,
}) => {
  return (
    <div className="h-full bg-gray-900 text-white p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Folder className="w-5 h-5 text-gray-400" />
        <span className="font-medium text-gray-200">Files</span>
      </div>
      <div className="space-y-1">
        {files.map((file) => (
          <div
            key={file.name}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              activeFile === file.name
                ? 'bg-gray-800 text-blue-400'
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => onFileSelect(file.name)}
          >
            <FileCode className="w-4 h-4" />
            <span className="truncate text-sm">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};