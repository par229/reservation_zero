package com.zeroton.reservation.reservation_zeroton.classroom.dto;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ClassRoomDTO {
    @NotNull
    private Building building;
    @NotNull
    private Long roomNumber;
    @NotNull
    private Long totalSeatNumber;

    public ClassRoomDTO(Building building, Long roomNumber,Long totalSeatNumber){
        this.building = building;
        this.roomNumber = roomNumber;
        this.totalSeatNumber = totalSeatNumber;
    }

}
