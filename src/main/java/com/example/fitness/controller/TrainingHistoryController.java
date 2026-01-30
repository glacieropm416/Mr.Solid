package com.example.fitness.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.fitness.model.TrainingHistory;
import com.example.fitness.service.TrainingHistoryService;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "http://localhost:3000") // <-- ALLOWS React
public class TrainingHistoryController {

    private final TrainingHistoryService service;

    public TrainingHistoryController(TrainingHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public TrainingHistory add(@RequestBody TrainingHistory history) {
        return service.save(history);
    }

    @GetMapping
    public List<TrainingHistory> getAll() {
        return service.getAll();
    }
}
