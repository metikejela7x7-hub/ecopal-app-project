
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { Challenge } from '../types';
import Icon from './Icon';

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete: (challenge: Challenge) => void;
}

export default function ChallengeCard({ challenge, onComplete }: ChallengeCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return 'flash';
      case 'water': return 'water';
      case 'waste': return 'trash';
      case 'transport': return 'bicycle';
      case 'food': return 'restaurant';
      default: return 'leaf';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return colors.success;
      case 'medium': return colors.warning;
      case 'hard': return colors.error;
      default: return colors.primary;
    }
  };

  return (
    <View style={[commonStyles.card, challenge.completed && styles.completedCard]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon 
            name={getCategoryIcon(challenge.category) as any} 
            size={24} 
            color={colors.primary} 
          />
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{challenge.points}pts</Text>
        </View>
      </View>
      
      <Text style={commonStyles.subtitle}>{challenge.title}</Text>
      <Text style={commonStyles.textSecondary}>{challenge.description}</Text>
      
      <View style={styles.footer}>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
          <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
        </View>
        
        {!challenge.completed ? (
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={() => onComplete(challenge)}
          >
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.completedText}>Done!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: colors.backgroundAlt,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  difficultyBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    color: colors.backgroundAlt,
    fontSize: 12,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  completeButtonText: {
    color: colors.backgroundAlt,
    fontSize: 14,
    fontWeight: '600',
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: colors.accent,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '600',
  },
});
