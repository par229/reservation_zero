import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMNS = 5;
const CELL_SIZE = width / (COLUMNS + 1);
const CELL_MARGIN = 4;

// 좌석 타입 정의
interface Seat {
  id: string;
  row: number;
  col: number;
  status: 'available' | 'reserved' | 'occupied' | 'selected';
}

// 수업 타입 정의
interface Class {
  id: string;
  name: string;
  professor: string;
  time: string;
  room: string;
  day: string;
}

export default function IndexScreen() {
  // 오늘 날짜 가져오기
  const today = new Date();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const todayString = `${today.getMonth() + 1}월 ${today.getDate()}일 (${dayNames[today.getDay()]})`;

  // 하드코딩된 수업 데이터
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: '데이터베이스 설계',
      professor: '김교수',
      time: '09:00 - 11:00',
      room: '공학관 401호',
      day: '월, 수',
    },
    {
      id: '2',
      name: '프로그래밍 기초',
      professor: '이교수',
      time: '13:00 - 15:00',
      room: '공학관 302호',
      day: '화, 목',
    },
    {
      id: '3',
      name: '알고리즘',
      professor: '박교수',
      time: '15:30 - 17:30',
      room: '공학관 305호',
      day: '월, 금',
    },
  ]);

  // 선택된 수업
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  // 좌석 데이터 생성
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = 6;
    const cols = 5;

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        // 랜덤으로 좌석 상태 할당 (실제로는 서버에서 가져올 데이터)
        let status: Seat['status'] = 'available';
        const random = Math.random();
        
        if (random < 0.2) {
          status = 'occupied';
        } else if (random < 0.3) {
          status = 'reserved';
        }
        
        seats.push({
          id: `${row}-${col}`,
          row,
          col,
          status,
        });
      }
    }
    
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  
  // 좌석 선택 처리
  const handleSeatPress = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'reserved') {
      Alert.alert('좌석 불가', '이미 예약되었거나 사용 중인 좌석입니다.');
      return;
    }
    
    if (!selectedClass) {
      Alert.alert('수업 선택', '먼저 수업을 선택해주세요.');
      return;
    }
    
    setSeats(prev => 
      prev.map(s => {
        if (s.id === seat.id) {
          return { ...s, status: s.status === 'selected' ? 'available' : 'selected' };
        } else if (s.status === 'selected') {
          return { ...s, status: 'available' };
        }
        return s;
      })
    );
  };
  
  // 수업 선택 처리
  const handleClassPress = (classItem: Class) => {
    setSelectedClass(classItem);
    
    // 좌석 재설정 (선택된 좌석 초기화)
    setSeats(prev => 
      prev.map(s => {
        return s.status === 'selected' 
          ? { ...s, status: 'available' } 
          : s;
      })
    );
  };

  // 좌석 예약 처리
  const handleReservation = () => {
    const selectedSeat = seats.find(s => s.status === 'selected');
    
    if (!selectedSeat || !selectedClass) {
      Alert.alert('예약 불가', '좌석과 수업을 모두 선택해주세요.');
      return;
    }
    
    Alert.alert(
      '좌석 예약',
      `${selectedClass.name} 수업의 ${selectedSeat.id} 좌석을 예약하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '예약',
          onPress: () => {
            // 예약 상태로 변경
            setSeats(prev => 
              prev.map(s => {
                if (s.id === selectedSeat.id) {
                  return { ...s, status: 'reserved' };
                }
                return s;
              })
            );
            
            // 선택된 수업 초기화
            setSelectedClass(null);
            
            Alert.alert('예약 완료', '좌석이 성공적으로 예약되었습니다.');
          },
        },
      ]
    );
  };

  // 좌석 상태에 따른 스타일 적용
  const getSeatStyle = (status: Seat['status']) => {
    switch (status) {
      case 'available':
        return styles.availableSeat;
      case 'occupied':
        return styles.occupiedSeat;
      case 'reserved':
        return styles.reservedSeat;
      case 'selected':
        return styles.selectedSeat;
      default:
        return {};
    }
  };

  // 좌석 렌더링
  const renderSeat = ({ item }: { item: Seat }) => (
    <TouchableOpacity
      style={[
        styles.seat,
        getSeatStyle(item.status),
        { margin: CELL_MARGIN }
      ]}
      onPress={() => handleSeatPress(item)}
      disabled={item.status === 'occupied' || item.status === 'reserved'}
    >
      <Text style={styles.seatText}>{item.id}</Text>
    </TouchableOpacity>
  );

  // 수업 카드 렌더링
  const renderClassCard = ({ item }: { item: Class }) => (
    <TouchableOpacity
      onPress={() => handleClassPress(item)}
      style={[
        styles.classCard,
        selectedClass?.id === item.id && styles.selectedClassCard
      ]}
    >
      <BlurView intensity={80} tint="light" style={styles.classCardBlur}>
        <View style={styles.classHeader}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.classProfessor}>{item.professor}</Text>
        </View>
        <View style={styles.classDetails}>
          <View style={styles.classDetailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.classDetailText}>{item.time}</Text>
          </View>
          <View style={styles.classDetailItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.classDetailText}>{item.room}</Text>
          </View>
          <View style={styles.classDetailItem}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.classDetailText}>{item.day}</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.backgroundImage, { backgroundColor: '#f0f8ff' }]}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>좌석 예약</Text>
          <Text style={styles.date}>{todayString}</Text>
        </View>
        
        <View style={styles.classesContainer}>
          <Text style={styles.sectionTitle}>내 수업</Text>
          <FlatList
            data={classes}
            renderItem={renderClassCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.classesList}
          />
        </View>
        
        {selectedClass && (
          <BlurView intensity={70} tint="light" style={styles.seatSelectionContainer}>
            <Text style={styles.seatSelectionTitle}>
              {selectedClass.name} - 좌석 선택
            </Text>
            
            <View style={styles.seatsContainer}>
              <View style={styles.classroom}>
                <View style={styles.podium}>
                  <Text style={styles.podiumText}>강단</Text>
                </View>
                
                <FlatList
                  data={seats}
                  renderItem={renderSeat}
                  keyExtractor={(item) => item.id}
                  numColumns={COLUMNS}
                  contentContainerStyle={styles.seatsGrid}
                />
              </View>
              
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.availableSeat]} />
                  <Text style={styles.legendText}>예약 가능</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.occupiedSeat]} />
                  <Text style={styles.legendText}>사용 중</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.reservedSeat]} />
                  <Text style={styles.legendText}>예약됨</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, styles.selectedSeat]} />
                  <Text style={styles.legendText}>선택됨</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.reserveButton,
                !seats.some(s => s.status === 'selected') && styles.reserveButtonDisabled
              ]}
              onPress={handleReservation}
              disabled={!seats.some(s => s.status === 'selected')}
            >
              <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
          </BlurView>
        )}
        
        {!selectedClass && (
          <View style={styles.noSelectionContainer}>
            <BlurView intensity={70} tint="light" style={styles.noSelectionBlur}>
              <Ionicons name="information-circle-outline" size={60} color="#4a86e8" />
              <Text style={styles.noSelectionText}>
                수업을 선택하여 좌석을 예약해주세요
              </Text>
            </BlurView>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  date: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  classesContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  classesList: {
    paddingHorizontal: 10,
  },
  classCard: {
    width: 200,
    height: 140,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  classCardBlur: {
    flex: 1,
    padding: 15,
  },
  selectedClassCard: {
    borderColor: '#4a86e8',
    borderWidth: 2,
    shadowColor: '#4a86e8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  classHeader: {
    marginBottom: 10,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  classProfessor: {
    fontSize: 14,
    color: '#666',
  },
  classDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  classDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  classDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  seatSelectionContainer: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    padding: 15,
  },
  seatSelectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  seatsContainer: {
    flex: 1,
  },
  classroom: {
    flex: 1,
    alignItems: 'center',
  },
  podium: {
    width: '80%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  podiumText: {
    fontSize: 14,
    color: '#666',
  },
  seatsGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  seatText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  availableSeat: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  occupiedSeat: {
    backgroundColor: 'rgba(231, 76, 60, 0.7)',
    borderWidth: 1,
    borderColor: '#c0392b',
  },
  reservedSeat: {
    backgroundColor: 'rgba(243, 156, 18, 0.7)',
    borderWidth: 1,
    borderColor: '#d35400',
  },
  selectedSeat: {
    backgroundColor: 'rgba(46, 204, 113, 0.7)',
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  reserveButton: {
    backgroundColor: '#4a86e8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  reserveButtonDisabled: {
    backgroundColor: 'rgba(74, 134, 232, 0.5)',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noSelectionContainer: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSelectionBlur: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  noSelectionText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    color: '#666',
  },
});