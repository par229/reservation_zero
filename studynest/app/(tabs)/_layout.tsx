import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../styles/common';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={90}
            tint="light"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        ),
        tabBarActiveTintColor: COLORS.text.primary,
        tabBarInactiveTintColor: COLORS.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
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
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                padding: 8,
                borderRadius: 12,
                borderWidth: focused ? 1 : 0,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="grid-outline" size={22} color={color} />
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
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                padding: 8,
                borderRadius: 12,
                borderWidth: focused ? 1 : 0,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="checkmark-circle-outline" size={22} color={color} />
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
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                padding: 8,
                borderRadius: 12,
                borderWidth: focused ? 1 : 0,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="chatbubble-outline" size={22} color={color} />
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
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                padding: 8,
                borderRadius: 12,
                borderWidth: focused ? 1 : 0,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="person-outline" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}