package com.zeroton.reservation.reservation_zeroton.reservationsave.domain;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ReservationSavePredicate {

    public static Specification<ReservationSave> search(Map<String, String> paramMap) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            String building = paramMap.get("searchBuilding");
            if (building != null && !building.isEmpty()) {
                predicates.add(cb.equal(root.get("building"), Building.valueOf(building)));
            }

            String room = paramMap.get("searchRoom");
            if (room != null && !room.isEmpty()) {
                predicates.add(cb.equal(root.get("roomNumber"), Long.parseLong(room)));
            }

            String seat = paramMap.get("searchSeat");
            if (seat != null && !seat.isEmpty()) {
                predicates.add(cb.equal(root.get("seatNumber"), Long.parseLong(seat)));
            }

            String email = paramMap.get("searchEmail");
            if (email != null && !email.isEmpty()) {
                predicates.add(cb.equal(root.get("email"), email));
            }

            String name = paramMap.get("searchName");
            if (name != null && !name.isEmpty()) {
                predicates.add(cb.equal(root.get("username"), name));
            }

            String studentId = paramMap.get("searchStudentId");
            if (studentId != null && !studentId.isEmpty()) {
                predicates.add(cb.equal(root.get("studentId"), studentId));
            }

            String currentDate = paramMap.get("currentDate");
            if (currentDate != null && !currentDate.isEmpty()) {
                LocalDate localDate = LocalDate.parse(currentDate);
                predicates.add(cb.between(
                        root.get("startTime"),
                        localDate.atStartOfDay(),
                        localDate.atTime(LocalTime.MAX)
                ));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}