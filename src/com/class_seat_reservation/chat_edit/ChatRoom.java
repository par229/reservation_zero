package com.class_seat_reservation.chat_edit; // 채팅 메시지 목록을 관리

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ChatRoom {
    private final List<ChatMessage> messages;

    public ChatRoom() {
        this.messages = new ArrayList<>();
    }

    // 메시지를 추가
    public void addMessage(ChatMessage message) {
        messages.add(message);
    }

    // 전체 메시지 목록 반환 (읽기 전용)
    public List<ChatMessage> getMessages() {
        return Collections.unmodifiableList(messages);
    }
}

