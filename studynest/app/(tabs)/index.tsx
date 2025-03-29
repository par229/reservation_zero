import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Modal, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, commonStyles } from '../styles/common';

interface ClassItem {
  id: number;
  name: string;
  professor: string;
  time: string;
  location: string;
  days: string;
}

interface SeatType {
  id: number;
  row: string;
  col: number;
  status: 'available' | 'reserved' | 'selected' | 'occupied';
}

// 임시 수업 데이터
const classes: ClassItem[] = [
  {
    id: 1,
    name: '데이터베이스 설계',
    professor: '김교수',
    time: '09:00 - 11:00',
    location: '공학관 401호',
    days: '월, 수',
  },
  {
    id: 2,
    name: '프로그래밍 기초',
    professor: '이교수',
    time: '13:00 - 15:00',
    location: '공학관 302호',
    days: '화, 목',
  },
  {
    id: 3,
    name: '알고리즘',
    professor: '박교수',
    time: '15:30 - 17:30',
    location: '공학관 305호',
    days: '월, 금',
  },
];

const CARD_MARGIN = SPACING.tiny;
const CARD_SIZE = (Dimensions.get('window').width - SPACING.large * 2 - CARD_MARGIN * 4) / 3;

export default function IndexScreen() {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);

  // 좌석 데이터 초기화
  React.useEffect(() => {
    if (modalVisible) {
      const rows = ['A', 'B', 'C', 'D', 'E'];
      const cols = 6;
      const initialSeats: SeatType[] = [];
      
      rows.forEach((row, rowIndex) => {
        for (let col = 1; col <= cols; col++) {
          initialSeats.push({
            id: rowIndex * cols + col,
            row,
            col,
            status: Math.random() > 0.3 ? 'available' : 'occupied',
          });
        }
      });
      
      setSeats(initialSeats);
    }
  }, [modalVisible]);

  const handleClassSelect = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedClass(null);
  };

  const handleSeatPress = (seat: SeatType) => {
    if (seat.status === 'occupied') return;
    
    setSeats(prevSeats => prevSeats.map(s => {
      if (s.id === seat.id) {
        return {
          ...s,
          status: s.status === 'selected' ? 'available' : 'selected'
        };
      }
      if (s.status === 'selected') {
        return { ...s, status: 'available' };
      }
      return s;
    }));
    
    setSelectedSeat(seat.status === 'selected' ? null : seat);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.tertiary]}
        style={commonStyles.gradientBackground}
      >
        <BlurView intensity={20} tint="light" style={[commonStyles.header, styles.header]}>
          <Text style={commonStyles.title}>좌석 예약</Text>
          <Text style={commonStyles.subtitle}>내 수업</Text>
        </BlurView>

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.content}
        >
          {classes.map((classItem) => (
            <BlurView
              key={classItem.id}
              intensity={20}
              tint="light"
              style={[commonStyles.card, styles.classCard]}
            >
              <TouchableOpacity
                onPress={() => handleClassSelect(classItem)}
                style={styles.cardContent}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.className} numberOfLines={1}>
                    {classItem.name}
                  </Text>
                  <Text style={styles.professorName} numberOfLines={1}>
                    {classItem.professor}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {classItem.time}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {classItem.location}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.text.secondary} />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {classItem.days}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </BlurView>
          ))}
        </ScrollView>

        <BlurView intensity={90} tint="light" style={[commonStyles.card, styles.footer]}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.text.secondary} />
            <Text style={commonStyles.infoText}>수업을 선택하여 좌석을 예약해주세요</Text>
          </View>
        </BlurView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeModal}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.modalContent}
            >
              <BlurView intensity={90} tint="light" style={styles.modalBlur}>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalTitle}>{selectedClass?.name}</Text>
                    <Text style={styles.modalSubtitle}>좌석 예약</Text>
                  </View>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={24} color={COLORS.text.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.classInfo}>
                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={18} color={COLORS.text.secondary} />
                      <Text style={styles.infoText}>{selectedClass?.time}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="location-outline" size={18} color={COLORS.text.secondary} />
                      <Text style={styles.infoText}>{selectedClass?.location}</Text>
                    </View>
                  </View>

                  <View style={styles.seatContainer}>
                    <View style={styles.seatGrid}>
                      {seats.map((seat) => (
                        <TouchableOpacity
                          key={seat.id}
                          onPress={() => handleSeatPress(seat)}
                          style={[
                            styles.seat,
                            seat.status === 'occupied' && styles.seatOccupied,
                            seat.status === 'selected' && styles.seatSelected,
                          ]}
                          disabled={seat.status === 'occupied'}
                        >
                          <Text style={[
                            styles.seatText,
                            (seat.status === 'occupied' || seat.status === 'selected') && styles.seatTextWhite
                          ]}>
                            {`${seat.row}${seat.col}`}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.legendContainer}>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.text.primary }]} />
                        <Text style={styles.legendText}>이용 가능</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
                        <Text style={styles.legendText}>선택됨</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.text.secondary }]} />
                        <Text style={styles.legendText}>이용 중</Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      style={[
                        styles.reserveButton,
                        !selectedSeat && styles.reserveButtonDisabled
                      ]}
                      disabled={!selectedSeat}
                    >
                      <Text style={styles.reserveButtonText}>
                        {selectedSeat ? '예약하기' : '좌석을 선택해주세요'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: SPACING.large,
  },
  scrollContent: {
    paddingHorizontal: SPACING.large,
    gap: SPACING.medium,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  classCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContent: {
    flex: 1,
    padding: SPACING.small,
    justifyContent: 'space-between',
  },
  cardHeader: {
    marginBottom: SPACING.tiny,
  },
  className: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  professorName: {
    fontSize: FONTS.tiny,
    color: COLORS.text.secondary,
  },
  infoContainer: {
    gap: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 4,
    borderRadius: 4,
  },
  infoText: {
    fontSize: FONTS.tiny,
    color: COLORS.text.primary,
    flex: 1,
  },
  footer: {
    margin: 0,
    marginBottom: 0,
    borderRadius: 0,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    overflow: 'hidden',
  },
  modalBlur: {
    flex: 1,
    padding: SPACING.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  modalTitle: {
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.tiny,
  },
  modalSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.text.secondary,
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classInfo: {
    marginBottom: SPACING.large,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.small,
    marginBottom: SPACING.small,
  },
  seatContainer: {
    flex: 1,
    width: '100%',
  },
  seatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.small,
    marginBottom: SPACING.large,
  },
  seat: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.text.primary,
  },
  seatSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  seatOccupied: {
    backgroundColor: COLORS.text.secondary,
    borderColor: COLORS.text.secondary,
  },
  seatText: {
    fontSize: FONTS.small,
    color: COLORS.text.primary,
  },
  seatTextWhite: {
    color: COLORS.text.white,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.large,
    marginBottom: SPACING.large,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.tiny,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: FONTS.tiny,
    color: COLORS.text.secondary,
  },
  reserveButton: {
    backgroundColor: COLORS.accent,
    padding: SPACING.medium,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonDisabled: {
    backgroundColor: COLORS.text.secondary,
    opacity: 0.5,
  },
  reserveButtonText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text.white,
  },
});
