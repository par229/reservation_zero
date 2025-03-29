import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../hooks/useApi';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("입력 오류", "학번과 비밀번호를 모두 입력해주세요.");
      return;
    }
  
    try {
      setIsLoading(true);
  
      // Django 서버로 로그인 요청
      const response = await api.post("/login/", {
        email: username,
        password: password,
      });
  
      // 응답 데이터
      const { token, user } = response.data;
  
      // AsyncStorage에 토큰 및 사용자 정보 저장
      await AsyncStorage.setItem("auth_token", token);
      await AsyncStorage.setItem("user_info", JSON.stringify(user));
  
      // 로그인 성공 후 탭 화면으로 이동
      router.replace("/(tabs)");
    } catch (error) {
      //console.error("로그인 오류:", error.response?.data || error.message);
      Alert.alert("로그인 실패", "아이디 또는 비밀번호가 잘못되었습니다.");
    } finally {
      setIsLoading(false);
    }
  }; // ✅ 여기서 닫아야 함

  const handleForgotPassword = () => {
    //router.push('/forgot-password');
  };

  const handleRegister = () => {
    //router.push('/register');
  };

  return (
    <LinearGradient
      colors={['#4a86e8', '#2563eb', '#1e40af']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>SEAT</Text>
          <Text style={styles.appSlogan}>좌석 예약 & 출석체크 시스템</Text>
        </View>

        <BlurView intensity={30} tint="dark" style={styles.formContainer}>
          <View style={[
            styles.inputContainer,
            focusedInput === 'username' && styles.inputContainerFocused
          ]}>
            <Ionicons name="person-outline" size={22} color="#ffffff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="메일"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          <View style={[
            styles.inputContainer,
            focusedInput === 'password' && styles.inputContainerFocused
          ]}>
            <Ionicons name="lock-closed-outline" size={22} color="#ffffff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[
              styles.loginButton, 
              isLoading && styles.loginButtonDisabled
            ]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>로그인</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" style={styles.loginButtonIcon} />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity 
              onPress={handleForgotPassword} 
              disabled={isLoading}
              style={styles.footerButton}
            >
              <Text style={styles.footerText}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}>|</Text>
            <TouchableOpacity 
              onPress={handleRegister} 
              disabled={isLoading}
              style={styles.footerButton}
            >
              <Text style={styles.footerText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 56,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  appSlogan: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
    opacity: 0.9,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  formContainer: {
    width: width * 0.9,
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputContainerFocused: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    height: '100%',
  },
  passwordToggle: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#2563eb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonIcon: {
    marginLeft: 8,
    color: '#2563eb',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerButton: {
    padding: 8,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  footerDivider: {
    color: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    fontSize: 12,
  },
});