package com.zeroton.reservation.reservation_zeroton.reservation.domain;

import com.zeroton.reservation.reservation_zeroton.base.BaseTimeEntity;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.ClassSeat;
import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;


@Entity
@Getter
public class Reservation extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name="reservation_id")
    private Long id;

    private LocalDateTime dueDate;
    private Long extensionNum;

    @OneToOne
    @JoinColumn(name = "seat_id")
    private ClassSeat classSeat;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;


    public void setMember(Member member){
    this.member = member;
}

    public void setClassSeat(ClassSeat classSeat){
        this.classSeat = classSeat;
    }

    public Reservation(){
        this.dueDate = LocalDateTime.now().plusHours(6);
        this.extensionNum = 0L;
    }

    public void updateTime(){
        this.dueDate = LocalDateTime.now().plusHours(6);
    }

    public void upExtensionNum(){
        this.extensionNum += 1;
    }
    public void downExtensionNum(){
        this.extensionNum -= 1;
    }

    public static Reservation createReservation(Member member, ClassSeat classSeat){
        Reservation reservation = new Reservation();

        classSeat.changeReserved();
        reservation.setMember(member);
        reservation.setClassSeat(classSeat);
        member.setReservation(reservation);
        classSeat.setReservation(reservation);

        return reservation;
    }

}