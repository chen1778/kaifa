export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
  last_login: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  image_url: string;
  created_at: string;
  lessons?: Lesson[];
  prerequisites?: string;
  learning_outcomes?: string[];
  duration?: string;
  lessons_count?: number;
  project?: string;
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
  code_example?: string;
  learning_points?: string[];
  business_scenario?: string;
  pitfalls?: string;
}

export interface CodeExample {
  id: number;
  lesson_id: number;
  title: string;
  code: string;
  explanation: string;
}

export interface PracticeExercise {
  id: number;
  course_id: number;
  title: string;
  description: string;
  template_code: string;
  difficulty: string;
  created_at: string;
}

export interface TestCase {
  id: number;
  exercise_id: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface Project {
  id: number;
  course_id: number;
  title: string;
  description: string;
  requirements: string;
  difficulty: string;
  created_at: string;
}

export interface Progress {
  id: number;
  user_id: string;
  course_id: number;
  lesson_id: number;
  completed: boolean;
  completion_date: string;
  last_accessed: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon_url: string;
}

export interface UserAchievement {
  id: number;
  user_id: string;
  achievement_id: number;
  earned_at: string;
}

export interface ProjectSubmission {
  id: number;
  user_id: string;
  project_id: number;
  code: string;
  description: string;
  submitted_at: string;
  score: number;
}

export interface EvaluationResult {
  id: number;
  submission_id: number;
  test_case_id: number;
  passed: boolean;
  actual_output: string;
  execution_time: number;
}

export interface CourseWithLessons extends Course {
  lessons: Lesson[];
}

export interface LessonWithCodeExamples extends Lesson {
  code_examples: CodeExample[];
}