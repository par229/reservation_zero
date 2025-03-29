import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    studentId: '',
    department: '',
    year: '',
    attendanceRate: 0,
    currentSeat: ''
  });

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfoStr = await AsyncStorage.getItem('user_info');
        const token = await AsyncStorage.getItem('auth_token');
        
        if (!token) {
          // 토큰이 없으면 로그인 화면으로 이동
          router.replace('/login');
          return;
        }
        
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          setUserData({
            name: userInfo.name || '사용자',
            studentId: userInfo.studentId || '학번 없음',
            department: userInfo.department || '학과 없음',
            year: userInfo.year || '학년 없음',
            attendanceRate: Math.floor(Math.random() * 31) + 70, // 70~100% 랜덤 출석률
            currentSeat: `${Math.floor(Math.random() * 6) + 1}-${Math.floor(Math.random() * 5) + 1}` // 랜덤 좌석 번호
          });
        }
      } catch (error) {
        console.error('사용자 정보 로드 중 오류 발생:', error);
        router.replace('/login'); // 오류 발생 시 로그인 화면으로 이동
      }
    };

    loadUserData();
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              
              // 실제 API 호출 대신 임시 지연 추가 (로딩 상태 확인용)
              await new Promise((resolve) => setTimeout(resolve, 1000));
              
              // AsyncStorage에서 인증 관련 데이터 제거
              await AsyncStorage.removeItem('auth_token');
              await AsyncStorage.removeItem('user_info');
              
              // 로그인 화면으로 이동
              router.replace('/login');
            } catch (error) {
              console.error('로그아웃 중 오류 발생:', error);
              Alert.alert('로그아웃 오류', '로그아웃 처리 중 오류가 발생했습니다.');
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a86e8" />
        <Text style={styles.loadingText}>로그아웃 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={80} color="#4a86e8" />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userInfo}>{userData.studentId}</Text>
          <Text style={styles.userInfo}>{userData.department} / {userData.year}</Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>출석 현황</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.attendanceRate}%</Text>
              <Text style={styles.statLabel}>출석률</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.currentSeat || '-'}</Text>
              <Text style={styles.statLabel}>현재 좌석</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.menuText}>알림 설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text style={styles.menuText}>도움말</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#555" />
            <Text style={styles.menuText}>설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a86e8',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

/*import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    studentId: '',
    department: '',
    year: '',
    attendanceRate: 0,
    currentSeat: ''
  });

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfoStr = await AsyncStorage.getItem('user_info');
        
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          setUserData({
            name: userInfo.name || '사용자',
            studentId: userInfo.studentId || '학번 없음',
            department: userInfo.department || '학과 없음',
            year: userInfo.year || '학년 없음',
            attendanceRate: 85, // 임시 데이터
            currentSeat: 'A-15' // 임시 데이터
          });
        }
      } catch (error) {
        console.error('사용자 정보 로드 중 오류 발생:', error);
      }
    };

    loadUserData();
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              
              // 실제 API 호출 대신 임시 지연 추가 (로딩 상태 확인용)
              await new Promise((resolve) => setTimeout(resolve, 1000));
              
              // AsyncStorage에서 인증 관련 데이터 제거
              await AsyncStorage.removeItem('auth_token');
              await AsyncStorage.removeItem('user_info');
              
              // 로그인 화면으로 이동
              router.replace('/login');
            } catch (error) {
              console.error('로그아웃 중 오류 발생:', error);
              Alert.alert('로그아웃 오류', '로그아웃 처리 중 오류가 발생했습니다.');
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a86e8" />
        <Text style={styles.loadingText}>로그아웃 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={80} color="#4a86e8" />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userInfo}>{userData.studentId}</Text>
          <Text style={styles.userInfo}>{userData.department} / {userData.year}</Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>출석 현황</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.attendanceRate}%</Text>
              <Text style={styles.statLabel}>출석률</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.currentSeat || '-'}</Text>
              <Text style={styles.statLabel}>현재 좌석</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.menuText}>알림 설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text style={styles.menuText}>도움말</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#555" />
            <Text style={styles.menuText}>설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a86e8',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
*/

/*import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  // 임시 사용자 데이터
  const user = {
    name: '홍길동',
    studentId: '12345678',
    department: '컴퓨터공학과',
    year: '3학년',
    attendanceRate: 85,
    currentSeat: 'A-15',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={80} color="#4a86e8" />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userInfo}>{user.studentId}</Text>
          <Text style={styles.userInfo}>{user.department} / {user.year}</Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>출석 현황</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.attendanceRate}%</Text>
              <Text style={styles.statLabel}>출석률</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.currentSeat || '-'}</Text>
              <Text style={styles.statLabel}>현재 좌석</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.menuText}>알림 설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text style={styles.menuText}>도움말</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#555" />
            <Text style={styles.menuText}>설정</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileIcon: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a86e8',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});*/