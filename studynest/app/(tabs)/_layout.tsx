import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS, SPACING, commonStyles } from '../styles/common';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          height: 64,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          borderRadius: 20,
          paddingVertical: 0,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 12,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="light"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.4)',
        tabBarItemStyle: {
          height: 64,
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '좌석 예약',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
                padding: 12,
                borderRadius: 16,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            >
              <Ionicons name={focused ? "grid" : "grid-outline"} size={26} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: '출석체크',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
                padding: 12,
                borderRadius: 16,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            >
              <Ionicons name={focused ? "checkmark-circle" : "checkmark-circle-outline"} size={26} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="question"
        options={{
          title: '질문하기',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
                padding: 12,
                borderRadius: 16,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            >
              <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={26} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '내 정보',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
                padding: 12,
                borderRadius: 16,
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            >
              <Ionicons name={focused ? "person" : "person-outline"} size={26} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}