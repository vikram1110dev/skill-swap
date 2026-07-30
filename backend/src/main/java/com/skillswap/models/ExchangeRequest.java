package com.skillswap.models;

import com.skillswap.models.enums.ExchangeStatus;
import com.skillswap.models.enums.MeetingMethod;
import jakarta.persistence.*;
@Entity
@Table(name = "exchange_requests")
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
    private ExchangeStatus status = ExchangeStatus.PENDING;

    public ExchangeRequest() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public User getRequester() { return this.requester; }
    public void setRequester(User requester) { this.requester = requester; }
    public User getReceiver() { return this.receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }
    public Skill getRequestedSkill() { return this.requestedSkill; }
    public void setRequestedSkill(Skill requestedSkill) { this.requestedSkill = requestedSkill; }
    public Skill getOfferedSkill() { return this.offeredSkill; }
    public void setOfferedSkill(Skill offeredSkill) { this.offeredSkill = offeredSkill; }
    public Integer getDurationWeeks() { return this.durationWeeks; }
    public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }
    public Integer getWeeklyHours() { return this.weeklyHours; }
    public void setWeeklyHours(Integer weeklyHours) { this.weeklyHours = weeklyHours; }
    public MeetingMethod getMeetingMethod() { return this.meetingMethod; }
    public void setMeetingMethod(MeetingMethod meetingMethod) { this.meetingMethod = meetingMethod; }
    public String getMessage() { return this.message; }
    public void setMessage(String message) { this.message = message; }
    public ExchangeStatus getStatus() { return this.status; }
    public void setStatus(ExchangeStatus status) { this.status = status; }
}
