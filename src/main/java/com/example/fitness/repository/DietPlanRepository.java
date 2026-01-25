package com.example.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fitness.model.DietPlan;

public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
}
