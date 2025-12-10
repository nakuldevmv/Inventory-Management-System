import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import ProductUpdate from "./components/ProductUpdate";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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
  async function addProduct(formData) {
    try {
      const res = await api.post("/products", formData);
      setProducts((prev) => {
        return [res.data].concat(prev);
      });
    } catch (error) {
      console.log("Error adding product:", error);
    }
  }
  //PUT
  async function updateProduct(id, formData) {
    try {
      const res = await api.put("/products/" + id, formData);
      setProducts((prev) => {
        return prev.map((p) => {
          if (p._id === id) {
            return res.data;
          }
          return p;
        });
      });
      setEditingProduct(null);
    } catch (error) {
      console.log("Error updating product:", error);
    }
  }

  //DELETE
  async function deleteProduct(id) {
    try {
      const res = await api.delete("/products/" + id);
      setProducts((prev) => {
        return prev.filter((p) => {
          return p._id !== id;
        });
      });
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  }
  function handleEditClick(product) {
    setEditingProduct(product);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }

  return (
    <>
      <ProductForm onAddProduct={addProduct} />

      <ProductTable
        products={products}
        onEditProduct={handleEditClick}
        onDeleteProduct={deleteProduct}
      />

      {editingProduct && (
        <ProductUpdate
          product={editingProduct}
          onUpdateProduct={updateProduct}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </>
  );
}

export default App;
