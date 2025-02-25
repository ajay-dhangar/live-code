export type Language = 'javascript' | 'typescript' | 'html' | 'css' | 'jsx' | 'tsx';

export interface EditorFile {
  name: string;
  language: Language;
  value: string;
}

export interface PreviewFile {
  html: string;
  css: string;
  js: string;
}

export interface EditorTheme {
  name: string;
  value: 'vs-dark' | 'light' | 'hc-black';
}

export interface EditorSettings {
  theme: EditorTheme;
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
}