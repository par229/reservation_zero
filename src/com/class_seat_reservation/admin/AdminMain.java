package com.class_seat_reservation.admin; // 관리자 대시보드를 테스트

import com.class_seat_reservation.userinfo.CurrentSeatStatus;
import com.class_seat_reservation.userinfo.User;
import com.class_seat_reservation.userinfo.UserService;

public class AdminMain {
    public static void main(String[] args) {
        // 관리자, 사용자, 질문 관련 서비스 준비
        AdminService adminService = new AdminService();
        UserService userService = new UserService();     // 6번 항목에서 만든 코드
        QuestionService questionService = new QuestionService();

        // AdminDashboard 생성
        AdminDashboard adminDashboard = new AdminDashboard(adminService, userService, questionService);

        // 관리자 등록
        Admin admin1 = new Admin("admin01", "관리자A");
        Admin admin2 = new Admin("admin02", "관리자B");
        adminService.addAdmin(admin1);
        adminService.addAdmin(admin2);

        // 사용자 등록
        User user1 = new User("32214432", "컴퓨터공학과", "김민준", 3);
        User user2 = new User("32242123", "소프트웨어학과", "한영주", 2);
        userService.addUser(user1);
        userService.addUser(user2);

        // 사용자 한 명을 출석 상태로 설정
        userService.updateAttendance("32214432", true);
        userService.updateSeatStatus("32214432", CurrentSeatStatus.PRESENT);

        // 질문 등록
        questionService.addQuestion(new Question("32214432", "저번주 과제가 궁금합니다."));
        questionService.addQuestion(new Question("32242123", "중간고사 날짜가 어떻게 되나요?"));

        // 관리자 대시보드에서 확인
        adminDashboard.showAllAdmins();       // 관리자 목록 출력
        adminDashboard.showAttendanceStatus(); // 사용자 출석 현황 출력
        adminDashboard.showAllQuestions();     // 질문 목록 출력

        // 특정 질문 상태 업데이트 (예시)
        Question targetQ = questionService.getAllQuestions().get(0); // 첫 번째 질문
        questionService.updateQuestionStatus(targetQ, QuestionStatus.ANSWERED);

        System.out.println("\n질문 상태 업데이트 후:");
        adminDashboard.showAllQuestions(); // 질문 상태가 ANSWERED로 변경됨
    }
}
