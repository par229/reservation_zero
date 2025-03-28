package com.zeroton.reservation.reservation_zeroton.reservation.repository;

import com.zeroton.reservation.reservation_zeroton.member.repository.MemberRepository;
import com.zeroton.reservation.reservation_zeroton.reservation.domain.Reservation;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Boolean existsByMemberId(Long memberId);

    Optional<Reservation> findByMemberId(Long memberId);

    void deleteByMemberId(Long memberId);
}

