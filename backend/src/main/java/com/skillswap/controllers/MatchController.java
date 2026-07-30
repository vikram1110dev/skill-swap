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

@RestController
@RequestMapping("/api")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<MatchDto>> getMatches(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(matchService.findMatchesForUser(user));
    }

    @GetMapping("/discover")
    public ResponseEntity<List<UserProfileDto>> discoverUsers(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(matchService.discoverUsers(user));
    }
}
