package com.example.fitness.controller;

import com.example.fitness.model.Workout;
import com.example.fitness.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    // Add workout for a specific user
    @PostMapping("/user/{userId}")
    public Workout addWorkout(
            @PathVariable Long userId,
            @RequestBody Workout workout) {
        return workoutService.addWorkout(userId, workout);
    }

    // Add workout (generic)
    @PostMapping
    public Workout addWorkout(@RequestBody Workout workout) {
        return workoutService.saveWorkout(workout);
    }

    // Get workouts by user
    @GetMapping("/user/{userId}")
    public List<Workout> getWorkoutsByUser(@PathVariable Long userId) {
        return workoutService.getWorkoutsByUser(userId);
    }

    // Get all workouts
    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // Get workout by ID
    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return workoutService.getWorkoutById(id);
    }

    // Update workout by ID
    @PutMapping("/{id}")
    public Workout updateWorkout(
            @PathVariable Long id,
            @RequestBody Workout workout) {
        return workoutService.updateWorkout(id, workout);
    }

    // Delete workout by ID
    @DeleteMapping("/{id}")
    public String deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return "Workout deleted successfully";
    }
}
