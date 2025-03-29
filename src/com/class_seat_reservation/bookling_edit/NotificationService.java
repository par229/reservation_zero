package com.class_seat_reservation.bookling_edit; // 예약 및 취소 알림을 콘솔로 전송하는 클래스

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class NotificationService {
    public void sendReservationNotification(String studentNumber, String studentName,
                                            String seatNumber, LocalDateTime reservedAt) {
        // 예약 알림
        String time = reservedAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("알림: 학번=" + studentNumber + ", 이름=" + studentName
                + ", 좌석=" + seatNumber + " 예약 완료 (" + time + ")");
    }

    public void sendCancellationNotification(String studentNumber, String studentName, String seatNumber) {
        // 취소 알림
        System.out.println("알림: 학번=" + studentNumber + ", 이름=" + studentName
                + ", 좌석=" + seatNumber + " 예약 취소됨.");
    }
}


