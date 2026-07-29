package com.skillswap.repositories;

import com.skillswap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLocation(String location);
    Optional<User> findByName(String name);
}
