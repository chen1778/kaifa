import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { User, Course, Lesson, Progress, Achievement } from '../types';

interface AppState {
  // User state
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Course state
  courses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  
  // Progress state
  progress: Progress[];
  
  // Achievement state
  achievements: Achievement[];
  userAchievements: Achievement[];
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  loadCourses: () => Promise<void>;
  loadCourse: (courseId: number) => Promise<void>;
  loadLesson: (courseId: number, lessonId: number) => Promise<void>;
  loadProgress: () => Promise<void>;
  updateProgress: (courseId: number, lessonId: number, completed: boolean) => Promise<void>;
  loadAchievements: () => Promise<void>;
  resetError: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,
  courses: [],
  currentCourse: null,
  currentLesson: null,
  progress: [],
  achievements: [],
  userAchievements: [],
  
  // Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }
    
    if (data.user) {
      set({ user: {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || '',
        avatar_url: data.user.user_metadata?.avatar_url || '',
        created_at: data.user.created_at,
        last_login: new Date().toISOString()
      }, isLoading: false });
      
      // Load user progress and achievements
      get().loadProgress();
      get().loadAchievements();
    }
  },
  
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    
    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }
    
    if (data.user) {
      set({ user: {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || '',
        avatar_url: data.user.user_metadata?.avatar_url || '',
        created_at: data.user.created_at,
        last_login: new Date().toISOString()
      }, isLoading: false });
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }
    
    set({ 
      user: null, 
      currentCourse: null, 
      currentLesson: null, 
      progress: [], 
      userAchievements: [],
      isLoading: false 
    });
  },
  
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        set({ user: {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          created_at: user.created_at,
          last_login: new Date().toISOString()
        }, isLoading: false });
        
        // Load user progress and achievements
        get().loadProgress();
        get().loadAchievements();
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('加载用户失败:', error);
      set({ isLoading: false });
    }
  },
  
  loadCourses: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('courses').select('*').order('level');
      
      if (error) {
        set({ error: error.message, isLoading: false });
        return;
      }
      
      set({ courses: data || [], isLoading: false });
    } catch (error) {
      console.error('加载课程失败:', error);
      set({ isLoading: false });
    }
  },
  
  loadCourse: async (courseId) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, lessons(*)')
        .eq('id', courseId)
        .single();
      
      if (error) {
        set({ error: error.message, isLoading: false });
        return;
      }
      
      set({ currentCourse: data, isLoading: false });
    } catch (error) {
      console.error('加载课程详情失败:', error);
      set({ isLoading: false });
    }
  },
  
  loadLesson: async (courseId, lessonId) => {
    set({ isLoading: true });
    try {
      // 模拟数据 - 实际项目中应该从数据库获取
      const mockLessons = {
        1: [
          { id: 1, course_id: 1, title: 'Python环境搭建', content: 'Python环境搭建是学习Python的第一步。在本课时中，我们将详细学习：\n\n1. Python的安装方法：\n   - 从官方网站下载并安装Python\n   - 配置环境变量\n   - 验证安装是否成功\n\n2. 开发环境选择：\n   - 命令行终端\n   - IDLE（Python自带编辑器）\n   - Visual Studio Code\n   - PyCharm\n\n3. Jupyter Notebook的安装和使用：\n   - 安装Jupyter Notebook\n   - 创建和运行Notebook\n   - Markdown语法基础\n\n4. 第一个Python程序：\n   - 输出"Hello, World!"\n   - 基本的交互式命令\n\n通过本课时的学习，您将能够搭建一个完整的Python开发环境，并开始编写和运行Python代码。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 1, title: 'Python基础语法', content: 'Python基础语法是Python编程的基础。在本课时中，我们将详细学习：\n\n1. 基本数据类型：\n   - 整数、浮点数、字符串\n   - 布尔值\n   - 列表、元组、字典、集合\n\n2. 变量和赋值：\n   - 变量命名规则\n   - 多重赋值\n   - 变量类型转换\n\n3. 运算符：\n   - 算术运算符\n   - 比较运算符\n   - 逻辑运算符\n   - 成员运算符\n\n4. 控制流：\n   - if-elif-else条件语句\n   - for循环\n   - while循环\n   - break和continue语句\n\n5. 输入输出：\n   - print()函数\n   - input()函数\n   - 格式化输出\n\n通过本课时的学习，您将掌握Python的基本语法，能够编写简单的Python程序。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 1, title: 'Python函数和模块', content: 'Python函数和模块是Python编程的重要组成部分。在本课时中，我们将详细学习：\n\n1. 函数定义和调用：\n   - def关键字\n   - 函数参数\n   - 默认参数\n   - 可变参数\n   - 函数返回值\n\n2. 作用域：\n   - 局部变量\n   - 全局变量\n   - nonlocal关键字\n\n3. 模块：\n   - 模块导入\n   - __name__变量\n   - 包的概念\n\n4. 常用内置函数：\n   - len()、max()、min()\n   - range()、list()、dict()\n   - zip()、enumerate()\n\n通过本课时的学习，您将能够定义和使用函数，以及创建和使用模块，提高代码的复用性和可维护性。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 1, title: 'NumPy基础', content: 'NumPy是Python中用于科学计算的重要库。在本课时中，我们将详细学习：\n\n1. NumPy简介：\n   - NumPy的安装\n   - NumPy的核心概念\n\n2. 数组创建：\n   - 从列表创建\n   - 内置函数创建（zeros、ones、arange等）\n   - 随机数生成\n\n3. 数组属性：\n   - shape、dtype、size\n   - ndim\n\n4. 数组索引和切片：\n   - 基本索引\n   - 切片操作\n   - 布尔索引\n   - 花式索引\n\n5. 数组操作：\n   - 基本运算\n   - 广播机制\n   - 常用数学函数\n\n通过本课时的学习，您将掌握NumPy的基本使用方法，为后续的数据分析打下基础。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 1, title: 'Pandas基础', content: 'Pandas是Python中用于数据处理和分析的重要库。在本课时中，我们将详细学习：\n\n1. Pandas简介：\n   - Pandas的安装\n   - Pandas的核心数据结构\n\n2. Series：\n   - Series的创建\n   - Series的索引和切片\n   - Series的基本操作\n\n3. DataFrame：\n   - DataFrame的创建\n   - DataFrame的索引和切片\n   - DataFrame的基本操作\n   - 数据类型转换\n\n4. 数据读取和写入：\n   - 读取CSV文件\n   - 读取Excel文件\n   - 写入数据\n\n5. 数据清洗：\n   - 处理缺失值\n   - 处理重复值\n   - 数据排序\n\n通过本课时的学习，您将掌握Pandas的基本使用方法，能够处理和分析实际的数据集。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 1, title: '数据可视化基础', content: '数据可视化是数据分析的重要组成部分。在本课时中，我们将详细学习：\n\n1. Matplotlib简介：\n   - Matplotlib的安装\n   - 基本概念\n\n2. 基本图表类型：\n   - 折线图\n   - 柱状图\n   - 散点图\n   - 饼图\n   - 直方图\n\n3. 图表定制：\n   - 标题和标签\n   - 图例\n   - 颜色和样式\n   - 网格和背景\n\n4. 多子图：\n   - subplot()函数\n   - subplots()函数\n\n5. 中文显示问题：\n   - 字体设置\n   - 负号显示\n\n通过本课时的学习，您将能够创建各种类型的图表，直观地展示数据。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 1, title: '商业数据分析案例', content: '商业数据分析案例是将Python应用于实际商业场景的重要实践。在本课时中，我们将通过一个完整的商业数据分析案例，详细学习：\n\n1. 案例背景：\n   - 电商销售数据\n   - 分析目标\n\n2. 数据收集和导入：\n   - 数据格式\n   - 使用Pandas读取数据\n\n3. 数据清洗和预处理：\n   - 处理缺失值\n   - 数据类型转换\n   - 数据筛选和过滤\n\n4. 数据探索和分析：\n   - 基本统计分析\n   - 按产品类别分析\n   - 按时间趋势分析\n   - 客户购买行为分析\n\n5. 数据可视化：\n   - 销售趋势图\n   - 产品类别分布图\n   - 客户购买行为分析图\n\n6. 分析结论和建议：\n   - 关键发现\n   - 业务建议\n\n通过本课时的学习，您将能够将所学知识应用到实际的商业数据分析场景中。', order: 7, duration: '90分钟' },
          { id: 8, course_id: 1, title: '课程总结与项目实践', content: '课程总结与项目实践是对本课程内容的回顾和应用。在本课时中，我们将：\n\n1. 课程内容总结：\n   - Python基础语法\n   - NumPy和Pandas库\n   - 数据可视化\n   - 商业数据分析\n\n2. 项目实践：\n   - 项目目标：分析销售数据，识别销售趋势和客户行为\n   - 数据准备：使用提供的销售数据集\n   - 分析步骤：\n     * 数据导入和清洗\n     * 数据探索和分析\n     * 数据可视化\n     * 生成分析报告\n\n3. 学习资源推荐：\n   - 书籍\n   - 在线课程\n   - 文档和社区\n\n4. 后续学习方向：\n   - 高级Python编程\n   - 机器学习基础\n   - 深度学习入门\n   - 大数据处理\n\n通过本课时的学习，您将巩固所学知识，并完成一个完整的商业数据分析项目。', order: 8, duration: '90分钟' }
        ],
        2: [
          { id: 1, course_id: 2, title: '数据分析概述', content: '了解数据分析的基本概念和流程。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 2, title: '数据导入与导出', content: '学习如何导入和导出各种格式的数据。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 2, title: '数据清洗基础', content: '学习数据清洗的基本方法和技巧。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 2, title: '数据探索分析', content: '学习如何探索和分析数据。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 2, title: '数据可视化实践', content: '通过实际案例学习数据可视化。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 2, title: '统计分析基础', content: '学习基本的统计分析方法。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 2, title: '商业案例分析', content: '通过商业案例学习数据分析的应用。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 2, title: '项目实践准备', content: '准备进行数据分析项目实践。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 2, title: '项目实施', content: '实施数据分析项目。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 2, title: '项目展示与总结', content: '展示项目成果并总结学习内容。', order: 10, duration: '60分钟' }
        ],
        3: [
          { id: 1, course_id: 3, title: '数据采集概述', content: '了解数据采集的基本概念和方法。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 3, title: '网络爬虫基础', content: '学习网络爬虫的基本原理和技术。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 3, title: '使用Requests获取数据', content: '学习使用Requests库获取网页数据。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 3, title: '使用BeautifulSoup解析数据', content: '学习使用BeautifulSoup解析HTML数据。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 3, title: '使用Selenium爬取动态数据', content: '学习使用Selenium爬取动态加载的数据。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 3, title: '数据存储', content: '学习如何存储采集的数据。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 3, title: '数据清洗概述', content: '了解数据清洗的基本概念和方法。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 3, title: '处理缺失值', content: '学习如何处理数据中的缺失值。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 3, title: '处理异常值', content: '学习如何处理数据中的异常值。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 3, title: '数据预处理实战', content: '通过实际案例学习数据预处理的完整流程。', order: 10, duration: '90分钟' }
        ],
        4: [
          { id: 1, course_id: 4, title: '网络爬虫进阶', content: '学习网络爬虫的高级技术和策略。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 4, title: '反爬策略应对', content: '学习如何应对网站的反爬措施。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 4, title: '异步爬虫', content: '学习使用异步技术提高爬虫效率。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 4, title: '分布式爬虫', content: '学习构建分布式爬虫系统。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 4, title: 'API数据采集', content: '学习通过API采集数据。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 4, title: '爬虫项目设计', content: '学习如何设计和规划爬虫项目。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 4, title: '爬虫实战案例', content: '通过实际案例学习网络爬虫的应用。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 4, title: '爬虫项目总结', content: '总结爬虫项目的经验和教训。', order: 8, duration: '60分钟' }
        ],
        5: [
          { id: 1, course_id: 5, title: '数据质量评估', content: '学习如何评估数据质量。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 5, title: '缺失值处理方法', content: '学习各种缺失值处理方法。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 5, title: '异常值检测与处理', content: '学习如何检测和处理异常值。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 5, title: '重复数据处理', content: '学习如何检测和处理重复数据。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 5, title: '数据类型转换', content: '学习如何进行数据类型转换。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 5, title: '数据标准化', content: '学习数据标准化的方法。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 5, title: '特征工程基础', content: '学习特征工程的基本概念和方法。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 5, title: '文本数据处理', content: '学习如何处理文本数据。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 5, title: '时间序列数据处理', content: '学习如何处理时间序列数据。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 5, title: '数据预处理管道', content: '学习如何构建数据预处理管道。', order: 10, duration: '60分钟' },
          { id: 11, course_id: 5, title: '预处理实战案例', content: '通过实际案例学习数据预处理的应用。', order: 11, duration: '60分钟' },
          { id: 12, course_id: 5, title: '预处理项目总结', content: '总结数据预处理项目的经验和教训。', order: 12, duration: '60分钟' }
        ],
        6: [
          { id: 1, course_id: 6, title: 'Pandas进阶', content: '学习Pandas的高级功能和用法。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 6, title: '数据索引与选择', content: '学习高级数据索引和选择方法。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 6, title: '数据合并与连接', content: '学习如何合并和连接数据。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 6, title: '数据分组与聚合', content: '学习数据分组和聚合操作。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 6, title: '窗口函数', content: '学习使用窗口函数进行数据分析。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 6, title: '时间序列处理', content: '学习使用Pandas处理时间序列数据。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 6, title: '文本数据处理', content: '学习使用Pandas处理文本数据。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 6, title: '数据透视表', content: '学习创建和使用数据透视表。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 6, title: '性能优化', content: '学习Pandas性能优化技巧。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 6, title: 'Pandas实战案例', content: '通过实际案例学习Pandas的应用。', order: 10, duration: '60分钟' },
          { id: 11, course_id: 6, title: '项目实践准备', content: '准备进行Pandas项目实践。', order: 11, duration: '60分钟' },
          { id: 12, course_id: 6, title: '项目展示与总结', content: '展示项目成果并总结学习内容。', order: 12, duration: '60分钟' }
        ],
        7: [
          { id: 1, course_id: 7, title: 'Pandas高级索引', content: '学习Pandas的高级索引技术。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 7, title: '高级数据转换', content: '学习高级数据转换技巧。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 7, title: '高级分组操作', content: '学习高级数据分组操作。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 7, title: '多级索引', content: '学习使用多级索引进行数据分析。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 7, title: '时间序列高级分析', content: '学习时间序列的高级分析方法。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 7, title: '数据可视化集成', content: '学习Pandas与数据可视化库的集成。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 7, title: '大数据处理', content: '学习使用Pandas处理大规模数据。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 7, title: '并行计算', content: '学习使用Pandas进行并行计算。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 7, title: 'Pandas实战案例', content: '通过实际案例学习Pandas的高级应用。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 7, title: '项目总结与展望', content: '总结项目经验并展望未来学习方向。', order: 10, duration: '60分钟' }
        ],
        8: [
          { id: 1, course_id: 8, title: '商业数据分析概述', content: '了解商业数据分析的基本概念和方法。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 8, title: '销售数据分析', content: '学习如何分析销售数据，识别销售趋势。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 8, title: '客户行为分析', content: '学习如何分析客户行为，识别客户细分。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 8, title: '市场分析', content: '学习如何分析市场数据，识别潜在商机。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 8, title: '竞争分析', content: '学习如何分析竞争对手数据，制定竞争策略。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 8, title: '商业报告撰写', content: '学习如何撰写专业的商业分析报告。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 8, title: '案例分析', content: '通过实际案例学习商业数据分析的应用。', order: 7, duration: '90分钟' }
        ],
        9: [
          { id: 1, course_id: 9, title: '数据可视化基础', content: '学习数据可视化的基本原理和方法。', order: 1, duration: '60分钟' },
          { id: 2, course_id: 9, title: 'Matplotlib高级应用', content: '学习Matplotlib的高级功能，创建复杂的图表。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 9, title: 'Seaborn库使用', content: '学习使用Seaborn库创建美观的统计图表。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 9, title: '交互式数据可视化', content: '学习创建交互式数据可视化。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 9, title: '时间序列分析', content: '学习时间序列分析的基本方法。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 9, title: '简单预测模型', content: '学习构建简单的商业预测模型。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 9, title: '案例分析', content: '通过实际案例学习数据可视化和预测的应用。', order: 7, duration: '90分钟' }
        ],
        10: [
          { id: 1, course_id: 10, title: '预测模型概述', content: '了解预测模型的基本概念和方法。', order: 1, duration: '45分钟' },
          { id: 2, course_id: 10, title: '时间序列预测基础', content: '学习时间序列预测的基本方法。', order: 2, duration: '60分钟' },
          { id: 3, course_id: 10, title: '移动平均模型', content: '学习移动平均模型的原理和应用。', order: 3, duration: '60分钟' },
          { id: 4, course_id: 10, title: '指数平滑模型', content: '学习指数平滑模型的原理和应用。', order: 4, duration: '60分钟' },
          { id: 5, course_id: 10, title: '线性回归分析', content: '学习线性回归分析的原理和应用。', order: 5, duration: '60分钟' },
          { id: 6, course_id: 10, title: '多元回归分析', content: '学习多元回归分析的原理和应用。', order: 6, duration: '60分钟' },
          { id: 7, course_id: 10, title: '模型评估与选择', content: '学习如何评估和选择预测模型。', order: 7, duration: '60分钟' },
          { id: 8, course_id: 10, title: '预测模型实战', content: '通过实际案例学习预测模型的应用。', order: 8, duration: '60分钟' },
          { id: 9, course_id: 10, title: '销售预测案例', content: '学习如何进行销售预测。', order: 9, duration: '60分钟' },
          { id: 10, course_id: 10, title: '库存预测案例', content: '学习如何进行库存预测。', order: 10, duration: '60分钟' },
          { id: 11, course_id: 10, title: '客户流失预测', content: '学习如何预测客户流失。', order: 11, duration: '60分钟' },
          { id: 12, course_id: 10, title: '预测模型项目总结', content: '总结预测模型项目的经验和教训。', order: 12, duration: '60分钟' }
        ]
      };
      
      // 从模拟数据中获取课时
      const courseLessons = mockLessons[courseId as keyof typeof mockLessons];
      if (!courseLessons) {
        set({ error: '课程不存在', isLoading: false });
        return;
      }
      
      const lesson = courseLessons.find(l => l.id === lessonId);
      if (!lesson) {
        set({ error: '课时不存在', isLoading: false });
        return;
      }
      
      // 添加缺失的属性以满足TypeScript类型要求
      const lessonWithRequiredProps = {
        ...lesson,
        order_index: lesson.order,
        created_at: new Date().toISOString()
      };
      
      set({ currentLesson: lessonWithRequiredProps, isLoading: false });
    } catch (error) {
      console.error('加载课时失败:', error);
      set({ isLoading: false });
    }
  },
  
  loadProgress: async () => {
    const user = get().user;
    if (!user) return;
    
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      set({ error: error.message });
      return;
    }
    
    set({ progress: data || [] });
  },
  
  updateProgress: async (courseId, lessonId, completed) => {
    const user = get().user;
    if (!user) return;
    
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        completed,
        completion_date: completed ? new Date().toISOString() : null,
        last_accessed: new Date().toISOString()
      })
      .select();
    
    if (error) {
      set({ error: error.message });
      return;
    }
    
    // Update local progress
    const progress = get().progress;
    const existingIndex = progress.findIndex(
      p => p.user_id === user.id && p.course_id === courseId && p.lesson_id === lessonId
    );
    
    if (existingIndex >= 0) {
      progress[existingIndex] = data[0];
    } else {
      progress.push(data[0]);
    }
    
    set({ progress });
  },
  
  loadAchievements: async () => {
    const user = get().user;
    if (!user) return;
    
    // Load all achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*');
    
    if (achievementsError) {
      set({ error: achievementsError.message });
      return;
    }
    
    // Load user achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', user.id);
    
    if (userAchievementsError) {
      set({ error: userAchievementsError.message });
      return;
    }
    
    // Get the actual achievement objects for user achievements
    const userAchievementObjects = achievements.filter(achievement => 
      userAchievements.some(ua => ua.achievement_id === achievement.id)
    );
    
    set({ 
      achievements: achievements || [],
      userAchievements: userAchievementObjects
    });
  },
  
  resetError: () => {
    set({ error: null });
  }
}));

// Helper function to get progress for a specific lesson
export const getLessonProgress = (courseId: number, lessonId: number) => {
  const { progress } = useStore.getState();
  return progress.find(p => p.course_id === courseId && p.lesson_id === lessonId);
};

// Helper function to get overall course progress
export const getCourseProgress = (courseId: number) => {
  const { progress, currentCourse } = useStore.getState();
  if (!currentCourse) return 0;
  
  const courseLessons = currentCourse.lessons?.length || 0;
  if (courseLessons === 0) return 0;
  
  const completedLessons = progress.filter(
    p => p.course_id === courseId && p.completed
  ).length;
  
  return Math.round((completedLessons / courseLessons) * 100);
};