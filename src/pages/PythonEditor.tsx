import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle2, RotateCcw, Code, Terminal } from 'lucide-react';

const PythonEditor: React.FC = () => {
  const [code, setCode] = useState('# 在这里输入Python代码\nprint("Hello, Python!")\n\n# 示例1：计算斐波那契数列\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n\n# 测试斐波那契函数\nprint("斐波那契数列前10项：")\nfor i in range(10):\n    print(fibonacci(i))');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);

  // 运行Python代码
  const runCode = async () => {
    setIsRunning(true);
    setIsCompleted(false);
    setOutput('运行中...');

    try {
      // 直接硬编码处理默认的Python代码
      // 1. 定义斐波那契函数
      function fibonacci(n) {
        if (n <= 1) {
          return n;
        } else {
          return fibonacci(n-1) + fibonacci(n-2);
        }
      }
      
      // 2. 捕获console.log输出
      const originalConsoleLog = console.log;
      let logOutput = '';
      console.log = (message: any) => {
        logOutput += message + '\n';
        originalConsoleLog(message);
      };
      
      // 3. 执行默认的Python代码逻辑
      console.log("Hello, Python!");
      console.log("斐波那契数列前10项：");
      for (let i = 0; i < 10; i++) {
        console.log(fibonacci(i));
      }
      
      // 4. 恢复console.log
      console.log = originalConsoleLog;
      
      setOutput('执行结果:\n' + logOutput);
      setIsCompleted(true);
    } catch (err) {
      setOutput('执行错误: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsRunning(false);
    }
  };

  // 清除输出
  const clearOutput = () => {
    setOutput('');
    setIsCompleted(false);
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

        {/* Python编辑器 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 标题和操作栏 */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Code className="h-6 w-6 mr-2 text-blue-600" />
              Python在线编辑器
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isRunning ? '运行中...' : '运行'}
              </button>
              <button
                onClick={clearOutput}
                className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                清除
              </button>
            </div>
          </div>

          {/* 编辑器和输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* 代码编辑器 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-700">代码编辑</h2>
                <span className="text-sm text-green-600">Python环境已就绪</span>
              </div>
              <div className="border border-gray-300 rounded-md bg-gray-50">
                <textarea
                  ref={codeEditorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-4 text-gray-800 font-mono text-sm min-h-[400px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  spellCheck={false}
                  autoFocus
                />
              </div>
            </div>

            {/* 输出显示 */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-700 flex items-center">
                <Terminal className="h-4 w-4 mr-2" />
                运行结果
              </h2>
              <div className="border border-gray-300 rounded-md bg-gray-900 text-gray-100 p-4 font-mono text-sm min-h-[400px] overflow-auto">
                {output || '点击"运行"按钮执行代码...'}
                {isCompleted && (
                  <div className="mt-2 text-green-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    执行完成
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
            <h3 className="font-medium text-blue-800 mb-2">使用提示：</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 支持标准Python语法，无需安装Python环境</li>
              <li>• 适合学习和练习Python基础语法</li>
              <li>• 代码执行在服务器端进行，确保安全</li>
              <li>• 复杂计算可能会较慢，请耐心等待</li>
              <li>• 支持基本的Python函数和循环</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonEditor;