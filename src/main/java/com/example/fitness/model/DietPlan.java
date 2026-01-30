package com.example.fitness.model;

import jakarta.persistence.*;

@Entity
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealType;
    private String foodItems;
    private int calories;

    // FIX: Add owning side of relationship to User
    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key in diet_plans table
    private User user;

    public DietPlan() {}

    // Getters
    public Long getId() { return id; }
    public String getMealType() { return mealType; }
    public String getFoodItems() { return foodItems; }
    public int getCalories() { return calories; }
    public User getUser() { return user; } // getter for User

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public void setFoodItems(String foodItems) { this.foodItems = foodItems; }
    public void setCalories(int calories) { this.calories = calories; }
    public void setUser(User user) { this.user = user; } // setter for User
}
