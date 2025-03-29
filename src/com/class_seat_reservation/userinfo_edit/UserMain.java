package com.class_seat_reservation.userinfo_edit; // 사용자 정보 기능을 테스트

public class UserMain {
    public static void main(String[] args) {
        UserService userService = new UserService();

        // 사용자 생성 (학번, 학과, 이름, 학년)
        User user1 = new User("32204432", "특수교육과", "한산", 4);
        User user2 = new User("32252123", "경영학과", "박민형", 1);

        // 사용자 등록
        userService.addUser(user1);
        userService.addUser(user2);

        // 사용자 정보 확인
        System.out.println("등록된 사용자:");
        for (User u : userService.getAllUsers()) {
            System.out.println(u);
        }

        // 학번으로 사용자 검색 후에 출석여부와 자리 상태 변경
        userService.updateAttendance("32204432", true); // 출석
        userService.updateSeatStatus("32204432", CurrentSeatStatus.PRESENT); // 자리 상태: 출석
        userService.updateSeatStatus("32242123", CurrentSeatStatus.AWAY);    // 자리 상태: 자리비움

        // 변경 후 정보 확인
        System.out.println("\n정보 수정 후 사용자 목록:");
        for (User u : userService.getAllUsers()) {
            System.out.println(u);
        }
    }
}

