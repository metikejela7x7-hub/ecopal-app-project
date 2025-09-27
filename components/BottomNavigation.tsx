
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'challenges', icon: 'trophy', label: 'Challenges' },
    { id: 'impact', icon: 'analytics', label: 'Impact' },
    { id: 'community', icon: 'people', label: 'Community' },
  ];

  return (
    <View style={commonStyles.bottomNavigation}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={commonStyles.navItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.grey}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === tab.id ? colors.primary : colors.grey }
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
