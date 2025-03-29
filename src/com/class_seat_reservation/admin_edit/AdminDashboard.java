package com.class_seat_reservation.admin_edit; // 관리자 대시보드: 출석 및 질문 현황, 관리자 정보 등을 확인

import com.class_seat_reservation.userinfo_edit.User;
import com.class_seat_reservation.userinfo_edit.UserService;
import java.util.List;

public class AdminDashboard {
    private final AdminService adminService;
    private final UserService userService;
    private final QuestionService questionService;

    public AdminDashboard(AdminService adminService,
                          UserService userService,
                          QuestionService questionService) {
        this.adminService = adminService;
        this.userService = userService;
        this.questionService = questionService;
    }

    public void showAllAdmins() { // 관리자 목록 확인
        System.out.println("=== 관리자 목록 ===");
        List<Admin> admins = adminService.getAllAdmins();
        if (admins.isEmpty()) {
            System.out.println("등록된 관리자가 없습니다.");
            return;
        }
        for (Admin a : admins) {
            System.out.println(a);
        }
    }

    public void showAttendanceStatus() { // 사용자 출석 현황 조회
        System.out.println("=== 출석 현황 ===");
        List<User> allUsers = userService.getAllUsers();
        if (allUsers.isEmpty()) {
            System.out.println("등록된 사용자가 없습니다.");
            return;
        }
        for (User user : allUsers) {
            System.out.println(user); // toString()을 통해 [학번=, 출석여부=, 자리상태=] 출력
        }
    }

    public void showAllQuestions() { // 질문 현황 조회
        System.out.println("=== 질문 현황 ===");
        List<Question> allQuestions = questionService.getAllQuestions();
        if (allQuestions.isEmpty()) {
            System.out.println("등록된 질문이 없습니다.");
            return;
        }
        for (Question q : allQuestions) {
            System.out.println(q);
        }
    }
}
