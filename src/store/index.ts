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
  },
  
  loadCourses: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase.from('courses').select('*').order('level');
    
    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }
    
    set({ courses: data || [], isLoading: false });
  },
  
  loadCourse: async (courseId) => {
    set({ isLoading: true });
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
  },
  
  loadLesson: async (courseId, lessonId) => {
    set({ isLoading: true });
    
    // 模拟数据 - 实际项目中应该从数据库获取
    const mockLessons = {
      1: [
        { id: 1, course_id: 1, title: 'Python环境搭建', content: 'Python环境搭建是学习Python的第一步。在本课时中，我们将学习如何安装Python、配置开发环境，以及如何使用Jupyter Notebook进行交互式编程。', order: 1, duration: '45分钟' },
        { id: 2, course_id: 1, title: 'Python基础语法', content: 'Python基础语法是Python编程的基础。在本课时中，我们将学习Python的基本数据类型、变量、运算符、控制流等基础知识。', order: 2, duration: '60分钟' },
        { id: 3, course_id: 1, title: 'Python函数和模块', content: 'Python函数和模块是Python编程的重要组成部分。在本课时中，我们将学习如何定义和使用函数，以及如何创建和使用模块。', order: 3, duration: '60分钟' },
        { id: 4, course_id: 1, title: 'NumPy基础', content: 'NumPy是Python中用于科学计算的重要库。在本课时中，我们将学习NumPy的基本概念和使用方法，包括数组创建、索引和操作等。', order: 4, duration: '60分钟' },
        { id: 5, course_id: 1, title: 'Pandas基础', content: 'Pandas是Python中用于数据处理和分析的重要库。在本课时中，我们将学习Pandas的基本概念和使用方法，包括Series和DataFrame的操作等。', order: 5, duration: '60分钟' },
        { id: 6, course_id: 1, title: '数据可视化基础', content: '数据可视化是数据分析的重要组成部分。在本课时中，我们将学习如何使用Matplotlib库创建各种类型的图表，包括折线图、柱状图和散点图等。', order: 6, duration: '60分钟' },
        { id: 7, course_id: 1, title: '商业数据分析案例', content: '商业数据分析案例是将Python应用于实际商业场景的重要实践。在本课时中，我们将通过一个完整的商业数据分析案例，学习如何使用Python进行数据清洗、分析和可视化。', order: 7, duration: '90分钟' },
        { id: 8, course_id: 1, title: '课程总结与项目实践', content: '课程总结与项目实践是对本课程内容的回顾和应用。在本课时中，我们将总结课程内容，并完成一个小型的商业数据分析项目。', order: 8, duration: '90分钟' }
      ],
      8: [
        { id: 1, course_id: 8, title: '商业数据分析概述', content: '商业数据分析概述介绍了商业数据分析的基本概念、方法和应用场景。在本课时中，我们将学习商业数据分析的重要性、流程和常用工具。', order: 1, duration: '45分钟' },
        { id: 2, course_id: 8, title: '销售数据分析', content: '销售数据分析是商业数据分析的重要组成部分。在本课时中，我们将学习如何分析销售数据，包括销售趋势、产品分析和客户分析等。', order: 2, duration: '60分钟' },
        { id: 3, course_id: 8, title: '客户行为分析', content: '客户行为分析是商业数据分析的重要组成部分。在本课时中，我们将学习如何分析客户行为数据，包括客户细分、购买行为和客户生命周期等。', order: 3, duration: '60分钟' },
        { id: 4, course_id: 8, title: '市场分析', content: '市场分析是商业数据分析的重要组成部分。在本课时中，我们将学习如何分析市场数据，包括市场趋势、竞争对手分析和市场机会识别等。', order: 4, duration: '60分钟' },
        { id: 5, course_id: 8, title: '竞争分析', content: '竞争分析是商业数据分析的重要组成部分。在本课时中，我们将学习如何分析竞争对手数据，包括竞争对手的产品、定价和市场策略等。', order: 5, duration: '60分钟' },
        { id: 6, course_id: 8, title: '商业报告撰写', content: '商业报告撰写是商业数据分析的重要组成部分。在本课时中，我们将学习如何撰写专业的商业分析报告，包括报告结构、数据可视化和结论建议等。', order: 6, duration: '60分钟' },
        { id: 7, course_id: 8, title: '案例分析', content: '案例分析是商业数据分析的重要实践。在本课时中，我们将通过一个完整的商业数据分析案例，学习如何应用所学的分析方法和工具解决实际商业问题。', order: 7, duration: '90分钟' }
      ],
      9: [
        { id: 1, course_id: 9, title: '数据可视化基础', content: '数据可视化基础介绍了数据可视化的基本概念、原则和方法。在本课时中，我们将学习如何使用Matplotlib和Seaborn库创建各种类型的图表。', order: 1, duration: '60分钟' },
        { id: 2, course_id: 9, title: 'Matplotlib高级应用', content: 'Matplotlib高级应用介绍了Matplotlib库的高级功能和用法。在本课时中，我们将学习如何创建复杂的图表，包括子图、多轴图表和交互式图表等。', order: 2, duration: '60分钟' },
        { id: 3, course_id: 9, title: 'Seaborn库使用', content: 'Seaborn库是基于Matplotlib的高级数据可视化库。在本课时中，我们将学习如何使用Seaborn库创建美观的统计图表，包括热力图、箱线图和小提琴图等。', order: 3, duration: '60分钟' },
        { id: 4, course_id: 9, title: '交互式数据可视化', content: '交互式数据可视化是数据可视化的重要发展方向。在本课时中，我们将学习如何使用Plotly库创建交互式图表，包括交互式折线图、散点图和地图等。', order: 4, duration: '60分钟' },
        { id: 5, course_id: 9, title: '时间序列分析', content: '时间序列分析是商业数据分析的重要方法。在本课时中，我们将学习如何分析时间序列数据，包括趋势分析、季节性分析和预测等。', order: 5, duration: '60分钟' },
        { id: 6, course_id: 9, title: '简单预测模型', content: '简单预测模型是商业预测的重要工具。在本课时中，我们将学习如何构建简单的预测模型，包括移动平均、指数平滑和线性回归等。', order: 6, duration: '60分钟' },
        { id: 7, course_id: 9, title: '案例分析', content: '案例分析是商业数据可视化与预测的重要实践。在本课时中，我们将通过一个完整的案例，学习如何创建交互式可视化和进行销售预测。', order: 7, duration: '90分钟' }
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
    
    set({ currentLesson: lesson, isLoading: false });
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