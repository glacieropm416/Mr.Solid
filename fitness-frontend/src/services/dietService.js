import axios from "axios";

const BASE_URL = "http://localhost:8080/diet";

// Fetch all diet plans
export const getDietPlans = () => axios.get(BASE_URL);

// Add a new diet plan
export const addDietPlan = (diet) => axios.post(BASE_URL, diet);
