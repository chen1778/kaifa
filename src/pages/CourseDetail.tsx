import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock course data for demonstration
  const mockCourses = [
    {
      id: 1,
      title: "Python基础与数据科学入门",
      level: "L1",
      description: "掌握Python基础语法和数据科学库的使用，包括NumPy和Pandas的基本操作。本课程适合零基础的商务数据分析专业学生，通过实际案例学习数据分析的基本概念和方法。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20for%20data%20science%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "Python环境搭建",
          content: "学习如何安装和配置Python环境，包括Anaconda的使用。",
          order_index: 1
        },
        {
          id: 2,
          title: "Python基础语法",
          content: "掌握Python的基本语法，包括变量、数据类型、运算符和控制流。",
          order_index: 2
        },
        {
          id: 3,
          title: "Python函数和模块",
          content: "学习如何定义和使用函数，以及如何导入和使用模块。",
          order_index: 3
        },
        {
          id: 4,
          title: "NumPy基础",
          content: "学习NumPy库的基本使用，包括数组创建、索引和操作。",
          order_index: 4
        },
        {
          id: 5,
          title: "Pandas基础",
          content: "学习Pandas库的基本使用，包括Series和DataFrame的操作。",
          order_index: 5
        },
        {
          id: 6,
          title: "数据可视化基础",
          content: "学习使用Matplotlib进行数据可视化。",
          order_index: 6
        },
        {
          id: 7,
          title: "商业数据分析案例",
          content: "通过实际商业案例学习数据分析的完整流程。",
          order_index: 7
        },
        {
          id: 8,
          title: "课程总结与项目实践",
          content: "总结课程内容，完成一个小型数据分析项目。",
          order_index: 8
        }
      ],
      prerequisites: "无，适合零基础学生",
      learning_outcomes: [
        "掌握Python基础语法",
        "熟悉NumPy和Pandas库的使用",
        "能够进行基本的数据可视化",
        "完成一个小型商业数据分析项目"
      ],
      duration: "4周",
      lessons_count: 8,
      project: "销售数据分析项目"
    },
    {
      id: 2,
      title: "Python数据分析实战",
      level: "L1",
      description: "通过实际案例学习Python数据分析的基本流程和方法。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20hands-on%20practice%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "数据分析概述",
          content: "了解数据分析的基本概念和流程。",
          order_index: 1
        },
        {
          id: 2,
          title: "数据导入与导出",
          content: "学习如何导入和导出各种格式的数据。",
          order_index: 2
        },
        {
          id: 3,
          title: "数据清洗基础",
          content: "学习数据清洗的基本方法和技巧。",
          order_index: 3
        },
        {
          id: 4,
          title: "数据探索分析",
          content: "学习如何探索和分析数据。",
          order_index: 4
        },
        {
          id: 5,
          title: "数据可视化实践",
          content: "通过实际案例学习数据可视化。",
          order_index: 5
        },
        {
          id: 6,
          title: "统计分析基础",
          content: "学习基本的统计分析方法。",
          order_index: 6
        },
        {
          id: 7,
          title: "商业案例分析",
          content: "通过商业案例学习数据分析的应用。",
          order_index: 7
        },
        {
          id: 8,
          title: "项目实践准备",
          content: "准备进行数据分析项目实践。",
          order_index: 8
        },
        {
          id: 9,
          title: "项目实施",
          content: "实施数据分析项目。",
          order_index: 9
        },
        {
          id: 10,
          title: "项目展示与总结",
          content: "展示项目成果并总结学习内容。",
          order_index: 10
        }
      ],
      prerequisites: "具备基本的Python编程知识",
      learning_outcomes: [
        "掌握数据分析的基本流程",
        "能够进行数据清洗和探索分析",
        "能够使用Python进行数据可视化",
        "完成一个完整的数据分析项目"
      ],
      duration: "5周",
      lessons_count: 10,
      project: "电商销售数据分析项目"
    },
    {
      id: 3,
      title: "数据采集与预处理",
      level: "L2",
      description: "学习网络爬虫和数据清洗技术，掌握数据采集的完整流程。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20preprocessing%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "数据采集概述",
          content: "了解数据采集的基本概念和方法。",
          order_index: 1
        },
        {
          id: 2,
          title: "网络爬虫基础",
          content: "学习网络爬虫的基本原理和技术。",
          order_index: 2
        },
        {
          id: 3,
          title: "使用Requests获取数据",
          content: "学习使用Requests库获取网页数据。",
          order_index: 3
        },
        {
          id: 4,
          title: "使用BeautifulSoup解析数据",
          content: "学习使用BeautifulSoup解析HTML数据。",
          order_index: 4
        },
        {
          id: 5,
          title: "使用Selenium爬取动态数据",
          content: "学习使用Selenium爬取动态加载的数据。",
          order_index: 5
        },
        {
          id: 6,
          title: "数据存储",
          content: "学习如何存储采集的数据。",
          order_index: 6
        },
        {
          id: 7,
          title: "数据清洗概述",
          content: "了解数据清洗的基本概念和方法。",
          order_index: 7
        },
        {
          id: 8,
          title: "处理缺失值",
          content: "学习如何处理数据中的缺失值。",
          order_index: 8
        },
        {
          id: 9,
          title: "处理异常值",
          content: "学习如何处理数据中的异常值。",
          order_index: 9
        },
        {
          id: 10,
          title: "数据预处理实战",
          content: "通过实际案例学习数据预处理的完整流程。",
          order_index: 10
        }
      ],
      prerequisites: "具备基本的Python编程知识",
      learning_outcomes: [
        "掌握网络爬虫的基本技术",
        "能够使用Python采集互联网数据",
        "掌握数据清洗的基本方法",
        "能够处理各种数据质量问题"
      ],
      duration: "5周",
      lessons_count: 10,
      project: "电商商品数据采集项目"
    },
    {
      id: 4,
      title: "网络爬虫实战",
      level: "L2",
      description: "使用Python实现网络爬虫，采集互联网上的商业数据。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Web%20scraping%20with%20Python%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "网络爬虫进阶",
          content: "学习网络爬虫的高级技术和策略。",
          order_index: 1
        },
        {
          id: 2,
          title: "反爬策略应对",
          content: "学习如何应对网站的反爬措施。",
          order_index: 2
        },
        {
          id: 3,
          title: "异步爬虫",
          content: "学习使用异步技术提高爬虫效率。",
          order_index: 3
        },
        {
          id: 4,
          title: "分布式爬虫",
          content: "学习构建分布式爬虫系统。",
          order_index: 4
        },
        {
          id: 5,
          title: "API数据采集",
          content: "学习通过API采集数据。",
          order_index: 5
        },
        {
          id: 6,
          title: "爬虫项目设计",
          content: "学习如何设计和规划爬虫项目。",
          order_index: 6
        },
        {
          id: 7,
          title: "爬虫实战案例",
          content: "通过实际案例学习网络爬虫的应用。",
          order_index: 7
        },
        {
          id: 8,
          title: "爬虫项目总结",
          content: "总结爬虫项目的经验和教训。",
          order_index: 8
        }
      ],
      prerequisites: "具备基本的Python编程知识和网络爬虫基础",
      learning_outcomes: [
        "掌握高级网络爬虫技术",
        "能够应对各种反爬措施",
        "能够设计和实现大型爬虫项目",
        "能够通过API采集数据"
      ],
      duration: "4周",
      lessons_count: 8,
      project: "竞品价格监控爬虫项目"
    },
    {
      id: 5,
      title: "数据清洗与预处理",
      level: "L2",
      description: "学习数据清洗的各种技术，处理缺失值、异常值和重复数据。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20cleaning%20and%20preprocessing%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "数据质量评估",
          content: "学习如何评估数据质量。",
          order_index: 1
        },
        {
          id: 2,
          title: "缺失值处理方法",
          content: "学习各种缺失值处理方法。",
          order_index: 2
        },
        {
          id: 3,
          title: "异常值检测与处理",
          content: "学习如何检测和处理异常值。",
          order_index: 3
        },
        {
          id: 4,
          title: "重复数据处理",
          content: "学习如何检测和处理重复数据。",
          order_index: 4
        },
        {
          id: 5,
          title: "数据类型转换",
          content: "学习如何进行数据类型转换。",
          order_index: 5
        },
        {
          id: 6,
          title: "数据标准化",
          content: "学习数据标准化的方法。",
          order_index: 6
        },
        {
          id: 7,
          title: "特征工程基础",
          content: "学习特征工程的基本概念和方法。",
          order_index: 7
        },
        {
          id: 8,
          title: "文本数据处理",
          content: "学习如何处理文本数据。",
          order_index: 8
        },
        {
          id: 9,
          title: "时间序列数据处理",
          content: "学习如何处理时间序列数据。",
          order_index: 9
        },
        {
          id: 10,
          title: "数据预处理管道",
          content: "学习如何构建数据预处理管道。",
          order_index: 10
        },
        {
          id: 11,
          title: "预处理实战案例",
          content: "通过实际案例学习数据预处理的应用。",
          order_index: 11
        },
        {
          id: 12,
          title: "预处理项目总结",
          content: "总结数据预处理项目的经验和教训。",
          order_index: 12
        }
      ],
      prerequisites: "具备基本的Python编程知识和Pandas基础",
      learning_outcomes: [
        "掌握各种数据清洗技术",
        "能够处理各种数据质量问题",
        "能够构建数据预处理管道",
        "能够处理不同类型的数据"
      ],
      duration: "6周",
      lessons_count: 12,
      project: "销售数据清洗与预处理项目"
    },
    {
      id: 6,
      title: "Pandas数据处理与分析",
      level: "L3",
      description: "深入学习Pandas库进行数据处理和分析，掌握高级数据操作技巧。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pandas%20data%20analysis%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "Pandas进阶",
          content: "学习Pandas的高级功能和用法。",
          order_index: 1
        },
        {
          id: 2,
          title: "数据索引与选择",
          content: "学习高级数据索引和选择方法。",
          order_index: 2
        },
        {
          id: 3,
          title: "数据合并与连接",
          content: "学习如何合并和连接数据。",
          order_index: 3
        },
        {
          id: 4,
          title: "数据分组与聚合",
          content: "学习数据分组和聚合操作。",
          order_index: 4
        },
        {
          id: 5,
          title: "窗口函数",
          content: "学习使用窗口函数进行数据分析。",
          order_index: 5
        },
        {
          id: 6,
          title: "时间序列处理",
          content: "学习使用Pandas处理时间序列数据。",
          order_index: 6
        },
        {
          id: 7,
          title: "文本数据处理",
          content: "学习使用Pandas处理文本数据。",
          order_index: 7
        },
        {
          id: 8,
          title: "数据透视表",
          content: "学习创建和使用数据透视表。",
          order_index: 8
        },
        {
          id: 9,
          title: "性能优化",
          content: "学习Pandas性能优化技巧。",
          order_index: 9
        },
        {
          id: 10,
          title: "Pandas实战案例",
          content: "通过实际案例学习Pandas的应用。",
          order_index: 10
        },
        {
          id: 11,
          title: "项目实践准备",
          content: "准备进行Pandas项目实践。",
          order_index: 11
        },
        {
          id: 12,
          title: "项目展示与总结",
          content: "展示项目成果并总结学习内容。",
          order_index: 12
        }
      ],
      prerequisites: "具备基本的Python编程知识和Pandas基础",
      learning_outcomes: [
        "掌握Pandas的高级功能",
        "能够进行复杂的数据处理和分析",
        "能够处理时间序列和文本数据",
        "能够优化Pandas代码性能"
      ],
      duration: "6周",
      lessons_count: 12,
      project: "电商用户行为分析项目"
    },
    {
      id: 7,
      title: "Pandas高级应用",
      level: "L3",
      description: "学习Pandas的高级功能，包括时间序列分析和数据聚合。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20Pandas%20techniques%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "Pandas高级索引",
          content: "学习Pandas的高级索引技术。",
          order_index: 1
        },
        {
          id: 2,
          title: "高级数据转换",
          content: "学习高级数据转换技巧。",
          order_index: 2
        },
        {
          id: 3,
          title: "高级分组操作",
          content: "学习高级数据分组操作。",
          order_index: 3
        },
        {
          id: 4,
          title: "多级索引",
          content: "学习使用多级索引进行数据分析。",
          order_index: 4
        },
        {
          id: 5,
          title: "时间序列高级分析",
          content: "学习时间序列的高级分析方法。",
          order_index: 5
        },
        {
          id: 6,
          title: "数据可视化集成",
          content: "学习Pandas与数据可视化库的集成。",
          order_index: 6
        },
        {
          id: 7,
          title: "大数据处理",
          content: "学习使用Pandas处理大规模数据。",
          order_index: 7
        },
        {
          id: 8,
          title: "并行计算",
          content: "学习使用Pandas进行并行计算。",
          order_index: 8
        },
        {
          id: 9,
          title: "Pandas实战案例",
          content: "通过实际案例学习Pandas的高级应用。",
          order_index: 9
        },
        {
          id: 10,
          title: "项目总结与展望",
          content: "总结项目经验并展望未来学习方向。",
          order_index: 10
        }
      ],
      prerequisites: "具备Pandas基础和数据处理经验",
      learning_outcomes: [
        "掌握Pandas的高级功能",
        "能够处理大规模数据",
        "能够进行复杂的时间序列分析",
        "能够优化Pandas代码性能"
      ],
      duration: "5周",
      lessons_count: 10,
      project: "金融时间序列分析项目"
    },
    {
      id: 8,
      title: "商业数据分析",
      level: "L3",
      description: "使用Pandas进行商业数据分析，包括销售数据分析和客户行为分析。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "商业数据分析概述",
          content: "了解商业数据分析的基本概念和方法。",
          order_index: 1
        },
        {
          id: 2,
          title: "销售数据分析",
          content: "学习如何分析销售数据，识别销售趋势。",
          order_index: 2
        },
        {
          id: 3,
          title: "客户行为分析",
          content: "学习如何分析客户行为，识别客户细分。",
          order_index: 3
        },
        {
          id: 4,
          title: "市场分析",
          content: "学习如何分析市场数据，识别潜在商机。",
          order_index: 4
        },
        {
          id: 5,
          title: "竞争分析",
          content: "学习如何分析竞争对手数据，制定竞争策略。",
          order_index: 5
        },
        {
          id: 6,
          title: "商业报告撰写",
          content: "学习如何撰写专业的商业分析报告。",
          order_index: 6
        },
        {
          id: 7,
          title: "案例分析",
          content: "通过实际案例学习商业数据分析的应用。",
          order_index: 7
        }
      ],
      prerequisites: "熟悉Pandas库的基本使用",
      learning_outcomes: [
        "掌握商业数据分析的基本方法",
        "能够分析销售数据和客户行为",
        "能够识别市场机会和竞争优势",
        "能够撰写专业的商业分析报告"
      ],
      duration: "7周",
      lessons_count: 14,
      project: "市场分析项目"
    },
    {
      id: 9,
      title: "商业数据可视化与预测",
      level: "L4",
      description: "学习数据可视化和简单的商业预测模型，包括Matplotlib和Seaborn的使用。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20and%20forecasting%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "数据可视化基础",
          content: "学习数据可视化的基本原理和方法。",
          order_index: 1
        },
        {
          id: 2,
          title: "Matplotlib高级应用",
          content: "学习Matplotlib的高级功能，创建复杂的图表。",
          order_index: 2
        },
        {
          id: 3,
          title: "Seaborn库使用",
          content: "学习使用Seaborn库创建美观的统计图表。",
          order_index: 3
        },
        {
          id: 4,
          title: "交互式数据可视化",
          content: "学习创建交互式数据可视化。",
          order_index: 4
        },
        {
          id: 5,
          title: "时间序列分析",
          content: "学习时间序列分析的基本方法。",
          order_index: 5
        },
        {
          id: 6,
          title: "简单预测模型",
          content: "学习构建简单的商业预测模型。",
          order_index: 6
        },
        {
          id: 7,
          title: "案例分析",
          content: "通过实际案例学习数据可视化和预测的应用。",
          order_index: 7
        }
      ],
      prerequisites: "熟悉Python和Pandas库",
      learning_outcomes: [
        "掌握数据可视化的高级技巧",
        "能够创建美观的统计图表",
        "能够进行时间序列分析",
        "能够构建简单的商业预测模型"
      ],
      duration: "7周",
      lessons_count: 14,
      project: "销售数据可视化挑战"
    },
    {
      id: 10,
      title: "商业预测模型",
      level: "L4",
      description: "学习简单的商业预测模型，包括时间序列预测和回归分析。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20forecasting%20models%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: [
        {
          id: 1,
          title: "预测模型概述",
          content: "了解预测模型的基本概念和方法。",
          order_index: 1
        },
        {
          id: 2,
          title: "时间序列预测基础",
          content: "学习时间序列预测的基本方法。",
          order_index: 2
        },
        {
          id: 3,
          title: "移动平均模型",
          content: "学习移动平均模型的原理和应用。",
          order_index: 3
        },
        {
          id: 4,
          title: "指数平滑模型",
          content: "学习指数平滑模型的原理和应用。",
          order_index: 4
        },
        {
          id: 5,
          title: "线性回归分析",
          content: "学习线性回归分析的原理和应用。",
          order_index: 5
        },
        {
          id: 6,
          title: "多元回归分析",
          content: "学习多元回归分析的原理和应用。",
          order_index: 6
        },
        {
          id: 7,
          title: "模型评估与选择",
          content: "学习如何评估和选择预测模型。",
          order_index: 7
        },
        {
          id: 8,
          title: "预测模型实战",
          content: "通过实际案例学习预测模型的应用。",
          order_index: 8
        },
        {
          id: 9,
          title: "销售预测案例",
          content: "学习如何进行销售预测。",
          order_index: 9
        },
        {
          id: 10,
          title: "库存预测案例",
          content: "学习如何进行库存预测。",
          order_index: 10
        },
        {
          id: 11,
          title: "客户流失预测",
          content: "学习如何预测客户流失。",
          order_index: 11
        },
        {
          id: 12,
          title: "预测模型项目总结",
          content: "总结预测模型项目的经验和教训。",
          order_index: 12
        }
      ],
      prerequisites: "具备Python编程知识和数据分析基础",
      learning_outcomes: [
        "掌握时间序列预测方法",
        "能够构建线性回归模型",
        "能够评估和选择预测模型",
        "能够应用预测模型解决商业问题"
      ],
      duration: "6周",
      lessons_count: 12,
      project: "销售预测模型项目"
    }
  ];

  const course = mockCourses.find(c => c.id === Number(id)) || mockCourses[0];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Course Image */}
          <div className="md:w-1/3">
            <img 
              src={course.image_url} 
              alt={course.title} 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-gray-700">{course.duration}</span>
              </div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-gray-700">{course.lessons_count} 课时</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {course.level}
                </div>
              </div>
              <Link to={`/courses/${course.id}/lessons/1`} className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors block text-center font-semibold">
                开始学习
              </Link>
            </div>
          </div>

          {/* Course Details */}
          <div className="md:w-2/3">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-3">
              {course.level}
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            {/* Prerequisites */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3"> prerequisites</h2>
              <p className="text-gray-600">{course.prerequisites}</p>
            </div>

            {/* Learning Outcomes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">学习目标</h2>
              <ul className="space-y-2">
                {course.learning_outcomes?.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Project */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">课程项目</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{course.project}</h3>
                <p className="text-gray-600">
                  通过实际的销售数据分析项目，应用所学的Python和数据分析技能，完成数据清洗、分析和可视化。
                </p>
              </div>
            </div>

            {/* Lesson List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">课程大纲</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {course.lessons?.map((lesson) => (
                  <Link 
                    key={lesson.id} 
                    to={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="block border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                          {lesson.order_index}
                        </div>
                        <span className="text-gray-800">{lesson.title}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;