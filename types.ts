
export enum StudyStyle {
  QuestionSolving = 'QuestionSolving',
  RoteLearning = 'RoteLearning',
  Balanced = 'Balanced',
}

export interface FormData {
  examName: string;
  chaptersRemaining: string;
  chaptersCompleted: string;
  examDate: string;
  studyStyle: StudyStyle;
  targetScore: string;
}

export interface ChapterPlan {
  chapterName: string;
  priority: 'High' | 'Medium' | 'Low';
  questionsToSolve: string;
  keyTopics: string[];
  revisionPlan: string[];
}

export interface StudyPhase {
  phase: string;
  focus: string;
  chapters: ChapterPlan[];
}

export interface Resource {
  name: string;
  type: string;
  reason: string;
}

export interface DetailedAdvice {
  weeklyGoals: string[];
  mockTestStrategy: string;
}

export interface StudyPlan {
  title: string;
  totalDays: number;
  totalHours: string;
  summary: string;
  studyPhases: StudyPhase[];
  recommendedSources: Resource[];
  detailedAdvice: DetailedAdvice;
  finalWords: string;
}
