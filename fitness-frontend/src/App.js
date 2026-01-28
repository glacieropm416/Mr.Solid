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

import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import AddWorkout from "./components/AddWorkout";
import WorkoutList from "./components/WorkoutList";
import AddDietPlan from "./components/AddDietPlan";
import DietPlanList from "./components/DietPlanList";
import Login from "./components/Login";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* 🔥 Animated background */}
      <div className="animated-bg"></div>

      <div className="app-container">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Login onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <>
            <motion.h1
              className="app-title"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Ash Fitness
            </motion.h1>

            <motion.nav
              className="navbar"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ul className="nav-links">
                <li><Link to="/add-user">Add User</Link></li>
                <li><Link to="/user-list">User List</Link></li>
                <li><Link to="/add-workout">Add Workout</Link></li>
                <li><Link to="/workout-list">Workout List</Link></li>
                <li><Link to="/add-diet-plan">Add Diet Plan</Link></li>
                <li><Link to="/diet-plan-list">Diet Plan List</Link></li>
              </ul>
            </motion.nav>

            <div className="content">
              <TransitionGroup component={null}>
                <CSSTransition
                  key={location.pathname}
                  timeout={300}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <motion.div
                    ref={nodeRef}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Routes location={location}>
                      <Route path="/" element={<h2>Welcome to the Fitness App!</h2>} />
                      <Route path="/add-user" element={<AddUser onLogout={handleLogout} />} />
                      <Route path="/user-list" element={<UserList />} />
                      <Route path="/edit-user/:id" element={<EditUser />} />
                      <Route path="/add-workout" element={<AddWorkout />} />
                      <Route path="/workout-list" element={<WorkoutList />} />
                      <Route path="/add-diet-plan" element={<AddDietPlan />} />
                      <Route path="/diet-plan-list" element={<DietPlanList />} />
                    </Routes>
                  </motion.div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
