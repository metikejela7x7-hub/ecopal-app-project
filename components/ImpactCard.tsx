
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface ImpactCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
}

export default function ImpactCard({ title, value, unit, icon, color }: ImpactCardProps) {
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}k`;
    }
    return val.toFixed(1);
  };

  return (
    <View style={[commonStyles.smallCard, styles.container]}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon as any} size={20} color={colors.backgroundAlt} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {formatValue(value)} <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
  },
});
