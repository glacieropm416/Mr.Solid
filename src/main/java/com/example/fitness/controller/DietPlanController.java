package com.example.fitness.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.fitness.model.DietPlan;
import com.example.fitness.service.DietPlanService;

@RestController
@RequestMapping("/diet")
public class DietPlanController {

    private final DietPlanService service;

    public DietPlanController(DietPlanService service) {
        this.service = service;
    }

    @PostMapping
    public DietPlan add(@RequestBody DietPlan dietPlan) {
        return service.save(dietPlan);
    }

    @GetMapping
    public List<DietPlan> getAll() {
        return service.getAll();
    }
}
