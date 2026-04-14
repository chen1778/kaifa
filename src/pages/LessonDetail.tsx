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

  // 练习题目数据
  const practiceQuestions = [
    {
      id: 1,
      title: "练习1：打印问候语",
      description: "编写一个程序，打印 'Hello, 数据分析世界！'",
      template: "# 在这里编写代码\nprint('Hello, World!')",
      answer: "print('Hello, 数据分析世界！')",
      difficulty: "简单"
    },
    {
      id: 2,
      title: "练习2：计算销售总额",
      description: "给定销售数据，计算总销售额",
      template: "# 销售数据\nsales = [1000, 1200, 900, 1500, 1300]\n\n# 在这里计算总销售额\ntotal = \nprint('总销售额:', total)",
      answer: "# 销售数据\nsales = [1000, 1200, 900, 1500, 1300]\n\n# 在这里计算总销售额\ntotal = sum(sales)\nprint('总销售额:', total)",
      difficulty: "中等"
    },
    {
      id: 3,
      title: "练习3：创建字典数据",
      description: "创建一个包含日期和销售额的字典，然后打印出来",
      template: "# 创建销售数据字典\nsales_data = {\n    '日期': ['2023-01-01', '2023-01-02'],\n    '销售额': [1000, 1200]\n}\n\n# 打印数据\nprint(sales_data)",
      answer: "# 创建销售数据字典\nsales_data = {\n    '日期': ['2023-01-01', '2023-01-02', '2023-01-03'],\n    '销售额': [1000, 1200, 900]\n}\n\n# 打印数据\nfor date, sale in zip(sales_data['日期'], sales_data['销售额']):\n    print(f'{date}: {sale}元')",
      difficulty: "中等"
    },
    {
      id: 4,
      title: "练习4：使用列表推导式",
      description: "将销售数据转换为万元单位（除以10000）",
      template: "# 原始销售数据（元）\nsales = [10000, 25000, 18000, 32000]\n\n# 使用列表推导式转换为万元\nsales_wan = [x / 10000 for x in sales]\nprint('销售额（万元）:', sales_wan)",
      answer: "# 原始销售数据（元）\nsales = [10000, 25000, 18000, 32000, 45000]\n\n# 使用列表推导式转换为万元\nsales_wan = [x / 10000 for x in sales]\nprint('销售额（万元）:', sales_wan)\nprint('平均销售额（万元）:', sum(sales_wan) / len(sales_wan))",
      difficulty: "中等"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (lessonId) {
      loadLesson(Number(lessonId));
    }
  }, [lessonId]);

  // Mock lesson data for different courses
  const mockLessons = {
    // 课程1: Python基础与数据科学入门
    "1": [
      {
        id: 1,
        title: "Python环境搭建",
        content: "学习如何安装和配置Python环境，包括Anaconda的使用。",
        business_scenario: "你是一家电商公司的数据分析实习生，需要搭建Python环境来处理销售数据。",
        code_example: `# Python环境搭建示例
# 1. 检查Python版本
import sys
print("Python版本:", sys.version)

# 2. 导入常用库
import numpy as np
import pandas as pd

# 3. 测试基本功能
print("NumPy版本:", np.__version__)
print("Pandas版本:", pd.__version__)

# 4. 创建测试数据
data = {
    '日期': ['2023-01-01', '2023-01-02', '2023-01-03'],
    '销售额': [1000, 1200, 900]
}

df = pd.DataFrame(data)
print("\n测试数据:")
print(df)
`,
        learning_points: [
          "了解Python环境的搭建方法",
          "掌握Anaconda的安装和使用",
          "熟悉NumPy和Pandas库的导入",
          "能够创建和查看基本数据结构"
        ]
      },
      {
        id: 2,
        title: "Python基础语法",
        content: "掌握Python的基本语法，包括变量、数据类型、运算符和控制流。",
        business_scenario: "你需要使用Python处理销售数据，首先需要掌握基本语法。",
        code_example: `# Python基础语法示例
# 1. 变量和数据类型
name = "数据分析"
sales = 10000
is_active = True

print("项目名称:", name)
print("销售额:", sales)

# 2. 列表
daily_sales = [1000, 1200, 900, 1500, 1300]
print("日销售额:", daily_sales)
print("总销售额:", sum(daily_sales))
print("平均值:", sum(daily_sales) / len(daily_sales))

# 3. 字典
sales_data = {
    '日期': ['2023-01-01', '2023-01-02', '2023-01-03'],
    '销售额': [1000, 1200, 900]
}
print("销售数据:", sales_data)

# 4. 循环
print("\n每日销售额明细:")
for i, sale in enumerate(daily_sales):
    print(f"第{i+1}天: {sale}元")

# 5. 函数
def calculate_total(sales_list):
    """计算总销售额"""
    return sum(sales_list)

total = calculate_total(daily_sales)
print("\n函数计算的总销售额:", total)
`,
        learning_points: [
          "掌握Python变量和数据类型",
          "熟悉列表和字典的使用",
          "学习循环和函数的编写",
          "能够进行简单的数据分析"
        ]
      }
    ],
    // 课程8: 商业数据分析
    "8": [
      {
        id: 1,
        title: "商业数据分析概述",
        content: "了解商业数据分析的基本概念和方法。",
        business_scenario: "你是一家企业的数据分析专员，需要为管理层提供数据驱动的决策支持。",
        code_example: `# 商业数据分析概述示例
import pandas as pd
import numpy as np

# 模拟销售数据
data = {
    '日期': pd.date_range('2023-01-01', periods=30),
    '销售额': np.random.randint(800, 1500, 30),
    '客户数': np.random.randint(20, 50, 30),
    '产品类别': np.random.choice(['A', 'B', 'C'], 30)
}

df = pd.DataFrame(data)

# 基本统计分析
print("销售数据基本统计:")
print(df.describe())

# 按产品类别分析
print("\n按产品类别销售分析:")
print(df.groupby('产品类别')['销售额'].sum())

# 计算日均销售额
print("\n日均销售额:", df['销售额'].mean())
print("日均客户数:", df['客户数'].mean())
`,
        learning_points: [
          "了解商业数据分析的基本概念",
          "掌握销售数据的基本统计分析",
          "学习按类别分组分析数据",
          "能够计算关键业务指标"
        ]
      },
      {
        id: 2,
        title: "销售数据分析",
        content: "学习如何分析销售数据，识别销售趋势。",
        business_scenario: "你需要分析公司的销售数据，识别销售趋势和季节性模式。",
        code_example: `# 销售数据分析示例
import pandas as pd
import numpy as np

# 模拟销售数据
dates = pd.date_range('2022-01-01', '2023-12-31', freq='D')
sales = []

# 创建有季节性模式的数据
for date in dates:
    # 基础销售额
    base_sale = 1000
    # 月度季节性
    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, 
                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]
    # 随机波动
    random_factor = np.random.normal(1, 0.1)
    # 计算最终销售额
    sale = base_sale * month_factor * random_factor
    sales.append(round(sale))

df = pd.DataFrame({'日期': dates, '销售额': sales})

# 按月聚合
monthly_sales = df.resample('M', on='日期')['销售额'].sum()
print("月度销售额:")
print(monthly_sales)

# 计算同比增长率
print("\n月度销售额同比增长率:")
print(monthly_sales.pct_change(12) * 100)

# 识别销售高峰
print("\n销售高峰月份:")
print(monthly_sales.idxmax())
print("最高销售额:", monthly_sales.max())
`,
        learning_points: [
          "掌握销售数据的时间序列分析",
          "识别销售的季节性模式",
          "计算销售增长率",
          "识别销售高峰和低谷"
        ]
      }
    ],
    // 课程9: 商业数据可视化与预测
    "9": [
      {
        id: 1,
        title: "数据可视化基础",
        content: "学习数据可视化的基本原理和方法。",
        business_scenario: "你需要将销售数据可视化，以便更直观地展示销售趋势。",
        code_example: `# 数据可视化基础示例
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 模拟销售数据
dates = pd.date_range('2023-01-01', '2023-12-31', freq='M')
sales = [12000, 13500, 11800, 14200, 15600, 14800, 
         16200, 17500, 16800, 18200, 19500, 21000]

# 创建DataFrame
df = pd.DataFrame({'月份': dates, '销售额': sales})

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 折线图
plt.figure(figsize=(10, 6))
plt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')
plt.title('2023年销售趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(True)
plt.tight_layout()

# 柱状图
plt.figure(figsize=(10, 6))
plt.bar(df['月份'], df['销售额'], color='g')
plt.title('2023年月度销售额')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.tight_layout()

print("数据可视化示例代码已执行")
print("在实际环境中，这将生成销售趋势图和月度销售额柱状图")
`,
        learning_points: [
          "了解数据可视化的基本原理",
          "掌握Matplotlib库的基本使用",
          "学习创建折线图和柱状图",
          "能够设置图表标题和标签"
        ]
      },
      {
        id: 2,
        title: "Matplotlib高级应用",
        content: "学习Matplotlib的高级功能，创建复杂的图表。",
        business_scenario: "你需要创建更复杂的可视化图表，展示多维度的销售数据。",
        code_example: `# Matplotlib高级应用示例
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 模拟多产品销售数据
products = ['产品A', '产品B', '产品C', '产品D']
quarters = ['Q1', 'Q2', 'Q3', 'Q4']

# 创建销售数据
sales_data = {
    '产品A': [12000, 13500, 14200, 15800],
    '产品B': [9500, 10200, 11800, 12500],
    '产品C': [8800, 9400, 10100, 11200],
    '产品D': [7200, 8500, 9300, 10500]
}

df = pd.DataFrame(sales_data, index=quarters)

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 堆叠柱状图
plt.figure(figsize=(10, 6))
df.plot(kind='bar', stacked=True, figsize=(10, 6))
plt.title('2023年各季度产品销售额')
plt.xlabel('季度')
plt.ylabel('销售额')
plt.legend(title='产品')
plt.tight_layout()

# 饼图 - Q4销售额分布
plt.figure(figsize=(8, 8))
plt.pie(df.loc['Q4'], labels=products, autopct='%1.1f%%', startangle=90)
plt.title('Q4产品销售分布')
plt.axis('equal')
plt.tight_layout()

# 多子图
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle('2023年产品销售分析', fontsize=16)

# 每个产品的销售趋势
for i, product in enumerate(products):
    row = i // 2
    col = i % 2
    axes[row, col].plot(quarters, df[product], marker='o')
    axes[row, col].set_title(f'{product}销售趋势')
    axes[row, col].set_xlabel('季度')
    axes[row, col].set_ylabel('销售额')
    axes[row, col].grid(True)

plt.tight_layout(rect=[0, 0, 1, 0.95])

print("高级数据可视化示例代码已执行")
print("在实际环境中，这将生成堆叠柱状图、饼图和多子图销售趋势")
`,
        learning_points: [
          "掌握Matplotlib的高级功能",
          "学习创建堆叠柱状图和饼图",
          "能够创建多子图布局",
          "掌握图表的美化和定制"
        ]
      }
    ]
  };

  // 根据课程ID和课时ID获取对应的课程内容
  const courseLessons = mockLessons[id] || mockLessons["1"];
  const lesson = currentLesson || courseLessons.find(l => l.id === Number(lessonId)) || courseLessons[0];

  // Load Pyodide from CDN with fallback to Judge0
  useEffect(() => {
    const loadPyodide = async () => {
      setPyodideLoading(true);
      setOutput('正在加载Python环境...');
      
      try {
        // 尝试加载Pyodide
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        script.async = true;
        
        const loadTimeout = setTimeout(() => {
          // 超时后切换到Judge0
          setUseJudge0(true);
          setPyodideLoading(false);
          setOutput('Pyodide加载超时，已切换到Judge0 API');
        }, 10000); // 10秒超时
        
        script.onload = async () => {
          clearTimeout(loadTimeout);
          try {
            // @ts-ignore
            const pyodideInstance = await window.loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
            });
            pyodideRef.current = pyodideInstance;
            setPyodideLoaded(true);
            setPyodideLoading(false);
            setOutput('Python环境已就绪！开始编写代码吧。');
          } catch (err) {
            console.error('Failed to initialize Pyodide:', err);
            // 初始化失败，切换到Judge0
            setUseJudge0(true);
            setPyodideLoading(false);
            setOutput('Pyodide初始化失败，已切换到Judge0 API');
          }
        };
        
        script.onerror = () => {
          clearTimeout(loadTimeout);
          // 加载失败，切换到Judge0
          setUseJudge0(true);
          setPyodideLoading(false);
          setOutput('Pyodide加载失败，已切换到Judge0 API');
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        // 任何错误都切换到Judge0
        setUseJudge0(true);
        setPyodideLoading(false);
        setOutput('Pyodide加载失败，已切换到Judge0 API');
      }
    };

    loadPyodide();
  }, []);

  useEffect(() => {
    // 设置初始代码为第一个练习
    if (practiceQuestions.length > 0) {
      setCode(practiceQuestions[0].template);
    }
  }, []);

  const handleQuestionChange = (index: number) => {
    setCurrentQuestion(index);
    setCode(practiceQuestions[index].template);
    setOutput('');
    setShowAnswer(false);
  };

  // 使用Pyodide运行代码
  const runCodeWithPyodide = async () => {
    if (!pyodideRef.current || !pyodideLoaded) {
      setOutput('Python环境正在加载中，请稍候...');
      return;
    }

    setIsRunning(true);
    setOutput('正在运行...');

    try {
      // Clear previous output
      let outputText = '';
      
      // Setup stdout capture
      pyodideRef.current.globals.set('print', (text: string) => {
        outputText += text + '\n';
        setOutput(outputText);
      });

      // Run the code
      await pyodideRef.current.runPythonAsync(code);
      
      if (outputText === '') {
        setOutput('代码执行完成，没有输出。');
      }
    } catch (error) {
      setOutput(`错误: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  // 使用Judge0 API运行代码
  const runCodeWithJudge0 = async () => {
    setIsRunning(true);
    setOutput('正在运行...');

    try {
      const response = await fetch('https://api.judge0.com/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'anonymous'
        },
        body: JSON.stringify({
          source_code: code,
          language_id: 71, // Python 3
          stdin: ''
        })
      });

      const submission = await response.json();
      
      // 轮询结果
      const checkStatus = async () => {
        const statusResponse = await fetch(`https://api.judge0.com/submissions/${submission.token}`);
        const status = await statusResponse.json();
        
        if (status.status.id === 3) { // 完成
          setOutput(status.stdout || '代码执行完成，没有输出。');
          if (status.stderr) {
            setOutput(prev => prev + '\n错误: ' + status.stderr);
          }
          setIsRunning(false);
        } else if (status.status.id >= 4) { // 错误
          setOutput(`错误: ${status.stderr || '执行失败'}`);
          setIsRunning(false);
        } else { // 等待
          setTimeout(checkStatus, 1000);
        }
      };
      
      setTimeout(checkStatus, 1000);
    } catch (error) {
      setOutput(`错误: ${error}`);
      setIsRunning(false);
    }
  };

  const runCode = async () => {
    if (useJudge0) {
      await runCodeWithJudge0();
    } else {
      await runCodeWithPyodide();
    }
  };

  const resetCode = () => {
    setCode(practiceQuestions[currentQuestion].template);
    setOutput('');
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showAnswerCode = () => {
    setCode(practiceQuestions[currentQuestion].answer);
    setShowAnswer(true);
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

        {/* Example Code */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">示例代码</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
              <span className="text-gray-400 text-sm">示例代码</span>
              <div className="flex space-x-2">
                <button
                  onClick={copyCode}
                  className="flex items-center text-gray-400 hover:text-white text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <pre className="p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <code>{lesson.code_example}</code>
            </pre>
          </div>
        </div>

        {/* Practice Questions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">交互式练习</h2>
          
          {/* Question Selector */}
          <div className="mb-4 flex flex-wrap gap-2">
            {practiceQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => handleQuestionChange(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentQuestion === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Question Details */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">
              {practiceQuestions[currentQuestion].title}
            </h3>
            <p className="text-blue-800 mb-2">{practiceQuestions[currentQuestion].description}</p>
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">
              难度: {practiceQuestions[currentQuestion].difficulty}
            </span>
          </div>

          {/* Code Editor Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Code Editor */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Python 编辑器</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={resetCode}
                    className="flex items-center text-gray-400 hover:text-white text-sm"
                    title="重置代码"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    重置
                  </button>
                  <button
                    onClick={showAnswerCode}
                    className="flex items-center text-gray-400 hover:text-yellow-400 text-sm"
                    title="显示答案"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    答案
                  </button>
                  <button
                    onClick={runCode}
                    disabled={isRunning || pyodideLoading}
                    className="flex items-center bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors disabled:bg-gray-600"
                  >
                    {isRunning ? (
                      <span>运行中...</span>
                    ) : pyodideLoading ? (
                      <span>加载中...</span>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        <span>运行</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 bg-gray-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="# 在这里编写Python代码\nprint('Hello, 数据分析世界!')"
              />
            </div>

            {/* Output Panel */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="flex items-center bg-gray-800 px-4 py-2">
                <Terminal className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">运行结果</span>
                {useJudge0 && (
                  <span className="ml-auto text-yellow-400 text-xs flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    使用Judge0 API
                  </span>
                )}
              </div>
              <div className="h-80 overflow-auto p-4 font-mono text-sm">
                <pre className="text-gray-800 whitespace-pre-wrap">{output || (pyodideLoading ? 'Python环境加载中...' : '点击"运行"按钮执行代码')}</pre>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <h4 className="font-semibold text-amber-900 mb-2">💡 提示</h4>
            <ul className="text-amber-800 space-y-1 text-sm">
              <li>• 点击题目按钮切换不同的练习</li>
              <li>• 在编辑器中编写你的Python代码</li>
              <li>• 点击"运行"按钮执行代码并查看结果</li>
              <li>• 如需查看答案，点击"答案"按钮</li>
              <li>• 可以随时点击"重置"恢复到初始代码</li>
              {useJudge0 && (
                <li className="text-red-800">• 当前使用Judge0 API运行代码，可能会有一定延迟</li>
              )}
            </ul>
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
