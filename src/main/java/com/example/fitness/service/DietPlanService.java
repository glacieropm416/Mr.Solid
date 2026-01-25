package com.example.fitness.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.fitness.model.DietPlan;
import com.example.fitness.repository.DietPlanRepository;

@Service
public class DietPlanService {

    private final DietPlanRepository repo;

    public DietPlanService(DietPlanRepository repo) {
        this.repo = repo;
    }

    public DietPlan save(DietPlan dietPlan) {
        return repo.save(dietPlan);
    }

    public List<DietPlan> getAll() {
        return repo.findAll();
    }
}
