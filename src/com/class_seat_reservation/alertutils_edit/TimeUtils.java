package com.class_seat_reservation.alertutils_edit;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

// 현재 시간 반환 및 HH:mm 형식 문자열 파싱
public class TimeUtils {

    public static LocalTime now() {
        return LocalTime.now();
    }

    public static LocalTime parseTime(String timeStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return LocalTime.parse(timeStr, formatter);
    }
}
