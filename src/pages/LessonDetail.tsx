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

  // 根据课程和课时生成练习题目
  const getPracticeQuestions = React.useCallback(() => {
    // 课程1: Python基础与数据科学入门
    if (id === '1') {
      if (lessonId === '1') {
        // Python环境搭建练习
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
        // Python基础语法练习
        return [
          {
            id: 1,
            title: "练习1：变量和数据类型",
            description: "创建不同类型的变量并打印它们",
            template: "# 变量和数据类型\n\n# 创建变量\nname = '数据分析'\nage = 3\nis_active = True\n\n# 打印变量\nprint('名称:', name)\nprint('年龄:', age)\nprint('是否活跃:', is_active)\n\n# TODO: 计算并打印类型\n# 提示：使用type()函数获取变量类型\n\n# 示例：\n# print('\n类型:')\n# print('name的类型:', type(name))\n# print('age的类型:', type(age))\n# print('is_active的类型:', type(is_active))",
            answer: "# 变量和数据类型\n\n# 创建变量\nname = '数据分析'\nage = 3\nis_active = True\n\n# 打印变量\nprint('名称:', name)\nprint('年龄:', age)\nprint('是否活跃:', is_active)\n\n# 计算并打印类型\nprint('\n类型:')\nprint('name的类型:', type(name))\nprint('age的类型:', type(age))\nprint('is_active的类型:', type(is_active))",
            difficulty: "简单"
          },
          {
            id: 2,
            title: "练习2：列表操作",
            description: "创建销售数据列表并进行基本操作",
            template: "# 列表操作\n\n# 创建销售数据列表\ndaily_sales = [1000, 1200, 900, 1500, 1300]\n\n# 打印列表\nprint('日销售额:', daily_sales)\n\n# 计算总销售额\ntotal = sum(daily_sales)\nprint('总销售额:', total)\n\n# 计算平均值\naverage = total / len(daily_sales)\nprint('平均销售额:', average)\n\n# 添加新数据\ndaily_sales.append(1400)\nprint('添加后:', daily_sales)\n\n# 排序\nsorted_sales = sorted(daily_sales)\nprint('排序后:', sorted_sales)",
            answer: "# 列表操作\n\n# 创建销售数据列表\ndaily_sales = [1000, 1200, 900, 1500, 1300]\n\n# 打印列表\nprint('日销售额:', daily_sales)\n\n# 计算总销售额\ntotal = sum(daily_sales)\nprint('总销售额:', total)\n\n# 计算平均值\naverage = total / len(daily_sales)\nprint('平均销售额:', average)\n\n# 添加新数据\ndaily_sales.append(1400)\nprint('添加后:', daily_sales)\n\n# 排序\nsorted_sales = sorted(daily_sales)\nprint('排序后:', sorted_sales)\n\n# 计算最大值和最小值\nprint('最大值:', max(daily_sales))\nprint('最小值:', min(daily_sales))",
            difficulty: "中等"
          },
          {
            id: 3,
            title: "练习3：字典操作",
            description: "创建销售数据字典并进行操作",
            template: "# 字典操作\n\n# 创建销售数据字典\nsales_data = {\n    '日期': ['2023-01-01', '2023-01-02', '2023-01-03'],\n    '销售额': [1000, 1200, 900]\n}\n\n# 打印字典\nprint('销售数据:', sales_data)\n\n# 访问特定键的值\nprint('日期:', sales_data['日期'])\nprint('销售额:', sales_data['销售额'])\n\n# 添加新键值对\nsales_data['客户数'] = [20, 25, 18]\nprint('添加客户数后:', sales_data)\n\n# 遍历字典\nprint('\n遍历字典:')\nfor key, value in sales_data.items():\n    print(f'{key}: {value}')",
            answer: "# 字典操作\n\n# 创建销售数据字典\nsales_data = {\n    '日期': ['2023-01-01', '2023-01-02', '2023-01-03'],\n    '销售额': [1000, 1200, 900]\n}\n\n# 打印字典\nprint('销售数据:', sales_data)\n\n# 访问特定键的值\nprint('日期:', sales_data['日期'])\nprint('销售额:', sales_data['销售额'])\n\n# 添加新键值对\nsales_data['客户数'] = [20, 25, 18]\nprint('添加客户数后:', sales_data)\n\n# 遍历字典\nprint('\n遍历字典:')\nfor key, value in sales_data.items():\n    print(f'{key}: {value}')\n\n# 计算日均销售额\naverage_sales = sum(sales_data['销售额']) / len(sales_data['销售额'])\nprint('\n日均销售额:', average_sales)\n\n# 计算日均客户数\naverage_customers = sum(sales_data['客户数']) / len(sales_data['客户数'])\nprint('日均客户数:', average_customers)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '7') {
        // 商业数据分析案例练习
        return [
          {
            id: 1,
            title: "练习1：数据概览和基本统计",
            description: "创建电商销售数据并进行基本统计分析",
            template: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看数据前5行\nprint('数据前5行:')\n\n# TODO: 2. 查看数据基本统计信息\nprint('\\n数据基本统计:')\n\n# TODO: 3. 计算总销售额和平均订单金额\nprint('\\n总销售额:')\nprint('平均订单金额:')\n",
            answer: "# 商业数据分析案例：数据概览和基本统计\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看数据前5行\nprint('数据前5行:')\nprint(df.head())\n\n# 2. 查看数据基本统计信息\nprint('\\n数据基本统计:')\nprint(df.describe())\n\n# 3. 计算总销售额和平均订单金额\nprint('\\n总销售额:', df['销售额'].sum())\nprint('平均订单金额:', df['销售额'].mean().round(2))\n\n# 4. 查看数据类型\nprint('\\n数据类型:')\nprint(df.dtypes)\n",
            difficulty: "中等"
          },
          {
            id: 2,
            title: "练习2：按产品类别分析",
            description: "分析不同产品类别的销售情况",
            template: "# 商业数据分析案例：按产品类别分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 按产品类别计算总销售额\nprint('按产品类别销售分析:')\n\n# TODO: 2. 计算每个产品类别的订单数量\nprint('\\n各产品类别订单数量:')\n\n# TODO: 3. 找出销售额最高的产品类别\nprint('\\n销售额最高的产品类别:')\n",
            answer: "# 商业数据分析案例：按产品类别分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 51),\n    '日期': pd.date_range('2023-01-01', periods=50),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 50),\n    '销售额': np.random.randint(100, 1000, 50),\n    '客户年龄': np.random.randint(18, 65, 50)\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 按产品类别计算总销售额\nprint('按产品类别销售分析:')\ncategory_sales = df.groupby('产品类别')['销售额'].sum()\nprint(category_sales)\n\n# 2. 计算每个产品类别的订单数量\nprint('\\n各产品类别订单数量:')\ncategory_orders = df.groupby('产品类别')['订单ID'].count()\nprint(category_orders)\n\n# 3. 找出销售额最高的产品类别\nprint('\\n销售额最高的产品类别:', category_sales.idxmax())\nprint('销售额:', category_sales.max())\n\n# 4. 计算每个产品类别的平均订单金额\nprint('\\n各产品类别平均订单金额:')\navg_order_value = df.groupby('产品类别')['销售额'].mean()\nprint(avg_order_value.round(2))\n",
            difficulty: "中等"
          },
          {
            id: 3,
            title: "练习3：客户年龄分布分析",
            description: "分析客户年龄分布和不同年龄段的消费特点",
            template: "# 商业数据分析案例：客户年龄分布分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 101),\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 100),\n    '销售额': np.random.randint(100, 1000, 100),\n    '客户年龄': np.random.randint(18, 65, 100)\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看客户年龄的基本统计\nprint('客户年龄基本统计:')\n\n# TODO: 2. 定义年龄段并统计各年龄段人数\n# 年龄段：18-25, 26-35, 36-45, 46-55, 56+\nprint('\\n各年龄段人数:')\n\n# TODO: 3. 计算不同年龄段的平均消费\nprint('\\n各年龄段平均消费:')\n",
            answer: "# 商业数据分析案例：客户年龄分布分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟电商销售数据\ndata = {\n    '订单ID': range(1, 101),\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 100),\n    '销售额': np.random.randint(100, 1000, 100),\n    '客户年龄': np.random.randint(18, 65, 100)\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看客户年龄的基本统计\nprint('客户年龄基本统计:')\nprint(df['客户年龄'].describe())\n\n# 2. 定义年龄段并统计各年龄段人数\n# 年龄段：18-25, 26-35, 36-45, 46-55, 56+\nbins = [18, 26, 36, 46, 56, 66]\nlabels = ['18-25', '26-35', '36-45', '46-55', '56+']\ndf['年龄段'] = pd.cut(df['客户年龄'], bins=bins, labels=labels, right=False)\n\nprint('\\n各年龄段人数:')\nage_group_counts = df['年龄段'].value_counts().sort_index()\nprint(age_group_counts)\n\n# 3. 计算不同年龄段的平均消费\nprint('\\n各年龄段平均消费:')\nage_group_sales = df.groupby('年龄段')['销售额'].mean()\nprint(age_group_sales.round(2))\n\n# 4. 计算不同年龄段的总消费\nprint('\\n各年龄段总消费:')\nage_group_total = df.groupby('年龄段')['销售额'].sum()\nprint(age_group_total)\n\n# 5. 找出消费最高的年龄段\nprint('\\n消费最高的年龄段:', age_group_total.idxmax())\nprint('总消费:', age_group_total.max())\n",
            difficulty: "高级"
          }
        ];
      }
    }
    
    // 课程8: 商业数据分析
    if (id === '8') {
      if (lessonId === '1') {
        // 商业数据分析概述练习
        return [
          {
            id: 1,
            title: "练习1：基本统计分析",
            description: "对销售数据进行基本统计分析",
            template: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n\n# 计算日均销售额\nprint('\n日均销售额:')\nprint(df['销售额'].mean())\nprint('日均客户数:')\nprint(df['客户数'].mean())",
            answer: "# 基本统计分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=30),\n    '销售额': np.random.randint(800, 1500, 30),\n    '客户数': np.random.randint(20, 50, 30),\n    '产品类别': np.random.choice(['A', 'B', 'C'], 30)\n}\n\ndf = pd.DataFrame(data)\n\n# 基本统计分析\nprint('销售数据基本统计:')\nprint(df.describe())\n\n# 按产品类别分析\nprint('\n按产品类别销售分析:')\nprint(df.groupby('产品类别')['销售额'].sum())\n\n# 计算日均销售额\nprint('\n日均销售额:', df['销售额'].mean())\nprint('日均客户数:', df['客户数'].mean())\n\n# 计算客单价\ndf['客单价'] = df['销售额'] / df['客户数']\nprint('\n日均客单价:', df['客单价'].mean())\n\n# 找出销售额最高的日期\nhighest_sales_date = df.loc[df['销售额'].idxmax(), '日期']\nhighest_sales = df['销售额'].max()\nprint('\n销售额最高的日期:', highest_sales_date)\nprint('最高销售额:', highest_sales)",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '2') {
        // 销售数据分析练习
        return [
          {
            id: 1,
            title: "练习1：时间序列分析",
            description: "对销售数据进行时间序列分析",
            template: "# 时间序列分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndates = pd.date_range('2022-01-01', '2023-12-31', freq='D')\nsales = []\n\n# 创建有季节性模式的数据\nfor date in dates:\n    # 基础销售额\n    base_sale = 1000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 随机波动\n    random_factor = np.random.normal(1, 0.1)\n    # 计算最终销售额\n    sale = base_sale * month_factor * random_factor\n    sales.append(round(sale))\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales})\n\n# 按月聚合\nmonthly_sales = df.resample('M', on='日期')['销售额'].sum()\nprint('月度销售额:')\nprint(monthly_sales)\n\n# 计算同比增长率\nprint('\n月度销售额同比增长率:')\nprint(monthly_sales.pct_change(12) * 100)\n\n# 识别销售高峰\nprint('\n销售高峰月份:')\nprint(monthly_sales.idxmax())\nprint('最高销售额:', monthly_sales.max())",
            answer: "# 时间序列分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟销售数据\ndates = pd.date_range('2022-01-01', '2023-12-31', freq='D')\nsales = []\n\n# 创建有季节性模式的数据\nfor date in dates:\n    # 基础销售额\n    base_sale = 1000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 随机波动\n    random_factor = np.random.normal(1, 0.1)\n    # 计算最终销售额\n    sale = base_sale * month_factor * random_factor\n    sales.append(round(sale))\n\ndf = pd.DataFrame({'日期': dates, '销售额': sales})\n\n# 按月聚合\nmonthly_sales = df.resample('M', on='日期')['销售额'].sum()\nprint('月度销售额:')\nprint(monthly_sales)\n\n# 计算同比增长率\nprint('\n月度销售额同比增长率:')\ngrowth_rate = monthly_sales.pct_change(12) * 100\nprint(growth_rate)\n\n# 识别销售高峰和低谷\nprint('\n销售高峰月份:', monthly_sales.idxmax())\nprint('最高销售额:', monthly_sales.max())\nprint('销售低谷月份:', monthly_sales.idxmin())\nprint('最低销售额:', monthly_sales.min())\n\n# 计算季度销售额\nquarterly_sales = df.resample('Q', on='日期')['销售额'].sum()\nprint('\n季度销售额:')\nprint(quarterly_sales)\n\n# 计算年度销售额\nyearly_sales = df.resample('Y', on='日期')['销售额'].sum()\nprint('\n年度销售额:')\nprint(yearly_sales)\nprint('年度增长率:', yearly_sales.pct_change() * 100)",
            difficulty: "高级"
          }
        ];
      } else if (lessonId === '7') {
        // 商业数据分析案例练习
        return [
          {
            id: 1,
            title: "练习1：促销活动效果分析",
            description: "分析不同促销活动对销售的影响",
            template: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\n\n# TODO: 2. 查看不同促销活动的平均客流量\nprint('\\n不同促销活动的平均客流量:')\n\n# TODO: 3. 计算不同促销活动的平均客单价\nprint('\\n不同促销活动的平均客单价:')\n",
            answer: "# 商业数据分析案例：促销活动效果分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 100, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 查看不同促销活动的平均销售额\nprint('不同促销活动的平均销售额:')\npromotion_sales = df.groupby('促销活动')['销售额'].mean()\nprint(promotion_sales.round(2))\n\n# 2. 查看不同促销活动的平均客流量\nprint('\\n不同促销活动的平均客流量:')\npromotion_customers = df.groupby('促销活动')['客流量'].mean()\nprint(promotion_customers.round(2))\n\n# 3. 计算不同促销活动的平均客单价\ndf['客单价'] = df['销售额'] / df['客流量']\nprint('\\n不同促销活动的平均客单价:')\npromotion_avg = df.groupby('促销活动')['客单价'].mean()\nprint(promotion_avg.round(2))\n\n# 4. 找出促销效果最好的活动\nprint('\\n促销效果最好的活动:', promotion_sales.idxmax())\nprint('平均销售额:', promotion_sales.max().round(2))\n\n# 5. 计算各类促销活动的天数\nprint('\\n各类促销活动的天数:')\npromotion_days = df['促销活动'].value_counts()\nprint(promotion_days)\n",
            difficulty: "中等"
          },
          {
            id: 2,
            title: "练习2：天气和竞争对手影响分析",
            description: "分析天气和竞争对手促销对销售的影响",
            template: "# 商业数据分析案例：天气和竞争对手影响分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '天气': np.random.choice(['晴', '阴', '雨', '雪'], 100, p=[0.6, 0.2, 0.15, 0.05]),\n    '竞争对手促销': np.random.choice([0, 1], 100, p=[0.7, 0.3])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 分析不同天气条件下的销售情况\nprint('不同天气条件下的平均销售额:')\n\n# TODO: 2. 分析竞争对手促销的影响\nprint('\\n竞争对手促销对销售的影响:')\nprint('无促销时平均销售额:')\nprint('有促销时平均销售额:')\n\n# TODO: 3. 找出销售额最高的天气条件\nprint('\\n销售额最高的天气:')\n",
            answer: "# 商业数据分析案例：天气和竞争对手影响分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=100),\n    '销售额': np.random.randint(5000, 20000, 100),\n    '客流量': np.random.randint(100, 500, 100),\n    '天气': np.random.choice(['晴', '阴', '雨', '雪'], 100, p=[0.6, 0.2, 0.15, 0.05]),\n    '竞争对手促销': np.random.choice([0, 1], 100, p=[0.7, 0.3])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 分析不同天气条件下的销售情况\nprint('不同天气条件下的平均销售额:')\nweather_sales = df.groupby('天气')['销售额'].mean()\nprint(weather_sales.round(2))\n\n# 2. 分析竞争对手促销的影响\nprint('\\n竞争对手促销对销售的影响:')\ncompetitor_analysis = df.groupby('竞争对手促销')['销售额'].mean()\nprint('无促销时平均销售额:', competitor_analysis[0].round(2))\nprint('有促销时平均销售额:', competitor_analysis[1].round(2))\n\n# 3. 找出销售额最高的天气条件\nprint('\\n销售额最高的天气:', weather_sales.idxmax())\nprint('平均销售额:', weather_sales.max().round(2))\n\n# 4. 分析天气对客流量的影响\nprint('\\n不同天气条件下的平均客流量:')\nweather_customers = df.groupby('天气')['客流量'].mean()\nprint(weather_customers.round(2))\n\n# 5. 计算竞争对手促销对客流量的影响\nprint('\\n竞争对手促销对客流量的影响:')\ncompetitor_customers = df.groupby('竞争对手促销')['客流量'].mean()\nprint('无促销时平均客流量:', competitor_customers[0].round(2))\nprint('有促销时平均客流量:', competitor_customers[1].round(2))\n",
            difficulty: "中等"
          },
          {
            id: 3,
            title: "练习3：综合业务指标分析",
            description: "计算和分析关键业务指标，为决策提供支持",
            template: "# 商业数据分析案例：综合业务指标分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=365),\n    '销售额': np.random.randint(5000, 20000, 365),\n    '客流量': np.random.randint(100, 500, 365),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 365, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# TODO: 1. 计算年度关键指标\nprint('年度关键业务指标:')\nprint('总销售额:')\nprint('日均销售额:')\nprint('日均客流量:')\nprint('平均客单价:')\n\n# TODO: 2. 按月度分析销售趋势\nprint('\\n月度销售趋势:')\n\n# TODO: 3. 找出销售最好和最差的月份\nprint('\\n销售最好的月份:')\nprint('销售最差的月份:')\n",
            answer: "# 商业数据分析案例：综合业务指标分析\nimport pandas as pd\nimport numpy as np\n\n# 模拟零售企业数据\ndata = {\n    '日期': pd.date_range('2023-01-01', periods=365),\n    '销售额': np.random.randint(5000, 20000, 365),\n    '客流量': np.random.randint(100, 500, 365),\n    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 365, p=[0.6, 0.15, 0.15, 0.1])\n}\n\ndf = pd.DataFrame(data)\n\n# 1. 计算年度关键指标\nprint('年度关键业务指标:')\ntotal_sales = df['销售额'].sum()\navg_daily_sales = df['销售额'].mean()\navg_daily_customers = df['客流量'].mean()\navg_ticket = df['销售额'].sum() / df['客流量'].sum()\n\nprint(f'总销售额: {total_sales:,.0f}')\nprint(f'日均销售额: {avg_daily_sales:,.2f}')\nprint(f'日均客流量: {avg_daily_customers:.2f}')\nprint(f'平均客单价: {avg_ticket:.2f}')\n\n# 2. 按月度分析销售趋势\nprint('\\n月度销售趋势:')\ndf['月份'] = df['日期'].dt.month\nmonthly_sales = df.groupby('月份')['销售额'].sum()\nprint(monthly_sales)\n\n# 3. 找出销售最好和最差的月份\nprint('\\n销售最好的月份:', monthly_sales.idxmax())\nprint('销售额:', monthly_sales.max())\nprint('销售最差的月份:', monthly_sales.idxmin())\nprint('销售额:', monthly_sales.min())\n\n# 4. 计算促销活动的天数和销售额占比\nprint('\\n促销活动分析:')\npromotion_analysis = df.groupby('促销活动')['销售额'].agg(['sum', 'count'])\npromotion_analysis.columns = ['总销售额', '天数']\nprint(promotion_analysis)\n\n# 5. 计算促销活动的销售占比\nprint('\\n促销活动销售占比:')\npromotion_percentage = (promotion_analysis['总销售额'] / total_sales * 100).round(2)\nprint(promotion_percentage)\n",
            difficulty: "高级"
          }
        ];
      }
    }
    
    // 课程9: 商业数据可视化与预测
    if (id === '9') {
      if (lessonId === '1') {
        // 数据可视化基础练习
        return [
          {
            id: 1,
            title: "练习1：创建销售趋势图",
            description: "使用Matplotlib创建销售趋势折线图",
            template: "# 创建销售趋势图\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [12000, 13500, 11800, 14200, 15600, 14800, \n         16200, 17500, 16800, 18200, 19500, 21000]\n\n# 创建DataFrame\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 创建折线图\n# 1. 设置图表大小\n# 2. 绘制折线图\n# 3. 添加标题和标签\n# 4. 显示网格\n# 5. 调整布局\n\n# 示例：\n# plt.figure(figsize=(10, 6))\n# plt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')\n# plt.title('2023年销售趋势')\n# plt.xlabel('月份')\n# plt.ylabel('销售额')\n# plt.grid(True)\n# plt.tight_layout()\n\nprint('销售趋势图已创建')\nprint('月度销售额数据:')\nprint(df)\n\n# TODO: 计算销售额增长率并打印\n# 提示：使用pct_change()方法计算增长率\n\n# 示例：\n# growth_rate = df['销售额'].pct_change() * 100\n# df['增长率'] = growth_rate\n# print('\n销售额增长率:')\n# print(df[['月份', '增长率']])",
            answer: "# 创建销售趋势图\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟销售数据\ndates = pd.date_range('2023-01-01', '2023-12-31', freq='M')\nsales = [12000, 13500, 11800, 14200, 15600, 14800, \n         16200, 17500, 16800, 18200, 19500, 21000]\n\n# 创建DataFrame\ndf = pd.DataFrame({'月份': dates, '销售额': sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 折线图\nplt.figure(figsize=(10, 6))\nplt.plot(df['月份'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2023年销售趋势')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\n\n# 柱状图\nplt.figure(figsize=(10, 6))\nplt.bar(df['月份'], df['销售额'], color='g')\nplt.title('2023年月度销售额')\nplt.xlabel('月份')\nplt.ylabel('销售额')\nplt.xticks(rotation=45)\nplt.tight_layout()\n\nprint('销售趋势图和柱状图已创建')\nprint('月度销售额数据:')\nprint(df)\n\n# 计算销售额增长率\ngrowth_rate = df['销售额'].pct_change() * 100\ndf['增长率'] = growth_rate\nprint('\n销售额增长率:')\nprint(df[['月份', '增长率']])\n\n# 计算年度总销售额和平均月销售额\ntotal_sales = df['销售额'].sum()\naverage_sales = df['销售额'].mean()\nprint('\n年度总销售额:', total_sales)\nprint('平均月销售额:', average_sales)\nprint('最高月销售额:', df['销售额'].max())\nprint('最低月销售额:', df['销售额'].min())",
            difficulty: "中等"
          }
        ];
      } else if (lessonId === '2') {
        // Matplotlib高级应用练习
        return [
          {
            id: 1,
            title: "练习1：创建多维度销售分析图表",
            description: "使用Matplotlib创建堆叠柱状图和饼图",
            template: "# 创建多维度销售分析图表\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟多产品销售数据\nproducts = ['产品A', '产品B', '产品C', '产品D']\nquarters = ['Q1', 'Q2', 'Q3', 'Q4']\n\n# 创建销售数据\nsales_data = {\n    '产品A': [12000, 13500, 14200, 15800],\n    '产品B': [9500, 10200, 11800, 12500],\n    '产品C': [8800, 9400, 10100, 11200],\n    '产品D': [7200, 8500, 9300, 10500]\n}\n\ndf = pd.DataFrame(sales_data, index=quarters)\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 创建堆叠柱状图\n# 1. 设置图表大小\n# 2. 绘制堆叠柱状图\n# 3. 添加标题和标签\n# 4. 添加图例\n# 5. 调整布局\n\n# 示例：\n# plt.figure(figsize=(10, 6))\n# df.plot(kind='bar', stacked=True, figsize=(10, 6))\n# plt.title('2023年各季度产品销售额')\n# plt.xlabel('季度')\n# plt.ylabel('销售额')\n# plt.legend(title='产品')\n# plt.tight_layout()\n\n# TODO: 创建饼图 - Q4销售额分布\n# 1. 设置图表大小\n# 2. 绘制饼图\n# 3. 添加标题\n# 4. 确保饼图为圆形\n# 5. 调整布局\n\n# 示例：\n# plt.figure(figsize=(8, 8))\n# plt.pie(df.loc['Q4'], labels=products, autopct='%1.1f%%', startangle=90)\n# plt.title('Q4产品销售分布')\n# plt.axis('equal')\n# plt.tight_layout()\n\nprint('多维度销售分析图表已创建')\nprint('季度销售数据:')\nprint(df)\n\n# TODO: 计算各产品年度总销售额并打印\n\n# 示例：\n# yearly_sales = df.sum()\n# print('\n各产品年度总销售额:')\n# print(yearly_sales)\n\n# TODO: 计算各季度总销售额并打印\n\n# 示例：\n# quarterly_total = df.sum(axis=1)\n# print('\n各季度总销售额:')\n# print(quarterly_total)",
            answer: "# 创建多维度销售分析图表\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟多产品销售数据\nproducts = ['产品A', '产品B', '产品C', '产品D']\nquarters = ['Q1', 'Q2', 'Q3', 'Q4']\n\n# 创建销售数据\nsales_data = {\n    '产品A': [12000, 13500, 14200, 15800],\n    '产品B': [9500, 10200, 11800, 12500],\n    '产品C': [8800, 9400, 10100, 11200],\n    '产品D': [7200, 8500, 9300, 10500]\n}\n\ndf = pd.DataFrame(sales_data, index=quarters)\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 堆叠柱状图\nplt.figure(figsize=(10, 6))\ndf.plot(kind='bar', stacked=True, figsize=(10, 6))\nplt.title('2023年各季度产品销售额')\nplt.xlabel('季度')\nplt.ylabel('销售额')\nplt.legend(title='产品')\nplt.tight_layout()\n\n# 饼图 - Q4销售额分布\nplt.figure(figsize=(8, 8))\nplt.pie(df.loc['Q4'], labels=products, autopct='%1.1f%%', startangle=90)\nplt.title('Q4产品销售分布')\nplt.axis('equal')\nplt.tight_layout()\n\n# 多子图 - 每个产品的销售趋势\nfig, axes = plt.subplots(2, 2, figsize=(12, 10))\nfig.suptitle('2023年产品销售分析', fontsize=16)\n\nfor i, product in enumerate(products):\n    row = i // 2\n    col = i % 2\n    axes[row, col].plot(quarters, df[product], marker='o')\n    axes[row, col].set_title(f'{product}销售趋势')\n    axes[row, col].set_xlabel('季度')\n    axes[row, col].set_ylabel('销售额')\n    axes[row, col].grid(True)\n\nplt.tight_layout(rect=[0, 0, 1, 0.95])\n\nprint('多维度销售分析图表已创建')\nprint('季度销售数据:')\nprint(df)\n\n# 计算各产品年度总销售额\nyearly_sales = df.sum()\nprint('\n各产品年度总销售额:')\nprint(yearly_sales)\nprint('销售占比:')\nprint((yearly_sales / yearly_sales.sum() * 100).round(2))\n\n# 计算各季度总销售额\nquarterly_total = df.sum(axis=1)\nprint('\n各季度总销售额:')\nprint(quarterly_total)\nprint('季度占比:')\nprint((quarterly_total / quarterly_total.sum() * 100).round(2))\n\n# 计算各产品季度增长率\nprint('\n各产品季度增长率:')\nfor product in products:\n    growth = df[product].pct_change() * 100\n    print(f'{product}:')\n    print(growth.round(2))",
            difficulty: "高级"
          }
        ];
      } else if (lessonId === '7') {
        // 商业数据可视化与预测案例练习
        return [
          {
            id: 1,
            title: "练习1：销售趋势可视化",
            description: "创建销售趋势图并分析季节性模式",
            template: "# 商业数据可视化与预测案例：销售趋势可视化\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# TODO: 1. 创建销售趋势折线图\nprint('销售趋势分析:')\n\n# TODO: 2. 创建月度平均销售额柱状图\nprint('\\n月度平均销售额:')\n\n# TODO: 3. 识别销售高峰和低谷\nprint('\\n销售高峰:')\nprint('销售低谷:')\n",
            answer: "# 商业数据可视化与预测案例：销售趋势可视化\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 设置中文字体\nplt.rcParams['font.sans-serif'] = ['SimHei']\nplt.rcParams['axes.unicode_minus'] = False\n\n# 1. 创建销售趋势折线图\nprint('销售趋势分析:')\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2022-2023年销售趋势')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\nprint('销售趋势图已创建')\n\n# 2. 创建月度平均销售额柱状图\nprint('\\n月度平均销售额:')\ndf['月份'] = df['日期'].dt.month\nmonthly_avg = df.groupby('月份')['销售额'].mean()\n\nplt.figure(figsize=(10, 6))\nplt.bar(monthly_avg.index, monthly_avg.values, color='g')\nplt.title('月度平均销售额（季节性分析）')\nplt.xlabel('月份')\nplt.ylabel('平均销售额')\nplt.xticks(range(1, 13))\nplt.grid(axis='y')\nplt.tight_layout()\nprint('月度平均销售额柱状图已创建')\n\n# 3. 识别销售高峰和低谷\nprint('\\n销售高峰:')\nprint('日期:', df.loc[df['销售额'].idxmax(), '日期'])\nprint('销售额:', df['销售额'].max())\n\nprint('\\n销售低谷:')\nprint('日期:', df.loc[df['销售额'].idxmin(), '日期'])\nprint('销售额:', df['销售额'].min())\n\n# 4. 打印数据\nprint('\\n销售数据:')\nprint(df)\n",
            difficulty: "中等"
          },
          {
            id: 2,
            title: "练习2：简单线性回归预测",
            description: "使用简单线性回归进行销售预测",
            template: "# 商业数据可视化与预测案例：简单线性回归预测\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 准备预测数据\ndf['时间索引'] = range(len(df))\n\n# TODO: 1. 使用简单线性回归\nprint('销售预测:')\n\n# TODO: 2. 预测未来6个月\nprint('\\n未来6个月销售预测:')\n\n# TODO: 3. 可视化预测结果\nprint('\\n预测结果可视化:')\n",
            answer: "# 商业数据可视化与预测案例：简单线性回归预测\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 准备预测数据\ndf['时间索引'] = range(len(df))\n\n# 1. 使用简单线性回归\nprint('销售预测:')\nX = df['时间索引'].values.reshape(-1, 1)\ny = df['销售额'].values\n\nmodel = LinearRegression()\nmodel.fit(X, y)\n\nprint(f'预测模型R²值: {model.score(X, y):.4f')\nprint(f'斜率: {model.coef_[0]:.2f}')\nprint(f'截距: {model.intercept_:.2f}')\n\n# 2. 预测未来6个月\nfuture_dates = pd.date_range('2024-01-01', '2024-06-30', freq='M')\nfuture_index = range(len(df), len(df) + len(future_dates))\nfuture_X = np.array(future_index).reshape(-1, 1)\nfuture_y = model.predict(future_X)\n\n# 创建预测数据DataFrame\nforecast_df = pd.DataFrame({'日期': future_dates, '预测销售额': future_y.round()})\n\nprint('\\n未来6个月销售预测:')\nprint(forecast_df)\n\n# 3. 可视化预测结果\nprint('\\n预测结果可视化:')\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b', label='历史销售额')\nplt.plot(forecast_df['日期'], forecast_df['预测销售额'], marker='o', linestyle='--', color='r', label='预测销售额')\nplt.title('销售趋势与预测')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.legend()\nplt.grid(True)\nplt.tight_layout()\nprint('预测结果图已创建')\n\n# 4. 计算销售增长率\nif len(df) > 0 and len(forecast_df) > 0:\n    growth_rate = ((forecast_df['预测销售额'].iloc[-1] - df['销售额'].iloc[-1]) / df['销售额'].iloc[-1] * 100\n    print(f'\\n销售增长率: {growth_rate:.2f}%')\n",
            difficulty: "高级"
          },
          {
            id: 3,
            title: "练习3：综合分析报告",
            description: "创建综合分析并生成业务洞察",
            template: "# 商业数据可视化与预测案例：综合分析报告\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据\nhistorical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# TODO: 1. 计算年度关键指标\nprint('年度关键业务指标:')\n\n# TODO: 2. 分析年度对比\nprint('\\n年度对比分析:')\n\n# TODO: 3. 生成业务洞察\nprint('\\n业务洞察:')\n",
            answer: "# 商业数据可视化与预测案例：综合分析报告\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 模拟历史销售数据
historical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')\n\n# 创建有季节性模式的销售数据\nhistorical_sales = []\nfor date in historical_dates:\n    # 基础销售额\n    base_sale = 10000\n    # 月度季节性\n    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, \n                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]\n    # 增长趋势\n    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1\n    # 随机波动\n    random_factor = np.random.normal(1, 0.05)\n    # 计算最终销售额\n    sale = base_sale * month_factor * trend_factor * random_factor\n    historical_sales.append(round(sale))\n\n# 创建历史数据DataFrame\ndf = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})\n\n# 1. 计算年度关键指标\nprint('年度关键业务指标:')\ntotal_sales = df['销售额'].sum()\navg_monthly_sales = df['销售额'].mean()\nmax_sales = df['销售额'].max()\nmin_sales = df['销售额'].min()\n\nprint(f'总销售额: {total_sales:,.0f}')\nprint(f'平均月销售额: {avg_monthly_sales:,.2f}')\nprint(f'最高月销售额: {max_sales:,.0f}')\nprint(f'最低月销售额: {min_sales:,.0f}')\n\n# 2. 分析年度对比\nprint('\\n年度对比分析:')\ndf['年份'] = df['日期'].dt.year\nyearly_sales = df.groupby('年份')['销售额'].sum()\nprint(yearly_sales)\n\nif len(yearly_sales) >= 2:\n    yoy_growth = (yearly_sales.iloc[-1] - yearly_sales.iloc[-2]) / yearly_sales.iloc[-2] * 100\n    print(f'\\n同比增长率: {yoy_growth:.2f}%')\n\n# 3. 生成业务洞察\nprint('\\n业务洞察:')\ndf['月份'] = df['日期'].dt.month\nmonthly_avg = df.groupby('月份')['销售额'].mean()\n\npeak_month = monthly_avg.idxmax()\nlow_month = monthly_avg.idxmin()\n\nprint(f'1. 销售高峰月份: {peak_month}月')\nprint(f'2. 销售低谷月份: {low_month}月')\nprint(f'3. 建议在{low_month}月增加促销活动')\nprint(f'4. 建议在{peak_month}月前增加库存')\n\n# 4. 可视化年度销售趋势\nplt.figure(figsize=(12, 6))\nplt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')\nplt.title('2022-2023年销售趋势')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.grid(True)\nplt.tight_layout()\nprint('\\n销售趋势图已创建')\n\n# 5. 打印数据\nprint('\\n完整销售数据:')\nprint(df)\n",
            difficulty: "高级"
          }
        ];
      }
    }
    
    // 默认练习题目
    return [
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
      }
    ];
  }, [id, lessonId]);

  const [practiceQuestions, setPracticeQuestions] = useState(getPracticeQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (lessonId) {
      loadLesson(Number(lessonId));
    }
  }, [lessonId]);

  useEffect(() => {
    // 当课程或课时变化时，重新生成练习题目
    const questions = getPracticeQuestions();
    setPracticeQuestions(questions);
    setCurrentQuestion(0);
    if (questions.length > 0) {
      setCode(questions[0].template);
      setOutput('');
      setShowAnswer(false);
    }
  }, [getPracticeQuestions]);

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
      },
      {
        id: 7,
        title: "商业数据分析案例",
        content: "通过实际商业案例学习数据分析的完整流程，包括数据获取、清洗、分析和可视化。",
        business_scenario: "你是一家电商公司的数据分析实习生，需要分析销售数据，识别销售趋势和客户行为模式。",
        code_example: `# 商业数据分析案例：电商销售数据分析
import pandas as pd
import numpy as np

# 模拟电商销售数据
data = {
    '订单ID': range(1, 101),
    '日期': pd.date_range('2023-01-01', periods=100),
    '产品类别': np.random.choice(['电子产品', '服装', '家居用品', '食品'], 100),
    '销售额': np.random.randint(100, 1000, 100),
    '客户年龄': np.random.randint(18, 65, 100),
    '支付方式': np.random.choice(['支付宝', '微信支付', '信用卡'], 100)
}

df = pd.DataFrame(data)

# 1. 数据概览
print("数据概览:")
print(df.head())
print("\n数据基本统计:")
print(df.describe())

# 2. 按产品类别分析
print("\n按产品类别销售分析:")
category_sales = df.groupby('产品类别')['销售额'].sum()
print(category_sales)

# 3. 按日期分析销售趋势
print("\n按日期销售趋势:")
daily_sales = df.resample('D', on='日期')['销售额'].sum()
print(daily_sales.head(10))

# 4. 客户年龄分布
print("\n客户年龄分布:")
age_distribution = df['客户年龄'].value_counts().sort_index()
print(age_distribution.head(10))

# 5. 支付方式分析
print("\n支付方式分析:")
payment_analysis = df.groupby('支付方式')['销售额'].sum()
print(payment_analysis)

# 6. 计算关键指标
print("\n关键业务指标:")
print(f"总销售额: {df['销售额'].sum()}")
print(f"平均订单金额: {df['销售额'].mean():.2f}")
print(f"订单数量: {len(df)}")
print(f"销售额最高的产品类别: {category_sales.idxmax()}")
print(f"销售额最高的日期: {daily_sales.idxmax()}")
`,
        learning_points: [
          "掌握商业数据分析的完整流程",
          "学习如何分析销售数据和客户行为",
          "能够计算关键业务指标",
          "了解数据可视化的基本方法"
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
      },
      {
        id: 7,
        title: "案例分析",
        content: "通过实际商业案例学习如何应用数据分析方法解决业务问题，包括市场分析、竞争分析和客户分析。",
        business_scenario: "你是一家零售企业的数据分析经理，需要分析销售数据和客户行为，为市场营销策略提供数据支持。",
        code_example: `# 商业数据分析案例：零售企业市场分析
import pandas as pd
import numpy as np

# 模拟零售企业数据
data = {
    '日期': pd.date_range('2023-01-01', periods=365),
    '销售额': np.random.randint(5000, 20000, 365),
    '客流量': np.random.randint(100, 500, 365),
    '促销活动': np.random.choice(['无', '节日促销', '会员日', '清仓活动'], 365, p=[0.6, 0.15, 0.15, 0.1]),
    '天气': np.random.choice(['晴', '阴', '雨', '雪'], 365, p=[0.6, 0.2, 0.15, 0.05]),
    '竞争对手促销': np.random.choice([0, 1], 365, p=[0.7, 0.3])
}

df = pd.DataFrame(data)

# 1. 销售趋势分析
print("1. 销售趋势分析:")
monthly_sales = df.resample('M', on='日期')['销售额'].sum()
print("月度销售额:")
print(monthly_sales)

# 2. 促销活动效果分析
print("\n2. 促销活动效果分析:")
promotion_analysis = df.groupby('促销活动')['销售额'].mean()
print("不同促销活动的平均销售额:")
print(promotion_analysis)

# 3. 客流量与销售额关系
print("\n3. 客流量与销售额关系:")
correlation = df['客流量'].corr(df['销售额'])
print(f"客流量与销售额的相关系数: {correlation:.4f}")

# 4. 天气对销售的影响
print("\n4. 天气对销售的影响:")
weather_analysis = df.groupby('天气')['销售额'].mean()
print("不同天气条件下的平均销售额:")
print(weather_analysis)

# 5. 竞争对手促销的影响
print("\n5. 竞争对手促销的影响:")
competitor_analysis = df.groupby('竞争对手促销')['销售额'].mean()
print("竞争对手促销对销售额的影响:")
print(f"竞争对手无促销时平均销售额: {competitor_analysis[0]:.2f}")
print(f"竞争对手有促销时平均销售额: {competitor_analysis[1]:.2f}")

# 6. 综合分析
print("\n6. 综合分析:")
print(f"年度总销售额: {df['销售额'].sum()}")
print(f"日均销售额: {df['销售额'].mean():.2f}")
print(f"日均客流量: {df['客流量'].mean():.2f}")
print(f"平均客单价: {df['销售额'].mean() / df['客流量'].mean():.2f}")
print(f"销售额最高的月份: {monthly_sales.idxmax().strftime('%Y-%m')}")
print(f"销售额最低的月份: {monthly_sales.idxmin().strftime('%Y-%m')}")
`,
        learning_points: [
          "掌握多维度数据分析方法",
          "学习如何分析促销活动效果",
          "了解外部因素对销售的影响",
          "能够进行综合商业分析并提出建议"
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
      },
      {
        id: 7,
        title: "案例分析",
        content: "通过实际商业案例学习如何应用数据可视化和预测技术解决业务问题，包括销售预测和库存管理。",
        business_scenario: "你是一家制造企业的数据分析专家，需要分析销售数据并预测未来销售趋势，为生产和库存决策提供支持。",
        code_example: `# 商业数据可视化与预测案例：销售预测分析
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 模拟历史销售数据
historical_dates = pd.date_range('2022-01-01', '2023-12-31', freq='M')

# 创建有季节性模式的销售数据
historical_sales = []
for date in historical_dates:
    # 基础销售额
    base_sale = 10000
    # 月度季节性
    month_factor = {1: 0.8, 2: 0.9, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.1, 
                   7: 1.0, 8: 0.9, 9: 1.0, 10: 1.1, 11: 1.3, 12: 1.5}[date.month]
    # 增长趋势
    trend_factor = 1 + (date.year - 2022) * 0.1 + (date.month - 1) / 12 * 0.1
    # 随机波动
    random_factor = np.random.normal(1, 0.05)
    # 计算最终销售额
    sale = base_sale * month_factor * trend_factor * random_factor
    historical_sales.append(round(sale))

# 创建历史数据DataFrame
df = pd.DataFrame({'日期': historical_dates, '销售额': historical_sales})

# 1. 销售趋势可视化
print("1. 销售趋势分析:")
plt.figure(figsize=(12, 6))
plt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b')
plt.title('2022-2023年销售趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(True)
plt.tight_layout()

# 2. 季节性分析
print("\n2. 季节性分析:")
df['月份'] = df['日期'].dt.month
monthly_avg = df.groupby('月份')['销售额'].mean()

plt.figure(figsize=(10, 6))
plt.bar(monthly_avg.index, monthly_avg.values, color='g')
plt.title('月度平均销售额（季节性分析）')
plt.xlabel('月份')
plt.ylabel('平均销售额')
plt.xticks(range(1, 13))
plt.grid(axis='y')
plt.tight_layout()

# 3. 简单线性回归预测
print("\n3. 销售预测:")
# 准备预测数据
df['时间索引'] = range(len(df))

# 简单线性回归
from sklearn.linear_model import LinearRegression

X = df['时间索引'].values.reshape(-1, 1)
y = df['销售额'].values

model = LinearRegression()
model.fit(X, y)

# 预测未来6个月
future_dates = pd.date_range('2024-01-01', '2024-06-30', freq='M')
future_index = range(len(df), len(df) + len(future_dates))
future_X = np.array(future_index).reshape(-1, 1)
future_y = model.predict(future_X)

# 创建预测数据DataFrame
forecast_df = pd.DataFrame({'日期': future_dates, '预测销售额': future_y.round()})

print("未来6个月销售预测:")
print(forecast_df)

# 4. 可视化预测结果
plt.figure(figsize=(12, 6))
plt.plot(df['日期'], df['销售额'], marker='o', linestyle='-', color='b', label='历史销售额')
plt.plot(forecast_df['日期'], forecast_df['预测销售额'], marker='o', linestyle='--', color='r', label='预测销售额')
plt.title('销售趋势与预测')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.legend()
plt.grid(True)
plt.tight_layout()

print("\n4. 预测结果分析:")
print(f"预测模型R²值: {model.score(X, y):.4f}")
print(f"销售增长率: {((forecast_df['预测销售额'].iloc[-1] - df['销售额'].iloc[-1]) / df['销售额'].iloc[-1]) * 100:.2f}%")
`,
        learning_points: [
          "掌握销售数据的时间序列分析",
          "学习如何识别和分析季节性模式",
          "能够使用简单线性回归进行销售预测",
          "掌握数据可视化和预测结果的展示方法"
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
