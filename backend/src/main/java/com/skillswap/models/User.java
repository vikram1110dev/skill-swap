package com.skillswap.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private String skillToTeach;
    private String skillToLearn;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getSkillToTeach() { return skillToTeach; }
    public void setSkillToTeach(String skillToTeach) { this.skillToTeach = skillToTeach; }
    public String getSkillToLearn() { return skillToLearn; }
    public void setSkillToLearn(String skillToLearn) { this.skillToLearn = skillToLearn; }
}
