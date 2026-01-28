import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "Rohan" && password === "Crypton") {
      alert("Login successful!");
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      {/* Background animated icons */}
      <motion.div
        className="workout-animation dumbbell"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        🏋️‍♂️
      </motion.div>

      <motion.div
        className="workout-animation runner"
        animate={{ y: [0, 25, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        🏃‍♀️
      </motion.div>

      <motion.div
        className="workout-animation yoga"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.6,
        }}
      >
        🧘‍♂️
      </motion.div>

      {/* Login Card */}
      <div className="login-container">
        <h2 className="login-title">Welcome to Ash Fitness</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
