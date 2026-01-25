import React, { useState } from "react";
import { addUser } from "../services/userService";

function AddUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveUser = () => {
        addUser(user).then(() => {
            alert("User added successfully!");
        });
    };

    return (
        <div>
            <h2>Add User</h2>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" onChange={handleChange} />
            <input name="age" placeholder="Age" onChange={handleChange} />
            <br /><br />
            <button onClick={saveUser}>Save</button>
        </div>
    );
}

export default AddUser;
