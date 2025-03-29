package com.class_seat_reservation.chat_edit; // 사용자가 채팅을 보낼 수 있는지 판단

import com.class_seat_reservation.userinfo_edit.CurrentSeatStatus;
import com.class_seat_reservation.userinfo_edit.User;

public class ChatPermission {
    // 자리 상태가 PRESENT이면 채팅 가능
    public static boolean canSendChat(User user) {
        return user.getSeatStatus() == CurrentSeatStatus.PRESENT;
    }
}
