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

  const [seats, setSeats] = useState<Seat[][]>(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

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
    }
  };

  const handleReservation = () => {
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
