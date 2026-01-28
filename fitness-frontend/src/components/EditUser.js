import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
import "./EditUser.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(id, user)
      .then(() => {
        alert("User updated successfully!");
        navigate("/user-list");
      })
      .catch(() => alert("Failed to update user"));
  };

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Edit User</h2>

      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/user-list")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;