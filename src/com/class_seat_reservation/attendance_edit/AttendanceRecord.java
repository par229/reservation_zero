package com.class_seat_reservation.attendance_edit;

// 한 학생의 특정 시간에 대한 출석 기록
public class AttendanceRecord {
    private final String studentNumber;       // 학번
    private final String classTime;           // 수업 시간 (예: "09:00")
    private AttendanceStatus attendanceStatus; // 출석 상태

    public AttendanceRecord(String studentNumber, String classTime, AttendanceStatus attendanceStatus) {
        this.studentNumber = studentNumber;
        this.classTime = classTime;
        this.attendanceStatus = attendanceStatus;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public String getClassTime() {
        return classTime;
    }

    public AttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(AttendanceStatus attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
}
