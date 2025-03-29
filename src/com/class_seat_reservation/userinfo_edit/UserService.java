package com.class_seat_reservation.userinfo_edit; // 사용자 목록을 관리하고 조회·수정 기능을 제공

import java.util.ArrayList;
import java.util.List;

public class UserService {
    private final List<User> users = new ArrayList<>();

    public void addUser(User user) { // 사용자 등록
        users.add(user);
    }

    public User findUserByStudentNumber(String studentNumber) { // 학번으로 사용자 검색
        for (User user : users) {
            if (user.getStudentNumber().equals(studentNumber)) {
                return user;
            }
        }
        return null;
    }

    public List<User> getAllUsers() { // 전체 사용자 목록 반환
        return users;
    }

    public boolean updateSeatStatus(String studentNumber, CurrentSeatStatus newStatus) {
        User user = findUserByStudentNumber(studentNumber);
        if (user != null) {
            user.setSeatStatus(newStatus);
            return true;
        }
        return false;
    }

    public boolean updateAttendance(String studentNumber, boolean attended) {
        User user = findUserByStudentNumber(studentNumber);
        if (user != null) {
            user.setAttended(attended);
            return true;
        }
        return false;
    }
}
