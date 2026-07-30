package com.skillswap.models;

import com.skillswap.models.enums.ExchangeStatus;
import com.skillswap.models.enums.MeetingMethod;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exchange_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "requested_skill_id")
    private Skill requestedSkill;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offered_skill_id")
    private Skill offeredSkill;

    private Integer durationWeeks;
    private Integer weeklyHours;

    @Enumerated(EnumType.STRING)
    private MeetingMethod meetingMethod;
    
    @Column(length = 1000)
    private String message;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ExchangeStatus status = ExchangeStatus.PENDING;
}
