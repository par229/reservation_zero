package com.zeroton.reservation.reservation_zeroton.reservationsave.repository;

import com.zeroton.reservation.reservation_zeroton.reservationsave.domain.ReservationSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ReservationSaveRepository extends JpaRepository<ReservationSave, Long>, JpaSpecificationExecutor<ReservationSave> {
}