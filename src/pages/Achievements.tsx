import React from 'react';

const Achievements: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">成就中心</h1>
        <p className="text-gray-600 mb-8">
          在这里，你可以查看你的学习成就和获得的徽章。
          完成课程、练习和项目可以获得不同的成就和徽章，
          展示你的数据分析技能和学习进度。
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">我的成就</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 hover:bg-yellow-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-yellow-600 font-bold text-xl">🏆</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">初学者</h3>
                  <p className="text-gray-600 text-sm mb-2">完成第一个课程</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                      相关练习：数据分析入门
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xl">📊</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">数据分析师</h3>
                  <p className="text-gray-600 text-sm mb-2">完成数据处理课程</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      相关练习：数据处理基础
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">📈</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">可视化大师</h3>
                  <p className="text-gray-600 text-sm mb-2">完成数据可视化课程</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      相关练习：销售数据可视化
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">💡</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">商业洞察</h3>
                  <p className="text-gray-600 text-sm mb-2">完成商业分析课程</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                      相关项目：市场分析
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-orange-600 font-bold text-xl">🎯</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">练习达人</h3>
                  <p className="text-gray-600 text-sm mb-2">完成10个练习</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">
                      进度：3/10
                    </span>
                    <a href="/practice" className="text-blue-600 text-xs hover:underline">
                      继续练习 →
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 hover:bg-red-100 transition-colors">
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-red-600 font-bold text-xl">🚀</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 mb-1">项目专家</h3>
                  <p className="text-gray-600 text-sm mb-2">完成3个项目</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                      进度：1/3
                    </span>
                    <a href="/projects" className="text-blue-600 text-xs hover:underline">
                      查看项目 →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">学习进度</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Python基础</span>
                <span className="text-sm text-gray-500">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">数据处理</span>
                <span className="text-sm text-gray-500">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">数据可视化</span>
                <span className="text-sm text-gray-500">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">商业分析</span>
                <span className="text-sm text-gray-500">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;