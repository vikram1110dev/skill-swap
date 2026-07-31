package com.skillswap.controllers;

import com.skillswap.dto.MatchDto;
import com.skillswap.dto.UserProfileDto;
import com.skillswap.models.User;
import com.skillswap.services.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import com.skillswap.repositories.UserRepository;

@RestController
@RequestMapping("/api")
public class MatchController {

    private final MatchService matchService;
    private final UserRepository userRepository;

    public MatchController(MatchService matchService, UserRepository userRepository) {
        this.matchService = matchService;
        this.userRepository = userRepository;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<MatchDto>> getMatches(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(matchService.findMatchesForUser(user));
    }

    @GetMapping("/discover")
    public ResponseEntity<List<UserProfileDto>> discoverUsers(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(matchService.discoverUsers(user));
    }
}
