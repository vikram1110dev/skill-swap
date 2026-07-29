package com.skillswap.repositories;

import com.skillswap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLocation(String location);
}
