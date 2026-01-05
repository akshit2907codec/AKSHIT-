
export enum SkillCategory {
  LANGUAGES = 'Languages',
  AI_ML = 'AI & Machine Learning',
  DATA_SCIENCE = 'Data Science',
  DEVELOPMENT = 'Development'
}

export enum UserRank {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  progress: number;
  concepts: {
    title: string;
    description: string;
  }[]; 
}

export interface Guild {
  id: string;
  name: string;
  rank: number;
  members: number;
  exp: number;
  tag: string;
}

export interface UserStats {
  level: number;
  streak: number;
  points: number;
  xp: number;
  rank: UserRank;
  enrolledSkillIds: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  sender?: string;
  timestamp: string;
  avatarColor: string;
}

export interface WarRoomMission {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: string;
  progress: number;
  type: 'CODING' | 'LEARNING' | 'REVIEW';
  squadCapacity: number;
  currentSquad: number;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'BASIC' | 'INTERMEDIATE';
  starterCode: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  isCompleted: boolean;
  icon: string;
}

export interface StudyTask {
  id: string;
  text: string;
  isCompleted: boolean;
}
