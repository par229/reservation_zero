import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// 좌석 타입 정의
type SeatStatus = 'available' | 'reserved' | 'occupied' | 'selected';

interface Seat {
  id: string;
  status: SeatStatus;
  reservedBy?: string;
}

export default function ReservationScreen() {
  const { id } = useLocalSearchParams();
  
  // 하드코딩된 좌석 데이터 (5x6 좌석 배열)
  const initialSeats: Seat[][] = Array(5)
    .fill(null)
    .map((_, rowIndex) =>
      Array(6)
        .fill(null)
        .map((_, colIndex) => {
          const id = `${rowIndex + 1}-${colIndex + 1}`;
          // 랜덤하게 좌석 상태 설정 (데모용)
          const randomStatus = Math.random();
          let status: SeatStatus = 'available';
          
          if (randomStatus < 0.2) {
            status = 'reserved';
          } else if (randomStatus < 0.4) {
            status = 'occupied';
          }
          
          return { id, status };
        })
    );

  const [seats, setSeats] = useState<Seat[][]>(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatPress = (rowIndex: number, colIndex: number) => {
    const seat = seats[rowIndex][colIndex];
    
    if (seat.status === 'available') {
      // 다른 선택된 좌석이 있으면 원래 상태로 되돌림
      if (selectedSeat) {
        const [prevRow, prevCol] = selectedSeat.split('-').map(Number);
        setSeats((prevSeats) => {
          const newSeats = [...prevSeats];
          newSeats[prevRow - 1][prevCol - 1] = {
            ...newSeats[prevRow - 1][prevCol - 1],
            status: 'available',
          };
          return newSeats;
        });
      }
      
      // 새 좌석 선택
      setSeats((prevSeats) => {
        const newSeats = [...prevSeats];
        newSeats[rowIndex][colIndex] = {
          ...newSeats[rowIndex][colIndex],
          status: 'selected',
        };
        return newSeats;
      });
      setSelectedSeat(seat.id);
    } else if (seat.status === 'selected') {
      // 선택 취소
      setSeats((prevSeats) => {
        const newSeats = [...prevSeats];
        newSeats[rowIndex][colIndex] = {
          ...newSeats[rowIndex][colIndex],
          status: 'available',
        };
        return newSeats;
      });
      setSelectedSeat(null);
    } else {
      // 이미 예약된 좌석이나 사용 중인 좌석
      Alert.alert('알림', '이미 예약되었거나 사용 중인 좌석입니다.');
    }
  };

  const handleReservation = () => {
    if (!selectedSeat) {
      Alert.alert('알림', '좌석을 선택해 주세요.');
      return;
    }

    Alert.alert(
      '좌석 예약',
      `${selectedSeat} 좌석을 예약하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '예약',
          onPress: () => {
            // 예약 처리 (하드코딩)
            const [row, col] = selectedSeat.split('-').map(Number);
            setSeats((prevSeats) => {
              const newSeats = [...prevSeats];
              newSeats[row - 1][col - 1] = {
                ...newSeats[row - 1][col - 1],
                status: 'reserved',
                reservedBy: '내 예약',
              };
              return newSeats;
            });
            setSelectedSeat(null);
            Alert.alert('완료', '좌석이 예약되었습니다.');
          },
        },
      ]
    );
  };

  // 좌석 상태에 따른 스타일 및 아이콘 설정
  const getSeatStyle = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 255, 255, 0.2)' };
      case 'reserved':
        return { backgroundColor: 'rgba(255, 215, 0, 0.3)', borderColor: 'rgba(255, 215, 0, 0.3)' };
      case 'occupied':
        return { backgroundColor: 'rgba(255, 107, 107, 0.3)', borderColor: 'rgba(255, 107, 107, 0.3)' };
      case 'selected':
        return { backgroundColor: 'rgba(52, 152, 219, 0.3)', borderColor: 'rgba(52, 152, 219, 0.3)' };
      default:
        return { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 255, 255, 0.2)' };
    }
  };

  const getSeatIcon = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return <Ionicons name="square-outline" size={24} color="rgba(255, 255, 255, 0.8)" />;
      case 'reserved':
        return <Ionicons name="time-outline" size={24} color="rgba(255, 215, 0, 0.8)" />;
      case 'occupied':
        return <Ionicons name="person-outline" size={24} color="rgba(255, 107, 107, 0.8)" />;
      case 'selected':
        return <Ionicons name="checkmark-circle" size={24} color="rgba(52, 152, 219, 0.8)" />;
      default:
        return <Ionicons name="help-outline" size={24} color="rgba(255, 255, 255, 0.8)" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <BlurView intensity={90} tint="light" style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>강의실 좌석 예약</Text>
            <Text style={styles.subtitle}>301호 강의실</Text>
          </View>
        </BlurView>

        <ScrollView style={styles.scrollView}>
          <BlurView intensity={50} tint="light" style={styles.classroomContainer}>
            <View style={styles.teacherDesk}>
              <Text style={styles.teacherDeskText}>강단</Text>
            </View>

            <View style={styles.seatsContainer}>
              {seats.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                  {row.map((seat, colIndex) => (
                    <TouchableOpacity
                      key={seat.id}
                      style={[styles.seat, getSeatStyle(seat.status)]}
                      onPress={() => handleSeatPress(rowIndex, colIndex)}
                    >
                      {getSeatIcon(seat.status)}
                      <Text
                        style={[
                          styles.seatLabel,
                          seat.status === 'selected' && { color: '#fff' },
                        ]}
                      >
                        {seat.id}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </BlurView>

          <BlurView intensity={50} tint="light" style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]} />
              <Text style={styles.legendText}>예약 가능</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 215, 0, 0.5)' }]} />
              <Text style={styles.legendText}>예약됨</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 107, 107, 0.5)' }]} />
              <Text style={styles.legendText}>사용 중</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(52, 152, 219, 0.5)' }]} />
              <Text style={styles.legendText}>선택됨</Text>
            </View>
          </BlurView>
        </ScrollView>

        <BlurView intensity={90} tint="light" style={styles.bottomContainer}>
          <Text style={styles.selectedSeatText}>
            {selectedSeat ? `선택한 좌석: ${selectedSeat}` : '좌석을 선택해 주세요'}
          </Text>
          <TouchableOpacity
            style={[styles.reserveButton, !selectedSeat && styles.disabledButton]}
            onPress={handleReservation}
            disabled={!selectedSeat}
          >
            <Text style={styles.reserveButtonText}>좌석 예약하기</Text>
          </TouchableOpacity>
        </BlurView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  classroomContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  teacherDesk: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  teacherDeskText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  seatsContainer: {
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  seat: {
    width: 50,
    height: 65,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  seatLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 15,
    borderRadius: 15,
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendColor: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  legendText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedSeatText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '500',
  },
  reserveButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  disabledButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
  },
  reserveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 