package com.zeroton.reservation.reservation_zeroton.member.dto;

import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import lombok.Data;

@Data
public class MemberDto {

    private Long userId;
    private String email;
    private String nickname;
    private String username;
    private String studentId;

    public MemberDto(Member member) {
        this.userId = member.getId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.username = member.getUsername();
        this.studentId = member.getStudentId();
    }
}
