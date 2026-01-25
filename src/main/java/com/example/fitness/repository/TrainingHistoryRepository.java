package com.example.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fitness.model.TrainingHistory;

public interface TrainingHistoryRepository extends JpaRepository<TrainingHistory, Long> {
}
