import axios from "axios";

const BASE_URL = "http://localhost:8080/api/workouts";

// Add workout for a specific user
export const addWorkoutForUser = (userId, workout) => {
    return axios.post(`${BASE_URL}/user/${userId}`, workout);
};

// Add workout (generic)
export const addWorkout = (workout) => {
    return axios.post(BASE_URL, workout);
};

// Get workouts by user
export const getWorkoutsByUser = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}`);
};

// Get all workouts
export const getWorkouts = () => {
    return axios.get(BASE_URL);
};


// ✅ NEW
export const deleteWorkout = (id) =>
    axios.delete(`${BASE_URL}/${id}`);

// ✅ NEW
export const updateWorkout = (id, workout) =>
    axios.put(`${BASE_URL}/${id}`, workout);
