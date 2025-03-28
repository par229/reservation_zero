package com.zeroton.reservation.reservation_zeroton.reservation.dto;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.ClassSeat;
import java.time.LocalDateTime;

import com.zeroton.reservation.reservation_zeroton.reservation.domain.Reservation;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class FindReservationDTO {


    private Building building;

    private Long roomNumber;

    private Long seatNumber;

    private LocalDateTime startDate;
    private LocalDateTime dueDate;
    private Long extensionNum;

    public FindReservationDTO(Reservation reservation){
        ClassSeat classSeat = reservation.getClassSeat();
        this.building = classSeat.getClassRoom().getBuilding();
        this.roomNumber = classSeat.getClassRoom().getNumber();
        this.seatNumber = classSeat.getNumber();
        this.startDate = reservation.getCreatedDate();
        this.dueDate = reservation.getDueDate();
        this.extensionNum = reservation.getExtensionNum();
    }
}
