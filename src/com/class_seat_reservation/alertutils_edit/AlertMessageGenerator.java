package com.class_seat_reservation.alertutils_edit;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 알림 메시지 생성 및 중복 방지
public class AlertMessageGenerator {

    private static final List<String> alertedTimes = Collections.synchronizedList(new ArrayList<>());

    public static String getAlertMessage(String classTimeStr) {
        if (alertedTimes.contains(classTimeStr)) return null;

        if (AttendanceChecker.isInAlertTime(classTimeStr)) {
            alertedTimes.add(classTimeStr);
            return "출석 10분 전입니다. 자리 예약을 마쳐주세요.";
        } else if (AttendanceChecker.isLate(classTimeStr)) {
            alertedTimes.add(classTimeStr);
            return "출석 시간이 지났습니다. 지각 또는 결석 처리될 수 있습니다.";
        }
        return null;
    }

    public static List<String> getAlertMessagesForClasses(List<String> classTimes) {
        List<String> messages = new ArrayList<>();
        for (String time : classTimes) {
            String msg = getAlertMessage(time);
            if (msg != null) {
                messages.add("[" + time + "] " + msg);
            }
        }
        return messages;
    }
}

