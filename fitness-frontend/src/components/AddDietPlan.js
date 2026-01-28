import React, { useState } from "react";
import { addDietPlan } from "../services/dietService";
import "./AddDietPlan.css";

function AddDietPlan() {
    const [mealType, setMealType] = useState("");
    const [foodItems, setFoodItems] = useState("");
    const [calories, setCalories] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!mealType || !foodItems || !calories || !userId) {
            alert("Please fill all fields");
            return;
        }

        const diet = {
            mealType,
            foodItems,
            calories: Number(calories),
            userId: Number(userId),
        };

        addDietPlan(diet)
            .then(() => {
                alert("Diet Plan added successfully");
                setMealType("");
                setFoodItems("");
                setCalories("");
                setUserId("");
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding diet plan");
            });
    };

    return (
        <div className="add-diet-plan-page">
            <div className="add-diet-plan-container">
                <h2 className="form-title">Add Diet Plan</h2>

                <form className="add-diet-plan-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Meal Type</label>
                        <input
                            type="text"
                            placeholder="Breakfast, Lunch..."
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Food Items</label>
                        <input
                            type="text"
                            placeholder="Eggs, Rice, Salad..."
                            value={foodItems}
                            onChange={(e) => setFoodItems(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Calories</label>
                        <input
                            type="number"
                            placeholder="Calories"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>User ID</label>
                        <input
                            type="number"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="save-button">
                        Add Diet Plan
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddDietPlan;
