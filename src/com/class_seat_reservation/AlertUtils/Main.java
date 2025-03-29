package com.class_seat_reservation.AlertUtils;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String classTime = "15:30";

        // 알림 메시지
        String alertMsg = AlertMessageGenerator.getAlertMessage(classTime);
        System.out.println("알림 메시지: " + alertMsg);

        // 출석 체크
        boolean inAlertTime = AttendanceChecker.isInAlertTime(classTime);
        boolean isLate = AttendanceChecker.isLate(classTime);
        System.out.println("출석 10분 전인가? " + inAlertTime);
        System.out.println("지각 상태인가? " + isLate);

        // 남은 시간 (0 이하 -> 이미 지남 처리)
        long minutesLeft = TimeDifference.minutesUntilClass(classTime);
        if (minutesLeft == 0) {
            System.out.println("이미 수업 시간이 지났습니다.");
        } else {
            System.out.println("수업 시작까지 남은 시간: " + minutesLeft + "분");
        }

        // 여러 시간에 대한 알림
        List<String> classTimes = Arrays.asList("15:30", "16:00", "16:30");
        List<String> messages = AlertMessageGenerator.getAlertMessagesForClasses(classTimes);
        for (String msg : messages) {
            System.out.println(msg);
        }
    }
}
