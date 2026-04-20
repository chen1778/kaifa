import React from 'react';
import { BookOpen, Download, ExternalLink, Star, Clock, FileText, Video, Code, BookOpenCheck, Share2 } from 'lucide-react';

const ResourceShare: React.FC = () => {
  // 真实的资源数据
  const resources = [
    {
      id: 1,
      title: "Python数据分析实战",
      description: "从入门到精通的Python数据分析实战指南，包含大量实战案例",
      type: "ebook",
      level: "中级",
      tags: ["Python", "数据分析", "Pandas"],
      downloadUrl: "https://github.com/ageron/handson-ml2/archive/refs/heads/master.zip",
      externalUrl: "https://github.com/ageron/handson-ml2",
      rating: 4.8,
      views: 1200,
      date: "2026-04-01"
    },
    {
      id: 2,
      title: "NumPy官方文档",
      description: "NumPy库的官方文档，包含详细的API说明和示例",
      type: "documentation",
      level: "高级",
      tags: ["NumPy", "数值计算", "Python"],
      downloadUrl: "https://numpy.org/doc/stable/numpy-user.pdf",
      externalUrl: "https://numpy.org/doc/",
      rating: 4.9,
      views: 850,
      date: "2026-03-15"
    },
    {
      id: 3,
      title: "Pandas视频教程",
      description: "Pandas库的视频教程，从基础到高级应用",
      type: "video",
      level: "初级",
      tags: ["Pandas", "数据处理", "Python"],
      downloadUrl: null,
      externalUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
      rating: 4.7,
      views: 980,
      date: "2026-03-20"
    },
    {
      id: 4,
      title: "Matplotlib数据可视化",
      description: "Matplotlib库的使用指南，学习如何创建各种数据可视化图表",
      type: "ebook",
      level: "中级",
      tags: ["Matplotlib", "数据可视化", "Python"],
      downloadUrl: "https://matplotlib.org/stable/Matplotlib.pdf",
      externalUrl: "https://matplotlib.org/stable/tutorials/index.html",
      rating: 4.6,
      views: 750,
      date: "2026-03-10"
    },
    {
      id: 5,
      title: "Scikit-learn机器学习",
      description: "Scikit-learn库的使用指南，包含机器学习算法的实现",
      type: "documentation",
      level: "高级",
      tags: ["Scikit-learn", "机器学习", "Python"],
      downloadUrl: "https://scikit-learn.org/stable/_downloads/scikit-learn-docs.pdf",
      externalUrl: "https://scikit-learn.org/stable/",
      rating: 4.9,
      views: 1100,
      date: "2026-03-25"
    },
    {
      id: 6,
      title: "数据科学实战项目",
      description: "多个数据科学实战项目，包含完整的代码和分析过程",
      type: "code",
      level: "中级",
      tags: ["数据科学", "实战项目", "Python"],
      downloadUrl: "https://github.com/zhuyingda/data-science-examples/archive/refs/heads/master.zip",
      externalUrl: "https://github.com/zhuyingda/data-science-examples",
      rating: 4.8,
      views: 820,
      date: "2026-03-30"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'code':
        return <Code className="h-5 w-5 text-green-600" />;
      case 'documentation':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <BookOpenCheck className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <Share2 className="h-8 w-8 inline mr-2 text-blue-600" /> 资源分享
          </h1>
          <p className="text-gray-600">
            探索和分享Python数据分析相关的学习资源，助力你的学习之旅
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {getTypeIcon(resource.type)}
                <h3 className="text-xl font-semibold text-gray-800 ml-3">{resource.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-700 ml-1">{resource.rating}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{resource.date}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                {resource.downloadUrl && (
                  <a 
                    href={resource.downloadUrl} 
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    下载
                  </a>
                )}
                {resource.externalUrl && (
                  <a 
                    href={resource.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    访问
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">分享你的资源</h2>
        <p className="text-gray-600 mb-4">
          如果你有好的学习资源想要分享给其他同学，请联系我们的管理员，我们会审核后添加到资源库中。
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          提交资源
        </button>
      </div>
    </div>
  );
};

export default ResourceShare;