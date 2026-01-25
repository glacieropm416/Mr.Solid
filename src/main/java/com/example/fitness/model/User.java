package com.example.fitness.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private int age;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Workout> workouts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DietPlan> dietPlans;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrainingHistory> trainingHistory;

    // No-arg constructor (required by JPA)
    public User() {}

    // Parameterized constructor
    public User(String name, String email, String password, int age) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public int getAge() { return age; }
    public List<Workout> getWorkouts() { return workouts; }
    public List<DietPlan> getDietPlans() { return dietPlans; }
    public List<TrainingHistory> getTrainingHistory() { return trainingHistory; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setAge(int age) { this.age = age; }
    public void setWorkouts(List<Workout> workouts) { this.workouts = workouts; }
    public void setDietPlans(List<DietPlan> dietPlans) { this.dietPlans = dietPlans; }
    public void setTrainingHistory(List<TrainingHistory> trainingHistory) {
        this.trainingHistory = trainingHistory;
    }
}
