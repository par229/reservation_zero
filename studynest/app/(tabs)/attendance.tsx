import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'pending';
  seatId?: string;
}

const dummyAttendance: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-03-28',
    subject: '데이터베이스 설계',
    status: 'present',
    seatId: 'A-12',
  },
  {
    id: '2',
    date: '2024-03-27',
    subject: '프로그래밍 기초',
    status: 'late',
    seatId: 'B-08',
  },
  {
    id: '3',
    date: '2024-03-26',
    subject: '알고리즘',
    status: 'absent',
  },
  {
    id: '4',
    date: '2024-03-25',
    subject: '컴퓨터 네트워크',
    status: 'present',
    seatId: 'C-15',
  },
  {
    id: '5',
    date: '2024-03-29',
    subject: '인공지능 개론',
    status: 'pending',
  },
];

export default function AttendanceScreen() {
  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return '#4CAF50';
      case 'late':
        return '#FF9800';
      case 'absent':
        return '#F44336';
      case 'pending':
        return '#9E9E9E';
    }
  };

  const getStatusText = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return '출석';
      case 'late':
        return '지각';
      case 'absent':
        return '결석';
      case 'pending':
        return '대기중';
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'checkmark-circle';
      case 'late':
        return 'time';
      case 'absent':
        return 'close-circle';
      case 'pending':
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>출석체크</Text>
        <Text style={styles.subtitle}>나의 출석 현황</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>출석률</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>총 출석</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>지각</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>결석</Text>
            </View>
          </View>
        </View>

        <View style={styles.attendanceContainer}>
          {dummyAttendance.map((record) => (
            <View
              key={record.id}
              style={styles.attendanceCard}
            >
              <View style={styles.attendanceHeader}>
                <Text style={styles.attendanceDate}>
                  {new Date(record.date).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: `${getStatusColor(record.status)}20` }
                ]}>
                  <Ionicons
                    name={getStatusIcon(record.status)}
                    size={16}
                    color={getStatusColor(record.status)}
                  />
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(record.status) }
                  ]}>
                    {getStatusText(record.status)}
                  </Text>
                </View>
              </View>
              <Text style={styles.subjectText}>{record.subject}</Text>
              {record.seatId && (
                <Text style={styles.seatText}>좌석: {record.seatId}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  statsCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  attendanceContainer: {
    flex: 1,
    gap: 12,
  },
  attendanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendanceDate: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  seatText: {
    fontSize: 14,
    color: '#666666',
  },
});