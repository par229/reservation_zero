import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// 교실 데이터 타입 정의
interface Classroom {
  id: string;
  name: string;
  building: string;
  capacity: number;
  available: number;
  floor: number;
}

export default function ClassroomListScreen() {
  // 하드코딩된 교실 데이터
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: '1',
      name: '101호',
      building: '공학관',
      capacity: 40,
      available: 15,
      floor: 1,
    },
    {
      id: '2',
      name: '102호',
      building: '공학관',
      capacity: 30,
      available: 8,
      floor: 1,
    },
    {
      id: '3',
      name: '201호',
      building: '공학관',
      capacity: 50,
      available: 22,
      floor: 2,
    },
    {
      id: '4',
      name: '202호',
      building: '공학관',
      capacity: 35,
      available: 0,
      floor: 2,
    },
    {
      id: '5',
      name: '301호',
      building: '공학관',
      capacity: 60,
      available: 30,
      floor: 3,
    },
    {
      id: '6',
      name: '101호',
      building: '인문관',
      capacity: 30,
      available: 12,
      floor: 1,
    },
    {
      id: '7',
      name: '102호',
      building: '인문관',
      capacity: 25,
      available: 5,
      floor: 1,
    },
    {
      id: '8',
      name: '201호',
      building: '인문관',
      capacity: 40,
      available: 18,
      floor: 2,
    },
    {
      id: '9',
      name: '101호',
      building: '자연관',
      capacity: 45,
      available: 20,
      floor: 1,
    },
    {
      id: '10',
      name: '201호',
      building: '자연관',
      capacity: 55,
      available: 25,
      floor: 2,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // 교실 검색 필터링
  const filteredClassrooms = classrooms.filter(classroom => {
    const query = searchQuery.toLowerCase();
    return (
      classroom.name.toLowerCase().includes(query) ||
      classroom.building.toLowerCase().includes(query) ||
      `${classroom.building} ${classroom.name}`.toLowerCase().includes(query)
    );
  });

  // 교실 선택 처리
  const handleClassroomSelect = (classroom: Classroom) => {
    if (classroom.available > 0) {
      // 해당 교실의 좌석 예약 화면으로 이동
      router.push('/main');
    } else {
      // 좌석 없음 알림
      alert('현재 예약 가능한 좌석이 없습니다.');
    }
  };

  // 교실 아이템 렌더링
  const renderClassroomItem = ({ item }: { item: Classroom }) => (
    <TouchableOpacity
      style={[
        styles.classroomItem,
        item.available === 0 && styles.disabledClassroom,
      ]}
      onPress={() => handleClassroomSelect(item)}
      disabled={item.available === 0}
    >
      <View style={styles.classroomInfo}>
        <Text style={styles.classroomName}>
          {item.building} {item.name}
        </Text>
        <Text style={styles.classroomDetail}>{item.floor}층 | 수용인원: {item.capacity}명</Text>
      </View>
      <View style={styles.availabilityContainer}>
        {item.available > 0 ? (
          <>
            <Text style={styles.availabilityText}>
              {item.available}석 가능
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </>
        ) : (
          <Text style={styles.fullText}>만석</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // 교실 목록을 건물별로 그룹화
  const groupedClassrooms: { [key: string]: Classroom[] } = {};
  filteredClassrooms.forEach(classroom => {
    if (!groupedClassrooms[classroom.building]) {
      groupedClassrooms[classroom.building] = [];
    }
    groupedClassrooms[classroom.building].push(classroom);
  });

  // 건물 그룹 헤더 렌더링
  const renderBuildingHeader = (building: string) => (
    <View style={styles.buildingHeader}>
      <Text style={styles.buildingName}>{building}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>교실별 예약</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="건물 또는 강의실 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {Object.keys(groupedClassrooms).length > 0 ? (
        <FlatList
          data={Object.entries(groupedClassrooms)}
          keyExtractor={([building]) => building}
          renderItem={({ item: [building, classrooms] }) => (
            <View>
              {renderBuildingHeader(building)}
              {classrooms.map((classroom) => (
                <View key={classroom.id}>
                  {renderClassroomItem({ item: classroom })}
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={styles.classroomList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#4a86e8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  classroomList: {
    padding: 10,
  },
  buildingHeader: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  buildingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classroomItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
  },
  disabledClassroom: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  classroomInfo: {
    flex: 1,
  },
  classroomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  classroomDetail: {
    fontSize: 14,
    color: '#666',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 14,
    color: '#4a86e8',
    fontWeight: 'bold',
    marginRight: 5,
  },
  fullText: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});