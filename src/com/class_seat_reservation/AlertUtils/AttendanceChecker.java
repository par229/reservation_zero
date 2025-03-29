package com.class_seat_reservation.AlertUtils;

import java.time.LocalTime;

// 출석 시간 체크: 알림 시간 및 지각 판별
public class AttendanceChecker {

    public static boolean isInAlertTime(String classTimeStr) {
        try {
            LocalTime now = TimeUtils.now();
            LocalTime classTime = TimeUtils.parseTime(classTimeStr);
            return now.isAfter(classTime.minusMinutes(10)) && now.isBefore(classTime);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean isLate(String classTimeStr) {
        try {
            LocalTime now = TimeUtils.now();
            LocalTime classTime = TimeUtils.parseTime(classTimeStr);
            return now.isAfter(classTime.plusMinutes(3));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
