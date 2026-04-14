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
            title: "练习1：项目展示与总结",
            description: "展示项目成果并总结学习内容",
            template: "# 项目展示与总结\n\n# 项目主题：电商销售数据分析\nprint('项目展示与总结:')\nprint('1. 项目背景')\nprint('2. 数据来源')\nprint('3. 分析方法')\n\n# TODO: 总结项目成果和学习收获\nprint('\n项目成果:')\nprint('\n学习收获:')\n",
            answer: "# 项目展示与总结\n\n# 项目主题：电商销售数据分析\nprint('项目展示与总结:')\nprint('1. 项目背景: 通过对电商销售数据的分析，了解销售趋势和客户行为，为业务决策提供数据支持')\nprint('2. 数据来源: 模拟的电商销售数据，包含订单ID、日期、产品类别、销售额、客户年龄和地区等信息')\nprint('3. 分析方法: 使用Pandas进行数据处理和分析，使用Matplotlib进行数据可视化')\n\n# 总结项目成果和学习收获\nprint('\n项目成果:')\nprint('- 分析了不同产品类别的销售情况，发现电子产品销售额最高')\nprint('- 分析了不同地区的销售表现，发现北京地区销售额领先')\nprint('- 分析了不同年龄组的消费行为，发现31-40岁年龄组消费能力最强')\nprint('- 识别了销售趋势和季节性模式')\n\nprint('\n学习收获:')\nprint('- 掌握了Python数据分析的基本流程和方法')\nprint('- 学习了使用Pandas进行数据处理和分析')\nprint('- 学习了使用Matplotlib进行数据可视化')\nprint('- 培养了数据分析思维和问题解决能力')\nprint('- 学会了如何将分析结果转化为业务 insights')",
            difficulty: "简单"
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
            answer: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n\n# 计算日均销售额\nprint('\n日均销售额:', df['销售额'].mean())\nprint('日均客户数:', df['客户数'].mean())",
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
            answer: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\npromotion_sales = df.groupby('促销活动')['销售额'].mean()\nprint(promotion_sales.round(2))\n\n# 2. 查看不同促销活动的平均客流量\nprint('\n不同促销活动的平均客流量:')\npromotion_customers = df.groupby('促销活动')['客流量'].mean()\nprint(promotion_customers.round(2))",
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
            answer: "# 创建销售趋势图\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [12000, 13500, 11800, 14200, 15600, 14800, 16200, 17500, 16800, 18200, 19500, 21000]\n\n# 创建DataFrame\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 折线图\nplt.figure(figsize=(10, 6))\nplt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2023年销售趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\n\nprint('销售趋势图已创建')\nprint('月度销售额数据:')\nprint(df)",
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
            answer: "# 商业数据可视化与预测案例：销售趋势可视化\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, 7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 1. 创建销售趋势折线图\nprint('销售趋势分析:')\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2022-2023年销售趋势')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\nprint('销售趋势图已创建')",
            difficulty: "中等",
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
      if (code === '') {
        setCode(currentQuestion.template);
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">易错点</h2>
              <div className="prose max-w-none text-amber-800 bg-amber-50 p-4 rounded-md border-l-4 border-amber-500">
                {currentLesson.pitfalls.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
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

                {/* 代码编辑器和运行结果并排布局 */}
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