package com.class_seat_reservation.attendance_edit;

import java.util.HashMap;
import java.util.Map;

// 출석 기록을 등록하고 조회하는 서비스
public class AttendanceService {
    private final Map<String, AttendanceRecord> attendanceRecords = new HashMap<>();

    // 학번, 수업 시간, 출석 상태를 기록
    public void recordAttendance(String studentNumber, String classTime, AttendanceStatus status) {
        String key = studentNumber + "_" + classTime;
        AttendanceRecord record = new AttendanceRecord(studentNumber, classTime, status);
        attendanceRecords.put(key, record);
    }

    // 학번, 수업 시간으로 출석 상태를 조회
    public AttendanceStatus getAttendanceStatus(String studentNumber, String classTime) {
        String key = studentNumber + "_" + classTime;
        AttendanceRecord record = attendanceRecords.get(key);
        return (record != null) ? record.getAttendanceStatus() : null;
    }
}
