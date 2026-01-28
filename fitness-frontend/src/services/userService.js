import axios from "axios";

// Choose ONE base URL (update if needed)
const BASE_URL = "http://localhost:8080/api/users";

// Get all users
export const getUsers = () => {
    return axios.get(BASE_URL);
};

// Get user by ID
export const getUserById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

// Add new user
export const addUser = (user) => {
    return axios.post(BASE_URL, user);
};

// Update existing user
export const updateUser = (id, user) => {
    return axios.put(`${BASE_URL}/${id}`, user);
};

// Delete user by ID
export const deleteUser = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};
