package com.class_seat_reservation.admin; // 질문 목록을 관리하고 상태를 업데이트

import java.util.ArrayList;
import java.util.List;

public class QuestionService {
    private final List<Question> questions = new ArrayList<>();

    public void addQuestion(Question question) { // 질문 등록
        questions.add(question);
    }

    public List<Question> getAllQuestions() { // 전체 질문 목록
        return questions;
    }

    public boolean updateQuestionStatus(Question question, QuestionStatus newStatus) {
        if (questions.contains(question)) {
            question.setStatus(newStatus);
            return true;
        }
        return false;
    }
}
