package com.class_seat_reservation.bookling_edit; // 좌석 예약, 취소, 조회 기능을 제공하는 클래스

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ReservationManager {
    private final SeatManager seatManager;
    private final Map<String, Reservation> reservations;
    private final NotificationService notificationService;

    public ReservationManager(SeatManager seatManager, NotificationService notificationService) {
        this.seatManager = seatManager;
        this.reservations = new HashMap<>();
        this.notificationService = notificationService;
    }

    public Reservation reserveSeat(String studentNumber, String studentName, String seatNumber) {
        Seat seat = seatManager.getSeatByNumber(seatNumber);
        if (seat == null) {
            System.out.println("잘못된 좌석 번호: " + seatNumber);
            return null;
        }
        if (seat.isReserved()) {
            System.out.println("이미 예약된 좌석: " + seatNumber);
            return null;
        }
        seat.reserve();
        Reservation reservation = new Reservation(studentNumber, studentName, seat, LocalDateTime.now());
        reservations.put(seatNumber, reservation);
        // 예약 알림 전송
        notificationService.sendReservationNotification(studentNumber, studentName, seatNumber, reservation.getReservedAt());
        return reservation;
    }

    public boolean cancelReservation(String seatNumber) {
        Reservation reservation = reservations.get(seatNumber);
        if (reservation == null) {
            System.out.println("예약 정보가 없음: " + seatNumber);
            return false;
        }
        seatManager.getSeatByNumber(seatNumber).cancelReservation();
        reservations.remove(seatNumber);
        // 취소 알림 전송
        notificationService.sendCancellationNotification(
                reservation.getStudentNumber(),
                reservation.getStudentName(),
                seatNumber
        );
        return true;
    }

    public Reservation getReservation(String seatNumber) { // 좌석 예약 정보 조회
        return reservations.get(seatNumber);
    }
}

