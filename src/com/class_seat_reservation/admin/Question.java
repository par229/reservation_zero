package com.class_seat_reservation.admin; // 질문 데이터를 담는 클래스

import java.time.LocalDateTime;

// 한 사용자가 관리자에게 남긴 질문: 학번, 질문 내용, 작성 시각, 상태
public class Question {
    private final String studentNumber;
    private final String content;
    private final LocalDateTime createdAt;
    private QuestionStatus status;

    public Question(String studentNumber, String content) {
        this.studentNumber = studentNumber;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.status = QuestionStatus.PENDING; // 기본 상태: PENDING
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public QuestionStatus getStatus() {
        return status;
    }

    public void setStatus(QuestionStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "[학번=" + studentNumber
                + ", 질문=\"" + content
                + "\", 작성=" + createdAt
                + ", 상태=" + status + "]";
    }
}

