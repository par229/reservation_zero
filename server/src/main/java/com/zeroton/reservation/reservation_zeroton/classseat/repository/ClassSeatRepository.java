package com.zeroton.reservation.reservation_zeroton.classseat.repository;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.classroom.domain.ClassRoom;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.ClassSeat;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.Status;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ClassSeatRepository extends JpaRepository<ClassSeat,Long> {

    @Query("select distinct cs from ClassSeat cs " +
            "where cs.classRoom.building = :building " +
            "and cs.classRoom.number = :roomNumber " +
            "and cs.number = :seatNumber")
    Optional<ClassSeat> findClassSeat(@Param("building") Building building, @Param("roomNumber") Long roomNumber, @Param("seatNumber") Long seatNumber);

}