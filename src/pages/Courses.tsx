import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../store';

const Courses: React.FC = () => {
  const { loadCourses, courses, isLoading } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');

  useEffect(() => {
    loadCourses();
  }, []);

  // Mock course data for demonstration
  const mockCourses = [
    {
      id: 1,
      title: "Python基础与数据科学入门",
      level: "L1",
      description: "掌握Python基础语法和数据科学库的使用，包括NumPy和Pandas的基本操作。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20for%20data%20science%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 8,
      duration: "4周"
    },
    {
      id: 2,
      title: "Python数据分析实战",
      level: "L1",
      description: "通过实际案例学习Python数据分析的基本流程和方法。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20hands-on%20practice%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 10,
      duration: "5周"
    },
    {
      id: 3,
      title: "数据采集与预处理",
      level: "L2",
      description: "学习网络爬虫和数据清洗技术，掌握数据采集的完整流程。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20preprocessing%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 10,
      duration: "5周"
    },
    {
      id: 4,
      title: "网络爬虫实战",
      level: "L2",
      description: "使用Python实现网络爬虫，采集互联网上的商业数据。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Web%20scraping%20with%20Python%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 8,
      duration: "4周"
    },
    {
      id: 5,
      title: "数据清洗与预处理",
      level: "L2",
      description: "学习数据清洗的各种技术，处理缺失值、异常值和重复数据。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20cleaning%20and%20preprocessing%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 12,
      duration: "6周"
    },
    {
      id: 6,
      title: "Pandas数据处理与分析",
      level: "L3",
      description: "深入学习Pandas库进行数据处理和分析，掌握高级数据操作技巧。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pandas%20data%20analysis%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 12,
      duration: "6周"
    },
    {
      id: 7,
      title: "Pandas高级应用",
      level: "L3",
      description: "学习Pandas的高级功能，包括时间序列分析和数据聚合。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20Pandas%20techniques%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 10,
      duration: "5周"
    },
    {
      id: 8,
      title: "商业数据分析",
      level: "L3",
      description: "使用Pandas进行商业数据分析，包括销售数据分析和客户行为分析。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 14,
      duration: "7周"
    },
    {
      id: 9,
      title: "商业数据可视化与预测",
      level: "L4",
      description: "学习数据可视化和简单的商业预测模型，包括Matplotlib和Seaborn的使用。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20and%20forecasting%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 14,
      duration: "7周"
    },
    {
      id: 10,
      title: "商业预测模型",
      level: "L4",
      description: "学习简单的商业预测模型，包括时间序列预测和回归分析。",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20forecasting%20models%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 12,
      duration: "6周"
    }
  ];

  const filteredCourses = selectedLevel === 'all' 
    ? mockCourses 
    : mockCourses.filter(course => course.level === selectedLevel);

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setSearchParams({ level });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">课程目录</h1>
        
        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleLevelChange('all')}
            className={`px-4 py-2 rounded-md ${selectedLevel === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            全部课程
          </button>
          <button
            onClick={() => handleLevelChange('L1')}
            className={`px-4 py-2 rounded-md ${selectedLevel === 'L1' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            L1 - Python基础
          </button>
          <button
            onClick={() => handleLevelChange('L2')}
            className={`px-4 py-2 rounded-md ${selectedLevel === 'L2' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            L2 - 数据采集
          </button>
          <button
            onClick={() => handleLevelChange('L3')}
            className={`px-4 py-2 rounded-md ${selectedLevel === 'L3' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            L3 - 数据处理
          </button>
          <button
            onClick={() => handleLevelChange('L4')}
            className={`px-4 py-2 rounded-md ${selectedLevel === 'L4' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            L4 - 商业应用
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={course.image_url} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-3">
                  {course.level}
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">{course.lessons} 课时</span>
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                </div>
                <Link to={`/courses/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors block text-center">
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">暂无符合条件的课程</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;