import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TestEditor: React.FC = () => {
  const [code, setCode] = useState('');
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Input changed:', e.target.value);
    setCode(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-md">
            <ChevronLeft className="h-6 w-6 mr-2" />
            返回首页
          </Link>
        </div>

        {/* 测试编辑器 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">测试编辑器</h1>
          <div className="border border-gray-300 rounded-md">
            <textarea
              ref={codeEditorRef}
              value={code}
              onChange={handleChange}
              className="w-full p-4 text-gray-800 font-mono text-sm min-h-[300px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              spellCheck={false}
              autoFocus
            />
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">当前内容:</h3>
            <pre className="font-mono text-sm">{code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEditor;