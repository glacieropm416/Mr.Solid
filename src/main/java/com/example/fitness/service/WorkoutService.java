package com.example.fitness.service;

import com.example.fitness.model.User;
import com.example.fitness.model.Workout;
import com.example.fitness.repository.UserRepository;
import com.example.fitness.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public WorkoutService(WorkoutRepository workoutRepository,
                          UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    // Add workout for a specific user
    public Workout addWorkout(Long userId, Workout workout) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        workout.setUser(user);
        return workoutRepository.save(workout);
    }

    // Save workout (generic)
    public Workout saveWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    // Get workouts by user
    public List<Workout> getWorkoutsByUser(Long userId) {
        return workoutRepository.findByUserId(userId);
    }

    // Get all workouts
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    // Get workout by Id
    public Workout getWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    // Update workout by Id
    public Workout updateWorkout(Long id, Workout workout) {
        Workout existingWorkout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        // Correct fields (based on your entity)
        existingWorkout.setWorkoutName(workout.getWorkoutName());
        existingWorkout.setDuration(workout.getDuration());
        existingWorkout.setCaloriesBurned(workout.getCaloriesBurned());

        return workoutRepository.save(existingWorkout);
    }

    // Delete workout by Id
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
}
