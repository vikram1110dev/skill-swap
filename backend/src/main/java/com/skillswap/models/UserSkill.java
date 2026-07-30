package com.skillswap.models;

import com.skillswap.models.enums.SkillType;
import com.skillswap.models.enums.ProficiencyLevel;
import jakarta.persistence.*;
@Entity
@Table(name = "user_skills")
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillType skillType;

    @Enumerated(EnumType.STRING)
    private ProficiencyLevel proficiencyLevel;

    public UserSkill() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return this.user; }
    public void setUser(User user) { this.user = user; }
    public Skill getSkill() { return this.skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public SkillType getSkillType() { return this.skillType; }
    public void setSkillType(SkillType skillType) { this.skillType = skillType; }
    public ProficiencyLevel getProficiencyLevel() { return this.proficiencyLevel; }
    public void setProficiencyLevel(ProficiencyLevel proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
}
