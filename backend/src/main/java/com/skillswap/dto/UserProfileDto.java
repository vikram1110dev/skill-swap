package com.skillswap.dto;

import java.util.Set;

public record UserProfileDto(
    Long id,
    String fullName,
    String username,
    String email,
    String bio,
    String country,
    String city,
    Set<String> languages,
    Double rating,
    Integer completedExchanges,
    Set<UserSkillDto> skills
) {}
