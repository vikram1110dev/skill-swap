package com.skillswap.models;

import com.skillswap.models.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    
    @Builder.Default
    private Double rating = 0.0;
    
    @Builder.Default
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
}
