export interface Lesson {
    type: string;
    title: string;
    resume: string;
    video: VideoLesson ;
}

export interface VideoLesson {
    file_name: string;
    format: string;
}

export  interface Module {
    title: string;
    lessons: Lesson[];
}

export interface Category {
  title: string;
  description: string;
}

export interface Language {
  code: string;
  description: string;
}

export interface CoverCourse {
  file_name: string;
  format: string;
}

export  interface Course {
    title: string;
    description: string;
    price: number;
    original_price: number;
    language: Language;
    categories: Number[];
    modules: Module[];
    objectives: string[],
    features: string[],
    cover_course: CoverCourse;
    certificateEnabled: boolean;
  }
