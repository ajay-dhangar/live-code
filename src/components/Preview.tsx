import { FC, useEffect, useRef } from 'react';
import { Circle } from 'lucide-react';
import { PreviewFile } from '../types';

interface PreviewProps {
  files: PreviewFile;
}

export const Preview: FC<PreviewProps> = ({ files }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              /* Reset and base styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                background: #ffffff;
                color: #1f2937;
                line-height: 1.5;
                padding: 1rem;
                max-width: 100%;
                overflow-x: hidden;
              }

              /* Default styles for common elements */
              h1, h2, h3, h4, h5, h6 {
                font-weight: 600;
                line-height: 1.25;
                margin-bottom: 1rem;
              }

              h1 { font-size: 2rem; }
              h2 { font-size: 1.5rem; }
              h3 { font-size: 1.25rem; }

              p { margin-bottom: 1rem; }

              button {
                background: #f3f4f6;
                border: 1px solid #e5e7eb;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
              }

              button:hover {
                background: #e5e7eb;
              }

              input, textarea {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
              }

              img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
              }

              /* Custom styles */
              ${files.css}
            </style>
          </head>
          <body>
            ${files.html}
            <script type="module">
              ${files.js}
            </script>
          </body>
        </html>
      `;
      
      iframeRef.current.srcdoc = content;
    }
  }, [files]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gray-100 border-b border-gray-200 h-10 flex items-center px-4">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 text-red-400 fill-current opacity-75" />
          <Circle className="w-3 h-3 text-yellow-400 fill-current opacity-75" />
          <Circle className="w-3 h-3 text-green-400 fill-current opacity-75" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-gray-600">Preview</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          title="preview"
          className="h-full w-full border-0 bg-white"
          sandbox="allow-scripts allow-modals"
        />
      </div>
    </div>
  );
};