import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// 출석 데이터 타입 정의
interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'pending';
  seatId?: string;
}

export default function AttendanceScreen() {
  // 하드코딩된 출석 데이터
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2025-03-28',
      subject: '데이터베이스 설계',
      status: 'present',
      seatId: '3-2',
    },
    {
      id: '2',
      date: '2025-03-27',
      subject: '프로그래밍 기초',
      status: 'present',
      seatId: '2-4',
    },
    {
      id: '3',
      date: '2025-03-26',
      subject: '알고리즘',
      status: 'late',
      seatId: '1-3',
    },
    {
      id: '4',
      date: '2025-03-25',
      subject: '자료구조',
      status: 'absent',
    },
    {
      id: '5',
      date: '2025-03-24',
      subject: '컴퓨터 네트워크',
      status: 'present',
      seatId: '4-2',
    },
    {
      id: '6',
      date: '2025-03-23',
      subject: '운영체제',
      status: 'present',
      seatId: '3-4',
    },
    {
      id: '7',
      date: '2025-03-22',
      subject: '웹 프로그래밍',
      status: 'absent',
    },
    {
      id: '8',
      date: '2025-03-21',
      subject: '모바일 앱 개발',
      status: 'present',
      seatId: '2-2',
    },
    {
      id: '9',
      date: '2025-03-29',
      subject: '인공지능 개론',
      status: 'pending',
    },
  ]);

  // 출석 상태별 통계 계산
  const getStatistics = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(
      (record) => record.status === 'present'
    ).length;
    const late = attendanceData.filter(
      (record) => record.status === 'late'
    ).length;
    const absent = attendanceData.filter(
      (record) => record.status === 'absent'
    ).length;
    const pending = attendanceData.filter(
      (record) => record.status === 'pending'
    ).length;

    const presentRate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    
    return {
      total,
      present,
      late,
      absent,
      pending,
      presentRate,
    };
  };

  const stats = getStatistics();

  // 출석 상태에 따른 아이콘 및 색상 설정
  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />;
      case 'late':
        return <Ionicons name="time" size={24} color="#FF9800" />;
      case 'absent':
        return <Ionicons name="close-circle" size={24} color="#F44336" />;
      case 'pending':
        return <Ionicons name="help-circle" size={24} color="#9E9E9E" />;
      default:
        return null;
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
      default:
        return '알 수 없음';
    }
  };

  // 예약된 수업 출석 체크인
  const handleCheckIn = () => {
    const pendingClass = attendanceData.find(
      (record) => record.status === 'pending'
    );

    if (!pendingClass) {
      Alert.alert('알림', '예약된 수업이 없습니다.');
      return;
    }

    Alert.alert(
      '출석 체크인',
      `${pendingClass.subject} 수업에 출석하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '출석',
          onPress: () => {
            // 출석 상태 업데이트
            setAttendanceData((prevData) =>
              prevData.map((record) =>
                record.id === pendingClass.id
                  ? { ...record, status: 'present', seatId: '3-3' }
                  : record
              )
            );
            Alert.alert('완료', '출석이 완료되었습니다.');
          },
        },
      ]
    );
  };

  const renderAttendanceItem = ({ item }: { item: AttendanceRecord }) => (
    <BlurView intensity={10} tint="light" style={styles.attendanceItem}>
      <View style={styles.attendanceDate}>
        <Text style={styles.dateDayText}>
          {new Date(item.date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
        </Text>
      </View>
      <View style={styles.attendanceContent}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        {item.seatId && (
          <Text style={styles.seatText}>좌석: {item.seatId}</Text>
        )}
      </View>
      <View style={[
        styles.statusBadge, 
        item.status === 'present' && styles.presentBadge,
        item.status === 'late' && styles.lateBadge,
        item.status === 'absent' && styles.absentBadge,
        item.status === 'pending' && styles.pendingBadge,
      ]}>
        {getStatusIcon(item.status)}
        <Text style={[styles.statusText, 
          item.status === 'present' && styles.presentText,
          item.status === 'late' && styles.lateText,
          item.status === 'absent' && styles.absentText,
          item.status === 'pending' && styles.pendingText,
        ]}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </BlurView>
  );

  return (
    <LinearGradient
      colors={['#f5f7fa', '#e4e8f0']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <BlurView intensity={30} tint="light" style={styles.headerContainer}>
          <Text style={styles.title}>출석 확인</Text>
        </BlurView>

        <BlurView intensity={15} tint="light" style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>전체</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.presentValue]}>{stats.present}</Text>
            <Text style={styles.statLabel}>출석</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.lateValue]}>{stats.late}</Text>
            <Text style={styles.statLabel}>지각</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.absentValue]}>{stats.absent}</Text>
            <Text style={styles.statLabel}>결석</Text>
          </View>
        </BlurView>

        <BlurView intensity={15} tint="light" style={styles.attendanceRateContainer}>
          <View style={styles.attendanceRate}>
            <LinearGradient
              colors={['#4CAF50', '#8BC34A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.attendanceRateBar,
                { width: `${stats.presentRate}%` },
              ]}
            />
          </View>
          <Text style={styles.attendanceRateText}>
            출석률: {stats.presentRate}%
          </Text>
        </BlurView>

        <BlurView intensity={15} tint="light" style={styles.pendingAttendanceContainer}>
          <Text style={styles.pendingAttendanceText}>
            {attendanceData.some((record) => record.status === 'pending')
              ? '출석 대기 중인 수업이 있습니다'
              : '예약된 수업이 없습니다'}
          </Text>
          {attendanceData.some((record) => record.status === 'pending') && (
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={handleCheckIn}
            >
              <BlurView intensity={20} tint="light" style={styles.checkInButtonInner}>
                <LinearGradient
                  colors={['#4A86E8', '#3B75D9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.checkInButtonGradient}
                >
                  <Text style={styles.checkInButtonText}>출석 체크인</Text>
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          )}
        </BlurView>

        <BlurView intensity={20} tint="light" style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>출석 이력</Text>
        </BlurView>

        <FlatList
          data={attendanceData.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )}
          renderItem={renderAttendanceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A86E8',
    marginBottom: 4,
  },
  presentValue: {
    color: '#4CAF50',
  },
  lateValue: {
    color: '#FF9800',
  },
  absentValue: {
    color: '#F44336',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  attendanceRateContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceRate: {
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  attendanceRateBar: {
    height: '100%',
  },
  attendanceRateText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  pendingAttendanceContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingAttendanceText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  checkInButton: {
    width: '80%',
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  checkInButtonInner: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  checkInButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitleContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceDate: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.05)',
  },
  dateDayText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  attendanceContent: {
    flex: 1,
    padding: 12,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  seatText: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.05)',
  },
  presentBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  lateBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  absentBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  presentText: {
    color: '#4CAF50',
  },
  lateText: {
    color: '#FF9800',
  },
  absentText: {
    color: '#F44336',
  },
  pendingText: {
    color: '#9E9E9E',
  },
});