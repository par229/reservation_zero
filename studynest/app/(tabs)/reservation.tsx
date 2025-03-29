import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function ReservationScreen() {
  const { className, seatId, date } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>예약이 완료되었습니다 🎉</Text>
      <View style={styles.card}>
        <Text style={styles.label}>수업명</Text>
        <Text style={styles.value}>{className}</Text>

        <Text style={styles.label}>좌석 번호</Text>
        <Text style={styles.value}>{seatId}</Text>

        <Text style={styles.label}>예약 일자</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    elevation: 3,
    width: '90%',
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
