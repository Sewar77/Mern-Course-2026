import React, { useState } from "react";
import SideBar from "../SideBar/SideBar.jsx";
function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="admin-layout">
        <SideBar isOpen={isSidebarOpen} />

        <div className="admin-content">
          <button onClick={toggleSideBar}>
            {isSidebarOpen ? "Hide" : "Show"}
          </button>

          <h1>user Dashboard</h1>
        </div>
      </div>

      {/* deadline: saturday */}
      {/* display user infromation */}
      {/* display products as cards  */}
      {/* display categories as cards */}
      {/* التسليم عالموقع وليس عالايميل!!!! */}
    </>
  );
}

export default UserDashboard;
