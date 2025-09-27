
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { colors, commonStyles } from '../styles/commonStyles';
import { useUserData } from '../hooks/useUserData';
import { dailyChallenges, weeklyGoals } from '../data/challenges';
import { ecoFacts } from '../data/ecoFacts';
import TurtleMascot from '../components/TurtleMascot';
import ProgressRing from '../components/ProgressRing';
import ChallengeCard from '../components/ChallengeCard';
import ImpactCard from '../components/ImpactCard';
import BottomNavigation from '../components/BottomNavigation';
import { Challenge, EcoFact } from '../types';

export default function EcopalApp() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [challenges, setChallenges] = useState(dailyChallenges);
  const [todaysFact, setTodaysFact] = useState<EcoFact>(ecoFacts[0]);
  const { userStats, impactData, completeChallenge } = useUserData();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'OpenSans_400Regular': require('@expo-google-fonts/open-sans/OpenSans_400Regular.ttf'),
          'OpenSans_600SemiBold': require('@expo-google-fonts/open-sans/OpenSans_600SemiBold.ttf'),
          'OpenSans_700Bold': require('@expo-google-fonts/open-sans/OpenSans_700Bold.ttf'),
          'OpenSans_800ExtraBold': require('@expo-google-fonts/open-sans/OpenSans_800ExtraBold.ttf'),
        });
        setFontsLoaded(true);
        console.log('Fonts loaded successfully');
      } catch (error) {
        console.log('Error loading fonts:', error);
        setFontsLoaded(true); // Continue without custom fonts
      }
    };

    loadFonts();

    // Set a random fact for today
    const randomFact = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];
    setTodaysFact(randomFact);
  }, []);

  const handleCompleteChallenge = (challenge: Challenge) => {
    console.log('Challenge completed:', challenge.title);
    setChallenges(prev => 
      prev.map(c => c.id === challenge.id ? { ...c, completed: true } : c)
    );
    completeChallenge(challenge);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 🌅';
    if (hour < 18) return 'Good afternoon! ☀️';
    return 'Good evening! 🌙';
  };

  const getTurtleMessage = () => {
    const messages = [
      "Let's make today count! 🌱",
      "Small steps, big impact! 💚",
      "You're doing amazing! 🌟",
      "Every action matters! 🌍",
      "Keep up the great work! 🎉"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <Text style={commonStyles.text}>Loading Ecopal...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderHomeScreen = () => (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={commonStyles.title}>Ecopal</Text>
        <Text style={commonStyles.textSecondary}>{getGreeting()}</Text>
      </View>

      {/* Turtle Mascot */}
      <TurtleMascot message={getTurtleMessage()} size="medium" />

      {/* User Stats */}
      <View style={[commonStyles.card, styles.statsCard]}>
        <View style={commonStyles.row}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Level {userStats.level}</Text>
            <Text style={styles.statLabel}>Current Level</Text>
          </View>
        </View>
      </View>

      {/* Today's Challenge */}
      <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 10 }]}>
        Today's Challenges
      </Text>
      {challenges.slice(0, 2).map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onComplete={handleCompleteChallenge}
        />
      ))}

      {/* Fun Fact */}
      <View style={[commonStyles.card, styles.factCard]}>
        <Text style={styles.factTitle}>🌟 Did You Know?</Text>
        <Text style={commonStyles.text}>{todaysFact.content}</Text>
      </View>

      {/* Quick Impact Overview */}
      <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 10 }]}>
        Your Impact This Month
      </Text>
      <View style={styles.impactGrid}>
        <ImpactCard
          title="Plastic Saved"
          value={impactData.plasticSaved}
          unit="g"
          icon="leaf"
          color={colors.success}
        />
        <ImpactCard
          title="Energy Saved"
          value={impactData.energySaved}
          unit="kWh"
          icon="flash"
          color={colors.warning}
        />
      </View>
      <View style={styles.impactGrid}>
        <ImpactCard
          title="CO2 Reduced"
          value={impactData.carbonSaved}
          unit="kg"
          icon="cloud"
          color={colors.impact}
        />
        <ImpactCard
          title="Water Saved"
          value={impactData.waterSaved}
          unit="L"
          icon="water"
          color={colors.turtle}
        />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderChallengesScreen = () => (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <Text style={commonStyles.title}>Challenges</Text>
      
      <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 10 }]}>
        Daily Challenges
      </Text>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onComplete={handleCompleteChallenge}
        />
      ))}

      <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 10 }]}>
        Weekly Goals
      </Text>
      {weeklyGoals.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onComplete={handleCompleteChallenge}
        />
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderImpactScreen = () => (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <Text style={commonStyles.title}>Your Impact</Text>
      
      {/* Progress Ring */}
      <View style={[commonStyles.center, { marginVertical: 30 }]}>
        <ProgressRing progress={75} size={160} color={colors.primary}>
          <Text style={styles.progressText}>75%</Text>
          <Text style={styles.progressLabel}>Monthly Goal</Text>
        </ProgressRing>
      </View>

      {/* Detailed Impact */}
      <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>
        Environmental Impact
      </Text>
      
      <View style={styles.impactGrid}>
        <ImpactCard
          title="Plastic Saved"
          value={impactData.plasticSaved}
          unit="grams"
          icon="leaf"
          color={colors.success}
        />
        <ImpactCard
          title="Energy Saved"
          value={impactData.energySaved}
          unit="kWh"
          icon="flash"
          color={colors.warning}
        />
      </View>
      
      <View style={styles.impactGrid}>
        <ImpactCard
          title="CO2 Reduced"
          value={impactData.carbonSaved}
          unit="kg"
          icon="cloud"
          color={colors.impact}
        />
        <ImpactCard
          title="Water Saved"
          value={impactData.waterSaved}
          unit="liters"
          icon="water"
          color={colors.turtle}
        />
      </View>

      {/* Impact Explanation */}
      <View style={[commonStyles.card, { marginTop: 20 }]}>
        <Text style={commonStyles.subtitle}>What This Means</Text>
        <Text style={commonStyles.textSecondary}>
          Your actions have saved enough plastic to fill {Math.floor(impactData.plasticSaved / 500)} water bottles, 
          enough energy to power a home for {Math.floor(impactData.energySaved / 30)} days, and 
          prevented {impactData.carbonSaved.toFixed(1)} kg of CO2 from entering the atmosphere! 🌍
        </Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderCommunityScreen = () => (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <Text style={commonStyles.title}>Community</Text>
      
      {/* Leaderboard */}
      <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 15 }]}>
        This Week's Leaders
      </Text>
      
      {[
        { name: 'EcoWarrior23', points: 1250, rank: 1 },
        { name: 'GreenThumb', points: 1180, rank: 2 },
        { name: 'You', points: userStats.totalPoints, rank: 3 },
        { name: 'PlantLover', points: 890, rank: 4 },
        { name: 'SaveTheEarth', points: 750, rank: 5 },
      ].map((user, index) => (
        <View key={index} style={[commonStyles.card, user.name === 'You' && styles.userCard]}>
          <View style={commonStyles.row}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>#{user.rank}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>{user.name}</Text>
              <Text style={commonStyles.textSecondary}>{user.points} points</Text>
            </View>
            {user.rank <= 3 && (
              <Text style={styles.medal}>
                {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
              </Text>
            )}
          </View>
        </View>
      ))}

      {/* Group Challenges */}
      <Text style={[commonStyles.subtitle, { marginTop: 30, marginBottom: 15 }]}>
        Group Challenges
      </Text>
      
      <View style={commonStyles.card}>
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
          Neighborhood Plastic-Free Week
        </Text>
        <Text style={commonStyles.textSecondary}>
          Join 47 neighbors in avoiding single-use plastics this week!
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '68%' }]} />
        </View>
        <Text style={styles.progressText}>68% complete</Text>
      </View>

      <View style={commonStyles.card}>
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
          City Energy Challenge
        </Text>
        <Text style={commonStyles.textSecondary}>
          Help your city save 10,000 kWh this month!
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '42%' }]} />
        </View>
        <Text style={styles.progressText}>42% complete</Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'home': return renderHomeScreen();
      case 'challenges': return renderChallengesScreen();
      case 'impact': return renderImpactScreen();
      case 'community': return renderCommunityScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {renderCurrentScreen()}
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  statsCard: {
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  factCard: {
    backgroundColor: colors.accent,
    marginVertical: 15,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  impactGrid: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  userCard: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: colors.backgroundAlt,
    fontWeight: '600',
    fontSize: 14,
  },
  medal: {
    fontSize: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
