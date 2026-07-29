package com.skillswap;

import com.skillswap.models.User;
import com.skillswap.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                User user1 = new User();
                user1.setName("Alice (Dummy)");
                user1.setLocation("Chennai");
                user1.setSkillToTeach("Cooking");
                user1.setSkillToLearn("Java");
                repository.save(user1);

                User user2 = new User();
                user2.setName("Bob (Dummy)");
                user2.setLocation("Chennai");
                user2.setSkillToTeach("Guitar");
                user2.setSkillToLearn("React");
                repository.save(user2);

                User user3 = new User();
                user3.setName("Charlie (Dummy)");
                user3.setLocation("Bangalore");
                user3.setSkillToTeach("Python");
                user3.setSkillToLearn("Cooking");
                repository.save(user3);
                
                System.out.println("Dummy users loaded into H2 database.");
            }
        };
    }
}
