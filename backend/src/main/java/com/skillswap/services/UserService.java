package com.skillswap.services;

import com.skillswap.dto.ProfileUpdateRequestDto;
import com.skillswap.dto.SkillDto;
import com.skillswap.dto.UserProfileDto;
import com.skillswap.dto.UserSkillDto;
import com.skillswap.models.User;
import com.skillswap.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserProfileDto getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDto(user);
    }

    public UserProfileDto updateProfile(String username, ProfileUpdateRequestDto updateDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateDto.fullName() != null) user.setFullName(updateDto.fullName());
        if (updateDto.bio() != null) user.setBio(updateDto.bio());
        if (updateDto.country() != null) user.setCountry(updateDto.country());
        if (updateDto.city() != null) user.setCity(updateDto.city());
        if (updateDto.languages() != null) user.setLanguages(updateDto.languages());
        if (updateDto.timeZone() != null) user.setTimeZone(updateDto.timeZone());
        if (updateDto.experienceLevel() != null) user.setExperienceLevel(updateDto.experienceLevel());
        if (updateDto.availability() != null) user.setAvailability(updateDto.availability());

        user = userRepository.save(user);
        return mapToDto(user);
    }

    private UserProfileDto mapToDto(User user) {
        Set<UserSkillDto> skillDtos = user.getSkills().stream()
                .map(us -> new UserSkillDto(
                        us.getId(),
                        new SkillDto(us.getSkill().getId(), us.getSkill().getName(), us.getSkill().getCategory()),
                        us.getSkillType().name(),
                        us.getProficiencyLevel() != null ? us.getProficiencyLevel().name() : null
                )).collect(Collectors.toSet());

        return new UserProfileDto(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getBio(),
                user.getCountry(),
                user.getCity(),
                user.getLanguages(),
                user.getRating(),
                user.getCompletedExchanges(),
                skillDtos
        );
    }
}
