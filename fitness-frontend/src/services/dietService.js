import axios from "axios";

const BASE_URL = "http://localhost:8080/diet";

export const getDietPlans = () => axios.get(BASE_URL);
export const addDietPlan = (diet) => axios.post(BASE_URL, diet);
export const updateDietPlan = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteDietPlan = (id) => axios.delete(`${BASE_URL}/${Number(id)}`);
