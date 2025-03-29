package com.class_seat_reservation.bookling; // 좌석 예약 정보를 정의하는 클래스

import java.time.LocalDateTime;

public class Reservation {
    private final String studentNumber;  // 학번 (8자리)
    private final String studentName;    // 이름
    private final Seat seat;            // 예약된 좌석
    private final LocalDateTime reservedAt; // 예약 시각

    public Reservation(String studentNumber, String studentName, Seat seat, LocalDateTime reservedAt) {
        this.studentNumber = studentNumber;
        this.studentName = studentName;
        this.seat = seat;
        this.reservedAt = reservedAt;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public Seat getSeat() {
        return seat;
    }

    public LocalDateTime getReservedAt() {
        return reservedAt;
    }

    @Override
    public String toString() { // 예약 정보를 문자열로 반환
        return "Reservation{" +
                "학번='" + studentNumber + '\'' +
                ", 이름='" + studentName + '\'' +
                ", 좌석=" + seat.getSeatNumber() +
                ", 예약시각=" + reservedAt +
                '}';
    }
}

