package com.skillswap.controllers;

import com.skillswap.models.Review;
import com.skillswap.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }
    
    @GetMapping("/reviewee/{revieweeId}")
    public List<Review> getReviewsForUser(@PathVariable Long revieweeId) {
        return reviewRepository.findByRevieweeId(revieweeId);
    }
}
