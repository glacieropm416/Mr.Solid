import React, { useEffect, useState } from "react";
import { getDietPlans, deleteDietPlan, updateDietPlan } from "../services/dietService";
import "./DietPlanList.css";

function DietPlanList() {
  const [diets, setDiets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ mealType: "", foodItems: "", calories: "" });

  useEffect(() => { loadDiets(); }, []);

  const loadDiets = async () => {
    try {
      const res = await getDietPlans();
      setDiets(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load diet plans");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this diet plan?")) return;
    try {
      console.log("Deleting diet plan id:", id);
      await deleteDietPlan(Number(id));
      await loadDiets();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to delete diet plan");
    }
  };

  const handleEdit = (diet) => {
    setEditingId(diet.id);
    setEditData({ mealType: diet.mealType, foodItems: diet.foodItems, calories: diet.calories });
  };

  const handleSave = async (id) => {
    if (!editData.mealType || !editData.foodItems || editData.calories === "") {
      alert("All fields are required");
      return;
    }
    try {
      await updateDietPlan(id, {
        mealType: editData.mealType,
        foodItems: editData.foodItems,
        calories: Number(editData.calories)
      });
      setEditingId(null);
      await loadDiets();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to update diet plan");
    }
  };

  return (
    <div className="diet-plan-page">
      <div className="diet-plan-list-container">
        <h2 className="diet-plan-list-title">🥗 Diet Plans</h2>
        <table className="diet-plan-list-table">
          <thead>
            <tr>
              <th>ID</th><th>Meal Type</th><th>Food Items</th><th>Calories</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {diets.length === 0 ? (
              <tr><td colSpan="5" className="no-data">No diet plans found</td></tr>
            ) : diets.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                {editingId === d.id ? (
                  <>
                    <td><input value={editData.mealType} onChange={e => setEditData({ ...editData, mealType: e.target.value })} /></td>
                    <td><input value={editData.foodItems} onChange={e => setEditData({ ...editData, foodItems: e.target.value })} /></td>
                    <td><input type="number" value={editData.calories} onChange={e => setEditData({ ...editData, calories: e.target.value })} /></td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(d.id)}>💾</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>❌</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{d.mealType}</td><td>{d.foodItems}</td><td>{d.calories}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(d)}>✏️</button>
                      <button className="delete-btn" onClick={() => handleDelete(d.id)}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DietPlanList;
