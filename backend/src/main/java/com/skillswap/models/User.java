package com.skillswap.models;

import com.skillswap.models.enums.Role;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String profilePhoto;
    private String fullName;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String bio;
    private String country;
    private String city;
    
    @ElementCollection
    private Set<String> languages = new HashSet<>();
    
    private String experienceLevel;
    private String availability;
    private String timeZone;
    
    private Double rating = 0.0;
    
    private Integer completedExchanges = 0;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserSkill> skills = new HashSet<>();

    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL)
    private Set<Review> reviewsGiven = new HashSet<>();
    
    @OneToMany(mappedBy = "reviewee", cascade = CascadeType.ALL)
    private Set<Review> reviewsReceived = new HashSet<>();

    public User() {}

    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }
    public String getProfilePhoto() { return this.profilePhoto; }
    public void setProfilePhoto(String profilePhoto) { this.profilePhoto = profilePhoto; }
    public String getFullName() { return this.fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getUsername() { return this.username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return this.password; }
    public void setPassword(String password) { this.password = password; }
    public String getBio() { return this.bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getCountry() { return this.country; }
    public void setCountry(String country) { this.country = country; }
    public String getCity() { return this.city; }
    public void setCity(String city) { this.city = city; }
    public Set<String> getLanguages() { return this.languages; }
    public void setLanguages(Set<String> languages) { this.languages = languages; }
    public String getExperienceLevel() { return this.experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }
    public String getAvailability() { return this.availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    public String getTimeZone() { return this.timeZone; }
    public void setTimeZone(String timeZone) { this.timeZone = timeZone; }
    public Double getRating() { return this.rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getCompletedExchanges() { return this.completedExchanges; }
    public void setCompletedExchanges(Integer completedExchanges) { this.completedExchanges = completedExchanges; }
    public Set<Role> getRoles() { return this.roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
    public Set<UserSkill> getSkills() { return this.skills; }
    public void setSkills(Set<UserSkill> skills) { this.skills = skills; }
    public Set<Review> getReviewsGiven() { return this.reviewsGiven; }
    public void setReviewsGiven(Set<Review> reviewsGiven) { this.reviewsGiven = reviewsGiven; }
    public Set<Review> getReviewsReceived() { return this.reviewsReceived; }
    public void setReviewsReceived(Set<Review> reviewsReceived) { this.reviewsReceived = reviewsReceived; }
}
