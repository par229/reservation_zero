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

    const presentRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
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
        return <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />;
      case 'late':
        return <Ionicons name="time" size={24} color="#f39c12" />;
      case 'absent':
        return <Ionicons name="close-circle" size={24} color="#e74c3c" />;
      case 'pending':
        return <Ionicons name="help-circle" size={24} color="#95a5a6" />;
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
    <View style={styles.attendanceItem}>
      <View style={styles.attendanceInfo}>
        <Text style={styles.attendanceDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.attendanceSubject}>{item.subject}</Text>
        {item.seatId && (
          <Text style={styles.attendanceSeat}>좌석: {item.seatId}</Text>
        )}
      </View>
      <View style={styles.attendanceStatus}>
        {getStatusIcon(item.status)}
        <Text
          style={[
            styles.attendanceStatusText,
            item.status === 'present' && styles.presentText,
            item.status === 'late' && styles.lateText,
            item.status === 'absent' && styles.absentText,
            item.status === 'pending' && styles.pendingText,
          ]}
        >
          {getStatusText(item.status)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>출석 확인</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>전체</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.present}</Text>
          <Text style={styles.statLabel}>출석</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.late}</Text>
          <Text style={styles.statLabel}>지각</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.absent}</Text>
          <Text style={styles.statLabel}>결석</Text>
        </View>
      </View>

      <View style={styles.attendanceRateContainer}>
        <View style={styles.attendanceRate}>
          <View
            style={[
              styles.attendanceRateBar,
              { width: `${stats.presentRate}%` },
            ]}
          />
        </View>
        <Text style={styles.attendanceRateText}>
          출석률: {stats.presentRate}%
        </Text>
      </View>

      <View style={styles.pendingAttendanceContainer}>
        {attendanceData.some((record) => record.status === 'pending') ? (
          <>
            <Text style={styles.pendingAttendanceText}>
              출석 대기 중인 수업이 있습니다
            </Text>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={handleCheckIn}
            >
              <Text style={styles.checkInButtonText}>출석 체크인</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.pendingAttendanceText}>
            예약된 수업이 없습니다
          </Text>
        )}
      </View>

      <Text style={styles.historyTitle}>출석 이력</Text>

      <FlatList
        data={attendanceData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  attendanceRateContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceRate: {
    height: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  attendanceRateBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
  attendanceRateText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  pendingAttendanceContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  pendingAttendanceText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  checkInButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyTitle: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  attendanceItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceDate: {
    fontSize: 14,
    color: '#666',
  },
  attendanceSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  attendanceSeat: {
    fontSize: 14,
    color: '#666',
  },
  attendanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceStatusText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  presentText: {
    color: '#2ecc71',
  },
  lateText: {
    color: '#f39c12',
  },
  absentText: {
    color: '#e74c3c',
  },
  pendingText: {
    color: '#95a5a6',
  },
});