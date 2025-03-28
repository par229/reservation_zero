package com.zeroton.reservation.reservation_zeroton.member.security;

import com.zeroton.reservation.reservation_zeroton.member.Model.MemberRole;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.METHOD})
public @interface Auth {
    MemberRole role() default MemberRole.ROLE_ADMIN;
}
