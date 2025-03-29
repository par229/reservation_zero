<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ClassItem {
  id: number;
  name: string;
  professor: string;
  time: string;
  location: string;
  days: string;
  capacity: number;
}

interface SeatType {
  id: number;
  row: string;
  col: number;
  status: 'available' | 'reserved' | 'selected' | 'disabled';
}
=======
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Modal, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, commonStyles } from '../styles/common';

type SeatStatus = 'available' | 'reserved' | 'occupied' | 'selected';

interface Seat {
  id: string;
  status: SeatStatus;
}

export default function ReservationScreen() {
  const initialSeats: Seat[][] = Array(5).fill(null).map((_, rowIndex) =>
    Array(6).fill(null).map((_, colIndex) => ({
      id: `${rowIndex + 1}-${colIndex + 1}`,
      status: 'available',
    }))
  );
>>>>>>> main

const classes: ClassItem[] = [
  { id: 1, name: '데이터베이스 설계', professor: '김교수', time: '09:00 - 11:00', location: '공학관 401호', days: '월, 수', capacity: 30 },
  { id: 2, name: '프로그래밍 기초', professor: '이교수', time: '13:00 - 15:00', location: '공학관 302호', days: '화, 목', capacity: 20 },
  { id: 3, name: '알고리즘', professor: '박교수', time: '15:30 - 17:30', location: '공학관 305호', days: '월, 금', capacity: 25 },
];

<<<<<<< HEAD
export default function IndexScreen() {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);

  const totalSeats = 50;

  const generateSeats = (capacity: number): SeatType[] => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const cols = 5;
    const seats: SeatType[] = [];
    let seatIndex = 0;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      for (let col = 1; col <= cols; col++) {
        seatIndex++;
        const isDisabled = seatIndex > capacity;
        seats.push({
          id: seatIndex,
          row: rows[rowIndex],
          col,
          status: isDisabled ? 'disabled' : 'available',
        });
      }
=======
  const handleSeatPress = (rowIndex: number, colIndex: number) => {
    const newSelectedId = `${rowIndex + 1}-${colIndex + 1}`;
    const seat = seats[rowIndex][colIndex];

    if (seat.status === 'available') {
      // 이미 선택된 좌석이 있다면 경고 표시
      if (selectedSeat && selectedSeat !== newSelectedId) {
        Alert.alert('예약 불가', '이미 예약을 완료했습니다.');
        return;
      }

      const newSeats = seats.map(row => row.map(seat => ({ ...seat })));

      // 이전 좌석 해제
      if (selectedSeat) {
        const [prevRow, prevCol] = selectedSeat.split('-').map(Number);
        newSeats[prevRow - 1][prevCol - 1].status = 'available';
      }

      newSeats[rowIndex][colIndex].status = 'selected';
      setSeats(newSeats);
      setSelectedSeat(newSelectedId);
    } else if (seat.status === 'selected') {
      const newSeats = seats.map(row => row.map(seat => ({ ...seat })));
      newSeats[rowIndex][colIndex].status = 'available';
      setSeats(newSeats);
      setSelectedSeat(null);
    } else {
      Alert.alert('불가', '이미 예약되었거나 사용 중인 좌석입니다.');
>>>>>>> main
    }
    return seats;
  };

  const handleClassSelect = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setSeats(generateSeats(classItem.capacity));
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedClass(null);
    setSelectedSeat(null);
  };

  const handleSeatPress = (seat: SeatType) => {
    if (seat.status === 'reserved' || seat.status === 'disabled') return;

    setSeats(prevSeats =>
      prevSeats.map(s => {
        if (s.id === seat.id) {
          const newStatus = s.status === 'selected' ? 'available' : 'selected';
          setSelectedSeat(newStatus === 'selected' ? seat : null);
          return { ...s, status: newStatus };
        }
        return { ...s, status: s.status === 'selected' ? 'available' : s.status };
      })
    );
  };

  const handleReservation = () => {
<<<<<<< HEAD
    if (!selectedSeat) return;

    setSeats(prevSeats =>
      prevSeats.map(s =>
        s.id === selectedSeat.id ? { ...s, status: 'reserved' } : s
      )
    );
    setSelectedSeat(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {classes.map((classItem) => (
          <TouchableOpacity
            key={classItem.id}
            onPress={() => handleClassSelect(classItem)}
            style={styles.classCard}
          >
            <Text style={styles.className}>{classItem.name}</Text>
            <Text style={styles.professorName}>{classItem.professor}</Text>
            <Text style={styles.capacityText}>수강 인원: {classItem.capacity}명</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedClass?.name}</Text>
            <View style={styles.seatGrid}>
              {seats.map((seat) => (
                <TouchableOpacity
                  key={seat.id}
                  onPress={() => handleSeatPress(seat)}
                  style={[
                    styles.seat,
                    seat.status === 'selected' && styles.selectedSeat,
                    seat.status === 'reserved' && styles.reservedSeat,
                    seat.status === 'disabled' && styles.disabledSeat,
                  ]}
                  disabled={seat.status === 'reserved' || seat.status === 'disabled'}
                >
                  <Text style={styles.seatText}>{`${seat.row}${seat.col}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.reserveButton, !selectedSeat && styles.reserveButtonDisabled]}
              disabled={!selectedSeat}
              onPress={handleReservation}
            >
              <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
=======
    if (!selectedSeat) {
      Alert.alert('예약 실패', '먼저 좌석을 선택해주세요.');
      return;
    }

    const [rowIndex, colIndex] = selectedSeat.split('-').map(Number);
    const newSeats = seats.map(row => row.map(seat => ({ ...seat })));
    newSeats[rowIndex - 1][colIndex - 1].status = 'reserved';
    setSeats(newSeats);
    setSelectedSeat(null);

    Alert.alert('예약 완료', `${rowIndex}-${colIndex} 좌석이 예약되었습니다.`);
  };

  const getSeatStyle = (status: SeatStatus) => {
    switch (status) {
      case 'available': return { backgroundColor: '#f0f0f0' };
      case 'selected': return { backgroundColor: '#3498db' };
      case 'reserved': return { backgroundColor: '#f39c12' };
      case 'occupied': return { backgroundColor: '#e74c3c' };
      default: return { backgroundColor: '#ddd' };
    }
  };

  const getSeatIcon = (status: SeatStatus) => {
    switch (status) {
      case 'available': return <Ionicons name="seat" size={24} color="#999" />;
      case 'selected': return <Ionicons name="checkmark-circle" size={24} color="#fff" />;
      case 'reserved': return <Ionicons name="time" size={24} color="#8a7500" />;
      case 'occupied': return <Ionicons name="person" size={24} color="#c23b3b" />;
      default: return <Ionicons name="help" size={24} color="#999" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>좌석 예약</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        <View style={styles.teacherDesk}><Text style={styles.teacherDeskText}>강단</Text></View>

        {seats.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((seat, colIndex) => (
              <TouchableOpacity
                key={seat.id}
                style={[styles.seat, getSeatStyle(seat.status)]}
                onPress={() => handleSeatPress(rowIndex, colIndex)}
              >
                {getSeatIcon(seat.status)}
                <Text style={[styles.seatText, seat.status === 'selected' && { color: '#fff' }]}>
                  {seat.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, !selectedSeat && styles.buttonDisabled]}
        onPress={handleReservation}
        disabled={!selectedSeat}
      >
        <Text style={styles.buttonText}>좌석 예약하기</Text>
      </TouchableOpacity>
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
  scrollContent: { 
    padding: 16,
    backgroundColor: '#F8F9FD',
    flex: 1,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  className: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#1A1A1A',
    marginBottom: 4
  },
  professorName: { 
    fontSize: 15, 
    color: '#666666',
    marginBottom: 8
  },
  capacityText: { 
    fontSize: 14, 
    color: '#999999'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginBottom: 24, 
    color: '#1A1A1A' 
  },
  seatGrid: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  seat: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedSeat: {
    backgroundColor: '#4A72FF',
    borderColor: '#4A72FF',
  },
  reservedSeat: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  disabledSeat: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  seatText: { 
    color: '#1A1A1A', 
    fontSize: 14,
    fontWeight: '500'
  },
  reserveButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#4A72FF',
    width: '100%',
    alignItems: 'center'
  },
  reserveButtonDisabled: { 
    backgroundColor: '#E5E7EB' 
  },
  reserveButtonText: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 16 
  },
});
=======
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  grid: { alignItems: 'center' },
  teacherDesk: {
    backgroundColor: '#ddd',
    width: '90%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  teacherDeskText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  row: { flexDirection: 'row', marginBottom: 10 },
  seat: {
    width: 50,
    height: 65,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  seatText: { marginTop: 4, fontSize: 12, color: '#333' },
  button: {
    marginTop: 30,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
>>>>>>> main
