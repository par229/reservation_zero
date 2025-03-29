package com.class_seat_reservation.bookling; // 좌석 정보를 정의하는 클래스

public class Seat {
    private final String seatNumber; // 좌석 번호
    private boolean reserved;        // 예약 여부

    public Seat(String seatNumber) {
        this.seatNumber = seatNumber;
        this.reserved = false;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void reserve() { // 좌석 예약
        reserved = true;
    }

    public void cancelReservation() { // 예약 취소
        reserved = false;
    }
}
