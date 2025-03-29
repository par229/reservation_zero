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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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