package com.zeroton.reservation.reservation_zeroton.reservation.dto;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ReservationDTO {

    @NotNull
    Building building;
    @NotNull
    Long roomNumber;
    @NotNull
    Long seatNumber;

    public ReservationDTO(Building building, Long roomNumber, Long seatNumber){
        this.building = building;
        this.roomNumber = roomNumber;
        this.seatNumber = seatNumber;
    }

}
