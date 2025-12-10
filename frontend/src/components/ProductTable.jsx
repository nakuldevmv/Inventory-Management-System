import React from "react";

import styles from "./ProductTable.module.css";

export default function ProductTable(props) {
  const products = props.products;
  console.log("ProductTable received products:", products);
  const searchTerm = props.searchTerm || "";

  function handleSearchChange(event) {
    if (props.onSearchChange) {
      return props.onSearchChange(event);
    }
  }

  function handleEditClick(product) {
    if (props.onEditProduct) {
      props.onEditProduct(product);
    }
  }
  function handleDeleteClick(product) {
    let confirmDelete = window.confirm(
      `Are you sure you want to delete the product ${product.name}?`
    );
    if (!confirmDelete) {
      return;
    }
    if (props.onDeleteProduct) {
      props.onDeleteProduct(product._id);
    }
  }

  function renderRow() {
    if (!products || products.length === 0) {
      return (
        <>
          <tr>
            <td colSpan="5" style={{ textAlign: "center", fontWeight: "bold" }}>
              No products available
            </td>
          </tr>
        </>
      );
    }
    return products.map((product) => {
      let lowStock = Number(product.quantity) < 10;
      return (
        <>
          <tr
            key={product._id}
            style={{
              backgroundColor: lowStock ? "#ff0000ff" : "#fffce7ff",
              color: lowStock ? "white" : "black",
            }}
          >
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>₹{product.price}</td>
            <td style={{ textAlign: "center" }}>
              <button
                className={styles.editbtn}
                onClick={() => {
                  handleEditClick(product);
                }}
              >
                Edit
              </button>{" "}
              <button
                className={styles.dltbtn}
                onClick={() => {
                  handleDeleteClick(product);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <div className={styles.productTableContainer}>
      <div className={styles.headBox}>
        <h2>Products</h2>

        <input
          type="text"
          placeholder="🔍 Search by name or category"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.productTable} border="1" cellPadding="15">
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </div>
  );
}
