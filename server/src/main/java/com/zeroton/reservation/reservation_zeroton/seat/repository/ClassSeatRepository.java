package com.zeroton.reservation.reservation_zeroton.seat.repository;

import com.zeroton.reservation.reservation_zeroton.seat.domain.ClassSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassSeatRepository extends JpaRepository<ClassSeat, Long> {
}
