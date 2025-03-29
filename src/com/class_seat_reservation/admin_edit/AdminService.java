package com.class_seat_reservation.admin_edit; // 관리자 목록을 관리하고 조회, 수정 기능을 제공

import java.util.ArrayList;
import java.util.List;

public class AdminService {
    private final List<Admin> admins = new ArrayList<>();

    public void addAdmin(Admin admin) { // 관리자 등록
        admins.add(admin);
    }

    public Admin findAdminById(String adminId) { // 관리자 ID로 검색
        for (Admin a : admins) {
            if (a.getAdminId().equals(adminId)) {
                return a;
            }
        }
        return null;
    }

    public List<Admin> getAllAdmins() { // 전체 관리자 목록 반환
        return admins;
    }

    // 권한 레벨 관련 기능 제거됨.
}
