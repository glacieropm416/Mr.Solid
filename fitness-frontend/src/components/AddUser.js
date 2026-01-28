import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/userService";
import "./AddUser.css";

function AddUser({ onLogout }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: name === "age" ? Number(value) : value
        });
    };

    const saveUser = async () => {
        if (
            !user.name.trim() ||
            !user.email.trim() ||
            !user.password.trim() ||
            user.age <= 0
        ) {
            alert("Please fill all fields correctly");
            return;
        }

        try {
            setLoading(true);
            await addUser(user);
            alert("User added successfully!");
            setUser({ name: "", email: "", password: "", age: "" });
            navigate("/users");
        } catch (error) {
            console.error(error);
            alert("Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <div className="add-user-bg">
            <div className="add-user-container">
                <h2 className="form-title">Add User</h2>

                <form
                    className="add-user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveUser();
                    }}
                >
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            min="1"
                            value={user.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                            required
                        />
                    </div>

                    <button type="submit" className="save-button" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
