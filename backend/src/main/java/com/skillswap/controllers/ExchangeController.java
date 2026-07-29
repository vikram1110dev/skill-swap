package com.skillswap.controllers;

import com.skillswap.models.ExchangeRequest;
import com.skillswap.repositories.ExchangeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    @Autowired
    private ExchangeRequestRepository exchangeRequestRepository;

    @PostMapping
    public ExchangeRequest createRequest(@RequestBody ExchangeRequest request) {
        request.setStatus("PENDING");
        return exchangeRequestRepository.save(request);
    }
    
    @GetMapping("/receiver/{receiverId}")
    public List<ExchangeRequest> getRequestsForReceiver(@PathVariable Long receiverId) {
        return exchangeRequestRepository.findByReceiverId(receiverId);
    }
    
    @PutMapping("/{id}/status")
    public ExchangeRequest updateStatus(@PathVariable Long id, @RequestParam String status) {
        ExchangeRequest req = exchangeRequestRepository.findById(id).orElseThrow();
        req.setStatus(status);
        return exchangeRequestRepository.save(req);
    }
}
