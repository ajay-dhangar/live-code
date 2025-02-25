import React, { useState, useCallback, useEffect } from 'react';
import Split from 'react-split';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { FileExplorer } from './components/FileExplorer';
import { TitleBar } from './components/TitleBar';
import { EditorFile, PreviewFile, EditorSettings, EditorTheme } from './types';
import { Menu, X } from 'lucide-react';

const initialFiles: EditorFile[] = [
  {
    name: 'index.html',
    language: 'html',
    value: '<div id="app">\n  <h1>Welcome to the Code Editor!</h1>\n  <p>Start editing to see your changes</p>\n</div>',
  },
  {
    name: 'styles.css',
    language: 'css',
    value: 'body {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #2563eb;\n}',
  },
  {
    name: 'script.js',
    language: 'javascript',
    value: 'console.log("Ready to code!");',
  },
];

const themes: EditorTheme[] = [
  { name: 'Dark', value: 'vs-dark' },
  { name: 'Light', value: 'light' },
  { name: 'High Contrast', value: 'hc-black' },
];

const initialSettings: EditorSettings = {
  theme: themes[0],
  fontSize: 14,
  wordWrap: true,
  minimap: false,
};

function App() {
  const [files, setFiles] = useState<EditorFile[]>(initialFiles);
  const [activeFile, setActiveFile] = useState(files[0].name);
  const [mounted, setMounted] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [settings, setSettings] = useState<EditorSettings>(initialSettings);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowFileExplorer(false);
      } else {
        setShowFileExplorer(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileChange = useCallback((newValue: string | undefined) => {
    if (newValue === undefined) return;
    
    setFiles((prev) =>
      prev.map((file) =>
        file.name === activeFile ? { ...file, value: newValue } : file
      )
    );
  }, [activeFile]);

  const getPreviewFiles = (): PreviewFile => {
    return {
      html: files.find((f) => f.name === 'index.html')?.value || '',
      css: files.find((f) => f.name === 'styles.css')?.value || '',
      js: files.find((f) => f.name === 'script.js')?.value || '',
    };
  };

  const currentFile = files.find((f) => f.name === activeFile) || files[0];

  if (!mounted) {
    return <div className="h-screen bg-gray-900" />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <TitleBar />
      <div className="flex-1 flex flex-col md:flex-row relative">
        <div className="md:hidden flex items-center justify-between bg-gray-800/80 backdrop-blur-sm px-4 py-2 border-b border-gray-700">
          <button
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className="text-white p-2 hover:bg-gray-700/80 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                isPreviewMode ? 'bg-blue-600 text-white' : 'bg-gray-700/80 text-gray-200'
              }`}
            >
              {isPreviewMode ? 'Editor' : 'Preview'}
            </button>
          </div>
        </div>

        <div
          className={`${
            showFileExplorer ? 'block' : 'hidden'
          } md:block absolute md:relative z-10 w-full md:w-64 h-[calc(100%-48px)] md:h-full bg-gray-900 border-r border-gray-800`}
        >
          <div className="flex md:hidden justify-end p-2">
            <button
              onClick={() => setShowFileExplorer(false)}
              className="text-white p-2 hover:bg-gray-700/80 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <FileExplorer
            files={files}
            activeFile={activeFile}
            onFileSelect={(fileName) => {
              setActiveFile(fileName);
              if (window.innerWidth < 768) {
                setShowFileExplorer(false);
              }
            }}
          />
        </div>

        <div className="flex-1 h-[calc(100%-48px)] md:h-full">
          <Split
            className="flex-1 flex md:flex-row flex-col h-full"
            sizes={[50, 50]}
            minSize={100}
            gutterSize={8}
            direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
            gutterStyle={() => ({
              backgroundColor: '#1f2937',
              cursor: window.innerWidth < 768 ? 'row-resize' : 'col-resize',
            })}
          >
            <div className={`h-full overflow-hidden ${isPreviewMode ? 'hidden md:block' : 'block'}`}>
              <Editor
                file={currentFile}
                settings={settings}
                onChange={handleFileChange}
              />
            </div>
            <div className={`h-full overflow-hidden bg-white ${!isPreviewMode ? 'hidden md:block' : 'block'}`}>
              <Preview files={getPreviewFiles()} />
            </div>
          </Split>
        </div>
      </div>
    </div>
  );
}

export default App;