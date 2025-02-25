import { FC, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { EditorFile, EditorSettings } from '../types';
import { EditorToolbar } from './EditorToolbar';

interface EditorProps {
  file: EditorFile;
  settings: EditorSettings;
  onChange: (value: string | undefined) => void;
}

export const Editor: FC<EditorProps> = ({ file, settings, onChange }) => {
  const handleRun = useCallback(() => {
    // Trigger preview refresh
    const event = new CustomEvent('preview-refresh');
    window.dispatchEvent(event);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(file.value);
  }, [file.value]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([file.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [file]);

  const handleFullscreen = useCallback(() => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleReset = useCallback(() => {
    // TODO: Implement reset functionality
  }, []);

  const handleSave = useCallback(() => {
    // TODO: Implement save functionality
    localStorage.setItem(`editor_${file.name}`, file.value);
  }, [file]);

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar
        file={file}
        settings={settings}
        onRun={handleRun}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onToggleTheme={() => {/* TODO */}}
        onToggleSettings={() => {/* TODO */}}
        onFullscreen={handleFullscreen}
        onReset={handleReset}
        onSave={handleSave}
      />
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language={file.language}
          value={file.value}
          theme={settings.theme.value}
          onChange={onChange}
          options={{
            minimap: { enabled: settings.minimap },
            fontSize: settings.fontSize,
            wordWrap: settings.wordWrap ? 'on' : 'off',
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            folding: true,
            glyphMargin: false,
            tabSize: 2,
            renderWhitespace: 'none',
            smoothScrolling: true,
            contextmenu: true,
            mouseWheelZoom: true,
            quickSuggestions: true,
            renderLineHighlight: 'line',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};