package com.class_seat_reservation.AlertUtils;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import com.class_seat_reservation.AlertUtils.TimeUtils;

public class TimeDifference {

    public static long minutesUntilClass(String classTimeStr) {
        try {
            LocalTime now = TimeUtils.now();
            LocalTime classTime = TimeUtils.parseTime(classTimeStr);
            long diff = ChronoUnit.MINUTES.between(now, classTime);

            // 수업 시간이 이미 지났으면 0으로 처리
            if (diff < 0) {
                return 0;
            }
            return diff;

        } catch (Exception e) {
            e.printStackTrace();
            return Long.MIN_VALUE;
        }
    }
}
