package com.skillswap.services;

import com.skillswap.dto.MatchDto;
import com.skillswap.dto.SkillDto;
import com.skillswap.dto.UserProfileDto;
import com.skillswap.models.User;
import com.skillswap.models.UserSkill;
import com.skillswap.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final UserRepository userRepository;
    private final UserService userService; 

    public MatchService(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public List<MatchDto> findMatchesForUser(User currentUser) {
        List<User> allUsers = userRepository.findAll();
        List<MatchDto> matches = new ArrayList<>();

        List<UserSkill> currentUserRequested = currentUser.getSkills().stream()
                .filter(us -> us.getSkillType().name().equals("REQUESTED")).collect(Collectors.toList());
        List<UserSkill> currentUserOffered = currentUser.getSkills().stream()
                .filter(us -> us.getSkillType().name().equals("OFFERED")).collect(Collectors.toList());

        for (User otherUser : allUsers) {
            if (otherUser.getId().equals(currentUser.getId())) continue;

            List<UserSkill> otherUserOffered = otherUser.getSkills().stream()
                    .filter(us -> us.getSkillType().name().equals("OFFERED")).collect(Collectors.toList());
            List<UserSkill> otherUserRequested = otherUser.getSkills().stream()
                    .filter(us -> us.getSkillType().name().equals("REQUESTED")).collect(Collectors.toList());

            // Check if other user offers something we want
            UserSkill matchingOffered = null;
            for (UserSkill req : currentUserRequested) {
                for (UserSkill off : otherUserOffered) {
                    if (req.getSkill().getId().equals(off.getSkill().getId())) {
                        matchingOffered = off;
                        break;
                    }
                }
                if (matchingOffered != null) break;
            }

            // Check if other user wants something we offer
            UserSkill matchingRequested = null;
            for (UserSkill off : currentUserOffered) {
                for (UserSkill req : otherUserRequested) {
                    if (off.getSkill().getId().equals(req.getSkill().getId())) {
                        matchingRequested = req;
                        break;
                    }
                }
                if (matchingRequested != null) break;
            }

            if (matchingOffered != null || matchingRequested != null) {
                MatchDto match = new MatchDto();
                match.setUser(userService.getUserProfile(otherUser.getUsername()));
                
                if (matchingOffered != null) {
                    SkillDto sDto = new SkillDto(matchingOffered.getSkill().getId(), matchingOffered.getSkill().getName(), matchingOffered.getSkill().getCategory());
                    match.setMatchingOfferedSkill(sDto);
                }

                if (matchingRequested != null) {
                    SkillDto sDto = new SkillDto(matchingRequested.getSkill().getId(), matchingRequested.getSkill().getName(), matchingRequested.getSkill().getCategory());
                    match.setMatchingRequestedSkill(sDto);
                }

                match.setIsTwoWayMatch(matchingOffered != null && matchingRequested != null);
                matches.add(match);
            }
        }

        // Sort so two-way matches are first
        matches.sort((m1, m2) -> Boolean.compare(m2.getIsTwoWayMatch(), m1.getIsTwoWayMatch()));

        return matches;
    }

    public List<UserProfileDto> discoverUsers(User currentUser) {
        List<User> allUsers = userRepository.findAll();
        List<UserProfileDto> profiles = new ArrayList<>();
        for (User user : allUsers) {
            if (!user.getId().equals(currentUser.getId())) {
                profiles.add(userService.getUserProfile(user.getUsername()));
            }
        }
        return profiles;
    }
}
