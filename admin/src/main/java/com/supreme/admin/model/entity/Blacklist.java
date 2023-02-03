package com.supreme.admin.model.entity;

import com.supreme.admin.model.enumclass.Reason;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity             //DB에 만들 테이블임!
@NoArgsConstructor  //매개변수 없는 기본 생성자 생성
@Data               //getter,setter
@Builder             //method.method...가능하게 만들어주는
@ToString
public class Blacklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;
    private Reason reason;
    //    private Long memberIdx;
    @ManyToOne
    @JoinColumn(name="member_idx")
    private Member member;
    private LocalDateTime createdAt;

    public Blacklist(Long idx, Reason reason, Member member, LocalDateTime createdAt) {
        this.idx = idx;
        this.reason = reason;
        this.member = member;
        this.createdAt = createdAt;
    }

    public static Blacklist of(Long idx, Reason reason, Member member, LocalDateTime createdAt){
        return new Blacklist(idx, reason, member, createdAt);
    }
}