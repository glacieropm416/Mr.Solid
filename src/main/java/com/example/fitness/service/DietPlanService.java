package com.example.fitness.service;

import com.example.fitness.model.DietPlan;
import com.example.fitness.model.DietPlanRequest;
import com.example.fitness.repository.DietPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietPlanService {

    private final DietPlanRepository repository;

    public DietPlanService(DietPlanRepository repository) {
        this.repository = repository;
    }

    public List<DietPlan> getAll() {
        return repository.findAll();
    }

    public DietPlan save(DietPlanRequest request) {
        DietPlan diet = new DietPlan();
        diet.setMealType(request.getMealType());
        diet.setFoodItems(request.getFoodItems());
        diet.setCalories(request.getCalories());
        return repository.save(diet);
    }

    public DietPlan update(Long id, DietPlanRequest request) {
        DietPlan diet = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diet plan not found"));
        diet.setMealType(request.getMealType());
        diet.setFoodItems(request.getFoodItems());
        diet.setCalories(request.getCalories());
        return repository.save(diet);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Diet plan not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
