package com.example.fitness.service;

import com.example.fitness.model.DietPlanRequest;
import com.example.fitness.model.DietPlan;
import com.example.fitness.model.User;
import com.example.fitness.repository.DietPlanRepository;
import com.example.fitness.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietPlanService {

    private final DietPlanRepository repo;
    private final UserRepository userRepo;

    public DietPlanService(DietPlanRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // Save using DTO (recommended)
    public DietPlan save(DietPlanRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        DietPlan diet = new DietPlan();
        diet.setMealType(request.getMealType());
        diet.setFoodItems(request.getFoodItems());
        diet.setCalories(request.getCalories());
        diet.setUser(user);

        return repo.save(diet);
    }

    // Save using Entity (optional / legacy)
    public DietPlan save(DietPlan dietPlan) {
        return repo.save(dietPlan);
    }

    // Get all diet plans
    public List<DietPlan> getAll() {
        return repo.findAll();
    }
}
