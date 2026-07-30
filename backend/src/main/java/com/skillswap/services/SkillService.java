package com.skillswap.services;

import com.skillswap.dto.AddSkillRequestDto;
import com.skillswap.dto.SkillDto;
import com.skillswap.dto.UserSkillDto;
import com.skillswap.models.Skill;
import com.skillswap.models.User;
import com.skillswap.models.UserSkill;
import com.skillswap.models.enums.ProficiencyLevel;
import com.skillswap.models.enums.SkillType;
import com.skillswap.repositories.SkillRepository;
import com.skillswap.repositories.UserRepository;
import com.skillswap.repositories.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(skill -> new SkillDto(skill.getId(), skill.getName(), skill.getCategory()))
                .collect(Collectors.toList());
    }

    public UserSkillDto addUserSkill(String username, AddSkillRequestDto addSkillDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(addSkillDto.skillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (userSkillRepository.findByUserIdAndSkillId(user.getId(), skill.getId()).isPresent()) {
            throw new RuntimeException("You have already added this skill to your profile.");
        }

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setSkillType(SkillType.valueOf(addSkillDto.skillType()));
        
        if (addSkillDto.proficiencyLevel() != null) {
            userSkill.setProficiencyLevel(ProficiencyLevel.valueOf(addSkillDto.proficiencyLevel()));
        }

        userSkill = userSkillRepository.save(userSkill);

        return new UserSkillDto(
                userSkill.getId(),
                new SkillDto(skill.getId(), skill.getName(), skill.getCategory()),
                userSkill.getSkillType().name(),
                userSkill.getProficiencyLevel() != null ? userSkill.getProficiencyLevel().name() : null
        );
    }

    public void removeUserSkill(String username, Long userSkillId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSkill userSkill = userSkillRepository.findById(userSkillId)
                .orElseThrow(() -> new RuntimeException("UserSkill not found"));

        if (!userSkill.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to remove this skill");
        }

        userSkillRepository.delete(userSkill);
    }
}
