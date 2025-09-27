
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = colors.primary,
  children 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressAngle = (progress / 100) * 360;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View 
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: colors.accent + '30', // 30% opacity
          }
        ]} 
      />
      
      {/* Progress indicator - simplified to just show a colored border */}
      <View 
        style={[
          styles.circle,
          styles.progressCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderTopColor: progress > 25 ? color : 'transparent',
            borderRightColor: progress > 50 ? color : 'transparent',
            borderBottomColor: progress > 75 ? color : 'transparent',
            borderLeftColor: progress > 0 ? color : 'transparent',
          }
        ]} 
      />
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
  progressCircle: {
    transform: [{ rotate: '-90deg' }],
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
