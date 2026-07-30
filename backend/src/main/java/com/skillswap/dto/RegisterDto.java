package com.skillswap.dto;

public class RegisterDto {
    private String fullName;
    private String username;
    private String email;
    private String password;

    public RegisterDto() {}

    public String getFullName() { return this.fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }
}
