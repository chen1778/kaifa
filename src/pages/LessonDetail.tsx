import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronLeft, Play, CheckCircle2, RotateCcw, Save, Code, Terminal, Copy, Check, AlertCircle } from 'lucide-react';

const LessonDetail: React.FC = () => {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const { loadLesson, currentLesson, updateProgress, user, isLoading } = useStore();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const pyodideRef = useRef<any>(null);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(true);
  const [useJudge0, setUseJudge0] = useState(false);

  // 加载课程内容
  useEffect(() => {
    if (id && lessonId) {
      loadLesson(parseInt(id), parseInt(lessonId));
    }
  }, [id, lessonId, loadLesson]);

  // 加载Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setPyodideLoading(true);
        const { loadPyodide } = await import('pyodide');
        const pyodide = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/"
        });
        await pyodide.loadPackage(["numpy", "pandas", "matplotlib"]);
        pyodideRef.current = pyodide;
        setPyodideLoaded(true);
      } catch (error) {
        console.error('Pyodide加载失败:', error);
        setUseJudge0(true);
      } finally {
        setPyodideLoading(false);
      }
    };

    loadPyodide();
  }, []);

  // 根据课程和课时生成练习题目
  const getPracticeQuestions = () => {
    // 课程1: Python基础与数据科学入门
    if (id === '1') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            title: "练习1：检查Python版本",
            description: "编写一个程序，检查当前Python版本并打印出来",
            template: "# 检查Python版本\nimport sys\n\n# 在这里编写代码打印Python版本\nprint('Python版本:')",
            answer: "# 检查Python版本\nimport sys\n\n# 在这里编写代码打印Python版本\nprint('Python版本:', sys.version)\n\n# 打印Python路径\nprint('Python路径:', sys.executable)",
            difficulty: "简单"
          },
          {
            id: 2,
            title: "练习2：测试NumPy和Pandas",
            description: "导入NumPy和Pandas库，并打印它们的版本",
            template: "# 测试NumPy和Pandas\n\n# 在这里导入NumPy和Pandas库\n\n# 打印版本信息\nprint('NumPy版本:')\nprint('Pandas版本:')",
            answer: "# 测试NumPy和Pandas\n\n# 在这里导入NumPy和Pandas库\nimport numpy as np\nimport pandas as pd\n\n# 打印版本信息\nprint('NumPy版本:', np.__version__)\nprint('Pandas版本:', pd.__version__)\n\n# 创建一个简单的DataFrame\ndata = {'名称': ['产品A', '产品B'], '价格': [100, 200]}\ndf = pd.DataFrame(data)\nprint('\n测试DataFrame:')\nprint(df)",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            title: "练习1：变量和数据类型",
            description: "创建不同类型的变量并打印它们",
            template: "# 变量和数据类型\n\n# 创建变量\nname = '数据分析'\nage = 3\nis_active = True\n\n# 打印变量\nprint('名称:', name)\nprint('年龄:', age)\nprint('是否活跃:', is_active)\n\n# TODO: 计算并打印类型\n# 提示：使用type()函数获取变量类型",
            answer: "# 变量和数据类型\n\n# 创建变量\nname = '数据分析'\nage = 3\nis_active = True\n\n# 打印变量\nprint('名称:', name)\nprint('年龄:', age)\nprint('是否活跃:', is_active)\n\n# 计算并打印类型\nprint('\n类型:')\nprint('name的类型:', type(name))\nprint('age的类型:', type(age))\nprint('is_active的类型:', type(is_active))",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            title: "练习1：数据概览和基本统计",
            description: "创建电商销售数据并进行基本统计分析",
            template: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看数据前5行\nprint('数据前5行:')\n\n# TODO: 2. 查看数据基本统计信息\nprint('\n数据基本统计:')\n\n# TODO: 3. 计算总销售额和平均订单金额\nprint('\n总销售额:')\nprint('平均订单金额:')\n",
            answer: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看数据前5行\nprint('数据前5行:')\nprint(df.head())\n\n# 2. 查看数据基本统计信息\nprint('\n数据基本统计:')\nprint(df.describe())\n\n# 3. 计算总销售额和平均订单金额\nprint('\n总销售额:', df['销售额'].sum())\nprint('平均订单金额:', df['销售额'].mean().round(2))\n",
            difficulty: "中等"
          }
        ];
      }
    }
    
    // 课程8: 商业数据分析
    if (id === '8') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            title: "练习1：基本统计分析",
            description: "对销售数据进行基本统计分析",
            template: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n",
            answer: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n\n# 计算日均销售额\nprint('\n日均销售额:', df['销售额'].mean())\nprint('日均客户数:', df['客户数'].mean())\n",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            title: "练习1：促销活动效果分析",
            description: "分析不同促销活动对销售的影响",
            template: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\n\n# TODO: 2. 查看不同促销活动的平均客流量\nprint('\n不同促销活动的平均客流量:')\n",
            answer: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\npromotion_sales = df.groupby('促销活动')['销售额'].mean()\nprint(promotion_sales.round(2))\n\n# 2. 查看不同促销活动的平均客流量\nprint('\n不同促销活动的平均客流量:')\npromotion_customers = df.groupby('促销活动')['客流量'].mean()\nprint(promotion_customers.round(2))\n",
            difficulty: "中等"
          }
        ];
      }
    }
    
    // 课程9: 商业数据可视化与预测
    if (id === '9') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            title: "练习1：创建销售趋势图",
            description: "使用Matplotlib创建销售趋势折线图",
            template: "# 创建销售趋势图\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [12000, 13500, 11800, 14200, 15600, 14800, \n         16200, 17500, 16800, 18200, 19500, 21000]\n\n# 创建DataFrame\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 创建折线图\nprint('销售趋势图已创建')\nprint('月度销售额数据:')\nprint(df)\n",
            answer: "# 创建销售趋势图\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [12000, 13500, 11800, 14200, 15600, 14800, \n         16200, 17500, 16800, 18200, 19500, 21000]\n\n# 创建DataFrame\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 折线图\nplt.figure(figsize=(10, 6))\nplt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2023年销售趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\n\nprint('销售趋势图已创建')\nprint('月度销售额数据:')\nprint(df)\n",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            title: "练习1：销售趋势可视化",
            description: "创建销售趋势图并分析季节性模式",
            template: "# 商业数据可视化与预测案例：销售趋势可视化\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 1. 创建销售趋势折线图\nprint('销售趋势分析:')\n",
            answer: "# 商业数据可视化与预测案例：销售趋势可视化\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 1. 创建销售趋势折线图\nprint('销售趋势分析:')\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2022-2023年销售趋势')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\nprint('销售趋势图已创建')\n",
            difficulty: "中等"
          }
        ];
      }
    }

    return [];
  };

  const practiceQuestions = getPracticeQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = practiceQuestions[currentQuestionIndex];

  // 初始化代码编辑器
  useEffect(() => {
    if (currentQuestion) {
      setCode(currentQuestion.template);
    }
  }, [currentQuestion]);

  // 运行代码
  const runCode = async () => {
    if (!code) return;

    setIsRunning(true);
    setOutput('');

    try {
      if (pyodideLoaded && pyodideRef.current) {
        // 使用Pyodide运行代码
        pyodideRef.current.globals.set('print', (text: any) => {
          setOutput(prev => prev + text + '\n');
        });
        await pyodideRef.current.runPythonAsync(code);
      } else if (useJudge0) {
        // 使用Judge0 API作为备选
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'your-api-key',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          },
          body: JSON.stringify({
            language_id: 71, // Python 3.8
            source_code: code,
            stdin: ''
          })
        });
        const data = await response.json();
        // 轮询获取结果
        const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${data.token}`, {
          headers: {
            'X-RapidAPI-Key': 'your-api-key',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });
        const result = await resultResponse.json();
        setOutput(result.stdout || result.stderr || '代码执行完成');
      }
    } catch (error) {
      setOutput(`错误: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  // 复制代码
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 重置代码
  const resetCode = () => {
    if (currentQuestion) {
      setCode(currentQuestion.template);
      setOutput('');
    }
  };

  // 显示答案
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer && currentQuestion) {
      setCode(currentQuestion.answer);
    } else if (currentQuestion) {
      setCode(currentQuestion.template);
    }
  };

  // 下一题
  const nextQuestion = () => {
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOutput('');
      setShowAnswer(false);
    }
  };

  // 上一题
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setOutput('');
      setShowAnswer(false);
    }
  };

  if (isLoading || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <div className="flex items-center mb-6">
          <Link to={`/courses/${id}`} className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            返回课程
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{currentLesson.title}</span>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>
          <div className="text-gray-600 mb-6">
            {currentLesson.content}
          </div>
        </div>

        {/* 互动练习 */}
        {practiceQuestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">互动练习</h2>
            
            {currentQuestion && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{currentQuestion.title}</h3>
                    <p className="text-gray-600 mb-2">{currentQuestion.description}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${currentQuestion.difficulty === '简单' ? 'bg-green-100 text-green-800' : currentQuestion.difficulty === '中等' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentQuestionIndex + 1} / {practiceQuestions.length}
                  </div>
                </div>

                {/* 代码编辑器 */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Code className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">代码编辑器</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={copyCode}
                        className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? '已复制' : '复制'}
                      </button>
                      <button 
                        onClick={resetCode}
                        className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        重置
                      </button>
                      <button 
                        onClick={toggleAnswer}
                        className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        <Code className="h-4 w-4 mr-1" />
                        {showAnswer ? '隐藏答案' : '显示答案'}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-md overflow-hidden">
                    <div className="px-4 py-2 bg-gray-800 flex items-center">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="ml-4 text-xs text-gray-400">Python 3</span>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm min-h-[200px] resize-y"
                      spellCheck={false}
                    />
                  </div>
                </div>

                {/* 运行按钮 */}
                <div className="mb-4">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                  >
                    {isRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        运行中...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        运行代码
                      </>
                    )}
                  </button>
                </div>

                {/* 输出结果 */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Terminal className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">运行结果</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4 min-h-[100px] font-mono text-sm">
                    {output || '运行代码查看结果'}
                  </div>
                </div>

                {/* 导航按钮 */}
                <div className="flex justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    上一题
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === practiceQuestions.length - 1}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    下一题
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;