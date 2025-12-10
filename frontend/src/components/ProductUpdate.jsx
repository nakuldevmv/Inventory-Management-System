import React, { useEffect, useState } from "react";
import style from "./ProductUpdate.module.css";

export default function ProductUpdate(props) {
  const product = props.product;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category || "");
      setQuantity(String(product.quantity));
      setPrice(String(product.price));
    }
  }, [product]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!name || !quantity || !price) {
      setError("Please fill all the required fields");
      return;
    }

    let qtyNum = Number(quantity);
    let priceNum = Number(price);
    if (isNaN(qtyNum) || qtyNum < 0) {
      setError("Quantity must be a non negative number");
      return;
    }
    if (isNaN(priceNum) || priceNum < 0) {
      setError("Price must be a non negative number");
      return;
    }

    let payload = {
      name,
      category: category || "General",
      quantity: qtyNum,
      price: priceNum,
    };

    if (props.onUpdateProduct) {
      props.onUpdateProduct(product._id, payload);
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }
  function handlePriceChange(e) {
    setPrice(e.target.value);
  }
  function handleCancelClick() {
    if (props.onCancelEdit) {
      props.onCancelEdit();
    }
  }

  return (
    <>
      <div className={style.updateContainer}>
        <form onSubmit={handleSubmit} className={style.ipContainer}>
          <h2 style={{ marginBottom: "-35px" }}>Edit Product</h2>
          <p style={{ fontSize: "14px" }}>
            Fields marked with{" "}
            <span style={{ color: "red", fontSize: "16px" }}>*</span> are
            required.
          </p>
          <label
            style={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
          >
            Product Name<span style={{ color: "red" }}>*</span>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Product Name"
              className={style.input}
            />
          </label>

          <label
            style={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
          >
            Product Category
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              placeholder="Category"
              className={style.input}
            />
          </label>

          <label
            style={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
          >
            Quantity<span style={{ color: "red" }}>*</span>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Quantity"
              className={style.input}
            />
          </label>

          <label
            style={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
          >
            Price<span style={{ color: "red" }}>*</span>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="Price"
              className={style.input}
            />
          </label>
          <div>
            <button type="submit" className={style.button}>
              Update
            </button>{" "}
            <button
              type="button"
              onClick={handleCancelClick}
              className={style.buttonCancel}
            >
              Cancel
            </button>
          </div>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "-5px",
                marginBottom: "-5px",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
