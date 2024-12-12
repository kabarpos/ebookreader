import React from 'react';
import { CodeBlockProps } from '../../types';
import { Copy } from 'lucide-react';

const CodeBlock = ({ language, filename, children }: CodeBlockProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <div className="relative mb-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg border-b border-gray-700">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre className={`language-${language} rounded-lg ${filename ? 'rounded-t-none' : ''}`}>
          <code>{children}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;