package com.skillswap.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(nullable = false, length = 2000)
    private String content;

    private LocalDateTime timestamp = LocalDateTime.now();

    private Boolean isRead = false;

    public Message() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public User getSender() { return this.sender; }
    public void setSender(User sender) { this.sender = sender; }
    public User getReceiver() { return this.receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }
    public String getContent() { return this.content; }
    public void setContent(String content) { this.content = content; }
    public LocalDateTime getTimestamp() { return this.timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Boolean getIsRead() { return this.isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
}
