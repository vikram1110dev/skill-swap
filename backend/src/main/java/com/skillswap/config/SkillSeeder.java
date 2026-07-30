package com.skillswap.config;

import com.skillswap.models.Skill;
import com.skillswap.repositories.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SkillSeeder {

    @Bean
    public CommandLineRunner seedSkills(SkillRepository skillRepository) {
        return args -> {
            if (skillRepository.count() == 0) {
                skillRepository.saveAll(List.of(
                    createSkill("Web Development", "Technology"),
                    createSkill("Mobile App Development", "Technology"),
                    createSkill("Data Science", "Technology"),
                    createSkill("Spanish Language", "Languages"),
                    createSkill("French Language", "Languages"),
                    createSkill("Piano", "Music"),
                    createSkill("Guitar", "Music"),
                    createSkill("Cooking", "Lifestyle"),
                    createSkill("Baking", "Lifestyle"),
                    createSkill("Digital Marketing", "Business"),
                    createSkill("SEO Optimization", "Business"),
                    createSkill("Graphic Design", "Design"),
                    createSkill("UI/UX Design", "Design"),
                    createSkill("Yoga", "Fitness"),
                    createSkill("Personal Training", "Fitness")
                ));
            }
        };
    }

    private Skill createSkill(String name, String category) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        return skill;
    }
}
