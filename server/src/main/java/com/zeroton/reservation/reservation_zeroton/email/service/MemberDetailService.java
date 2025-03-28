package com.zeroton.reservation.reservation_zeroton.email.service;

import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import com.zeroton.reservation.reservation_zeroton.member.security.SecurityMember;
import com.zeroton.reservation.reservation_zeroton.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(email + " : 사용자 존재하지 않음")
        );
        return new SecurityMember(member);
    }
}
