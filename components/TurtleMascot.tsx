
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';

interface TurtleMascotProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function TurtleMascot({ message, size = 'medium' }: TurtleMascotProps) {
  const sizeStyles = {
    small: { fontSize: 24 },
    medium: { fontSize: 48 },
    large: { fontSize: 72 },
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.turtle, sizeStyles[size]]}>🐢</Text>
      {message && (
        <View style={styles.speechBubble}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  turtle: {
    textAlign: 'center',
  },
  speechBubble: {
    backgroundColor: colors.turtle,
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    maxWidth: 250,
    position: 'relative',
  },
  message: {
    color: colors.backgroundAlt,
    fontSize: 14,
    textAlign: 'center',
  },
});
