package com.zeroton.reservation.reservation_zeroton.config;

import com.zeroton.reservation.reservation_zeroton.email.service.AuthService;
import com.zeroton.reservation.reservation_zeroton.email.service.MemberDetailService;
import com.zeroton.reservation.reservation_zeroton.email.util.JwtRequestFilter;
import com.zeroton.reservation.reservation_zeroton.email.util.JwtUtil;
import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import com.zeroton.reservation.reservation_zeroton.member.Model.MemberRole;
import com.zeroton.reservation.reservation_zeroton.member.repository.MemberRepository;
import com.zeroton.reservation.reservation_zeroton.member.security.SecurityMember;
import lombok.RequiredArgsConstructor;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // PasswordEncoder 빈 등록
    }
}

