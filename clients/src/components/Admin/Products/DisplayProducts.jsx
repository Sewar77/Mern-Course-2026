import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";
function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      // console.log(res);
      //check if there is no products
      if (res.data.products.length === 0) {
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

  return (
    <>
      <Header />
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stocks</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(products).map((categoryName) => (
            <React.Fragment key={categoryName}>
              <tr>
                <td
                  colSpan="8"
                  style={{ fontWeight: "bold", background: "#f2f2f2" }}
                >
                  {categoryName}
                </td>
              </tr>
              {products[categoryName].map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.description || "product description"}</td>
                  <td>
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{product.category?.name || "No Category"}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default DisplayProducts;
