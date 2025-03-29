package com.class_seat_reservation.alertutils_edit;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

public class TimeDifference {

    public static long minutesUntilClass(String classTimeStr) {
        try {
            LocalTime now = TimeUtils.now();
            LocalTime classTime = TimeUtils.parseTime(classTimeStr);
            long diff = ChronoUnit.MINUTES.between(now, classTime);
            // 수업 시간이 이미 지난 경우 0 반환
            return (diff < 0) ? 0 : diff;
        } catch (Exception e) {
            e.printStackTrace();
            return Long.MIN_VALUE;
        }
    }
}

