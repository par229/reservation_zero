package com.class_seat_reservation.attendance;

/*
 출석 확인 시스템의 기능 테스트용 메인 클래스로 학생들의 출석 상태를 기록하고 조회하는 예시를 보여줌
 */
public class Main {
    public static void main(String[] args) {
        // AttendanceService 인스턴스 생성은 출석 기록을 관리할 서비스
        AttendanceService attendanceService = new AttendanceService();

        // 학생 32214232은 "09:00" 수업에 출석(PRESENT)으로 기록
        // 학생 32235921은 "09:00" 수업에 결석(ABSENT)으로 기록
        attendanceService.recordAttendance("32214232", "09:00", AttendanceStatus.PRESENT);
        attendanceService.recordAttendance("32235921", "09:00", AttendanceStatus.ABSENT);

        // 첫 번째 학생의 상태 조회
        AttendanceStatus status1 = attendanceService.getAttendanceStatus("32214232", "09:00");
        // 두 번째 학생의 상태 조회
        AttendanceStatus status2 = attendanceService.getAttendanceStatus("32235921", "09:00");

        // PRESENT → 출석, ABSENT → 결석으로 표시
        String display1 = (status1 == AttendanceStatus.PRESENT) ? "출석" : "결석";
        String display2 = (status2 == AttendanceStatus.PRESENT) ? "출석" : "결석";

        // 결과 출력
        System.out.println("학생 32214232 (09:00): " + display1);
        System.out.println("학생 32235921 (09:00): " + display2);
    }
}
