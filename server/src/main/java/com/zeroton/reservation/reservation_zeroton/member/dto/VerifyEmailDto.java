package com.zeroton.reservation.reservation_zeroton.member.dto;

import lombok.Data;

@Data
public class VerifyEmailDto {

    private String email;
    private String code;
}
