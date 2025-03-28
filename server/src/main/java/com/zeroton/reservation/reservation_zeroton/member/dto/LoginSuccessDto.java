package com.zeroton.reservation.reservation_zeroton.member.dto;

import lombok.Data;

@Data
public class LoginSuccessDto {
    private Long userId;

    private String nickname;

    public LoginSuccessDto(Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }
}