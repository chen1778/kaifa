import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Practice: React.FC = () => {
  const navigate = useNavigate();

  const handleStartPractice = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-5 w-5 mr-1" />
            返回首页
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">练习中心</h1>
        <p className="text-gray-600 mb-8">
          在这里，你可以通过各种练习来巩固所学的数据分析技能。
          从基础的Python语法到复杂的商业数据分析，我们提供了丰富的练习题目。
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">练习分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-blue-700 mb-2">Python基础</h3>
              <p className="text-gray-600 text-sm">变量、数据类型、控制流等基础概念</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-green-700 mb-2">数据处理</h3>
              <p className="text-gray-600 text-sm">Pandas库的使用，数据清洗与转换</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-purple-700 mb-2">数据可视化</h3>
              <p className="text-gray-600 text-sm">Matplotlib、Seaborn等库的使用</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-orange-700 mb-2">商业分析</h3>
              <p className="text-gray-600 text-sm">销售分析、市场趋势预测等商业场景</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">推荐练习</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">数据分析入门练习</h3>
              <p className="text-gray-600 text-sm mb-3">完成10个基础Python数据分析任务，掌握核心概念</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    成就：初学者
                  </span>
                </div>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleStartPractice('1')}
                >
                  开始练习
                </button>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">销售数据可视化挑战</h3>
              <p className="text-gray-600 text-sm mb-3">使用Matplotlib创建销售数据图表，分析销售趋势</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    成就：可视化大师
                  </span>
                </div>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleStartPractice('9')}
                >
                  开始练习
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">市场分析项目</h3>
              <p className="text-gray-600 text-sm mb-3">分析市场数据，识别潜在商机，提供商业建议</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    成就：商业洞察
                  </span>
                </div>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleStartPractice('8')}
                >
                  开始练习
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">练习成就进度</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">练习达人 (完成10个练习)</span>
                <span className="text-sm text-gray-500">3/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">项目专家 (完成3个项目)</span>
                <span className="text-sm text-gray-500">1/3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="/achievements" className="text-blue-600 hover:text-blue-800 transition-colors">
              查看所有成就 →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;