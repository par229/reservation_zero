package com.class_seat_reservation.userinfo_edit; // 현재 자리 상태 예로 출석, 자리비움, 결석을 정의

// 출석(PRESENT), 자리비움(AWAY), 결석(ABSENT)
public enum CurrentSeatStatus {
    PRESENT, // 출석
    AWAY,    // 자리비움
    ABSENT   // 결석
}
