import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TrainingHistory.css";

function TrainingHistoryPage() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHistory = {
      activity,
      duration: Number(duration),
      date
    };

    try {
      await axios.post("http://localhost:8080/history", newHistory);
      fetchHistory(); // 🔥 refresh table instantly

      setActivity("");
      setDuration("");
      setDate("");
    } catch (err) {
      alert("Failed to add training history");
    }
  };

  return (
    <div className="main-container">
      {/* ADD FORM */}
      <div className="form-container glass">
        <h2>Add Training History</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label>Activity</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Add History</button>
        </form>
      </div>

      {/* HISTORY TABLE */}
      <div className="list-container glass">
        <h2>Training History</h2>

        {history.length === 0 ? (
          <p className="empty">No training history available</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.activity}</td>
                  <td>{item.duration}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TrainingHistoryPage;
