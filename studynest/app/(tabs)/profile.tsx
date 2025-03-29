import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>내 정보</Text>
        <Text style={styles.subtitle}>프로필 관리</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={40} color="#666666" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>홍길동</Text>
              <Text style={styles.studentId}>202312345</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#1A1A1A" />
            <Text style={styles.menuText}>프로필 수정</Text>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
            <Text style={styles.menuText}>알림 설정</Text>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
            <Text style={styles.menuText}>앱 설정</Text>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
=======
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, commonStyles } from '../styles/common';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={commonStyles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary]}
        style={commonStyles.gradientBackground}
      >
        <BlurView intensity={20} tint="light" style={[commonStyles.header, styles.header]}>
          <Text style={commonStyles.title}>내 정보</Text>
          <Text style={commonStyles.subtitle}>프로필 관리</Text>
        </BlurView>

        <ScrollView style={styles.content}>
          <BlurView intensity={20} tint="light" style={[commonStyles.card, styles.profileCard]}>
            <View style={styles.profileHeader}>
              <View style={styles.profileImage}>
                <Ionicons name="person" size={40} color={COLORS.text.secondary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>홍길동</Text>
                <Text style={styles.studentId}>202312345</Text>
              </View>
            </View>
          </BlurView>

          <BlurView intensity={20} tint="light" style={[commonStyles.card, styles.menuCard]}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color={COLORS.text.primary} />
              <Text style={styles.menuText}>프로필 수정</Text>
              <Ionicons name="chevron-forward" size={24} color={COLORS.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
              <Text style={styles.menuText}>알림 설정</Text>
              <Ionicons name="chevron-forward" size={24} color={COLORS.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={24} color={COLORS.text.primary} />
              <Text style={styles.menuText}>앱 설정</Text>
              <Ionicons name="chevron-forward" size={24} color={COLORS.text.secondary} />
            </TouchableOpacity>
          </BlurView>
        </ScrollView>

        <BlurView intensity={90} tint="light" style={[commonStyles.card, styles.footer]}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.text.primary} />
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </BlurView>
      </LinearGradient>
>>>>>>> main
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FD',
  },
  profileCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
=======
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    padding: SPACING.large,
  },
  profileCard: {
    marginBottom: SPACING.medium,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
>>>>>>> main
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    padding: 20,
=======
    padding: SPACING.medium,
>>>>>>> main
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
<<<<<<< HEAD
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
=======
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
>>>>>>> main
  },
  profileInfo: {
    flex: 1,
  },
  name: {
<<<<<<< HEAD
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#666666',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
=======
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.tiny,
  },
  studentId: {
    fontSize: FONTS.small,
    color: COLORS.text.secondary,
  },
  menuCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
>>>>>>> main
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 16,
=======
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuText: {
    flex: 1,
    fontSize: FONTS.medium,
    color: COLORS.text.primary,
    marginLeft: SPACING.medium,
  },
  footer: {
    margin: 0,
    marginBottom: 0,
    borderRadius: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.small,
  },
  logoutText: {
    fontSize: FONTS.medium,
    color: COLORS.text.primary,
>>>>>>> main
  },
});