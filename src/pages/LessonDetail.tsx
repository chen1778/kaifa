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
  const [showTextAnswer, setShowTextAnswer] = useState(false);
  const pyodideRef = useRef<any>(null);
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
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
            type: "code",
            title: "练习1：检查Python版本",
            description: "编写一个程序，检查当前Python版本并打印出来",
            template: "# 检查Python版本\nimport sys\n\n# 在这里编写代码打印Python版本\nprint('Python版本:')",
            answer: "# 检查Python版本\nimport sys\n\n# 在这里编写代码打印Python版本\nprint('Python版本:', sys.version)\n\n# 打印Python路径\nprint('Python路径:', sys.executable)",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "code",
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
            type: "code",
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
            type: "code",
            title: "练习1：数据概览和基本统计",
            description: "创建电商销售数据并进行基本统计分析",
            template: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看数据前5行\nprint('数据前5行:')\n\n# TODO: 2. 查看数据基本统计信息\nprint('\n数据基本统计:')\n\n# TODO: 3. 计算总销售额和平均订单金额\nprint('\n总销售额:')\nprint('平均订单金额:')\n",
            answer: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看数据前5行\nprint('数据前5行:')\nprint(df.head())\n\n# 2. 查看数据基本统计信息\nprint('\n数据基本统计:')\nprint(df.describe())\n\n# 3. 计算总销售额和平均订单金额\nprint('\n总销售额:', df['销售额'].sum())\nprint('平均订单金额:', df['销售额'].mean().round(2))",
            difficulty: "中等"
          }
        ];
      }
    }
    
    // 课程2: Python数据分析实战
    if (id === '2') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据分析概述",
            description: "了解数据分析的基本概念和流程",
            template: "# 数据分析概述\n\n# 打印数据分析的基本步骤\nprint('数据分析的基本步骤:')\n# TODO: 列出数据分析的基本步骤\n",
            answer: "# 数据分析概述\n\n# 打印数据分析的基本步骤\nprint('数据分析的基本步骤:')\nprint('1. 问题定义')\nprint('2. 数据收集')\nprint('3. 数据清洗')\nprint('4. 数据探索')\nprint('5. 数据建模')\nprint('6. 结果分析')\nprint('7. 报告生成')",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据导入与导出",
            description: "学习如何导入和导出各种格式的数据",
            template: "# 数据导入与导出\nimport pandas as pd\n\n# 创建示例数据\ndata = {'名称': ['产品A', '产品B', '产品C'], '价格': [100, 200, 300], '销量': [10, 20, 30]}\ndf = pd.DataFrame(data)\n\n# 打印数据\nprint('原始数据:')\nprint(df)\n\n# TODO: 将数据导出为CSV文件\nprint('\n数据已导出为CSV文件')\n",
            answer: "# 数据导入与导出\nimport pandas as pd\n\n# 创建示例数据\ndata = {'名称': ['产品A', '产品B', '产品C'], '价格': [100, 200, 300], '销量': [10, 20, 30]}\ndf = pd.DataFrame(data)\n\n# 打印数据\nprint('原始数据:')\nprint(df)\n\n# 将数据导出为CSV文件\ndf.to_csv('products.csv', index=False)\nprint('\n数据已导出为CSV文件')\n\n# 从CSV文件导入数据\ndf_imported = pd.read_csv('products.csv')\nprint('\n从CSV导入的数据:')\nprint(df_imported)",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '3') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据清洗基础",
            description: "学习数据清洗的基本方法和技巧",
            template: "# 数据清洗基础\nimport pandas as pd\nimport numpy as np\n\n# 创建含有缺失值的示例数据\ndata = {'名称': ['产品A', '产品B', None, '产品D'], '价格': [100, np.nan, 300, 400], '销量': [10, 20, None, 40]}\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# TODO: 处理缺失值\nprint('\n处理后的数据:')\n",
            answer: "# 数据清洗基础\nimport pandas as pd\nimport numpy as np\n\n# 创建含有缺失值的示例数据\ndata = {'名称': ['产品A', '产品B', None, '产品D'], '价格': [100, np.nan, 300, 400], '销量': [10, 20, None, 40]}\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# 处理缺失值\ndf_cleaned = df.dropna()\nprint('\n处理后的数据:')\nprint(df_cleaned)\n\n# 或者使用填充方法\ndf_filled = df.fillna({'名称': '未知', '价格': df['价格'].mean(), '销量': 0})\nprint('\n填充后的数据:')\nprint(df_filled)",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '4') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据探索分析",
            description: "学习如何探索和分析数据",
            template: "# 数据探索分析\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {'产品类别': ['电子产品', '服装', '家居用品', '食品', '电子产品', '服装'], '销售额': [1000, 500, 800, 300, 1200, 600], '利润': [200, 100, 160, 60, 240, 120]}\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# TODO: 按产品类别分组分析\nprint('\n按产品类别分析:')\n",
            answer: "# 数据探索分析\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {'产品类别': ['电子产品', '服装', '家居用品', '食品', '电子产品', '服装'], '销售额': [1000, 500, 800, 300, 1200, 600], '利润': [200, 100, 160, 60, 240, 120]}\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# 按产品类别分组分析\ngrouped = df.groupby('产品类别').agg({'销售额': 'sum', '利润': 'sum'})\nprint('\n按产品类别分析:')\nprint(grouped)\n\n# 计算利润率\ngrouped['利润率'] = (grouped['利润'] / grouped['销售额'] * 100).round(2)\nprint('\n带利润率的分析:')\nprint(grouped)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '5') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据可视化实践",
            description: "通过实际案例学习数据可视化",
            template: "# 数据可视化实践\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 创建示例数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [1000, 1200, 900, 1100, 1300, 1250, 1400, 1500, 1350, 1450, 1600, 1700]\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 创建销售额折线图\nprint('销售额数据:')\nprint(df)\n",
            answer: "# 数据可视化实践\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 创建示例数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [1000, 1200, 900, 1100, 1300, 1250, 1400, 1500, 1350, 1450, 1600, 1700]\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 创建销售额折线图\nplt.figure(figsize=(10, 6))\nplt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2023年销售额趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\n\nprint('销售额数据:')\nprint(df)\nprint('\n销售额趋势图已创建')",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '6') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：统计分析基础",
            description: "学习基本的统计分析方法",
            template: "# 统计分析基础\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {'销售额': np.random.normal(1000, 200, 100), '利润': np.random.normal(200, 50, 100)}\ndf = pd.DataFrame(data)\n\nprint('数据基本统计:')\nprint(df.describe())\n\n# TODO: 计算相关系数\nprint('\n相关系数:')\n",
            answer: "# 统计分析基础\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {'销售额': np.random.normal(1000, 200, 100), '利润': np.random.normal(200, 50, 100)}\ndf = pd.DataFrame(data)\n\nprint('数据基本统计:')\nprint(df.describe())\n\n# 计算相关系数\ncorrelation = df.corr()\nprint('\n相关系数:')\nprint(correlation)\n\n# 计算协方差\ncovariance = df.cov()\nprint('\n协方差:')\nprint(covariance)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：商业案例分析",
            description: "通过商业案例学习数据分析的应用",
            template: "# 商业案例分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品'], 30),\n    '销售额': np.random.randint(500, 2000, 30),\n    '促销活动': np.random.choice(['无', '有'], 30, p=[0.7, 0.3])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 分析促销活动对销售额的影响\nprint('促销活动效果分析:')\n",
            answer: "# 商业案例分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品'], 30),\n    '销售额': np.random.randint(500, 2000, 30),\n    '促销活动': np.random.choice(['无', '有'], 30, p=[0.7, 0.3])\n}\n\ndf = pd.DataFrame(data)\n\n# 分析促销活动对销售额的影响\npromotion_effect = df.groupby('促销活动')['销售额'].agg(['mean', 'count', 'sum']).round(2)\nprint('促销活动效果分析:')\nprint(promotion_effect)\n\n# 按产品类别和促销活动分析\ncategory_promotion = df.groupby(['产品类别', '促销活动'])['销售额'].mean().round(2)\nprint('\n按产品类别和促销活动分析:')\nprint(category_promotion)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '8') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：项目实践准备",
            description: "准备进行数据分析项目实践",
            template: "# 项目实践准备\n\n# 项目主题：电商销售数据分析\nprint('项目实践准备:')\nprint('1. 确定项目目标')\nprint('2. 收集数据')\nprint('3. 制定分析计划')\nprint('4. 准备分析工具')\n\n# TODO: 列出项目实施的具体步骤\nprint('\n项目实施步骤:')\n",
            answer: "# 项目实践准备\n\n# 项目主题：电商销售数据分析\nprint('项目实践准备:')\nprint('1. 确定项目目标')\nprint('2. 收集数据')\nprint('3. 制定分析计划')\nprint('4. 准备分析工具')\n\n# 项目实施的具体步骤\nprint('\n项目实施步骤:')\nprint('1. 数据收集与导入')\nprint('2. 数据清洗与预处理')\nprint('3. 数据探索与分析')\nprint('4. 数据可视化')\nprint('5. 结果分析与报告')\nprint('6. 项目总结与改进')",
            difficulty: "简单"
          }
        ];
      } else if (lessonId === '9') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：项目实施",
            description: "实施数据分析项目",
            template: "# 项目实施\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 101),\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 100),\n    '销售额': np.random.randint(100, 2000, 100),\n    '客户年龄': np.random.randint(18, 65, 100),\n    '地区': np.random.choice(['北京', '上海', '广州', '深圳'], 100)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 进行数据分析\nprint('项目实施分析:')\n",
            answer: "# 项目实施\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 101),\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 100),\n    '销售额': np.random.randint(100, 2000, 100),\n    '客户年龄': np.random.randint(18, 65, 100),\n    '地区': np.random.choice(['北京', '上海', '广州', '深圳'], 100)\n}\n\ndf = pd.DataFrame(data)\n\n# 进行数据分析\nprint('项目实施分析:')\n\n# 1. 总体销售情况\nprint('\n1. 总体销售情况:')\nprint('总销售额:', df['销售额'].sum())\nprint('平均订单金额:', df['销售额'].mean().round(2))\nprint('订单数量:', len(df))\n\n# 2. 按产品类别分析\nprint('\n2. 按产品类别分析:')\nproduct_analysis = df.groupby('产品类别')['销售额'].agg(['sum', 'mean', 'count']).round(2)\nprint(product_analysis)\n\n# 3. 按地区分析\nprint('\n3. 按地区分析:')\nregion_analysis = df.groupby('地区')['销售额'].agg(['sum', 'mean', 'count']).round(2)\nprint(region_analysis)\n\n# 4. 按客户年龄分析\nprint('\n4. 按客户年龄分析:')\ndf['年龄组'] = pd.cut(df['客户年龄'], bins=[18, 30, 40, 50, 65], labels=['18-30', '31-40', '41-50', '51-65'])\nage_analysis = df.groupby('年龄组')['销售额'].agg(['sum', 'mean', 'count']).round(2)\nprint(age_analysis)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '10') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：项目展示与总结",
            description: "展示项目成果并总结学习内容",
            template: "# 项目展示与总结\n\n# 项目主题：电商销售数据分析\nprint('项目展示与总结:')\nprint('1. 项目背景')\nprint('2. 数据来源')\nprint('3. 分析方法')\n\n# TODO: 总结项目成果和学习收获\nprint('\n项目成果:')\nprint('\n学习收获:')\n",
            answer: "# 项目展示与总结\n\n# 项目主题：电商销售数据分析\nprint('项目展示与总结:')\nprint('1. 项目背景: 通过对电商销售数据的分析，了解销售趋势和客户行为，为业务决策提供数据支持')\nprint('2. 数据来源: 模拟的电商销售数据，包含订单ID、日期、产品类别、销售额、客户年龄和地区等信息')\nprint('3. 分析方法: 使用Pandas进行数据处理和分析，使用Matplotlib进行数据可视化')\n\n# 总结项目成果和学习收获\nprint('\n项目成果:')\nprint('- 分析了不同产品类别的销售情况，发现电子产品销售额最高')\nprint('- 分析了不同地区的销售表现，发现北京地区销售额领先')\nprint('- 分析了不同年龄组的消费行为，发现31-40岁年龄组消费能力最强')\nprint('- 识别了销售趋势和季节性模式')\n\nprint('\n学习收获:')\nprint('- 掌握了Python数据分析的基本流程和方法')\nprint('- 学习了使用Pandas进行数据处理和分析')\nprint('- 学习了使用Matplotlib进行数据可视化')\nprint('- 培养了数据分析思维和问题解决能力')\nprint('- 学会了如何将分析结果转化为业务 insights')",
            difficulty: "简单"
          }
        ];
      }
    }
    
    // 课程3: 数据采集与预处理
    if (id === '3') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            type: "text",
            title: "练习1：数据采集概述",
            description: "回答关于数据采集基本概念的问题",
            difficulty: "简单",
            question: "1. 什么是数据采集？请列举至少3种常见的数据采集方法。\n\n2. 数据采集的主要挑战有哪些？请至少列举3个。\n\n3. 在进行数据采集时，为什么需要遵守robots.txt协议？",
            answer: "1. 数据采集是指从各种来源获取数据的过程。常见的数据采集方法包括：网络爬虫、API接口、问卷调查、实验数据采集、公开数据集等。\n\n2. 数据采集的主要挑战包括：数据质量问题、数据量过大、数据格式多样、法律和道德问题、技术挑战、反爬机制等。\n\n3. 遵守robots.txt协议是为了：尊重网站所有者的意愿、避免法律风险、维护良好的网络爬虫伦理、防止被网站封禁等。"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            type: "text",
            title: "练习2：网络爬虫基础",
            description: "回答关于网络爬虫的问题",
            difficulty: "简单",
            question: "1. 什么是网络爬虫？它的工作原理是什么？\n\n2. 请列举3种常见的反爬机制。\n\n3. 在开发网络爬虫时，应该注意哪些法律和道德问题？",
            answer: "1. 网络爬虫是一种自动获取网页内容的程序。它的工作原理是：发送HTTP请求获取网页内容、解析HTML结构、提取所需数据、存储数据。\n\n2. 常见的反爬机制包括：User-Agent检测、IP限制、验证码、动态加载、登录验证、蜜罐陷阱、行为分析等。\n\n3. 在开发网络爬虫时，应该注意：遵守robots.txt协议、控制爬取频率、尊重网站Terms of Service、不爬取敏感数据、遵守数据使用限制等。"
          }
        ];
      } else if (lessonId === '3') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习3：使用Requests发送GET请求",
            description: "学习使用Requests库发送GET请求并处理响应",
            template: "# 使用Requests发送GET请求\nimport requests\n\n# 发送GET请求到百度首页\nurl = 'https://www.baidu.com'\n\n# TODO: 发送请求并获取响应\n# response = requests.get(url)\n\n# TODO: 打印响应状态码\nprint('状态码:')\n\n# TODO: 打印响应头\nprint('\n响应头:')\n\n# TODO: 打印响应内容的前500个字符\nprint('\n响应内容:')\n",
            answer: "# 使用Requests发送GET请求\nimport requests\n\n# 发送GET请求到百度首页\nurl = 'https://www.baidu.com'\n\n# 发送请求并获取响应\nresponse = requests.get(url)\n\n# 打印响应状态码\nprint('状态码:', response.status_code)\n\n# 打印响应头\nprint('\n响应头:')\nfor key, value in response.headers.items():\n    print(f'{key}: {value}')\n\n# 打印响应内容的前500个字符\nprint('\n响应内容:')\nprint(response.text[:500])\n\n# 设置请求头\nheaders = {\n    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'\n}\n\n# 使用自定义请求头发送请求\nresponse_with_headers = requests.get(url, headers=headers)\nprint('\n使用自定义请求头的状态码:', response_with_headers.status_code)",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习3：Requests库使用",
            description: "回答关于Requests库的问题",
            difficulty: "简单",
            question: "1. Requests库的主要功能是什么？\n\n2. 请列举3种常见的HTTP请求方法。\n\n3. 为什么在使用Requests库时需要设置合适的请求头？",
            answer: "1. Requests库是Python中用于发送HTTP请求的库，主要功能包括：发送GET/POST/PUT/DELETE等请求、处理请求参数、处理响应、会话管理、Cookie处理等。\n\n2. 常见的HTTP请求方法包括：GET（获取资源）、POST（提交数据）、PUT（更新资源）、DELETE（删除资源）等。\n\n3. 设置合适的请求头是为了：模拟真实浏览器访问、避免被识别为爬虫、提高请求成功率、传递必要的信息（如User-Agent、Cookie等）。"
          }
        ];
      } else if (lessonId === '4') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习4：使用BeautifulSoup解析HTML",
            description: "学习使用BeautifulSoup库解析HTML并提取数据",
            template: "# 使用BeautifulSoup解析HTML\nfrom bs4 import BeautifulSoup\n\n# 示例HTML内容\nhtml_content = '''\n<!DOCTYPE html>\n<html>\n<head>\n    <title>测试页面</title>\n</head>\n<body>\n    <h1>欢迎来到测试页面</h1>\n    <div class=\"content\">\n        <p>这是一个测试段落</p>\n        <ul>\n            <li>项目1</li>\n            <li>项目2</li>\n            <li>项目3</li>\n        </ul>\n    </div>\n</body>\n</html>\n'''\n\n# TODO: 创建BeautifulSoup对象\n# soup = BeautifulSoup(html_content, 'html.parser')\n\n# TODO: 提取标题\nprint('标题:')\n\n# TODO: 提取h1标签内容\nprint('\nh1标签内容:')\n\n# TODO: 提取所有li标签内容\nprint('\n所有li标签内容:')\n",
            answer: '# 使用BeautifulSoup解析HTML\nfrom bs4 import BeautifulSoup\n\nprint("BeautifulSoup练习完成!")\nprint("请在实际环境中运行完整代码")',
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习4：BeautifulSoup库使用",
            description: "回答关于BeautifulSoup库的问题",
            difficulty: "简单",
            question: "1. BeautifulSoup库的主要功能是什么？\n\n2. 请列举2种常用的HTML元素选择方法。\n\n3. 在使用BeautifulSoup时，如何处理HTML结构变化的情况？",
            answer: "1. BeautifulSoup库是Python中用于解析HTML和XML的库，主要功能包括：解析HTML结构、提取文本内容、查找元素、修改HTML等。\n\n2. 常用的HTML元素选择方法包括：CSS选择器（如标签选择器、类选择器、ID选择器）、XPath表达式、标签名查找等。\n\n3. 处理HTML结构变化的方法包括：使用更灵活的选择器、添加异常处理、使用多个备选选择器、定期检查和更新爬虫等。"
          }
        ];
      } else if (lessonId === '5') {
        return [
          {
            id: 1,
            type: "text",
            title: "练习5：Selenium使用",
            description: "回答关于Selenium的问题",
            difficulty: "简单",
            question: "1. 什么时候应该使用Selenium而不是Requests+BeautifulSoup？\n\n2. Selenium的主要优点和缺点是什么？\n\n3. 请列举2种Selenium中常用的元素定位方法。",
            answer: "1. 应该使用Selenium的情况包括：处理动态加载的内容、需要模拟用户交互（如点击、滚动）、处理JavaScript渲染的页面、需要登录认证等。\n\n2. Selenium的主要优点：可以处理复杂的动态页面、模拟真实用户操作。主要缺点：运行速度慢、内存消耗大、需要浏览器驱动、性能较差。\n\n3. Selenium中常用的元素定位方法包括：ID定位、类名定位、XPath定位、CSS选择器定位、链接文本定位等。"
          }
        ];
      } else if (lessonId === '6') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习6：数据存储",
            description: "学习将爬取的数据存储为CSV和JSON格式",
            template: "# 数据存储练习\nimport csv\nimport json\n\n# 模拟爬取的数据\ndata = [\n    {'name': '产品1', 'price': 100, 'category': '电子产品'},\n    {'name': '产品2', 'price': 200, 'category': '服装'},\n    {'name': '产品3', 'price': 300, 'category': '家居用品'}\n]\n\n# TODO: 将数据存储为CSV文件\n# with open('products.csv', 'w', newline='', encoding='utf-8') as f:\n#     writer = csv.DictWriter(f, fieldnames=['name', 'price', 'category'])\n#     writer.writeheader()\n#     writer.writerows(data)\n\nprint('CSV文件已创建')\n\n# TODO: 将数据存储为JSON文件\n# with open('products.json', 'w', encoding='utf-8') as f:\n#     json.dump(data, f, ensure_ascii=False, indent=2)\n\nprint('JSON文件已创建')\n",
            answer: "# 数据存储练习\nimport csv\nimport json\n\n# 模拟爬取的数据\ndata = [\n    {'name': '产品1', 'price': 100, 'category': '电子产品'},\n    {'name': '产品2', 'price': 200, 'category': '服装'},\n    {'name': '产品3', 'price': 300, 'category': '家居用品'}\n]\n\n# 将数据存储为CSV文件\nwith open('products.csv', 'w', newline='', encoding='utf-8') as f:\n    writer = csv.DictWriter(f, fieldnames=['name', 'price', 'category'])\n    writer.writeheader()\n    writer.writerows(data)\n\nprint('CSV文件已创建')\n\n# 读取CSV文件验证\nprint('\n从CSV文件读取的数据:')\nwith open('products.csv', 'r', encoding='utf-8') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row)\n\n# 将数据存储为JSON文件\nwith open('products.json', 'w', encoding='utf-8') as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\nprint('\nJSON文件已创建')\n\n# 读取JSON文件验证\nprint('\n从JSON文件读取的数据:')\nwith open('products.json', 'r', encoding='utf-8') as f:\n    loaded_data = json.load(f)\n    for item in loaded_data:\n        print(item)",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习6：数据存储",
            description: "回答关于数据存储的问题",
            difficulty: "简单",
            question: "1. 请列举3种常见的数据存储格式，并说明它们的特点。\n\n2. 关系型数据库和NoSQL数据库的主要区别是什么？\n\n3. 在选择数据存储方案时，应该考虑哪些因素？",
            answer: "1. 常见的数据存储格式包括：\n- CSV：简单、易读、通用，但不适合复杂数据结构\n- JSON：灵活、支持嵌套结构、易于Web应用使用\n- Excel：便于人工查看和编辑，但不适合大数据量\n- 数据库：适合结构化数据、支持查询和索引\n\n2. 关系型数据库（如MySQL）使用表结构、支持SQL查询、强调一致性；NoSQL数据库（如MongoDB）使用文档/键值对结构、更灵活、强调可扩展性。\n\n3. 选择数据存储方案时应考虑：数据结构、数据量、查询需求、性能要求、成本、可扩展性等。"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            type: "text",
            title: "练习7：数据清洗概述",
            description: "回答关于数据清洗的问题",
            difficulty: "简单",
            question: "1. 什么是数据清洗？它为什么重要？\n\n2. 请列举3种常见的数据质量问题。\n\n3. 数据清洗的基本流程是什么？",
            answer: "1. 数据清洗是识别和修正数据中的错误、不一致和缺失值的过程。它重要是因为：垃圾进垃圾出、提高分析结果可靠性、确保数据质量、为后续分析做好准备。\n\n2. 常见的数据质量问题包括：缺失值、重复值、异常值、不一致性、数据类型错误等。\n\n3. 数据清洗的基本流程：数据质量评估、缺失值处理、重复值处理、异常值处理、数据类型转换、数据验证等。"
          }
        ];
      } else if (lessonId === '8') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习8：处理缺失值",
            description: "学习使用Pandas处理数据中的缺失值",
            template: "# 处理缺失值练习\nimport pandas as pd\nimport numpy as np\n\n# 创建含有缺失值的示例数据\ndata = {\n    'name': ['产品1', '产品2', '产品3', '产品4'],\n    'price': [100, np.nan, 300, 400],\n    'category': ['电子产品', '服装', np.nan, '家居用品'],\n    'stock': [10, 20, np.nan, 40]\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# TODO: 检查缺失值\nprint('\n缺失值情况:')\n\n# TODO: 删除含有缺失值的行\nprint('\n删除含有缺失值的行:')\n\n# TODO: 用均值填充数值型缺失值，用'未知'填充分类型缺失值\nprint('\n填充缺失值:')\n",
            answer: "# 处理缺失值练习\nimport pandas as pd\nimport numpy as np\n\n# 创建含有缺失值的示例数据\ndata = {\n    'name': ['产品1', '产品2', '产品3', '产品4'],\n    'price': [100, np.nan, 300, 400],\n    'category': ['电子产品', '服装', np.nan, '家居用品'],\n    'stock': [10, 20, np.nan, 40]\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# 检查缺失值\nprint('\n缺失值情况:')\nprint(df.isnull().sum())\n\n# 删除含有缺失值的行\ndf_dropped = df.dropna()\nprint('\n删除含有缺失值的行:')\nprint(df_dropped)\n\n# 用均值填充数值型缺失值，用'未知'填充分类型缺失值\ndf_filled = df.copy()\ndf_filled['price'] = df_filled['price'].fillna(df_filled['price'].mean())\ndf_filled['stock'] = df_filled['stock'].fillna(df_filled['stock'].mean())\ndf_filled['category'] = df_filled['category'].fillna('未知')\n\nprint('\n填充缺失值:')\nprint(df_filled)\n\n# 查看填充后的数据类型\nprint('\n填充后的数据类型:')\nprint(df_filled.dtypes)",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习8：处理缺失值",
            description: "回答关于缺失值处理的问题",
            difficulty: "简单",
            question: "1. 请列举3种常见的缺失值类型，并说明它们的特点。\n\n2. 请列举3种处理缺失值的方法，并说明它们的适用场景。\n\n3. 在选择缺失值处理方法时，应该考虑哪些因素？",
            answer: "1. 常见的缺失值类型：\n- 完全随机缺失（MCAR）：缺失与数据本身无关\n- 随机缺失（MAR）：缺失与已观测数据相关\n- 非随机缺失（MNAR）：缺失与未观测数据相关\n\n2. 处理缺失值的方法：\n- 删除法：适用于缺失率低、数据量大的情况\n- 填充法：适用于缺失率适中的情况\n- 插值法：适用于时间序列等有规律的数据\n- 模型法：适用于复杂情况，利用其他变量预测\n\n3. 选择缺失值处理方法时应考虑：缺失率、缺失类型、数据类型、后续分析方法、业务知识等。"
          }
        ];
      } else if (lessonId === '9') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习9：处理异常值",
            description: "学习使用统计方法检测和处理异常值",
            template: "# 处理异常值练习\nimport pandas as pd\nimport numpy as np\n\n# 创建含有异常值的示例数据\nnp.random.seed(42)\ndata = {\n    'value': np.concatenate([np.random.normal(100, 10, 98), np.array([50, 150])])\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# TODO: 计算Z-score\n# z_scores = np.abs((df['value'] - df['value'].mean()) / df['value'].std())\n\n# TODO: 检测异常值（Z-score > 2）\nprint('\n异常值检测:')\n\n# TODO: 处理异常值（替换为均值）\nprint('\n处理异常值:')\n",
            answer: "# 处理异常值练习\nimport pandas as pd\nimport numpy as np\n\n# 创建含有异常值的示例数据\nnp.random.seed(42)\ndata = {\n    'value': np.concatenate([np.random.normal(100, 10, 98), np.array([50, 150])])\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df.describe())\n\n# 计算Z-score\nz_scores = np.abs((df['value'] - df['value'].mean()) / df['value'].std())\ndf['z_score'] = z_scores\n\n# 检测异常值（Z-score > 2）\nanomaly_threshold = 2\nanomalies = df[z_scores > anomaly_threshold]\nprint('\n异常值检测:')\nprint(f'检测到 {len(anomalies)} 个异常值:')\nprint(anomalies)\n\n# 处理异常值（替换为均值）\ndf_cleaned = df.copy()\nmean_value = df['value'].mean()\ndf_cleaned.loc[z_scores > anomaly_threshold, 'value'] = mean_value\n\nprint('\n处理异常值:')\nprint(df_cleaned.describe())\n\n# 查看处理前后的差异\nprint('\n处理前后的均值差异:', abs(df['value'].mean() - df_cleaned['value'].mean()))\nprint('处理前后的标准差差异:', abs(df['value'].std() - df_cleaned['value'].std()))",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习9：处理异常值",
            description: "回答关于异常值处理的问题",
            difficulty: "简单",
            question: "1. 什么是异常值？它可能带来什么影响？\n\n2. 请列举2种常用的异常值检测方法。\n\n3. 处理异常值时应该注意什么？",
            answer: "1. 异常值是指与其他数据显著不同的数据点。它可能带来的影响：影响统计分析结果、扭曲模型预测、降低数据质量等。\n\n2. 常用的异常值检测方法：\n- 统计方法：Z-score、IQR方法\n- 可视化方法：箱线图、散点图\n- 机器学习方法：孤立森林、One-class SVM\n\n3. 处理异常值时应该注意：不要盲目删除、考虑异常值的业务意义、记录处理方法、验证处理效果、考虑业务知识等。"
          }
        ];
      } else if (lessonId === '10') {
        return [
          {
            id: 1,
            type: "text",
            title: "练习10：数据预处理实战",
            description: "回答关于数据预处理实战的问题",
            difficulty: "中等",
            question: "1. 一个完整的数据预处理项目包括哪些主要步骤？\n\n2. 在数据预处理过程中，为什么需要记录每一步的操作？\n\n3. 请列举3个数据预处理中常见的挑战，并说明如何应对。",
            answer: "1. 一个完整的数据预处理项目主要步骤：\n- 项目规划和需求分析\n- 数据收集和导入\n- 数据探索和质量评估\n- 数据清洗（缺失值、异常值、重复值处理）\n- 数据转换和整合\n- 特征工程\n- 数据标准化\n- 预处理结果评估\n- 文档记录\n\n2. 记录每一步操作的原因：\n- 保证可重现性\n- 便于后续检查和调试\n- 便于团队协作\n- 便于知识传承\n- 便于审计和合规\n\n3. 数据预处理中常见的挑战及应对：\n- 数据质量差：充分的数据探索、多种方法尝试、业务知识结合\n- 数据量过大：分块处理、采样、并行计算、优化算法\n- 业务知识缺乏：与业务专家合作、充分理解业务背景、迭代优化\n- 时间紧迫：优先级排序、自动化流程、分步实施"
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
            type: "code",
            title: "练习1：基本统计分析",
            description: "对销售数据进行基本统计分析",
            template: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n",
            answer: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n\n# 计算日均销售额\nprint('\n日均销售额:', df['销售额'].mean())\nprint('日均客户数:', df['客户数'].mean())",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：促销活动效果分析",
            description: "分析不同促销活动对销售的影响",
            template: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\n\n# TODO: 2. 查看不同促销活动的平均客流量\nprint('\n不同促销活动的平均客流量:')\n",
            answer: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\npromotion_sales = df.groupby('促销活动')['销售额'].mean()\nprint(promotion_sales.round(2))\n\n# 2. 查看不同促销活动的平均客流量\nprint('\n不同促销活动的平均客流量:')\npromotion_customers = df.groupby('促销活动')['客流量'].mean()\nprint(promotion_customers.round(2))",
            difficulty: "中等"
          }
        ];
      }
    }
    
    // 课程4: 网络爬虫进阶
    if (id === '4') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：爬虫架构设计",
            description: "学习创建一个简单的爬虫架构",
            template: "# 简单爬虫架构设计\nimport queue\nimport threading\nimport time\n\nclass SimpleSpider:\n    def __init__(self):\n        self.url_queue = queue.Queue()\n        self.visited_urls = set()\n        self.lock = threading.Lock()\n        \n    def add_url(self, url):\n        # TODO: 添加URL到队列\n        pass\n    \n    def crawl(self, url):\n        # 模拟爬取过程\n        print(f'爬取: {url}')\n        time.sleep(0.5)\n        # 模拟提取的新URL\n        new_urls = [f'{url}/page1', f'{url}/page2']\n        return new_urls\n    \n    def worker(self):\n        while True:\n            try:\n                url = self.url_queue.get(block=False)\n                if url in self.visited_urls:\n                    self.url_queue.task_done()\n                    continue\n                \n                with self.lock:\n                    self.visited_urls.add(url)\n                \n                new_urls = self.crawl(url)\n                for new_url in new_urls:\n                    if new_url not in self.visited_urls:\n                        self.add_url(new_url)\n                \n                self.url_queue.task_done()\n            except queue.Empty:\n                break\n\n# 测试爬虫\nspider = SimpleSpider()\nspider.add_url('https://example.com')\n\n# 创建工作线程\nthreads = []\nfor i in range(3):\n    t = threading.Thread(target=spider.worker)\n    t.start()\n    threads.append(t)\n\n# 等待所有线程完成\nfor t in threads:\n    t.join()\n\nprint(f'爬取完成，共访问 {len(spider.visited_urls)} 个URL')",
            answer: "# 简单爬虫架构设计\nimport queue\nimport threading\nimport time\n\nclass SimpleSpider:\n    def __init__(self):\n        self.url_queue = queue.Queue()\n        self.visited_urls = set()\n        self.lock = threading.Lock()\n        \n    def add_url(self, url):\n        # 添加URL到队列\n        if url not in self.visited_urls:\n            self.url_queue.put(url)\n    \n    def crawl(self, url):\n        # 模拟爬取过程\n        print(f'爬取: {url}')\n        time.sleep(0.5)\n        # 模拟提取的新URL\n        new_urls = [f'{url}/page1', f'{url}/page2']\n        return new_urls\n    \n    def worker(self):\n        while True:\n            try:\n                url = self.url_queue.get(block=False)\n                if url in self.visited_urls:\n                    self.url_queue.task_done()\n                    continue\n                \n                with self.lock:\n                    self.visited_urls.add(url)\n                \n                new_urls = self.crawl(url)\n                for new_url in new_urls:\n                    if new_url not in self.visited_urls:\n                        self.add_url(new_url)\n                \n                self.url_queue.task_done()\n            except queue.Empty:\n                break\n\n# 测试爬虫\nspider = SimpleSpider()\nspider.add_url('https://example.com')\n\n# 创建工作线程\nthreads = []\nfor i in range(3):\n    t = threading.Thread(target=spider.worker)\n    t.start()\n    threads.append(t)\n\n# 等待所有线程完成\nfor t in threads:\n    t.join()\n\nprint(f'爬取完成，共访问 {len(spider.visited_urls)} 个URL')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习1：爬虫架构设计",
            description: "回答关于爬虫架构设计的问题",
            difficulty: "中等",
            question: "1. 请简述网络爬虫的基本架构组成。\n\n2. 什么是任务队列？它在爬虫中的作用是什么？\n\n3. 请列举至少3种爬虫性能优化的方法。",
            answer: "1. 网络爬虫的基本架构通常包括：\n   - 调度器：负责管理URL队列，决定爬取顺序\n   - 下载器：负责发送HTTP请求，获取网页内容\n   - 解析器：负责解析HTML，提取数据和新的URL\n   - 数据存储：负责保存爬取的数据\n   - 反爬处理：处理网站的反爬措施\n\n2. 任务队列是存储待爬取URL的容器，它的作用是：\n   - 管理爬取顺序和优先级\n   - 防止重复爬取\n   - 支持断点续爬\n   - 实现分布式爬取\n\n3. 爬虫性能优化的方法包括：\n   - 并发处理：使用多线程或异步IO\n   - 缓存机制：缓存已爬取的内容\n   - 批量请求：减少HTTP请求次数\n   - 数据压缩：减少数据传输量\n   - 内存管理：优化内存使用\n   - 合理的爬取策略：避免过度请求"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习2：反爬策略应对",
            description: "学习如何应对常见的反爬策略",
            template: "# 反爬策略应对\nimport requests\nimport time\nfrom fake_useragent import UserAgent\n\n# 目标网站\nurl = 'https://example.com'\n\n# 1. 使用随机User-Agent\nua = UserAgent()\nheaders = {\n    'User-Agent': ua.random\n}\n\n# 2. 设置请求间隔\ndef crawl_with_delay(url, delay=1):\n    print(f'爬取: {url}')\n    # TODO: 发送请求并处理响应\n    time.sleep(delay)\n\n# 3. 模拟浏览器行为\nsession = requests.Session()\n\n# 测试爬取\ntry:\n    response = session.get(url, headers=headers)\n    print(f'状态码: {response.status_code}')\n    print(f'响应长度: {len(response.text)}')\n    \n    # 测试带延迟的爬取\n    crawl_with_delay(url)\nexcept Exception as e:\n    print(f'错误: {e}')\n",
            answer: "# 反爬策略应对\nimport requests\nimport time\nfrom fake_useragent import UserAgent\n\n# 目标网站\nurl = 'https://example.com'\n\n# 1. 使用随机User-Agent\nua = UserAgent()\nheaders = {\n    'User-Agent': ua.random\n}\n\n# 2. 设置请求间隔\ndef crawl_with_delay(url, delay=1):\n    print(f'爬取: {url}')\n    try:\n        response = requests.get(url, headers=headers)\n        print(f'状态码: {response.status_code}')\n    except Exception as e:\n        print(f'爬取错误: {e}')\n    time.sleep(delay)\n\n# 3. 模拟浏览器行为\nsession = requests.Session()\n\n# 测试爬取\ntry:\n    response = session.get(url, headers=headers)\n    print(f'状态码: {response.status_code}')\n    print(f'响应长度: {len(response.text)}')\n    \n    # 测试带延迟的爬取\n    crawl_with_delay(url)\nexcept Exception as e:\n    print(f'错误: {e}')\n\n# 4. 打印使用的User-Agent\nprint(f'使用的User-Agent: {headers[\"User-Agent\"]}')\n",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习2：反爬策略应对",
            description: "回答关于反爬策略应对的问题",
            difficulty: "中等",
            question: "1. 请列举至少5种常见的反爬措施。\n\n2. 如何应对IP限制？\n\n3. 验证码处理的常用方法有哪些？",
            answer: "1. 常见的反爬措施包括：\n   - User-Agent检测\n   - IP限制\n   - 验证码\n   - 动态加载\n   - 登录验证\n   - 蜜罐陷阱\n   - 行为分析\n\n2. 应对IP限制的方法：\n   - 使用代理IP池\n   - 代理轮换策略\n   - IP质量评估\n   - 分布式爬虫\n   - 控制爬取频率\n\n3. 验证码处理的常用方法：\n   - 手动识别\n   - OCR技术\n   - 第三方验证码服务\n   - 验证码绕过技巧\n   - 模拟登录获取Cookie"
          }
        ];
      }
    }
    
    // 课程5: 数据质量评估与预处理
    if (id === '5') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：数据质量评估",
            description: "学习使用Pandas进行数据质量评估",
            template: "# 数据质量评估练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\nnp.random.seed(42)\ndata = {\n    'id': range(1, 101),\n    'name': ['产品' + str(i) for i in range(1, 101)],\n    'price': np.random.randint(50, 500, 100),\n    'category': np.random.choice(['电子产品', '服装', '家居用品'], 100),\n    'stock': np.random.randint(0, 100, 100),\n    'sales': np.random.randint(0, 50, 100)\n}\n\n# 随机添加缺失值\ndf = pd.DataFrame(data)\ndf.loc[np.random.choice(df.index, 10), 'price'] = np.nan\ndf.loc[np.random.choice(df.index, 5), 'category'] = np.nan\ndf.loc[np.random.choice(df.index, 8), 'stock'] = np.nan\n\nprint('原始数据:')\nprint(df.head())\n\n# TODO: 计算缺失值比例\nprint('\n缺失值比例:')\n\n# TODO: 计算重复值\nprint('\n重复值数量:')\n\n# TODO: 计算基本统计信息\nprint('\n基本统计信息:')\n",
            answer: "# 数据质量评估练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\nnp.random.seed(42)\ndata = {\n    'id': range(1, 101),\n    'name': ['产品' + str(i) for i in range(1, 101)],\n    'price': np.random.randint(50, 500, 100),\n    'category': np.random.choice(['电子产品', '服装', '家居用品'], 100),\n    'stock': np.random.randint(0, 100, 100),\n    'sales': np.random.randint(0, 50, 100)\n}\n\n# 随机添加缺失值\ndf = pd.DataFrame(data)\ndf.loc[np.random.choice(df.index, 10), 'price'] = np.nan\ndf.loc[np.random.choice(df.index, 5), 'category'] = np.nan\ndf.loc[np.random.choice(df.index, 8), 'stock'] = np.nan\n\nprint('原始数据:')\nprint(df.head())\n\n# 计算缺失值比例\nprint('\n缺失值比例:')\nmissing_ratio = df.isnull().sum() / len(df) * 100\nfor col, ratio in missing_ratio.items():\n    print(f'{col}: {ratio:.2f}%')\n\n# 计算重复值\nduplicate_rows = df.duplicated().sum()\nprint('\n重复值数量:', duplicate_rows)\n\n# 计算基本统计信息\nprint('\n基本统计信息:')\nprint(df.describe())\n\n# 分析分类变量\nprint('\n分类变量分析:')\nprint(df['category'].value_counts())\n\n# 数据质量报告\nprint('\n数据质量报告:')\nprint(f'数据总行数: {len(df)}')\nprint(f'数据总列数: {len(df.columns)}')\nprint(f'有缺失值的列数: {sum(missing_ratio > 0)}')\nprint(f'缺失值比例最高的列: {missing_ratio.idxmax()} ({missing_ratio.max():.2f}%)')\nprint(f'是否存在重复行: {duplicate_rows > 0}')",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习1：数据质量评估",
            description: "回答关于数据质量评估的问题",
            difficulty: "简单",
            question: "1. 数据质量的主要维度有哪些？\n\n2. 请简述数据质量评估的基本方法。\n\n3. 数据质量报告应该包含哪些内容？",
            answer: "1. 数据质量的主要维度包括：\n   - 完整性：数据是否完整，无缺失\n   - 一致性：数据是否符合业务规则和逻辑\n   - 准确性：数据是否准确反映现实\n   - 时效性：数据是否及时更新\n   - 唯一性：数据是否存在重复\n   - 有效性：数据是否符合预定义的格式和范围\n\n2. 数据质量评估的基本方法：\n   - 统计分析：计算缺失率、重复率等指标\n   - 可视化分析：通过图表展示数据分布和异常\n   - 规则检查：根据业务规则验证数据\n   - 数据profiling：自动分析数据结构和质量\n\n3. 数据质量报告应该包含：\n   - 数据概况：数据量、字段数等基本信息\n   - 质量指标：各维度的质量得分\n   - 问题识别：发现的质量问题\n   - 优先级排序：问题的严重程度\n   - 改进建议：针对问题的解决方案\n   - 可视化展示：通过图表直观展示质量状况"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习2：缺失值处理",
            description: "学习使用多种方法处理缺失值",
            template: "# 缺失值处理练习\nimport pandas as pd\nimport numpy as np\nfrom sklearn.impute import KNNImputer\n\n# 创建示例数据\nnp.random.seed(42)\ndata = {\n    'age': np.random.randint(18, 70, 100),\n    'income': np.random.randint(3000, 20000, 100),\n    'score': np.random.randint(0, 100, 100),\n    'gender': np.random.choice(['男', '女'], 100)\n}\n\n# 随机添加缺失值\ndf = pd.DataFrame(data)\ndf.loc[np.random.choice(df.index, 15), 'age'] = np.nan\ndf.loc[np.random.choice(df.index, 10), 'income'] = np.nan\ndf.loc[np.random.choice(df.index, 5), 'score'] = np.nan\ndf.loc[np.random.choice(df.index, 8), 'gender'] = np.nan\n\nprint('原始数据:')\nprint(df.head())\nprint('\n缺失值情况:')\nprint(df.isnull().sum())\n\n# TODO: 方法1：删除含有缺失值的行\nprint('\n方法1：删除含有缺失值的行:')\n\n# TODO: 方法2：均值填充\nprint('\n方法2：均值填充:')\n\n# TODO: 方法3：KNN插值\nprint('\n方法3：KNN插值:')\n",
            answer: "# 缺失值处理练习\nimport pandas as pd\nimport numpy as np\nfrom sklearn.impute import KNNImputer\n\n# 创建示例数据\nnp.random.seed(42)\ndata = {\n    'age': np.random.randint(18, 70, 100),\n    'income': np.random.randint(3000, 20000, 100),\n    'score': np.random.randint(0, 100, 100),\n    'gender': np.random.choice(['男', '女'], 100)\n}\n\n# 随机添加缺失值\ndf = pd.DataFrame(data)\ndf.loc[np.random.choice(df.index, 15), 'age'] = np.nan\ndf.loc[np.random.choice(df.index, 10), 'income'] = np.nan\ndf.loc[np.random.choice(df.index, 5), 'score'] = np.nan\ndf.loc[np.random.choice(df.index, 8), 'gender'] = np.nan\n\nprint('原始数据:')\nprint(df.head())\nprint('\n缺失值情况:')\nprint(df.isnull().sum())\n\n# 方法1：删除含有缺失值的行\ndf_dropped = df.dropna()\nprint('\n方法1：删除含有缺失值的行:')\nprint(f'原始行数: {len(df)}, 删除后行数: {len(df_dropped)}')\n\n# 方法2：均值填充\ndf_mean = df.copy()\n# 数值型列用均值填充\nnumeric_cols = ['age', 'income', 'score']\nfor col in numeric_cols:\n    df_mean[col] = df_mean[col].fillna(df_mean[col].mean())\n# 分类型列用众数填充\ndf_mean['gender'] = df_mean['gender'].fillna(df_mean['gender'].mode()[0])\nprint('\n方法2：均值填充:')\nprint(df_mean.head())\nprint('填充后缺失值情况:', df_mean.isnull().sum().sum())\n\n# 方法3：KNN插值\ndf_knn = df.copy()\n# 先处理分类型变量\nfrom sklearn.preprocessing import LabelEncoder\nle = LabelEncoder()\ndf_knn['gender_encoded'] = le.fit_transform(df_knn['gender'].fillna('未知'))\n\n# 选择数值列进行KNN插值\nknn_cols = ['age', 'income', 'score', 'gender_encoded']\nimputer = KNNImputer(n_neighbors=5)\ndf_knn[knn_cols] = imputer.fit_transform(df_knn[knn_cols])\n\n# 将编码后的性别转换回原始标签\ndf_knn['gender'] = le.inverse_transform(df_knn['gender_encoded'].astype(int))\ndf_knn.drop('gender_encoded', axis=1, inplace=True)\nprint('\n方法3：KNN插值:')\nprint(df_knn.head())\nprint('填充后缺失值情况:', df_knn.isnull().sum().sum())\n\n# 比较三种方法的结果\nprint('\n方法比较:')\nprint(f'删除法：{len(df_dropped)}行')\nprint(f'均值填充法：{len(df_mean)}行，无缺失值')\nprint(f'KNN插值法：{len(df_knn)}行，无缺失值')\n",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习2：缺失值处理",
            description: "回答关于缺失值处理的问题",
            difficulty: "简单",
            question: "1. 缺失值的类型有哪些？\n\n2. 请列举至少4种缺失值处理方法。\n\n3. 如何选择合适的缺失值处理方法？",
            answer: "1. 缺失值的类型包括：\n   - 完全随机缺失 (MCAR)：缺失与数据本身无关\n   - 随机缺失 (MAR)：缺失与已观测数据相关\n   - 非随机缺失 (MNAR)：缺失与未观测数据相关\n\n2. 缺失值处理方法包括：\n   - 删除法：删除包含缺失值的记录或变量\n   - 替换法：使用均值、中位数、众数等替换缺失值\n   - 插值法：线性插值、多项式插值、KNN插值等\n   - 模型法：使用回归、决策树等模型预测缺失值\n   - 多重插补：生成多个可能的缺失值估计\n\n3. 选择缺失值处理方法的考虑因素：\n   - 数据特性：数据类型、分布等\n   - 缺失率：缺失数据的比例\n   - 业务需求：分析目的和要求\n   - 后续分析方法：不同模型对缺失值的敏感性\n   - 计算资源：复杂方法的计算成本"
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
            type: "code",
            title: "练习1：商业数据分析概述",
            description: "学习商业数据分析的基本方法",
            template: "# 商业数据分析练习\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '产品类别': ['电子产品', '服装', '家居用品', '食品', '电子产品', '服装', '家居用品', '食品'],\n    '季度': ['Q1', 'Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q2'],\n    '销售额': [100000, 80000, 60000, 40000, 120000, 90000, 70000, 45000],\n    '利润': [20000, 16000, 12000, 8000, 24000, 18000, 14000, 9000]\n}\n\ndf = pd.DataFrame(data)\n\nprint('销售数据:')\nprint(df)\n\n# 1. 按产品类别分析\n# TODO: 计算每个产品类别的总销售额和总利润\n# product_analysis = df.groupby('产品类别').agg({'销售额': 'sum', '利润': 'sum'})\n# print('\n按产品类别分析:')\n# print(product_analysis)\n\n# 2. 按季度分析\n# TODO: 计算每个季度的总销售额和总利润\n# quarter_analysis = df.groupby('季度').agg({'销售额': 'sum', '利润': 'sum'})\n# print('\n按季度分析:')\n# print(quarter_analysis)\n\n# 3. 计算利润率\n# TODO: 计算每个产品类别的利润率\n# product_analysis['利润率'] = (product_analysis['利润'] / product_analysis['销售额'] * 100).round(2)\n# print('\n产品类别利润率:')\n# print(product_analysis)\n",
            answer: "# 商业数据分析练习\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '产品类别': ['电子产品', '服装', '家居用品', '食品', '电子产品', '服装', '家居用品', '食品'],\n    '季度': ['Q1', 'Q1', 'Q1', 'Q1', 'Q2', 'Q2', 'Q2', 'Q2'],\n    '销售额': [100000, 80000, 60000, 40000, 120000, 90000, 70000, 45000],\n    '利润': [20000, 16000, 12000, 8000, 24000, 18000, 14000, 9000]\n}\n\ndf = pd.DataFrame(data)\n\nprint('销售数据:')\nprint(df)\n\n# 1. 按产品类别分析\nproduct_analysis = df.groupby('产品类别').agg({'销售额': 'sum', '利润': 'sum'})\nprint('\n按产品类别分析:')\nprint(product_analysis)\n\n# 2. 按季度分析\nquarter_analysis = df.groupby('季度').agg({'销售额': 'sum', '利润': 'sum'})\nprint('\n按季度分析:')\nprint(quarter_analysis)\n\n# 3. 计算利润率\nproduct_analysis['利润率'] = (product_analysis['利润'] / product_analysis['销售额'] * 100).round(2)\nprint('\n产品类别利润率:')\nprint(product_analysis)\n\n# 4. 季度对比分析\nquarter_analysis['利润率'] = (quarter_analysis['利润'] / quarter_analysis['销售额'] * 100).round(2)\nprint('\n季度利润率:')\nprint(quarter_analysis)\n\n# 5. 整体分析\ntotal_sales = df['销售额'].sum()\ntotal_profit = df['利润'].sum()\noverall_profit_margin = (total_profit / total_sales * 100).round(2)\nprint('\n整体分析:')\nprint(f'总销售额: {total_sales}')\nprint(f'总利润: {total_profit}')\nprint(f'整体利润率: {overall_profit_margin}%')\n",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习1：商业数据分析概述",
            description: "回答关于商业数据分析的问题",
            difficulty: "简单",
            question: "1. 什么是商业数据分析？它的重要性是什么？\n\n2. 商业数据分析的基本流程是什么？\n\n3. 商业数据分析的主要工具和技术有哪些？",
            answer: "1. 商业数据分析是指使用数据分析技术和方法，从商业数据中提取有价值的信息，为业务决策提供支持的过程。它的重要性在于：\n   - 帮助企业了解业务现状\n   - 识别业务机会和风险\n   - 优化业务流程\n   - 提高决策质量\n   - 增强竞争力\n\n2. 商业数据分析的基本流程：\n   - 问题定义：明确分析目标和问题\n   - 数据收集：获取相关数据\n   - 数据清洗：处理数据质量问题\n   - 数据探索：了解数据特征\n   - 数据分析：应用分析方法\n   - 结果呈现：展示分析结果\n   - 决策支持：基于分析结果制定决策\n\n3. 商业数据分析的主要工具和技术：\n   - Excel：基础数据分析和可视化\n   - Python：强大的数据分析库（Pandas、NumPy等）\n   - SQL：数据库查询和分析\n   - 商业智能工具：Tableau、Power BI等\n   - 统计分析：描述性统计、推断统计等\n   - 数据挖掘：聚类、分类、关联分析等"
          }
        ];
      } else if (lessonId === '6') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习2：商业报告撰写",
            description: "学习如何生成商业分析报告",
            template: "# 商业报告撰写练习\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],\n    '销售额': [120000, 130000, 110000, 140000, 150000, 160000],\n    '客户数': [500, 520, 480, 550, 580, 600],\n    '客单价': [240, 250, 229, 255, 259, 267]\n}\n\ndf = pd.DataFrame(data)\n\nprint('销售数据:')\nprint(df)\n\n# 1. 计算关键指标\n# TODO: 计算总销售额、平均销售额、增长率\n# total_sales = df['销售额'].sum()\n# avg_sales = df['销售额'].mean()\n# growth_rate = ((df['销售额'].iloc[-1] - df['销售额'].iloc[0]) / df['销售额'].iloc[0] * 100).round(2)\n\n# 2. 生成报告\n# TODO: 生成简单的商业报告\nprint('\n商业分析报告')\nprint('=' * 50)\nprint('1. 执行摘要')\nprint('2. 数据概览')\nprint('3. 分析发现')\nprint('4. 结论与建议')\n",
            answer: "# 商业报告撰写练习\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],\n    '销售额': [120000, 130000, 110000, 140000, 150000, 160000],\n    '客户数': [500, 520, 480, 550, 580, 600],\n    '客单价': [240, 250, 229, 255, 259, 267]\n}\n\ndf = pd.DataFrame(data)\n\nprint('销售数据:')\nprint(df)\n\n# 1. 计算关键指标\ntotal_sales = df['销售额'].sum()\navg_sales = df['销售额'].mean()\ngrowth_rate = ((df['销售额'].iloc[-1] - df['销售额'].iloc[0]) / df['销售额'].iloc[0] * 100).round(2)\navg_customers = df['客户数'].mean()\navg_order_value = df['客单价'].mean()\n\n# 2. 生成报告\nprint('\n商业分析报告')\nprint('=' * 50)\nprint('1. 执行摘要')\nprint(f'- 半年总销售额: {total_sales}')\nprint(f'- 月平均销售额: {avg_sales:.2f}')\nprint(f'- 销售额增长率: {growth_rate}%')\nprint(f'- 月平均客户数: {avg_customers:.0f}')\nprint(f'- 平均客单价: {avg_order_value:.2f}')\n\nprint('\n2. 数据概览')\nprint(df)\n\nprint('\n3. 分析发现')\nprint('- 销售额呈上升趋势，从1月的12万增长到6月的16万')\nprint('- 客户数稳步增长，从500增长到600')\nprint('- 客单价持续提高，从240提高到267')\nprint('- 3月销售额有所下降，需要进一步分析原因')\n\nprint('\n4. 结论与建议')\nprint('结论:')\nprint('- 业务整体呈现良好增长态势')\nprint('- 客户获取和客单价提升策略有效')\n\nprint('建议:')\nprint('- 分析3月销售额下降的原因，避免类似情况再次发生')\nprint('- 继续优化客户获取策略，提高客户转化率')\nprint('- 探索提高客单价的方法，如交叉销售、 upselling等')\nprint('- 建立月度销售预测模型，提前规划库存和营销活动')\n",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习2：商业报告撰写",
            description: "回答关于商业报告撰写的问题",
            difficulty: "中等",
            question: "1. 商业报告的主要类型有哪些？\n\n2. 商业报告的基本结构是什么？\n\n3. 商业报告撰写的技巧有哪些？",
            answer: "1. 商业报告的主要类型包括：\n   - 日常报告：定期汇报业务进展\n   - 定期报告：月度、季度、年度报告\n   - 专题报告：针对特定问题的分析报告\n   - 战略报告：长期规划和战略分析\n\n2. 商业报告的基本结构：\n   - 标题和摘要：报告的核心内容和结论\n   - 背景和目标：分析的背景和目的\n   - 数据和方法：使用的数据和分析方法\n   - 分析结果：详细的分析发现\n   - 结论和建议：基于分析的结论和行动建议\n   - 附录：支持性材料和详细数据\n\n3. 商业报告撰写的技巧：\n   - 清晰的结构：逻辑清晰，层次分明\n   - 简洁的语言：使用专业但易懂的语言\n   - 有效的可视化：使用图表直观展示数据\n   - 有说服力的论证：基于数据和逻辑\n   - 专业的格式：统一的格式和风格\n   - 针对性：根据读者需求定制内容"
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
            type: "code",
            title: "练习1：数据可视化基础",
            description: "学习使用Matplotlib进行数据可视化",
            template: "# 数据可视化基础练习\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [100000, 120000, 110000, 130000, 140000, 160000, 150000, 170000, 180000, 200000, 190000, 210000]\nprofits = [20000, 24000, 22000, 26000, 28000, 32000, 30000, 34000, 36000, 40000, 38000, 42000]\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales, '利润': profits})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\nprint('销售数据:')\nprint(df)\n\n# 1. 创建销售额折线图\n# TODO: 创建折线图\n# plt.figure(figsize=(10, 6))\n# plt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\n# plt.title('2023年销售额趋势')\n# plt.xlabel('月份')\n# plt.ylabel('销售额')\n# plt.grid(True)\n# plt.tight_layout()\n# plt.show()\n\n# 2. 创建销售额和利润的双轴图\n# TODO: 创建双轴图\n",
            answer: "# 数据可视化基础练习\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [100000, 120000, 110000, 130000, 140000, 160000, 150000, 170000, 180000, 200000, 190000, 210000]\nprofits = [20000, 24000, 22000, 26000, 28000, 32000, 30000, 34000, 36000, 40000, 38000, 42000]\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales, '利润': profits})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\nprint('销售数据:')\nprint(df)\n\n# 1. 创建销售额折线图\nplt.figure(figsize=(10, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2023年销售额趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\nprint('销售额趋势图已创建')\n\n# 2. 创建销售额和利润的双轴图\nfig, ax1 = plt.subplots(figsize=(10, 6))\n\n# 销售额轴\nax1.set_xlabel('月份')\nax1.set_ylabel('销售额', color='b')\nax1.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nax1.tick_params(axis='y', labelcolor='b')\n\n# 利润轴\nax2 = ax1.twinx()\nax2.set_ylabel('利润', color='r')\nax2.plot(df['日期'], df['利润'], marker='s', linestyle='--', color='r')\nax2.tick_params(axis='y', labelcolor='r')\n\nplt.title('2023年销售额和利润趋势')\nplt.grid(True)\nplt.tight_layout()\nprint('销售额和利润双轴图已创建')\n\n# 3. 计算利润率\ndf['利润率'] = (df['利润'] / df['销售额'] * 100).round(2)\nprint('\n利润率数据:')\nprint(df[['日期', '利润率']])\n\n# 4. 创建利润率柱状图\nplt.figure(figsize=(10, 6))\nplt.bar(df['日期'], df['利润率'], color='green')\nplt.title('2023年利润率')\nplt.xlabel('月份')\nplt.ylabel('利润率 (%)')\nplt.grid(axis='y')\nplt.tight_layout()\nprint('利润率柱状图已创建')\n",
            difficulty: "简单"
          },
          {
            id: 2,
            type: "text",
            title: "练习1：数据可视化基础",
            description: "回答关于数据可视化的问题",
            difficulty: "简单",
            question: "1. 数据可视化的基本原则有哪些？\n\n2. 常见的图表类型有哪些？请至少列举5种。\n\n3. 如何选择合适的图表类型？",
            answer: "1. 数据可视化的基本原则包括：\n   - 准确性：正确反映数据\n   - 清晰性：易于理解\n   - 简洁性：避免不必要的元素\n   - 美观性：视觉吸引力\n   - 有效性：有效传达信息\n\n2. 常见的图表类型包括：\n   - 折线图：展示趋势变化\n   - 柱状图：比较不同类别的数据\n   - 饼图：展示构成比例\n   - 散点图：展示两个变量的关系\n   - 热力图：展示数据密度\n   - 箱线图：展示数据分布\n   - 雷达图：展示多维度数据\n\n3. 选择合适图表类型的考虑因素：\n   - 数据类型：数值型、分类型、时间序列等\n   - 分析目的：比较、趋势、分布、关系等\n   - 数据量：数据点的多少\n   - 受众：技术背景和需求\n   - 展示媒介：屏幕、纸张等"

          }
        ];
      } else if (lessonId === '6') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习2：简单预测模型",
            description: "学习使用移动平均法进行简单预测",
            template: "# 简单预测模型练习\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [100000, 120000, 110000, 130000, 140000, 160000, 150000, 170000, 180000, 200000, 190000, 210000]\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\nprint('销售数据:')\nprint(df)\n\n# 1. 移动平均法预测\n# TODO: 计算3期和5期移动平均\n# df['3期移动平均'] = df['销售额'].rolling(window=3).mean()\n# df['5期移动平均'] = df['销售额'].rolling(window=5).mean()\n\n# 2. 预测下一期销售额\n# TODO: 计算预测值\n\n# 3. 评估预测效果\n# TODO: 计算预测误差\n",
            answer: "# 简单预测模型练习\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [100000, 120000, 110000, 130000, 140000, 160000, 150000, 170000, 180000, 200000, 190000, 210000]\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\nprint('销售数据:')\nprint(df)\n\n# 1. 移动平均法预测\ndf['3期移动平均'] = df['销售额'].rolling(window=3).mean()\ndf['5期移动平均'] = df['销售额'].rolling(window=5).mean()\n\nprint('\n移动平均预测:')\nprint(df)\n\n# 2. 预测下一期销售额\nlast_3_sales = df['销售额'].tail(3)\nnext_month_prediction_3 = last_3_sales.mean()\n\nlast_5_sales = df['销售额'].tail(5)\nnext_month_prediction_5 = last_5_sales.mean()\n\nprint('\n预测结果:')\nprint(f'基于3期移动平均的2024年1月销售额预测: {next_month_prediction_3:.2f}')\nprint(f'基于5期移动平均的2024年1月销售额预测: {next_month_prediction_5:.2f}')\n\n# 3. 评估预测效果（使用历史数据进行回测）\ndf['3期移动平均预测'] = df['3期移动平均'].shift(1)\ndf['5期移动平均预测'] = df['5期移动平均'].shift(1)\n\n# 计算预测误差\ndf['3期误差'] = df['销售额'] - df['3期移动平均预测']\ndf['5期误差'] = df['销售额'] - df['5期移动平均预测']\ndf['3期绝对误差'] = abs(df['3期误差'])\ndf['5期绝对误差'] = abs(df['5期误差'])\n\n# 计算平均绝对误差 (MAE)\nmae_3 = df['3期绝对误差'].mean()\nmae_5 = df['5期绝对误差'].mean()\n\nprint('\n预测效果评估:')\nprint(f'3期移动平均的MAE: {mae_3:.2f}')\nprint(f'5期移动平均的MAE: {mae_5:.2f}')\n\n# 4. 可视化预测结果\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', label='实际销售额')\nplt.plot(df['日期'], df['3期移动平均'], marker='s', linestyle='--', label='3期移动平均')\nplt.plot(df['日期'], df['5期移动平均'], marker='^', linestyle='--', label='5期移动平均')\nplt.title('销售额与移动平均预测')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.legend()\nplt.grid(True)\nplt.tight_layout()\nprint('预测结果可视化已创建')\n",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习2：简单预测模型",
            description: "回答关于简单预测模型的问题",
            difficulty: "中等",
            question: "1. 常见的简单预测方法有哪些？\n\n2. 移动平均法的基本原理是什么？\n\n3. 如何评估预测模型的性能？",
            answer: "1. 常见的简单预测方法包括：\n   - 移动平均法：使用历史数据的平均值\n   - 指数平滑法：对历史数据赋予不同权重\n   - 线性趋势法：基于线性回归\n   - 季节性预测法：考虑季节性因素\n   - 因果预测法：基于因果关系\n\n2. 移动平均法的基本原理：\n   - 计算最近n个时期数据的平均值作为下一期的预测值\n   - 随着时间推移，不断更新平均值，去掉最早的数据点，加入最新的数据点\n   - 适用于稳定的时间序列数据，无明显趋势和季节性\n\n3. 评估预测模型性能的指标：\n   - 均方误差 (MSE)：预测值与实际值差的平方的平均值\n   - 均方根误差 (RMSE)：MSE的平方根\n   - 平均绝对误差 (MAE)：预测值与实际值差的绝对值的平均值\n   - 平均绝对百分比误差 (MAPE)：MAE与实际值的比值\n   - R²值：模型解释数据变异的比例"
          }
        ];
      }
    }
    
    // 课程7: Pandas高级应用
    if (id === '7') {
      if (lessonId === '1') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习1：Pandas高级索引",
            description: "学习Pandas的高级索引技术",
            template: "# Pandas高级索引练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    'year': [2020, 2020, 2021, 2021, 2022, 2022],\n    'quarter': [1, 2, 1, 2, 1, 2],\n    'sales': [100, 150, 200, 250, 300, 350],\n    'profit': [20, 30, 40, 50, 60, 70]\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 创建多级索引\n# TODO: 使用set_index创建多级索引\n# df_multi = df.set_index(['year', 'quarter'])\n\nprint('原始数据:')\nprint(df)\n\n# 2. 多级索引的访问\n# TODO: 访问2021年的数据\n# print('\n2021年数据:')\n# print(df_multi.loc[2021])\n\n# 3. 布尔索引\n# TODO: 选择销售额大于200的数据\n# print('\n销售额大于200的数据:')\n# print(df[df['sales'] > 200])\n\n# 4. 索引排序\n# TODO: 按销售额降序排序\n# df_sorted = df.sort_values('sales', ascending=False)\n# print('\n按销售额降序排序:')\n# print(df_sorted)\n",
            answer: "# Pandas高级索引练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    'year': [2020, 2020, 2021, 2021, 2022, 2022],\n    'quarter': [1, 2, 1, 2, 1, 2],\n    'sales': [100, 150, 200, 250, 300, 350],\n    'profit': [20, 30, 40, 50, 60, 70]\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 创建多级索引\ndf_multi = df.set_index(['year', 'quarter'])\n\nprint('原始数据:')\nprint(df)\n\n# 2. 多级索引的访问\nprint('\n2021年数据:')\nprint(df_multi.loc[2021])\n\n# 3. 布尔索引\nprint('\n销售额大于200的数据:')\nprint(df[df['sales'] > 200])\n\n# 4. 索引排序\ndf_sorted = df.sort_values('sales', ascending=False)\nprint('\n按销售额降序排序:')\nprint(df_sorted)\n\n# 5. 重置索引\nprint('\n重置索引:')\nprint(df_multi.reset_index())\n",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习1：Pandas高级索引",
            description: "回答关于Pandas高级索引的问题",
            difficulty: "中等",
            question: "1. Pandas中的索引类型有哪些？\n\n2. 什么是多级索引？它的作用是什么？\n\n3. 如何优化Pandas索引的性能？",
            answer: "1. Pandas中的索引类型包括：\n   - 整数索引：使用整数作为索引\n   - 标签索引：使用标签作为索引\n   - 布尔索引：使用布尔值作为索引\n   - 多级索引：使用多个级别作为索引\n\n2. 多级索引是指在Pandas中使用多个级别来组织数据的索引结构。它的作用是：\n   - 处理层次化数据\n   - 支持更复杂的数据查询\n   - 方便数据的分组和聚合\n   - 提高数据的可读性\n\n3. 优化Pandas索引性能的方法：\n   - 选择合适的索引类型\n   - 对索引进行排序\n   - 合理使用多级索引\n   - 避免链式索引操作\n   - 利用索引进行快速查询"
          }
        ];
      } else if (lessonId === '2') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习2：数据转换与重塑",
            description: "学习Pandas的数据转换和重塑技术",
            template: "# 数据转换与重塑练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    'product': ['A', 'A', 'B', 'B', 'C', 'C'],\n    'year': [2021, 2022, 2021, 2022, 2021, 2022],\n    'sales': [100, 150, 200, 250, 300, 350],\n    'profit': [20, 30, 40, 50, 60, 70]\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# 1. 数据透视\n# TODO: 使用pivot将数据转换为宽格式\n# df_pivot = df.pivot(index='product', columns='year', values='sales')\n# print('\\n透视后的数据:')\n# print(df_pivot)\n\nprint('数据转换练习完成')\n",
            answer: "# 数据转换与重塑练习\nimport pandas as pd\nimport numpy as np\n\nprint('数据转换练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习2：数据转换与重塑",
            description: "回答关于数据转换与重塑的问题",
            difficulty: "中等",
            question: "1. 什么是数据透视（pivot）？它的作用是什么？\n\n2. melt()函数和pivot()函数有什么区别？",
            answer: "1. 数据透视（pivot）是将长格式数据转换为宽格式数据的操作。作用：将行数据转换为列数据，便于数据的横向比较。\n\n2. melt()和pivot()的区别：pivot()是长格式→宽格式，melt()是宽格式→长格式。"
          }
        ];
      } else if (lessonId === '3') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习3：分组与聚合操作",
            description: "学习Pandas的高级分组和聚合操作",
            template: "# 分组与聚合操作练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    'category': ['电子', '服装', '电子', '服装', '食品'],\n    'sales': [100, 200, 150, 250, 300]\n}\n\ndf = pd.DataFrame(data)\n\nprint('原始数据:')\nprint(df)\n\n# 1. 基本分组\n# TODO: 按类别分组，计算销售额的总和\n# category_group = df.groupby('category')['sales'].sum()\n# print('\\n按类别分组的销售统计:')\n# print(category_group)\n\nprint('分组操作练习完成')\n",
            answer: "# 分组与聚合操作练习\nimport pandas as pd\nimport numpy as np\n\nprint('分组操作练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习3：分组与聚合操作",
            description: "回答关于分组与聚合操作的问题",
            difficulty: "中等",
            question: "1. groupby()函数的工作原理是什么？\n\n2. 请列举2种常用的聚合函数。",
            answer: "1. groupby()的工作原理：拆分（Split）- 应用（Apply）- 合并（Combine）。\n\n2. 常用的聚合函数：sum()求和，mean()平均值，count()计数。"
          }
        ];
      } else if (lessonId === '4') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习4：时间序列分析",
            description: "学习Pandas的时间序列处理功能",
            template: "# 时间序列分析练习\nimport pandas as pd\nimport numpy as np\n\n# 创建时间序列数据\ndates = pd.date_range('2023-01-01', periods=30)\ndata = {'date': dates, 'sales': np.random.randint(1000, 5000, 30)}\n\ndf = pd.DataFrame(data)\ndf.set_index('date', inplace=True)\n\nprint('时间序列数据前5行:')\nprint(df.head())\n\nprint('时间序列练习完成')\n",
            answer: "# 时间序列分析练习\nimport pandas as pd\nimport numpy as np\n\nprint('时间序列练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习4：时间序列分析",
            description: "回答关于时间序列分析的问题",
            difficulty: "中等",
            question: "1. Pandas中处理时间序列的主要数据结构是什么？\n\n2. 什么是重采样（resample）？",
            answer: "1. Pandas中处理时间序列的主要数据结构是DatetimeIndex。\n\n2. 重采样（resample）是将时间序列从一个频率转换到另一个频率的过程。"
          }
        ];
      } else if (lessonId === '5') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习5：数据合并与连接",
            description: "学习Pandas的数据合并和连接操作",
            template: "# 数据合并与连接练习\nimport pandas as pd\n\n# 创建示例数据\ncustomers = pd.DataFrame({'customer_id': [1, 2, 3], 'name': ['张三', '李四', '王五']})\norders = pd.DataFrame({'order_id': [101, 102], 'customer_id': [1, 2], 'amount': [3000, 5000]})\n\nprint('客户数据:')\nprint(customers)\nprint('\\n订单数据:')\nprint(orders)\n\nprint('数据合并练习完成')\n",
            answer: "# 数据合并与连接练习\nimport pandas as pd\n\nprint('数据合并练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习5：数据合并与连接",
            description: "回答关于数据合并与连接的问题",
            difficulty: "中等",
            question: "1. merge()和concat()的区别是什么？\n\n2. 请解释内连接的含义。",
            answer: "1. merge()：基于列或索引进行数据库风格的连接；concat()：沿轴方向拼接数据。\n\n2. 内连接（inner）：只保留两个表中都存在的键。"
          }
        ];
      } else if (lessonId === '6') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习6：数据可视化与Pandas",
            description: "学习使用Pandas进行数据可视化",
            template: "# 数据可视化与Pandas练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {'month': ['1月', '2月', '3月'], 'sales': [1000, 2000, 1500]}\n\ndf = pd.DataFrame(data)\n\nprint('销售数据:')\nprint(df)\n\nprint('数据可视化练习完成')\n",
            answer: "# 数据可视化与Pandas练习\nimport pandas as pd\nimport numpy as np\n\nprint('数据可视化练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习6：数据可视化与Pandas",
            description: "回答关于数据可视化的问题",
            difficulty: "中等",
            question: "1. Pandas支持哪些常用的图表类型？\n\n2. 什么时候应该使用折线图？",
            answer: "1. Pandas支持的常用图表类型：line（折线图）、bar（柱状图）、scatter（散点图）等。\n\n2. 折线图用于展示时间序列数据的趋势变化。"
          }
        ];
      } else if (lessonId === '7') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习7：大数据处理",
            description: "学习使用Pandas处理大数据",
            template: "# 大数据处理练习\nimport pandas as pd\nimport numpy as np\n\nprint('大数据处理示例')\nprint('数据创建完成')\n",
            answer: "# 大数据处理练习\nimport pandas as pd\nimport numpy as np\n\nprint('大数据处理练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习7：大数据处理",
            description: "回答关于Pandas大数据处理的问题",
            difficulty: "中等",
            question: "1. 处理大数据时，Pandas面临的主要挑战是什么？\n\n2. 内存优化的方法有哪些？",
            answer: "1. Pandas处理大数据时面临的主要挑战：内存限制、计算速度、I/O瓶颈。\n\n2. 内存优化的方法：数据类型优化、内存使用监控、数据压缩。"
          }
        ];
      } else if (lessonId === '8') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习8：Pandas性能优化",
            description: "学习优化Pandas代码性能",
            template: "# Pandas性能优化练习\nimport pandas as pd\nimport numpy as np\n\nprint('性能优化示例')\nprint('数据加载完成')\n",
            answer: "# Pandas性能优化练习\nimport pandas as pd\nimport numpy as np\n\nprint('性能优化练习完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习8：Pandas性能优化",
            description: "回答关于Pandas性能优化的问题",
            difficulty: "中等",
            question: "1. 为什么向量化操作比循环更快？\n\n2. 请列举2种Pandas性能优化技巧。",
            answer: "1. 向量化操作比循环更快的原因：在底层使用优化的C代码执行，避免了Python级别的循环开销。\n\n2. Pandas性能优化技巧：使用向量化操作、使用at/iat进行标量访问。"
          }
        ];
      } else if (lessonId === '9') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习9：综合案例分析",
            description: "使用Pandas进行完整的数据分析案例",
            template: "# Pandas综合案例分析\nimport pandas as pd\nimport numpy as np\n\nprint('综合案例分析')\nprint('数据加载完成')\n",
            answer: "# Pandas综合案例分析\nimport pandas as pd\nimport numpy as np\n\nprint('综合案例分析完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习9：综合案例分析",
            description: "回答关于数据分析案例的问题",
            difficulty: "中等",
            question: "1. 一个完整的数据分析流程包括哪些步骤？\n\n2. 在进行业务数据分析时，应该关注哪些关键指标？",
            answer: "1. 完整的数据分析流程：问题定义、数据收集、数据清洗、数据探索、数据分析、结果解释、报告呈现。\n\n2. 业务数据分析的关键指标：销售额、销量、客单价、复购率等。"
          }
        ];
      } else if (lessonId === '10') {
        return [
          {
            id: 1,
            type: "code",
            title: "练习10：项目实战",
            description: "完成一个完整的Pandas数据分析项目",
            template: "# Pandas项目实战：电商数据分析\nimport pandas as pd\nimport numpy as np\n\nprint('项目实战')\nprint('数据准备完成')\n",
            answer: "# Pandas项目实战：电商数据分析\nimport pandas as pd\nimport numpy as np\n\nprint('项目实战完成!')",
            difficulty: "中等"
          },
          {
            id: 2,
            type: "text",
            title: "练习10：项目实战",
            description: "回答关于项目实战的问题",
            difficulty: "中等",
            question: "1. 数据项目成功的关键因素是什么？\n\n2. 如何编写高质量的数据分析代码？",
            answer: "1. 数据项目成功的关键因素：明确的业务目标、数据质量、合适的方法、有效的沟通。\n\n2. 高质量数据分析代码的特点：可读性、可重复性、模块化、错误处理。"
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
      // 只在第一次加载时设置代码，避免后续重置
      if (code === '' && (currentQuestion as any).template) {
        setCode((currentQuestion as any).template);
      }
      // 延迟聚焦，确保DOM已更新
      setTimeout(() => {
        codeEditorRef.current?.focus();
      }, 100);
    }
  }, [currentQuestion, code]);

  // 组件挂载时聚焦
  useEffect(() => {
    setTimeout(() => {
      codeEditorRef.current?.focus();
    }, 300);
  }, []);

  // 运行代码
  const runCode = async () => {
    if (!code) return;

    console.log('Running code:', code);
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
      setShowTextAnswer(false);
    }
  };

  // 上一题
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setOutput('');
      setShowAnswer(false);
      setShowTextAnswer(false);
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <div className="flex items-center mb-8">
          <Link to={`/courses/${id}`} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-md">
            <ChevronLeft className="h-6 w-6 mr-2" />
            返回课程大纲
          </Link>
          <span className="mx-3 text-gray-400">/</span>
          <span className="text-gray-700 font-medium">{currentLesson.title}</span>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>
          <div className="text-gray-600 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">教学内容</h2>
            <div className="prose max-w-none">
              {currentLesson.content.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>
          {currentLesson.pitfalls && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">难点</h2>
              <div className="prose max-w-none text-blue-800 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                {currentLesson.pitfalls.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 课程大纲总结 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">课程大纲总结</h2>
          <div className="space-y-4">
            {(() => {
              const lines = currentLesson.content.split('\n');
              const sections = [];
              let currentSection = null;
              
              lines.forEach((line, lineIndex) => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('1. ') || trimmedLine.startsWith('2. ') || trimmedLine.startsWith('3. ') || trimmedLine.startsWith('4. ') || trimmedLine.startsWith('5. ')) {
                  if (currentSection) {
                    sections.push(currentSection);
                  }
                  currentSection = {
                    title: trimmedLine,
                    points: []
                  };
                } else if (trimmedLine.startsWith('   - ') && currentSection) {
                  currentSection.points.push(trimmedLine.substring(4));
                } else if (trimmedLine.length > 0 && currentSection) {
                  currentSection.points.push(trimmedLine);
                }
              });
              
              if (currentSection) {
                sections.push(currentSection);
              }
              
              return sections.map((section, sectionIndex) => {
                const question = section.title.replace(/:$/, '');
                const summary = section.points.length > 0 
                  ? section.points.join('、')
                  : '本部分内容需要重点掌握';
                
                return (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-medium text-gray-800 mb-2">{question}</div>
                    <div className="text-gray-600 bg-gray-50 p-3 rounded-md">
                      <strong>答案：</strong>{summary}
                    </div>
                  </div>
                );
              });
            })()}
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

                {/* 根据练习类型显示不同的界面 */}
                {currentQuestion.type === 'text' ? (
                  /* 文字习题 */
                  <div className="mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-4">
                      <div className="prose max-w-none">
                        {currentQuestion.question.split('\n').map((line: string, index: number) => (
                          <p key={index} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTextAnswer(!showTextAnswer)}
                      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      {showTextAnswer ? '隐藏答案' : '显示答案'}
                    </button>
                    {showTextAnswer && (
                      <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                        <div className="prose max-w-none text-green-800">
                          {currentQuestion.answer.split('\n').map((line: string, index: number) => (
                            <p key={index} className="mb-2">{line}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 代码练习 */
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* 代码编辑器 */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Code className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Python 编辑器</span>
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
                            {showAnswer ? '隐藏答案' : '答案'}
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-300 rounded-md">
                        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600">Python 3</span>
                            <button
                              onClick={runCode}
                              disabled={isRunning}
                              className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition-colors"
                            >
                              {isRunning ? (
                                <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                  运行中...
                                </>
                              ) : (
                                <>
                                  <Play className="h-3 w-3 mr-1" />
                                  运行
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <textarea
                          ref={codeEditorRef}
                          value={code}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            console.log('Input changed to:', newValue);
                            setCode(newValue);
                          }}
                          className="w-full p-4 text-gray-800 font-mono text-sm min-h-[300px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                          spellCheck={false}
                          autoFocus
                        />
                      </div>
                    </div>
                    
                    {/* 运行结果 */}
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">运行结果</span>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 min-h-[300px] font-mono text-sm overflow-auto">
                        {output || 'Python环境已就绪！开始编写代码吧。'}
                      </div>
                    </div>
                  </div>
                )}

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