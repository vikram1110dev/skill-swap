package com.skillswap.dto;

public record UserSkillDto(
    Long id,
    SkillDto skill,
    String skillType,
    String proficiencyLevel
) {}
