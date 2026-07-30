package com.skillswap.dto;

public class LoginDto {
    private String usernameOrEmail;
    private String password;

    public LoginDto() {}

    public String getUsernameOrEmail() { return this.usernameOrEmail; }
    public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }
    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }
}
