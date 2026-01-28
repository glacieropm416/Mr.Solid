import React, { useEffect, useState } from "react";
import {
    getWorkouts,
    getWorkoutsByUser,
    deleteWorkout,
    updateWorkout
} from "../services/workoutService";
import "./WorkoutList.css";

function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [userId, setUserId] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        duration: "",
    });

    useEffect(() => {
        loadAllWorkouts();
    }, []);

    const loadAllWorkouts = () => {
        getWorkouts()
            .then((res) => {
                const updated = res.data.map(w => ({
                    ...w,
                    caloriesBurned: Math.round((w.duration / 30) * 250),
                }));
                setWorkouts(updated);
            })
            .catch(err => console.error(err));
    };

    const loadWorkoutsByUser = () => {
        if (!userId) {
            alert("Please enter User ID");
            return;
        }

        getWorkoutsByUser(userId)
            .then((res) => {
                const updated = res.data.map(w => ({
                    ...w,
                    caloriesBurned: Math.round((w.duration / 30) * 250),
                }));
                setWorkouts(updated);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this workout?")) return;

        deleteWorkout(id)
            .then(() => loadAllWorkouts())
            .catch(err => console.error(err));
    };

    const handleEdit = (workout) => {
        setEditingId(workout.id);
        setEditData({ duration: workout.duration });
    };

    const handleUpdate = (id) => {
        const updatedWorkout = {
            duration: editData.duration,
            caloriesBurned: Math.round((editData.duration / 30) * 250),
        };

        updateWorkout(id, updatedWorkout)
            .then(() => {
                setEditingId(null);
                loadAllWorkouts();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="workout-list-page">
            <div className="workout-list-container">
                <h2 className="workout-list-title">Workout List</h2>

                <div className="filter-container">
                    <input
                        type="number"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button onClick={loadWorkoutsByUser}>Load by User</button>
                    <button onClick={loadAllWorkouts}>Load All</button>
                </div>

                <table className="workout-list-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Duration (mins)</th>
                            <th>Calories Burned</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="no-data">
                                    No workouts found
                                </td>
                            </tr>
                        ) : (
                            workouts.map((w) => (
                                <tr key={w.id}>
                                    <td>{w.id}</td>

                                    <td>
                                        {editingId === w.id ? (
                                            <input
                                                type="number"
                                                value={editData.duration}
                                                onChange={(e) =>
                                                    setEditData({ duration: e.target.value })
                                                }
                                            />
                                        ) : (
                                            w.duration
                                        )}
                                    </td>

                                    <td>
                                        {editingId === w.id
                                            ? Math.round((editData.duration / 30) * 250)
                                            : w.caloriesBurned}
                                    </td>

                                    <td>
                                        {editingId === w.id ? (
                                            <>
                                                <button
                                                    className="save-button"
                                                    onClick={() => handleUpdate(w.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="cancel-button"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEdit(w)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDelete(w.id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkoutList;
