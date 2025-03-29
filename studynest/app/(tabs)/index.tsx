import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, commonStyles } from '../styles/common';

// 임시 수업 데이터
const classes = [
  {
    id: 1,
    name: '데이터베이스 설계',
    professor: '김교수',
    time: '09:00 - 11:00',
    location: '공학관 401호',
    days: '월, 수',
  },
  {
    id: 2,
    name: '프로그래밍 기초',
    professor: '이교수',
    time: '13:00 - 15:00',
    location: '공학관 302호',
    days: '화, 목',
  },
  {
    id: 3,
    name: '알고리즘',
    professor: '박교수',
    time: '15:30 - 17:30',
    location: '공학관 305호',
    days: '월, 금',
  },
];

export default function IndexScreen() {
  const handleClassSelect = (id: string) => {
    router.push(`/reservation/${id}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary]}
        style={commonStyles.gradientBackground}
      >
        <BlurView intensity={90} tint="light" style={commonStyles.header}>
          <Text style={commonStyles.title}>좌석 예약</Text>
          <Text style={commonStyles.subtitle}>내 수업</Text>
        </BlurView>

        <ScrollView style={styles.content}>
          {classes.map((classItem) => (
            <BlurView
              key={classItem.id}
              intensity={50}
              tint="light"
              style={[commonStyles.card, styles.classCard]}
            >
              <TouchableOpacity
                onPress={() => handleClassSelect(classItem.id)}
                style={styles.cardContent}
              >
                <Text style={styles.className}>{classItem.name}</Text>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="person-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={commonStyles.infoText}>{classItem.professor}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={commonStyles.infoText}>{classItem.time}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={commonStyles.infoText}>{classItem.location}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={commonStyles.infoText}>{classItem.days}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </BlurView>
          ))}
        </ScrollView>

        <BlurView intensity={90} tint="light" style={[commonStyles.card, styles.footer]}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.text.secondary} />
            <Text style={commonStyles.infoText}>수업을 선택하여 좌석을 예약해주세요</Text>
          </View>
        </BlurView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.large,
  },
  classCard: {
    marginHorizontal: SPACING.small,
  },
  cardContent: {
    padding: SPACING.medium,
  },
  className: {
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.medium,
  },
  infoRow: {
    gap: SPACING.medium,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.small,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border.secondary,
  },
  footer: {
    margin: 0,
    marginBottom: 0,
    borderRadius: 0,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.small,
  },
});