import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { Clock, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loadCourse, currentCourse, isLoading } = useStore();

  useEffect(() => {
    if (id) {
      loadCourse(Number(id));
    }
  }, [id]);

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