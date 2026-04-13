import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { BookOpen, Code, TrendingUp, BarChart3 } from 'lucide-react';

const Home: React.FC = () => {
  const { loadCourses, courses, user, loadUser, isLoading } = useStore();

  useEffect(() => {
    loadCourses();
    loadUser();
  }, []);

  // Mock course data for demonstration
  const mockCourses = [
    {
      id: 1,
      title: "Python基础与数据科学入门",
      level: "L1",
      description: "掌握Python基础语法和数据科学库的使用",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20for%20data%20science%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 8
    },
    {
      id: 2,
      title: "数据采集与预处理",
      level: "L2",
      description: "学习网络爬虫和数据清洗技术",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20collection%20and%20preprocessing%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 10
    },
    {
      id: 3,
      title: "Pandas数据处理与分析",
      level: "L3",
      description: "深入学习Pandas库进行数据处理和分析",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pandas%20data%20analysis%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 12
    },
    {
      id: 4,
      title: "商业数据可视化与预测",
      level: "L4",
      description: "学习数据可视化和简单的商业预测模型",
      image_url: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20and%20forecasting%2C%20modern%20clean%20design&image_size=landscape_16_9",
      lessons: 14
    }
  ];

  const levels = [
    {
      level: "L1",
      title: "Python基础",
      description: "掌握Python基础语法和数据科学库的使用",
      icon: <Code className="h-8 w-8 text-blue-600" />,
      courses: 2
    },
    {
      level: "L2",
      title: "数据采集",
      description: "学习网络爬虫和数据清洗技术",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      courses: 3
    },
    {
      level: "L3",
      title: "数据处理",
      description: "深入学习Pandas库进行数据处理和分析",
      icon: <BarChart3 className="h-8 w-8 text-amber-600" />,
      courses: 3
    },
    {
      level: "L4",
      title: "商业应用",
      description: "学习数据可视化和简单的商业预测模型",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      courses: 2
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                商务数据分析与应用
              </h1>
              <p className="text-xl mb-8">
                基于Python的数据分析在线学习平台，帮助你掌握商业场景中的数据分析技能
              </p>
              <div className="flex space-x-4">
                <Link to="/courses" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  浏览课程
                </Link>
                {!user && (
                  <Link to="/auth/register" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    免费注册
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20analysis%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20clean%20design&image_size=landscape_16_9" 
                alt="Data Analysis Dashboard" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">课程体系</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {levels.map((level) => (
              <div key={level.level} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {level.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{level.level} - {level.title}</h3>
                <p className="text-gray-600 mb-4">{level.description}</p>
                <p className="text-sm text-gray-500 mb-4">{level.courses} 门课程</p>
                <Link to={`/courses?level=${level.level}`} className="text-blue-600 font-medium hover:underline">
                  查看课程 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">推荐课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCourses.map((course) => (
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{course.lessons} 课时</span>
                    <Link to={`/courses/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">开始你的数据分析之旅</h2>
          <p className="text-xl mb-8">
            无论你是初学者还是有经验的专业人士，我们都能帮助你提升数据分析技能
          </p>
          <Link to="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block">
            立即开始学习
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;