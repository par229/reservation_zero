package com.zeroton.reservation.reservation_zeroton.member.security;


import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import com.zeroton.reservation.reservation_zeroton.member.Model.MemberRole;
import com.zeroton.reservation.reservation_zeroton.member.repository.MemberRepository;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;


@RequiredArgsConstructor
@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {

        if( handler instanceof HandlerMethod == false ) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod)handler;

        // @Auth 받아오기
        Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
        Auth adminRole = handlerMethod.getMethod().getDeclaringClass().getAnnotation(Auth.class);

        if( auth == null && adminRole == null) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if( authentication.getPrincipal().equals("anonymousUser") ) {
            response.sendRedirect(request.getContextPath() + "/unauthorized");
            return false;
        }

        SecurityMember securityMember = (SecurityMember) authentication.getPrincipal();

        String email = securityMember.getEmail();
        if ( email == null ) {
            response.sendRedirect(request.getContextPath() + "/unauthorized");
            return false;
        }

        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException("존재하지 않는 회원입니다."));

        MemberRole role = adminRole.role(); // 어노테이션에서 설정한 Role

        if(MemberRole.ROLE_ADMIN.equals(role) ) {
            if(!MemberRole.ROLE_ADMIN.equals(member.getRole())){
                response.sendRedirect(request.getContextPath() + "/unauthorized");
                return false;
            }
        }

        return true;
    }

}
