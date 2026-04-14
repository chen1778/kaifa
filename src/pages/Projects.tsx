import React from 'react';
import { useNavigate } from 'react-router-dom';

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleViewProject = (projectId: string) => {
    // 这里可以根据项目ID导航到相应的项目详情页
    // 目前暂时导航到课程页面作为示例
    navigate(`/courses/${projectId}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">项目中心</h1>
        <p className="text-gray-600 mb-8">
          在这里，你可以查看和参与各种数据分析项目，将所学知识应用到实际商业场景中。
          这些项目涵盖了不同行业的数据分析需求，帮助你积累实战经验。
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">项目分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-blue-700 mb-2">销售分析</h3>
              <p className="text-gray-600 text-sm">分析销售数据，优化销售策略</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-green-700 mb-2">市场研究</h3>
              <p className="text-gray-600 text-sm">市场趋势分析，竞争对手研究</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-purple-700 mb-2">客户分析</h3>
              <p className="text-gray-600 text-sm">客户行为分析，用户画像构建</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors cursor-pointer">
              <h3 className="font-medium text-orange-700 mb-2">财务分析</h3>
              <p className="text-gray-600 text-sm">财务数据处理，预算规划</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">推荐项目</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">电商销售数据分析</h3>
              <p className="text-gray-600 text-sm mb-3">
                分析电商平台销售数据，识别热销产品，分析销售趋势，
                为库存管理和营销决策提供数据支持。
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">难度：中级</span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleViewProject('8')}
                >
                  查看项目
                </button>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">社交媒体情感分析</h3>
              <p className="text-gray-600 text-sm mb-3">
                收集和分析社交媒体数据，评估品牌声誉，
                了解客户反馈，为品牌策略调整提供依据。
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">难度：高级</span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleViewProject('9')}
                >
                  查看项目
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">房地产市场分析</h3>
              <p className="text-gray-600 text-sm mb-3">
                分析房地产市场数据，预测房价趋势，
                评估投资机会，为房地产决策提供参考。
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">难度：中级</span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => handleViewProject('9')}
                >
                  查看项目
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;