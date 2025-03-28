package com.zeroton.reservation.reservation_zeroton.classroom.controller;

import com.zeroton.reservation.reservation_zeroton.classroom.domain.Building;
import com.zeroton.reservation.reservation_zeroton.classroom.dto.ClassRoomDTO;
import com.zeroton.reservation.reservation_zeroton.classroom.dto.FindClassRoomDTO;
import com.zeroton.reservation.reservation_zeroton.classroom.service.ClassRoomService;
import com.zeroton.reservation.reservation_zeroton.classseat.dto.ClassSeatDTO;
import com.zeroton.reservation.reservation_zeroton.errors.NotFoundException;
import com.zeroton.reservation.reservation_zeroton.utils.ApiUtils;
import com.zeroton.reservation.reservation_zeroton.utils.ApiUtils.ApiResult;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static com.zeroton.reservation.reservation_zeroton.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("classRoom")
public class ClassRoomController {

    private final ClassRoomService classRoomService;

    //강의실 생성하기 및 좌석 생성
    @ApiOperation(value = "강의실 생성 및 좌석 생성", notes="건물, 강의실 번호, 총 좌석수를 넘겨주면 생성함.")
    @PostMapping("/add")
    public ApiResult<String> reservation(@Valid @RequestBody ClassRoomDTO classRoomDTO) throws NotFoundException {

        classRoomService.RegistrationClassRoom(classRoomDTO.getBuilding(), classRoomDTO.getRoomNumber(), classRoomDTO.getTotalSeatNumber());
        return success("강의실을 생성했습니다.");
    }

    //강의실 모든 좌석 조회하기
    @ApiOperation(value = "해당 강의실 안 모든 좌석 상태 조회", notes="건물과 강의실 번호를 GET 방식으로 넘겨주면 해당 강의실 안 모든 좌석 상태를 조회함.")
    @GetMapping("/searchSeats/{building}/{roomNumber}")
    public ApiResult<List<ClassSeatDTO>> searchAllSeatsInRoom(@PathVariable Building building, @PathVariable Long roomNumber){
        return success(classRoomService.LookupClassRoom(roomNumber, building));
    }

    @ApiOperation(value = "강의실 전체 목록 반환",notes = "(building, 강의실 호수, 전체 인원, 예약된 인원)")
    @GetMapping("/searchAllClassRoom")
    public ApiResult<ArrayList<FindClassRoomDTO>> searchAllClassRoom(){
        return success(classRoomService.findAllClassRoomsAndClassSeats());
    }
}
