import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronLeft, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const LessonDetail: React.FC = () => {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const { loadLesson, currentLesson, updateProgress, user, isLoading } = useStore();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const pyodideRef = useRef<any>(null);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  useEffect(() => {
    if (lessonId) {
      loadLesson(Number(lessonId));
    }
  }, [lessonId]);

  // Mock lesson data for demonstration
  const mockLesson = {
    id: 1,
    title: "Python环境搭建",
    content: "学习如何安装和配置Python环境，包括Anaconda的使用。",
    business_scenario: "你是一家电商公司的数据分析实习生，需要搭建Python环境来分析销售数据。",
    code_example: `# 安装必要的库
!pip install pandas matplotlib

# 导入库
import pandas as pd
import matplotlib.pyplot as plt

# 创建示例销售数据
sales_data = {
    '日期': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    '销售额': [1000, 1200, 900, 1500, 1300]
}

# 创建DataFrame
df = pd.DataFrame(sales_data)

# 显示数据
print(df)

# 绘制销售额趋势图
plt.figure(figsize=(10, 6))
plt.plot(df['日期'], df['销售额'], marker='o')
plt.title('每日销售额趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(True)
plt.show()
`,
    learning_points: [
      "了解Python的安装方法",
      "掌握Anaconda的使用",
      "学习如何安装和管理Python包",
      "了解数据分析的基本流程"
    ]
  };

  const lesson = currentLesson || mockLesson;

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodide = await import('pyodide');
        const pyodideInstance = await pyodide.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        pyodideRef.current = pyodideInstance;
        setPyodideLoaded(true);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
      }
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    setCode(lesson.code_example || '');
  }, [lesson]);

  const runCode = async () => {
    if (!pyodideRef.current || !pyodideLoaded) {
      setOutput('Pyodide is still loading...');
      return;
    }

    setIsRunning(true);
    setOutput('Running...');

    try {
      // Redirect stdout to capture output
      pyodideRef.current.stdout = (text: string) => {
        setOutput(prev => prev + text);
      };

      // Run the code
      await pyodideRef.current.runPythonAsync(code);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleComplete = async () => {
    if (user && id && lessonId) {
      await updateProgress(Number(id), Number(lessonId), true);
      setIsCompleted(true);
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Link to={`/courses/${id}`} className="flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="h-5 w-5 mr-1" />
            返回课程
          </Link>
        </div>

        {/* Lesson Title */}
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        {/* Lesson Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">学习内容</h2>
          <p className="text-gray-600 mb-4">{lesson.content}</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">学习要点</h3>
            <ul className="space-y-2">
              {lesson.learning_points?.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Code Editor */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">交互式练习</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Business Scenario */}
            <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">商业场景</h3>
              <p className="text-gray-700">{lesson.business_scenario}</p>
            </div>

            {/* Code Editor */}
            <div className="lg:col-span-1 bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
                <span className="text-gray-400 text-sm">Python</span>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-600"
                >
                  {isRunning ? (
                    <span>Running...</span>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 bg-gray-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="Write your Python code here..."
              />
            </div>

            {/* Output */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">运行结果</h3>
              <div className="h-80 overflow-auto bg-gray-50 p-4 rounded font-mono text-sm">
                {output || "Run the code to see output here..."}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link 
            to={`/courses/${id}`} 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            返回课程
          </Link>
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${isCompleted ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-5 w-5 inline mr-1" />
                已完成
              </>
            ) : (
              "标记为完成"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;