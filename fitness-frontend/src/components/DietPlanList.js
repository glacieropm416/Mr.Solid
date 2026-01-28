import React, { useEffect, useState } from "react";
import { getDietPlans } from "../services/dietService";
import "./DietPlanList.css"; // Import CSS for styling

function DietPlanList() {
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        getDietPlans()
            .then(res => setDiets(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="diet-plan-list-container">
            <h2 className="diet-plan-list-title">Diet Plans</h2>
            <table className="diet-plan-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meal Type</th>
                        <th>Food Items</th>
                        <th>Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {diets.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="no-data">No diet plans found</td>
                        </tr>
                    ) : (
                        diets.map(d => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.mealType}</td>
                                <td>{d.foodItems}</td>
                                <td>{d.calories}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DietPlanList;