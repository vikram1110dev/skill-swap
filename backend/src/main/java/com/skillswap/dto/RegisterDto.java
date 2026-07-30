package com.skillswap.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String fullName;
    private String username;
    private String email;
    private String password;
}
