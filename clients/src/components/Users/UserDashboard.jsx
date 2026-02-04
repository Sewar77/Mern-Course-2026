import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/SideBar.jsx";
import toast from "react-hot-toast";
import api from "../../api.js";
function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [products, setProducts] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      if (Object.keys(res.data.products).length === 0) {
        toast.error(res.data.message || "No products found");
        return;
      }
      setProducts(res.data.products);
    } catch (err) {
      toast.error("Failed to fetch products");
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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
          <h2>Products: </h2>
          <div>
            {Object.keys(products).map((category) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {products[category].map((product) => (
                    <li key={product._id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
