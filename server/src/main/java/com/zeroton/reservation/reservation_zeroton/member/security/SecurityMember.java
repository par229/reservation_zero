package com.zeroton.reservation.reservation_zeroton.member.security;

import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class SecurityMember extends User {
    private static final long serialVersionUiD = 1L;

    public SecurityMember(Member member){
        super(member.getEmail(),"{noop}"+ member.getPassword(), AuthorityUtils
                .createAuthorityList(member.getRole().toString()));
    }

    public String getEmail(){
        return super.getUsername();
    }
}
