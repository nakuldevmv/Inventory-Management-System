import React, { useEffect, useState } from "react";

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
      <div>
        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Product Name"
            />
          </label>{" "}
          <br />
          <label>
            Category:{" "}
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              placeholder="Category"
            />
          </label>{" "}
          <br />
          <label>
            Quantity:{" "}
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Quantity"
            />
          </label>{" "}
          <br />
          <label>
            Price:{" "}
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="Price"
            />
          </label>{" "}
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>} <br />
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
