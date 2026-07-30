package com.skillswap.controllers;

import com.skillswap.dto.AddSkillRequestDto;
import com.skillswap.dto.SkillDto;
import com.skillswap.dto.UserSkillDto;
import com.skillswap.services.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<SkillDto>> getAllMasterSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping("/user")
    public ResponseEntity<UserSkillDto> addSkillToProfile(
            Authentication authentication,
            @Valid @RequestBody AddSkillRequestDto addSkillDto) {
        return ResponseEntity.ok(skillService.addUserSkill(authentication.getName(), addSkillDto));
    }

    @DeleteMapping("/user/{userSkillId}")
    public ResponseEntity<Void> removeSkillFromProfile(
            Authentication authentication,
            @PathVariable Long userSkillId) {
        skillService.removeUserSkill(authentication.getName(), userSkillId);
        return ResponseEntity.ok().build();
    }
}
