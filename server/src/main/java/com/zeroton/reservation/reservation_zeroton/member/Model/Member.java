package com.zeroton.reservation.reservation_zeroton.member.Model;

import com.zeroton.reservation.reservation_zeroton.base.BaseEntity;


import java.util.ArrayList;
import java.util.List;

import com.zeroton.reservation.reservation_zeroton.reservation.domain.Reservation;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String email;
    private String password;
    private String username;
    private String nickname;
    private String studentId;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Major major;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private MemberRole role = MemberRole.ROLE_NOT_PERMITTED;

    public void changeRole(MemberRole memberRole){
        this.role = memberRole;
    }

    @OneToOne(fetch=FetchType.LAZY,mappedBy = "member")
    private Reservation reservation;


    public void setReservation(Reservation reservation) {
        reservation.setMember(this);
        this.reservation = reservation;
    }

    @Builder
    public Member(String email, String password, String username, String nickname,
                  String studentId, Gender gender, Major major,
                  MemberRole role) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.studentId = studentId;
        this.gender = gender;
        this.major = major;
        this.role = role;
    }

    public void changePassword(String password){this.password = password;}

    public void changeNickName(String nickname){
        this.nickname=nickname;
    }

    public void deleteMember(){
        this.email = null;
        this.password = null;
        this.username = null;
        this.nickname = null;
        this.studentId = null;
        this.gender = null;
        this.major = null;
        this.role = null;
    }
}
