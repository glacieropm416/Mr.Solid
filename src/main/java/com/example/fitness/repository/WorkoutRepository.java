package com.example.fitness.repository;

import com.example.fitness.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    // Find workouts belonging to a specific user
    List<Workout> findByUserId(Long userId);
}
