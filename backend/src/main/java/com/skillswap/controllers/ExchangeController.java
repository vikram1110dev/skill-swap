package com.skillswap.controllers;

import com.skillswap.dto.AddExchangeRequestDto;
import com.skillswap.dto.ExchangeRequestDto;
import com.skillswap.dto.UpdateExchangeStatusDto;
import com.skillswap.models.User;
import com.skillswap.services.ExchangeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import com.skillswap.repositories.UserRepository;

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    private final ExchangeService exchangeService;
    private final UserRepository userRepository;

    public ExchangeController(ExchangeService exchangeService, UserRepository userRepository) {
        this.exchangeService = exchangeService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ExchangeRequestDto> createRequest(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AddExchangeRequestDto dto) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(exchangeService.createRequest(user, dto));
    }

    @GetMapping
    public ResponseEntity<List<ExchangeRequestDto>> getMyExchanges(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(exchangeService.getRequestsForUser(user));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ExchangeRequestDto> updateStatus(
            @PathVariable Long id, 
            @AuthenticationPrincipal UserDetails userDetails, 
            @RequestBody UpdateExchangeStatusDto dto) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(exchangeService.updateStatus(id, user, dto.getStatus()));
    }
}
