package com.zeroton.reservation.reservation_zeroton.reservationsave.domain;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.member.Model.Major;
import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ReservationSave {

    @Id @GeneratedValue
    @Column(name = "reservatoin_save_id")
    private Long id;

    private Building building;
    private Long roomNumber;
    private Long seatNumber;

    private String email;
    private String username;
    private String studentId;
    private Major major;

    private LocalDateTime startTime;

    private Boolean returnCheck;


    @Builder
    public ReservationSave(Building building, Long roomNumber, Long seatNumber,
                           Member member,
                           LocalDateTime startTime,Boolean returnCheck){
        this.building = building;
        this.roomNumber = roomNumber;
        this.seatNumber = seatNumber;

        this.email= member.getEmail();
        this.username = member.getUsername();
        this.studentId = member.getStudentId();
        this.major = member.getMajor();

        this.startTime = startTime;
        this.returnCheck = returnCheck;
    }

}