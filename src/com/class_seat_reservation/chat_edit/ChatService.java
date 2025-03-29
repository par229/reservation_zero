package com.class_seat_reservation.chat_edit; // 채팅 메시지 추가, 조회을 담당하는 서비스

import com.class_seat_reservation.userinfo_edit.User;

public class ChatService {
    private final ChatRoom chatRoom;

    public ChatService(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    // 출석자인지 확인 후 메시지 등록
    public boolean sendMessage(User user, String content, ChatType type) {
        if (ChatPermission.canSendChat(user)) {
            ChatMessage msg = new ChatMessage(user, content, type);
            chatRoom.addMessage(msg);
            return true;
        }
        return false;
    }

    // 채팅룸의 전체 메시지 반환
    public ChatRoom getChatRoom() {
        return chatRoom;
    }
}
