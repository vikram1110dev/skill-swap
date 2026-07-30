package com.skillswap.dto;

import java.time.LocalDateTime;

public class ExchangeRequestDto {
    private Long id;
    private Long senderId;
    private String senderName;
    private String senderEmail; // Hidden unless ACCEPTED
    private Long receiverId;
    private String receiverName;
    private String receiverEmail; // Hidden unless ACCEPTED
    private SkillDto offeredSkill;
    private SkillDto requestedSkill;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    public ExchangeRequestDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getSenderEmail() { return senderEmail; }
    public void setSenderEmail(String senderEmail) { this.senderEmail = senderEmail; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public String getReceiverName() { return receiverName; }
    public void setReceiverName(String receiverName) { this.receiverName = receiverName; }

    public String getReceiverEmail() { return receiverEmail; }
    public void setReceiverEmail(String receiverEmail) { this.receiverEmail = receiverEmail; }

    public SkillDto getOfferedSkill() { return offeredSkill; }
    public void setOfferedSkill(SkillDto offeredSkill) { this.offeredSkill = offeredSkill; }

    public SkillDto getRequestedSkill() { return requestedSkill; }
    public void setRequestedSkill(SkillDto requestedSkill) { this.requestedSkill = requestedSkill; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
