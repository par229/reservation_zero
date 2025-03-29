package com.class_seat_reservation.bookling; // 좌석 목록 및 가용 좌석을 관리하는 클래스

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SeatManager {
    private final List<Seat> seats;

    public SeatManager() {
        seats = new ArrayList<>();
        // A1부터 A10까지 좌석 초기화
        for (int i = 1; i <= 10; i++) {
            seats.add(new Seat("A" + i));
        }
    }

    public List<Seat> getAllSeats() { // 전체 좌석 목록
        return Collections.unmodifiableList(seats);
    }

    public Seat getSeatByNumber(String seatNumber) { // 좌석 번호 검색
        for (Seat seat : seats) {
            if (seat.getSeatNumber().equals(seatNumber)) {
                return seat;
            }
        }
        return null;
    }

    public List<Seat> getAvailableSeats() { // 예약되지 않은 좌석 목록
        List<Seat> available = new ArrayList<>();
        for (Seat seat : seats) {
            if (!seat.isReserved()) {
                available.add(seat);
            }
        }
        return available;
    }
}
