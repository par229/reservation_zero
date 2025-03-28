package com.zeroton.reservation.reservation_zeroton.seat.service;

import com.zeroton.reservation.reservation_zeroton.seat.domain.ClassSeat;
import com.zeroton.reservation.reservation_zeroton.seat.repository.ClassSeatRepository;
import com.zeroton.reservation.reservation_zeroton.seat.repository.SeatReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final ClassSeatRepository classSeatRepository;
    private final SeatReservationRepository seatReservationRepository;

    // 좌석이 예약가능한지 여부 판단
    public boolean isSeatReservable(Long seatId) {
        // 좌석 존재 여부 + 현재 상태 확인
        Optional<ClassSeat> optionalClassSeat = classSeatRepository.findById(seatId);

        if (optionalClassSeat.isPresent()) {
            throw new IllegalStateException("좌석이 존재하지 않습니다.");
        }

        ClassSeat classSeat = optionalClassSeat.get();

        if (classSeat.getStatus() != ClassSeat.Status.AVAILABLE) {
            return false;
        }

        // 해당 시간 기준으로 해당 좌석이 예약되어 있는지
        LocalDateTime now = LocalDateTime.now();

        boolean isAlreadyReserved = seatReservationRepository.isReserved(
                seatId, now, now
        )
    }
}
