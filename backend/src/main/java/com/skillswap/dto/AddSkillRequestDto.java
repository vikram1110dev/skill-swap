package com.skillswap.dto;

import jakarta.validation.constraints.NotNull;

public record AddSkillRequestDto(
    @NotNull Long skillId,
    @NotNull String skillType,
    String proficiencyLevel
) {}
