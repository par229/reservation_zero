package com.zeroton.reservation.reservation_zeroton.seat.repository;

import com.zeroton.reservation.reservation_zeroton.seat.domain.SeatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long> {
    boolean isReserved(Long seatId, LocalDateTime now1, LocalDateTime now2);
}
