package com.skillswap.dto;

public class MatchDto {
    private UserProfileDto user;
    private SkillDto matchingOfferedSkill; // The skill they offer that YOU want
    private SkillDto matchingRequestedSkill; // The skill they want that YOU offer
    private boolean isTwoWayMatch; 

    public MatchDto() {}

    public UserProfileDto getUser() { return user; }
    public void setUser(UserProfileDto user) { this.user = user; }

    public SkillDto getMatchingOfferedSkill() { return matchingOfferedSkill; }
    public void setMatchingOfferedSkill(SkillDto matchingOfferedSkill) { this.matchingOfferedSkill = matchingOfferedSkill; }

    public SkillDto getMatchingRequestedSkill() { return matchingRequestedSkill; }
    public void setMatchingRequestedSkill(SkillDto matchingRequestedSkill) { this.matchingRequestedSkill = matchingRequestedSkill; }

    public boolean getIsTwoWayMatch() { return isTwoWayMatch; }
    public void setIsTwoWayMatch(boolean isTwoWayMatch) { this.isTwoWayMatch = isTwoWayMatch; }
}
