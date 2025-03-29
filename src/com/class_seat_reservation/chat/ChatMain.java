package com.class_seat_reservation.chat; // 채팅 기능을 테스트

import com.class_seat_reservation.userinfo.CurrentSeatStatus;
import com.class_seat_reservation.userinfo.User;
import com.class_seat_reservation.userinfo.UserService;

public class ChatMain {
    public static void main(String[] args) {
        // 1) 사용자 관리
        UserService userService = new UserService();
        // 2) 채팅방 & 채팅 서비스 준비
        ChatRoom chatRoom = new ChatRoom();
        ChatService chatService = new ChatService(chatRoom);

        // 3) 사용자 2명 생성
        User user1 = new User("32238566", "컴퓨터공학과", "김성현", 3);
        User user2 = new User("32197890", "소프트웨어학과", "이민지", 2);

        // 4) 사용자 등록
        userService.addUser(user1);
        userService.addUser(user2);

        // 아직 둘 다 ABSENT 상태 → 메시지 전송 실패
        boolean res1 = chatService.sendMessage(user1, "출석 전에 질문 가능?", ChatType.QUESTION);
        System.out.println("김성현 메시지 전송: " + (res1 ? "성공" : "실패 (출석 상태 아님)"));

        // 김성현을 출석 상태로 변경
        userService.updateSeatStatus("32123456", CurrentSeatStatus.PRESENT);

        // 이제 김성현은 채팅 가능
        boolean res2 = chatService.sendMessage(user1, "안녕하세요! 오늘 폭우인데 온라인 강의로 대체 안 되나요?", ChatType.QUESTION);
        System.out.println("김성현 메시지 전송: " + (res2 ? "성공" : "실패"));

        // 이민지는 여전히 ABSENT
        boolean res3 = chatService.sendMessage(user2, "저도 궁금합니다!", ChatType.QUESTION);
        System.out.println("이민지 메시지 전송: " + (res3 ? "성공" : "실패 (출석 상태 아님)"));

        // 전체 메시지 목록 출력
        System.out.println("\n=== 채팅 메시지 목록 ===");
        for (ChatMessage msg : chatService.getChatRoom().getMessages()) {
            System.out.println(msg);
        }
    }
}
