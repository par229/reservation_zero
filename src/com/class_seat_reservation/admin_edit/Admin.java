package com.class_seat_reservation.admin_edit; // 관리자 정보를 저장하는 클래스

// 관리자(Admin) 정보: 관리자 ID와 이름만 관리
public class Admin {
    private final String adminId;  // 관리자 ID
    private String adminName;      // 관리자 이름

    public Admin(String adminId, String adminName) {
        this.adminId = adminId;
        this.adminName = adminName;
    }

    public String getAdminId() {
        return adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    @Override
    public String toString() {
        return "[관리자ID=" + adminId + ", 이름=" + adminName + "]";
    }
}

