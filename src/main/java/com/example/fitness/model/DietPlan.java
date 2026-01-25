package com.example.fitness.model;

import jakarta.persistence.*;

@Entity
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealType;   // Breakfast, Lunch, Dinner
    private String foodItems;
    private int calories;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public DietPlan() {}

    // getters and setters
}
