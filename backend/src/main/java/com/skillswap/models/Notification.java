package com.skillswap.models;

import com.skillswap.models.enums.NotificationType;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Column(nullable = false)
    private String message;

    private LocalDateTime timestamp = LocalDateTime.now();

    private Boolean isRead = false;

    public Notification() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return this.user; }
    public void setUser(User user) { this.user = user; }
    public NotificationType getType() { return this.type; }
    public void setType(NotificationType type) { this.type = type; }
    public String getMessage() { return this.message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getTimestamp() { return this.timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Boolean getIsRead() { return this.isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
}
