import React from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
    return (
        <div>
            <h1>Fitness App</h1>
            <AddUser />
            <hr />
            <UserList />
        </div>
    );
}

export default App;
