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

const classes: ClassItem[] = [
  { id: 1, name: '데이터베이스 설계', professor: '김교수', time: '09:00 - 11:00', location: '공학관 401호', days: '월, 수', capacity: 30 },
  { id: 2, name: '프로그래밍 기초', professor: '이교수', time: '13:00 - 15:00', location: '공학관 302호', days: '화, 목', capacity: 20 },
  { id: 3, name: '알고리즘', professor: '박교수', time: '15:30 - 17:30', location: '공학관 305호', days: '월, 금', capacity: 25 },
];

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
    <SafeAreaView style={styles.container}>
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