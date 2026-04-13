# DataLearn - 商务数据分析在线教育平台

基于Python的数据分析在线教育平台，为商务数据分析与应用专业学生提供从基础到进阶的课程体系。

## 功能特点

- **完整的课程体系**：按L1-L4分级，包含Python基础、数据采集、数据处理（Pandas）、商业可视化、简单商业预测的进阶式课程目录
- **互动式学习模块**：三栏式交互布局，左侧商业场景描述+中间代码编辑器+右侧运行结果/可视化图表
- **学练测闭环**：知识点讲解、随堂代码填空练习、阶段项目测评
- **成就激励系统**：通过完成课程和项目获得徽章和证书

## 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS 3 + Vite
- **状态管理**：Zustand
- **路由**：React Router DOM
- **Python执行**：Pyodide（浏览器端Python运行时）
- **后端服务**：Supabase（免费 tier）
  - 认证：Supabase Auth
  - 数据库：Supabase PostgreSQL
- **部署**：Cloudflare Pages

## 项目结构

```
├── src/
│   ├── components/       # 组件
│   ├── pages/            # 页面
│   │   └── Auth/         # 认证相关页面
│   ├── store/            # 状态管理
│   ├── types/            # TypeScript类型定义
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 应用入口
│   └── main.tsx          # 主入口
├── public/               # 静态资源
├── .trae/documents/      # 产品需求文档和技术架构文档
├── package.json          # 项目配置
├── vite.config.ts        # Vite配置
└── README.md             # 项目说明
```

## 快速开始

### 1. 环境准备

- Node.js 18+
- npm 9+

### 2. 安装依赖

```bash
npm install
```

### 3. 配置Supabase

1. 登录 [Supabase](https://supabase.com/) 并创建新项目
2. 在 `src/utils/supabase.ts` 中更新 `supabaseUrl` 和 `supabaseAnonKey`
3. 在Supabase控制台中创建所需的数据库表（参考技术架构文档中的DDL语句）

### 4. 本地开发

```bash
npm run dev
```

### 5. 构建生产版本

```bash
npm run build
```

### 6. 部署到Cloudflare Pages

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 连接到你的GitHub仓库
3. 配置构建命令：`npm run build`
4. 配置构建输出目录：`dist`
5. 部署项目

## 课程体系

### L1 - Python基础
- Python基础与数据科学入门
- Python数据分析实战

### L2 - 数据采集
- 数据采集与预处理
- 网络爬虫实战
- 数据清洗与预处理

### L3 - 数据处理
- Pandas数据处理与分析
- Pandas高级应用
- 商业数据分析

### L4 - 商业应用
- 商业数据可视化与预测
- 商业预测模型

## 核心功能

1. **交互式代码编辑器**：使用Pyodide在浏览器端运行Python代码
2. **实时反馈**：代码运行结果实时显示
3. **进度跟踪**：记录用户学习进度
4. **成就系统**：完成课程和项目获得徽章
5. **响应式设计**：适配桌面、平板和移动设备

## 注意事项

- 本项目使用Pyodide在浏览器端运行Python代码，可能会受到浏览器性能限制
- 部分功能需要Supabase服务支持，请确保正确配置Supabase
- 部署到Cloudflare Pages时，确保构建配置正确

## 许可证

MIT License