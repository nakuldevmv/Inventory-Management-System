import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  //GET
  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      console.log("Fetched products:", res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }
  //POST
  async function addProducts(formData) {
    try {
      const res = await api.post("products", formData);
      setProducts((prev) => {
        return [res.data].concat(prev);
      });
    } catch (error) {
      console.log("Error adding product:", error);
    }
  }

  return (
    <>
      <ProductForm onAddProducts={addProducts} />
      <ProductTable products={products} />
    </>
  );
}

export default App;
