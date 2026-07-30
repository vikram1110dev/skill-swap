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

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    private final ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @PostMapping
    public ResponseEntity<ExchangeRequestDto> createRequest(@AuthenticationPrincipal User user, @RequestBody AddExchangeRequestDto dto) {
        return ResponseEntity.ok(exchangeService.createRequest(user, dto));
    }

    @GetMapping
    public ResponseEntity<List<ExchangeRequestDto>> getMyExchanges(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(exchangeService.getRequestsForUser(user));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ExchangeRequestDto> updateStatus(
            @PathVariable Long id, 
            @AuthenticationPrincipal User user, 
            @RequestBody UpdateExchangeStatusDto dto) {
        return ResponseEntity.ok(exchangeService.updateStatus(id, user, dto.getStatus()));
    }
}
