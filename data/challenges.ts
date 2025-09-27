
import { Challenge } from '../types';

export const dailyChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Bring Your Own Bag',
    description: 'Use a reusable bag for shopping today',
    points: 10,
    category: 'waste',
    difficulty: 'easy',
    completed: false,
  },
  {
    id: '2',
    title: 'Unplug Electronics',
    description: 'Unplug devices when not in use for 2+ hours',
    points: 15,
    category: 'energy',
    difficulty: 'easy',
    completed: false,
  },
  {
    id: '3',
    title: 'Shorter Shower',
    description: 'Take a shower under 5 minutes',
    points: 20,
    category: 'water',
    difficulty: 'medium',
    completed: false,
  },
  {
    id: '4',
    title: 'Walk or Bike',
    description: 'Choose walking or biking over driving for short trips',
    points: 25,
    category: 'transport',
    difficulty: 'medium',
    completed: false,
  },
  {
    id: '5',
    title: 'Meatless Meal',
    description: 'Have at least one plant-based meal today',
    points: 30,
    category: 'food',
    difficulty: 'medium',
    completed: false,
  },
];

export const weeklyGoals: Challenge[] = [
  {
    id: 'w1',
    title: 'Zero Plastic Week',
    description: 'Avoid single-use plastics for 7 days',
    points: 100,
    category: 'waste',
    difficulty: 'hard',
    completed: false,
  },
  {
    id: 'w2',
    title: 'Energy Saver',
    description: 'Reduce energy consumption by 20% this week',
    points: 150,
    category: 'energy',
    difficulty: 'hard',
    completed: false,
  },
];
