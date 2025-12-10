import React from "react";

export default function ProductTable(props) {
  const products = props.products;
  console.log("ProductTable received products:", products);

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
            <td colSpan="5" style={{textAlign:"center", fontWeight:"bold"}}>No products available</td>
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
            style={{ backgroundColor: lowStock ? "#ff4d4dff" : "#fffce2ff" }}
          >
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td style={{textAlign:"center"}}>
              <button
                onClick={() => {
                  handleEditClick(product);
                }}
              >
                Edit
              </button>
              {" "}
              <button
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
    <>
      <div style={{ marginTop: "20px" }}>
        <h2>Products</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
          border="1"
          cellPadding="15"
        >
          <thead style={{ textAlign: "center" }}>
            <tr style={{ backgroundColor: "#ecffffff" }}>
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
    </>
  );
}
