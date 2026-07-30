package com.skillswap.services;

import com.skillswap.dto.AddExchangeRequestDto;
import com.skillswap.dto.ExchangeRequestDto;
import com.skillswap.dto.SkillDto;
import com.skillswap.models.ExchangeRequest;
import com.skillswap.models.Skill;
import com.skillswap.models.User;
import com.skillswap.repositories.ExchangeRequestRepository;
import com.skillswap.repositories.SkillRepository;
import com.skillswap.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExchangeService {

    private final ExchangeRequestRepository exchangeRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public ExchangeService(ExchangeRequestRepository exchangeRepository, UserRepository userRepository, SkillRepository skillRepository) {
        this.exchangeRepository = exchangeRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public ExchangeRequestDto createRequest(User sender, AddExchangeRequestDto dto) {
        User receiver = userRepository.findById(dto.getReceiverId()).orElseThrow(() -> new RuntimeException("Receiver not found"));
        Skill offeredSkill = skillRepository.findById(dto.getOfferedSkillId()).orElseThrow(() -> new RuntimeException("Offered skill not found"));
        Skill requestedSkill = skillRepository.findById(dto.getRequestedSkillId()).orElseThrow(() -> new RuntimeException("Requested skill not found"));

        ExchangeRequest req = new ExchangeRequest();
        req.setSender(sender);
        req.setReceiver(receiver);
        req.setOfferedSkill(offeredSkill);
        req.setRequestedSkill(requestedSkill);
        req.setMessage(dto.getMessage());
        
        ExchangeRequest saved = exchangeRepository.save(req);
        return mapToDto(saved, sender);
    }

    public List<ExchangeRequestDto> getRequestsForUser(User user) {
        List<ExchangeRequest> sent = exchangeRepository.findBySenderOrderByCreatedAtDesc(user);
        List<ExchangeRequest> received = exchangeRepository.findByReceiverOrderByCreatedAtDesc(user);
        
        List<ExchangeRequestDto> dtos = new ArrayList<>();
        sent.forEach(r -> dtos.add(mapToDto(r, user)));
        received.forEach(r -> dtos.add(mapToDto(r, user)));
        
        // Sort combined list by created at descending
        dtos.sort((d1, d2) -> d2.getCreatedAt().compareTo(d1.getCreatedAt()));
        
        return dtos;
    }

    public ExchangeRequestDto updateStatus(Long requestId, User user, String status) {
        ExchangeRequest req = exchangeRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        
        if (!req.getReceiver().getId().equals(user.getId()) && !req.getSender().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }
        
        req.setStatus(status.toUpperCase());
        ExchangeRequest saved = exchangeRepository.save(req);
        return mapToDto(saved, user);
    }

    private ExchangeRequestDto mapToDto(ExchangeRequest req, User currentUser) {
        ExchangeRequestDto dto = new ExchangeRequestDto();
        dto.setId(req.getId());
        dto.setSenderId(req.getSender().getId());
        dto.setSenderName(req.getSender().getFullName() != null ? req.getSender().getFullName() : req.getSender().getUsername());
        
        dto.setReceiverId(req.getReceiver().getId());
        dto.setReceiverName(req.getReceiver().getFullName() != null ? req.getReceiver().getFullName() : req.getReceiver().getUsername());
        
        SkillDto offDto = new SkillDto(req.getOfferedSkill().getId(), req.getOfferedSkill().getName(), req.getOfferedSkill().getCategory());
        dto.setOfferedSkill(offDto);

        SkillDto reqDto = new SkillDto(req.getRequestedSkill().getId(), req.getRequestedSkill().getName(), req.getRequestedSkill().getCategory());
        dto.setRequestedSkill(reqDto);

        dto.setMessage(req.getMessage());
        dto.setStatus(req.getStatus());
        dto.setCreatedAt(req.getCreatedAt());

        // Reveal emails if ACCEPTED or COMPLETED
        if (req.getStatus().equals("ACCEPTED") || req.getStatus().equals("COMPLETED")) {
            dto.setSenderEmail(req.getSender().getEmail());
            dto.setReceiverEmail(req.getReceiver().getEmail());
        }

        return dto;
    }
}
