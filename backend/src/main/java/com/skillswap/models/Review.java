package com.skillswap.models;

import jakarta.persistence.*;
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewee_id", nullable = false)
    private User reviewee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exchange_id", nullable = false)
    private ExchangeRequest exchange;

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 1000)
    private String comment;

    private Integer communicationRating;
    private Integer knowledgeRating;
    private Integer punctualityRating;
    private Integer friendlinessRating;

    private Boolean recommendation;

    public Review() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public User getReviewer() { return this.reviewer; }
    public void setReviewer(User reviewer) { this.reviewer = reviewer; }
    public User getReviewee() { return this.reviewee; }
    public void setReviewee(User reviewee) { this.reviewee = reviewee; }
    public ExchangeRequest getExchange() { return this.exchange; }
    public void setExchange(ExchangeRequest exchange) { this.exchange = exchange; }
    public Integer getRating() { return this.rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return this.comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Integer getCommunicationRating() { return this.communicationRating; }
    public void setCommunicationRating(Integer communicationRating) { this.communicationRating = communicationRating; }
    public Integer getKnowledgeRating() { return this.knowledgeRating; }
    public void setKnowledgeRating(Integer knowledgeRating) { this.knowledgeRating = knowledgeRating; }
    public Integer getPunctualityRating() { return this.punctualityRating; }
    public void setPunctualityRating(Integer punctualityRating) { this.punctualityRating = punctualityRating; }
    public Integer getFriendlinessRating() { return this.friendlinessRating; }
    public void setFriendlinessRating(Integer friendlinessRating) { this.friendlinessRating = friendlinessRating; }
    public Boolean getRecommendation() { return this.recommendation; }
    public void setRecommendation(Boolean recommendation) { this.recommendation = recommendation; }
}
