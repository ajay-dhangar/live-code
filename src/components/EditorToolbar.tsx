import React from 'react';
import {
  Play,
  Copy,
  Download,
  Settings,
  Moon,
  Sun,
  Maximize2,
  RefreshCw,
  Save,
} from 'lucide-react';
import { EditorFile, EditorSettings } from '../types';

interface EditorToolbarProps {
  file: EditorFile;
  settings: EditorSettings;
  onRun: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onToggleTheme: () => void;
  onToggleSettings: () => void;
  onFullscreen: () => void;
  onReset: () => void;
  onSave: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  file,
  settings,
  onRun,
  onCopy,
  onDownload,
  onToggleTheme,
  onToggleSettings,
  onFullscreen,
  onReset,
  onSave,
}) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/90 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Run</span>
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/80 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onCopy}
          className="p-1.5 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Copy Code"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={onDownload}
          className="p-1.5 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Download File"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleTheme}
          className="p-1.5 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {settings.theme.value === 'vs-dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={onToggleSettings}
          className="p-1.5 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={onFullscreen}
          className="p-1.5 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-colors"
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};