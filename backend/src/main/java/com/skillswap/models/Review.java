package com.skillswap.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}
