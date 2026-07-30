package com.skillswap.dto;

import java.util.Set;

public record ProfileUpdateRequestDto(
    String fullName,
    String bio,
    String country,
    String city,
    Set<String> languages,
    String timeZone,
    String experienceLevel,
    String availability
) {}
