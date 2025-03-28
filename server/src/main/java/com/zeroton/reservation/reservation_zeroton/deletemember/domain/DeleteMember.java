package com.zeroton.reservation.reservation_zeroton.deletemember.domain;

import com.zeroton.reservation.reservation_zeroton.member.Model.Gender;
import com.zeroton.reservation.reservation_zeroton.member.Model.Major;
import com.zeroton.reservation.reservation_zeroton.member.Model.MemberRole;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DeleteMember {

    @Id
    @GeneratedValue
    @Column(name = "delete_member_id")
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


    @Builder
    public DeleteMember(String email, String password, String username, String nickname,
                        String studentId, String profileImageUrl, Gender gender, Major major,
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
}
