package com.class_seat_reservation.chat_edit; // 채팅 메시지 작성자, 내용, 유형, 작성 시간 정의

import com.class_seat_reservation.userinfo_edit.User;
import java.time.LocalDateTime;

public class ChatMessage {
    private final User user;          // 메시지 작성자
    private final String content;     // 메시지 내용
    private final ChatType type;      // 메시지 유형
    private final LocalDateTime time; // 메시지 작성 시간

    public ChatMessage(User user, String content, ChatType type) {
        this.user = user;
        this.content = content;
        this.type = type;
        this.time = LocalDateTime.now();
    }

    public User getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public ChatType getType() {
        return type;
    }

    public LocalDateTime getTime() {
        return time;
    }

    @Override
    public String toString() {
        return "[학번=" + user.getStudentNumber() +
                ", 이름=" + user.getName() +
                ", 유형=" + type +
                ", 내용=\"" + content +
                "\", 시간=" + time + "]";
    }
}
