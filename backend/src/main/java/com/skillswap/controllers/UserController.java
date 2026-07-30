package com.skillswap.controllers;

import com.skillswap.dto.ProfileUpdateRequestDto;
import com.skillswap.dto.UserProfileDto;
import com.skillswap.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequestDto updateDto) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), updateDto));
    }
}
