
export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'food';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  streak?: number;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  challengesCompleted: number;
  level: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface ImpactData {
  plasticSaved: number; // in grams
  energySaved: number; // in kWh
  carbonSaved: number; // in kg CO2
  waterSaved: number; // in liters
}

export interface EcoFact {
  id: string;
  title: string;
  content: string;
  category: string;
  funLevel: number; // 1-5 scale
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  level: number;
  rank: number;
}
