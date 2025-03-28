package com.zeroton.reservation.reservation_zeroton.classseat.dto;

import com.zeroton.reservation.reservation_zeroton.classseat.domain.Status;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ClassSeatDTO {

    private Long number;

    @Enumerated(EnumType.STRING)
    private Status status;

    public ClassSeatDTO(Long number, Status status){
        this.number = number;
        this.status = status;
    }
}
