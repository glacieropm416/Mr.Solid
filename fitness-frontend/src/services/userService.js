import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";


export const getUsers = () => {
    return axios.get(BASE_URL);
};

export const addUser = (user) => {
    return axios.post(BASE_URL, user);
};
