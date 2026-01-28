import React, { useState } from "react";
import { addWorkoutForUser } from "../services/workoutService";
import "./AddWorkout.css";

function AddWorkout() {
    const [exercise, setExercise] = useState("");
    const [duration, setDuration] = useState("");
    const [userId, setUserId] = useState("");

    const saveWorkout = () => {
        if (!exercise || !duration || !userId) {
            alert("Please fill all fields");
            return;
        }

        const workout = {
            title: exercise,
            duration: Number(duration),
            caloriesBurned: 0
        };

        addWorkoutForUser(userId, workout)
            .then(() => {
                alert("Workout added successfully");
                setExercise("");
                setDuration("");
                setUserId("");
            })
            .catch((err) => {
                console.error(err);
                alert("Error adding workout");
            });
    };

    return (
        <div className="add-workout-bg">
            <div className="add-workout-container">
                <h2 className="form-title">Add Workout</h2>

                <form
                    className="add-workout-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveWorkout();
                    }}
                >
                    <div className="form-group">
                        <label>Exercise</label>
                        <input
                            type="text"
                            placeholder="Enter exercise name"
                            value={exercise}
                            onChange={(e) => setExercise(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (minutes)</label>
                        <input
                            type="number"
                            placeholder="Enter duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>User ID</label>
                        <input
                            type="number"
                            placeholder="Enter user ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="save-button">
                        Save Workout
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddWorkout;
