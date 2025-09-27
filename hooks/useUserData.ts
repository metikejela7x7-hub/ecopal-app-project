
import { useState, useEffect } from 'react';
import { UserStats, ImpactData, Challenge } from '../types';

export const useUserData = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 245,
    currentStreak: 7,
    longestStreak: 12,
    challengesCompleted: 23,
    level: 3,
    badges: [],
  });

  const [impactData, setImpactData] = useState<ImpactData>({
    plasticSaved: 1250, // grams
    energySaved: 45.2, // kWh
    carbonSaved: 23.8, // kg CO2
    waterSaved: 890, // liters
  });

  const completeChallenge = (challenge: Challenge) => {
    console.log('Completing challenge:', challenge.title);
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + challenge.points,
      challengesCompleted: prev.challengesCompleted + 1,
      currentStreak: prev.currentStreak + 1,
    }));

    // Update impact based on challenge category
    const impactMultiplier = challenge.points / 10;
    setImpactData(prev => {
      switch (challenge.category) {
        case 'waste':
          return { ...prev, plasticSaved: prev.plasticSaved + (50 * impactMultiplier) };
        case 'energy':
          return { ...prev, energySaved: prev.energySaved + (2.5 * impactMultiplier) };
        case 'water':
          return { ...prev, waterSaved: prev.waterSaved + (25 * impactMultiplier) };
        case 'transport':
          return { ...prev, carbonSaved: prev.carbonSaved + (1.2 * impactMultiplier) };
        case 'food':
          return { ...prev, carbonSaved: prev.carbonSaved + (0.8 * impactMultiplier) };
        default:
          return prev;
      }
    });
  };

  return {
    userStats,
    impactData,
    completeChallenge,
  };
};
