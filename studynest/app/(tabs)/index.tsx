import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../hooks/useApi';

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

export default function IndexScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);

  // 📌 강의실 목록 불러오기
  useEffect(() => {
    api.get('/getallclasses')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  // 📌 특정 강의실 선택 시 좌석 정보 가져오기
  const handleClassSelect = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setModalVisible(true);

    api.get('/getclass', { params: { classroom_id: selectedClass } })
      .then(response => setSeats(response.data))
      .catch(error => console.error('Error fetching seats:', error));
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedClass(null);
    setSelectedSeat(null);
  };

  const handleSeatPress = (seat: SeatType) => {
    if (seat.status === 'reserved' || seat.status === 'disabled') return;

    setSeats(prevSeats =>
      prevSeats.map(s =>
        s.id === seat.id
          ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
          : s
      )
    );

    setSelectedSeat(seat.status === 'selected' ? null : seat);
  };

  // 📌 좌석 예약 요청
  const handleReservation = () => {
    if (!selectedSeat || !selectedClass) return;

    api.post('/reservations', {
      classroom_location: selectedClass.location,
      seat: selectedSeat.id,
      name: '홍길동', // 유저 이름 (로그인 기능이 있다면 변경)
    })
      .then(() => {
        Alert.alert('예약 성공', '좌석이 예약되었습니다.');
        setModalVisible(false);
      })
      .catch(error => {
        Alert.alert('예약 실패', '좌석 예약 중 오류가 발생했습니다.');
        console.error('Error reserving seat:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {classes.map(classItem => (
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

      {/* 📌 모달 창 (좌석 선택) */}
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
              {seats.map(seat => (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff' },
  scrollContent: { padding: 20 },
  classCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  className: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  professorName: { fontSize: 14, color: '#666' },
  capacityText: { fontSize: 13, color: '#555', marginTop: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  seatGrid: {
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 45,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  selectedSeat: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  reservedSeat: {
    backgroundColor: '#f39c12',
    borderColor: '#e67e22',
  },
  disabledSeat: {
    backgroundColor: '#7f8c8d',
    borderColor: '#636e72',
  },
  seatText: { color: '#2c3e50', fontSize: 13 },
  reserveButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: '#27ae60',
  },
  reserveButtonDisabled: { backgroundColor: '#95a5a6' },
  reserveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
