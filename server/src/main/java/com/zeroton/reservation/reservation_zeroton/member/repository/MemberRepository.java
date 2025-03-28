package com.zeroton.reservation.reservation_zeroton.member.repository;

import com.zeroton.reservation.reservation_zeroton.member.Model.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

}
