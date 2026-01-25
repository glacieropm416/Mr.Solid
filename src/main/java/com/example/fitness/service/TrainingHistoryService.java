package com.example.fitness.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.fitness.model.TrainingHistory;
import com.example.fitness.repository.TrainingHistoryRepository;

@Service
public class TrainingHistoryService {

    private final TrainingHistoryRepository repo;

    public TrainingHistoryService(TrainingHistoryRepository repo) {
        this.repo = repo;
    }

    public TrainingHistory save(TrainingHistory history) {
        return repo.save(history);
    }

    public List<TrainingHistory> getAll() {
        return repo.findAll();
    }
}
