import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 좌석 타입 정의
type SeatStatus = 'available' | 'reserved' | 'occupied' | 'selected';

interface Seat {
  id: string;
  status: SeatStatus;
  reservedBy?: string;
}

export default function ReservationScreen() {
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
        return { backgroundColor: '#f1f1f1', borderColor: '#ddd' };
      case 'reserved':
        return { backgroundColor: '#ffd700', borderColor: '#e6c300' };
      case 'occupied':
        return { backgroundColor: '#ff6b6b', borderColor: '#e65555' };
      case 'selected':
        return { backgroundColor: '#3498db', borderColor: '#2980b9' };
      default:
        return { backgroundColor: '#f1f1f1', borderColor: '#ddd' };
    }
  };

  const getSeatIcon = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return <Ionicons name="seat" size={24} color="#999" />;
      case 'reserved':
        return <Ionicons name="time" size={24} color="#8a7500" />;
      case 'occupied':
        return <Ionicons name="person" size={24} color="#c23b3b" />;
      case 'selected':
        return <Ionicons name="checkmark-circle" size={24} color="#fff" />;
      default:
        return <Ionicons name="help" size={24} color="#999" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>강의실 좌석 예약</Text>
        <Text style={styles.subtitle}>301호 강의실</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.classroomContainer}>
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
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#f1f1f1' }]}
            />
            <Text style={styles.legendText}>예약 가능</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#ffd700' }]}
            />
            <Text style={styles.legendText}>예약됨</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#ff6b6b' }]}
            />
            <Text style={styles.legendText}>사용 중</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: '#3498db' }]}
            />
            <Text style={styles.legendText}>선택됨</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Text style={styles.selectedSeatText}>
          {selectedSeat
            ? `선택한 좌석: ${selectedSeat}`
            : '좌석을 선택해 주세요'}
        </Text>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            !selectedSeat && styles.disabledButton,
          ]}
          onPress={handleReservation}
          disabled={!selectedSeat}
        >
          <Text style={styles.reserveButtonText}>좌석 예약하기</Text>
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  classroomContainer: {
    padding: 20,
    alignItems: 'center',
  },
  teacherDesk: {
    width: '80%',
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  teacherDeskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seatsContainer: {
    width: '100%',
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  selectedSeatText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  reserveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});