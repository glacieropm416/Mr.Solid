package com.example.fitness.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workouts")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workoutName;
    private int duration; // minutes
    private int caloriesBurned;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Workout() {}

    public Workout(String workoutName, int duration, int caloriesBurned, User user) {
        this.workoutName = workoutName;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.user = user;
    }

    public Long getId() { return id; }
    public String getWorkoutName() { return workoutName; }
    public int getDuration() { return duration; }
    public int getCaloriesBurned() { return caloriesBurned; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setWorkoutName(String workoutName) { this.workoutName = workoutName; }
    public void setDuration(int duration) { this.duration = duration; }
    public void setCaloriesBurned(int caloriesBurned) { this.caloriesBurned = caloriesBurned; }
    public void setUser(User user) { this.user = user; }
}
