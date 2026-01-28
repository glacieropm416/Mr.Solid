package com.example.fitness.controller;

import com.example.fitness.model.DietPlan;
import com.example.fitness.model.DietPlanRequest;
import com.example.fitness.service.DietPlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diet")
@CrossOrigin(origins = "http://localhost:3000")
public class DietPlanController {

    private final DietPlanService service;

    public DietPlanController(DietPlanService service) {
        this.service = service;
    }

    // Add diet plan using DTO
    @PostMapping
    public DietPlan add(@RequestBody DietPlanRequest request) {
        return service.save(request);
    }

    // Get all diet plans
    @GetMapping
    public List<DietPlan> getAll() {
        return service.getAll();
    }
}
