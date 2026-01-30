import React, { useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { motion } from "framer-motion";

// Components
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import AddWorkout from "./components/AddWorkout";
import WorkoutList from "./components/WorkoutList";
import AddDietPlan from "./components/AddDietPlan";
import DietPlanList from "./components/DietPlanList";
import AddTrainingHistory from "./components/TrainingHistoryPage";
import Login from "./components/Login";

// Styles
import "./App.css";
import "./components/TrainingHistory.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const location = useLocation();
  const nodeRef = useRef(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="animated-bg"></div>

      <div className="app-container">
        {/* 🌙 Dark Mode Toggle */}
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <>
            <motion.h1 className="app-title">Ash Fitness 💪</motion.h1>

            {/* 🧭 Navigation */}
            <nav className="navbar glass">
              <ul className="nav-links">
                <li><Link to="/add-user">Add User</Link></li>
                <li><Link to="/user-list">User List</Link></li>
                <li><Link to="/add-workout">Add Workout</Link></li>
                <li><Link to="/workout-list">Workout List</Link></li>
                <li><Link to="/add-diet-plan">Add Diet Plan</Link></li>
                <li><Link to="/diet-plan-list">Diet Plan List</Link></li>
                <li><Link to="/add-training-history">Add Training History</Link></li>
              </ul>
            </nav>

            {/* 📦 Page Content */}
            <div className="content glass">
              <TransitionGroup component={null}>
                <CSSTransition
                  key={location.pathname}
                  timeout={300}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <div ref={nodeRef}>
                    <Routes location={location}>
                      <Route
                        path="/"
                        element={<h2>Welcome to Ash Fitness 💥</h2>}
                      />

                      <Route
                        path="/add-user"
                        element={<AddUser onLogout={handleLogout} />}
                      />
                      <Route path="/user-list" element={<UserList />} />
                      <Route path="/edit-user/:id" element={<EditUser />} />

                      <Route path="/add-workout" element={<AddWorkout />} />
                      <Route path="/workout-list" element={<WorkoutList />} />

                      <Route path="/add-diet-plan" element={<AddDietPlan />} />
                      <Route path="/diet-plan-list" element={<DietPlanList />} />

                      {/* ✅ Only Add Training History */}
                      <Route
                        path="/add-training-history"
                        element={<AddTrainingHistory />}
                      />
                    </Routes>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ✅ Router Wrapper
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
