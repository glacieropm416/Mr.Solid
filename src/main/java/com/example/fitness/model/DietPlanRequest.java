package com.example.fitness.model;

public class DietPlanRequest {

    private String mealType;
    private String foodItems;
    private int calories;
    private Long userId;

    // Getters
    public String getMealType() {
        return mealType;
    }

    public String getFoodItems() {
        return foodItems;
    }

    public int getCalories() {
        return calories;
    }

    public Long getUserId() {
        return userId;
    }

    // Setters
    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public void setFoodItems(String foodItems) {
        this.foodItems = foodItems;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
