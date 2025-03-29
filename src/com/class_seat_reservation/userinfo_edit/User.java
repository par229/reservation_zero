package com.class_seat_reservation.userinfo_edit; // 사용자 정보를 저장

// 학번, 학과, 이름, 학년, 출석여부, 현재 자리 상태
public class User {
    private final String studentNumber;  // 8자리 학번
    private String department;           // 학과
    private String name;                 // 이름
    private int year;                    // 학년
    private boolean attended;            // 출석 여부(true: 출석, false: 미출석)
    private CurrentSeatStatus seatStatus; // 현재 자리 상태

    public User(String studentNumber, String department, String name, int year) {
        this.studentNumber = studentNumber;
        this.department = department;
        this.name = name;
        this.year = year;
        this.attended = false;
        this.seatStatus = CurrentSeatStatus.ABSENT;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public boolean isAttended() {
        return attended;
    }

    public void setAttended(boolean attended) { // 출석 여부 설정
        this.attended = attended;
    }

    public CurrentSeatStatus getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(CurrentSeatStatus seatStatus) { // 현재 자리 상태 설정
        this.seatStatus = seatStatus;
    }

    @Override
    public String toString() {
        return "[학번=" + studentNumber + ", 학과=" + department + ", 이름=" + name
                + ", 학년=" + year + ", 출석여부=" + (attended ? "출석" : "미출석")
                + ", 자리상태=" + seatStatus + "]";
    }
}
