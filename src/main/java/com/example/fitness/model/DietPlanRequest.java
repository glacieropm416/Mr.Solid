package com.example.fitness.model;

public class DietPlanRequest {
    private String mealType;
    private String foodItems;
    private int calories;

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public String getFoodItems() { return foodItems; }
    public void setFoodItems(String foodItems) { this.foodItems = foodItems; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }
}
