import React, { useEffect, useState, useCallback } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = useCallback(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id)
        .then(() => {
          alert("User deleted successfully!");
          loadUsers();
        })
        .catch(() => alert("Failed to delete user"));
    }
  };

  return (
    <div className="user-list-bg">
      <div className="user-list-container">
        <h2 className="user-list-title">User List</h2>

        <button
          className="add-user-button"
          onClick={() => navigate("/add-user")}
        >
          Add User
        </button>

        <table className="user-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.age}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/edit-user/${u.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
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

export default UserList;
