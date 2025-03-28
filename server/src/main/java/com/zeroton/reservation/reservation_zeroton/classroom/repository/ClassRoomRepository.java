package com.zeroton.reservation.reservation_zeroton.classroom.repository;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.classroom.domain.ClassRoom;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.ClassSeat;
import com.zeroton.reservation.reservation_zeroton.classseat.domain.Status;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {

    @Query("select distinct cr from ClassRoom cr join fetch cr.classSeats")
    List<ClassRoom> findClassRoomAndClassSeats();

    Optional<ClassRoom> findClassRoomByNumberAndBuilding(Long number, Building building);

    @Query("select distinct cs from ClassSeat cs " +
            "where cs.classRoom.building = :building " +
            "and cs.classRoom.number = :roomNumber " +
            "and cs.status = :status")
    List<ClassSeat> findClassRoomAndClassSeatsWithUnReserved(@Param("building") Building building, @Param("roomNumber") Long roomNumber, @Param("status")Status status);

    @Query("select distinct cs from ClassSeat cs " +
            "where cs.classRoom.building = :building " +
            "and cs.classRoom.number = :roomNumber " +
            "and cs.status = :status")
    List<ClassSeat> findClassRoomAndClassSeatsWithReserved(@Param("building") Building building, @Param("roomNumber") Long roomNumber, @Param("status")Status status);

    Boolean existsByBuildingAndNumber(Building building, Long number);

}