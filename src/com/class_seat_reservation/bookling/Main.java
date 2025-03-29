package com.class_seat_reservation.bookling; // 좌석 예약 시스템 테스트용 메인 클래스

public class Main {
    public static void main(String[] args) {
        SeatManager seatManager = new SeatManager();
        NotificationService notificationService = new NotificationService();
        ReservationManager reservationManager = new ReservationManager(seatManager, notificationService);

        // 학번 32214432, 이름 홍길동으로 좌석 A3 예약
        Reservation res1 = reservationManager.reserveSeat("32214432", "홍길동", "A3");
        if (res1 != null) {
            System.out.println("예약 성공: " + res1);
        }

        // 이미 예약된 좌석 A3에 대해 학번 32242123, 이름 김철수로 예약 시도 (실패)
        Reservation res2 = reservationManager.reserveSeat("32242123", "김철수", "A3");
        if (res2 == null) {
            System.out.println("예약 실패: 좌석 A3은 이미 예약되었습니다.");
        }

        // 학번 32228976, 이름 "한산"으로 좌석 "A5" 예약
        Reservation res3 = reservationManager.reserveSeat("32228976", "한산", "A5");
        if (res3 != null) {
            System.out.println("예약 성공: " + res3);
        }

        // 좌석 "A3" 예약 취소
        boolean cancel = reservationManager.cancelReservation("A3");
        System.out.println("예약 취소 (좌석 A3): " + (cancel ? "성공" : "실패"));

        // 취소 후, 학번 32192013, 이름 "이민호"로 좌석 A3 재예약 시도
        Reservation res4 = reservationManager.reserveSeat("32192013", "이민호", "A3");
        if (res4 != null) {
            System.out.println("재예약 성공: " + res4);
        }
    }
}

