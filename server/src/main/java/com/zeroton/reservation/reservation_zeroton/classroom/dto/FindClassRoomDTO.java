package com.zeroton.reservation.reservation_zeroton.classroom.dto;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.classroom.domain.ClassRoom;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@ToString
public class FindClassRoomDTO {
    @NotNull
    private Building building;
    @NotNull
    private Long roomNumber;
    @NotNull
    private Long totalSeatNumber;
    @NotNull
    private Integer reservedSeatNumber;

    public FindClassRoomDTO(ClassRoom classRoom, Integer reservedSeatNumber){
        this.building = classRoom.getBuilding();
        this.roomNumber = classRoom.getNumber();
        this.totalSeatNumber = classRoom.getTotalSeats() + reservedSeatNumber;
        this.reservedSeatNumber = reservedSeatNumber;
    }
}
