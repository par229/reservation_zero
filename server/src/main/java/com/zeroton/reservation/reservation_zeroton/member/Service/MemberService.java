package com.zeroton.reservation.reservation_zeroton.member.Service;

import java.io.IOException;

import com.zeroton.reservation.reservation_zeroton.deletemember.repository.DeleteMemberRepository;
import com.zeroton.reservation.reservation_zeroton.deletemember.domain.DeleteMember;
import com.zeroton.reservation.reservation_zeroton.member.repository.MemberRepository;
import com.zeroton.reservation.reservation_zeroton.member.dto.ChangePasswordForm;
import com.zeroton.reservation.reservation_zeroton.member.dto.DeleteForm;
import com.zeroton.reservation.reservation_zeroton.member.dto.ValidatedPasswordForm;
import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import com.zeroton.reservation.reservation_zeroton.errors.NotFoundException;
import com.zeroton.reservation.reservation_zeroton.email.service.AuthService;
import com.zeroton.reservation.reservation_zeroton.email.util.RedisUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final DeleteMemberRepository deleteMemberRepository;
    private final RedisUtil redisUtil;

    @Transactional
    public boolean changeNickName(String newNickName,Member member){
        if(authService.isDuplicateNickName(newNickName)){
            return false;
        }

        member.changeNickName(newNickName);
        return true;
    }

    @Transactional
    public void changePassword(ChangePasswordForm changePasswordForm, Long userId) throws NotFoundException{
        Member member = memberRepository.findById(userId).orElseThrow(
                () -> new NotFoundException("존재하지 않는 회원입니다."));
        authService.comparePassword(changePasswordForm.getCurrentPassword(),member.getPassword());
        member.changePassword(passwordEncoder.encode(changePasswordForm.getChangePassword()));
    }

    @Transactional
    public void deleteMember(Long userId, DeleteForm deleteForm, HttpServletRequest req, HttpServletResponse res){
        Member member = memberRepository.findById(userId).orElseThrow(
                () -> new NotFoundException("존재하지 않는 회원입니다."));
        authService.comparePassword(deleteForm.getPassword(), member.getPassword());

        if (member.getReservation() != null){
            throw new IllegalStateException("예약된 좌석이 있습니다. 좌석 반납 후 다시 진행해주세요.");
        }

        DeleteMember deleteMember = DeleteMember.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .username(member.getUsername())
                .nickname(member.getNickname())
                .studentId(member.getStudentId())
                .gender(member.getGender())
                .major(member.getMajor())
                .role(member.getRole())
                .build();
        deleteMemberRepository.save(deleteMember);

        memberRepository.delete(member);

        //세션 날리기
        authService.deleteAllTokens(req, res);
    }

    @Transactional
    public String changeValidatedPassword(ValidatedPasswordForm validatedPasswordForm) throws NotFoundException{
        String email = validatedPasswordForm.getEmail();
        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new NotFoundException("존재하지 않는 회원입니다."));

        String permittedEmail = redisUtil.getData(validatedPasswordForm.getPermissionCode());
        redisUtil.deleteData(validatedPasswordForm.getPermissionCode());

        if(permittedEmail == null || !permittedEmail.equals(email)){
            throw new IllegalArgumentException("이메일 인증이 올바르게 수행되지 않았습니다.");
        }
        member.changePassword(passwordEncoder.encode(validatedPasswordForm.getPassword()));
        return "성공적으로 비밀번호를 변경하였습니다.";
    }
}
